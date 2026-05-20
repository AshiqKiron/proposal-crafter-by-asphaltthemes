<?php
defined( 'ABSPATH' ) || exit;

use ProposalCrafter\App\Repositories\SettingsRepository;

$asphalt_proposal_manager_unique_id = $attributes['uniqueId'] ?? '';
$asphalt_proposal_manager_user_type = $attributes['userType'] ?? 'sender';
$asphalt_proposal_manager_use_default_sender_signature = $attributes['useDefaultSenderSignature'] ?? true;
$asphalt_proposal_manager_placeholder = $attributes['placeholder'] ?? 'Signature';

$asphalt_proposal_manager_settings_repository = new SettingsRepository();

// Default: use block attributes
$asphalt_proposal_manager_final_signature_type = $attributes['signatureType'] ?? 'type';
$asphalt_proposal_manager_final_value = ''; 
$asphalt_proposal_manager_is_prefilled = false;

// Logic to determine signature type and value from Settings if needed
if ( $asphalt_proposal_manager_user_type === 'sender' && $asphalt_proposal_manager_use_default_sender_signature ) {
    $asphalt_proposal_manager_sender_info = $asphalt_proposal_manager_settings_repository->get_sender_info();
    if ( ! empty( $asphalt_proposal_manager_sender_info ) ) {
        $asphalt_proposal_manager_final_signature_type = $asphalt_proposal_manager_sender_info['signature_type'] ?? 'type';
        
        if ( $asphalt_proposal_manager_final_signature_type === 'type' ) {
            $asphalt_proposal_manager_final_value = $asphalt_proposal_manager_sender_info['signature_text'] ?? '';
        } else {
            $asphalt_proposal_manager_image_id = $asphalt_proposal_manager_sender_info['signature_image'] ?? '';
            // For upload, we want the URL for the preview
            if ( is_numeric( $asphalt_proposal_manager_image_id ) ) {
                $asphalt_proposal_manager_final_value = wp_get_attachment_url( $asphalt_proposal_manager_image_id );
            } else {
                $asphalt_proposal_manager_final_value = $asphalt_proposal_manager_image_id;
            }
        }
        $asphalt_proposal_manager_is_prefilled = true;
    }
}

// look for client signature
if ( $asphalt_proposal_manager_user_type === 'client' ) {
    $asphalt_proposal_manager_client_signature_type = get_post_meta( get_the_ID(), 'pc_client_signature_type', true );
    $asphalt_proposal_manager_client_signature_value = get_post_meta( get_the_ID(), 'pc_client_signature_value', true );

    if ( ! empty( $asphalt_proposal_manager_client_signature_value ) ) {
        $asphalt_proposal_manager_final_signature_type = $asphalt_proposal_manager_client_signature_type;
        $asphalt_proposal_manager_final_value          = $asphalt_proposal_manager_client_signature_value;
        $asphalt_proposal_manager_is_prefilled         = true;
    }
}

asphalt_proposal_manager_block_start( $attributes );
?>
    <div 
        class="signature-content signature-block-user-type-<?php echo esc_attr( $asphalt_proposal_manager_user_type ); ?>"
        data-signature-type="<?php echo esc_attr( $asphalt_proposal_manager_final_signature_type ); ?>"
        data-signature-value="<?php echo esc_attr( $asphalt_proposal_manager_final_value ); ?>"
        data-signature-user-type="<?php echo esc_attr( $asphalt_proposal_manager_user_type ); ?>"
    >
        <?php if ( $asphalt_proposal_manager_final_signature_type === 'type' ): ?>
            <div class="signature-mode-type">
                <input
                    type="text"
                    class="signature-type-input signature-content"
                    placeholder="<?php echo esc_attr( $asphalt_proposal_manager_placeholder ); ?>"
                    value="<?php echo esc_attr( $asphalt_proposal_manager_final_value ); ?>"
                    <?php echo $asphalt_proposal_manager_is_prefilled ? 'readonly' : ''; ?>
                />
            </div>
        <?php endif; ?>

        <?php if ( $asphalt_proposal_manager_final_signature_type === 'upload' ): ?>
            <div class="signature-mode-upload">
                <input
                    type="file"
                    class="signature-upload-input"
                    accept="image/png,image/jpg,image/jpeg"
                    id="signature-file-input-<?php echo esc_attr( $asphalt_proposal_manager_unique_id ); ?>"
                    style="display: none;"
                    <?php echo $asphalt_proposal_manager_is_prefilled ? 'disabled' : ''; ?>
                />
                
                <?php if ( ! $asphalt_proposal_manager_is_prefilled || empty( $asphalt_proposal_manager_final_value ) ): ?>
                    <label
                        for="signature-file-input-<?php echo esc_attr( $asphalt_proposal_manager_unique_id ); ?>"
                        class="signature-upload-label signature-content"
                    >
                        <?php echo wp_kses_post( $asphalt_proposal_manager_placeholder ); ?>
                    </label>
                <?php endif; ?>

                <label
                    for="signature-file-input-<?php echo esc_attr( $asphalt_proposal_manager_unique_id ); ?>"
                    class="signature-preview-wrapper"
                    style="<?php echo ( ! empty( $asphalt_proposal_manager_final_value ) ) ? 'display: block;' : 'display: none;' ?>"
                >
                    <img
                        class="signature-upload-preview"
                        alt="Signature Preview"
                        src="<?php echo esc_url( $asphalt_proposal_manager_final_value ); ?>"
                        style="<?php echo ( empty( $asphalt_proposal_manager_final_value ) ) ? 'display: none;' : '' ?>"
                    />
                </label>
            </div>
        <?php endif; ?>
    </div>
    <div class="signature-error-message">
        Please sign the proposal.
    </div>
<?php
asphalt_proposal_manager_block_end();
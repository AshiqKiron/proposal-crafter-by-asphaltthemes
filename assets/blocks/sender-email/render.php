<?php 
defined( 'ABSPATH' ) || exit;
asphalt_proposal_manager_block_start( $attributes );
?>
    <p class="pc-sender-email">
        <?php echo esc_html( $attributes['content'] ?? '' ); ?>
    </p>
<?php 
asphalt_proposal_manager_block_end();

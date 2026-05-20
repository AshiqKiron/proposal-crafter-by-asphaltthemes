<?php 
defined( 'ABSPATH' ) || exit;
$tag       = $attributes['htmlTag'] ?? 'h2';

asphalt_proposal_manager_block_start( $attributes );
?>
    <<?php echo esc_html( $tag ); ?> class="pc-proposal-title">
        <?php echo esc_html( $attributes['content'] ?? '' ); ?>
    </<?php echo esc_html( $tag ); ?>>
<?php 
asphalt_proposal_manager_block_end();
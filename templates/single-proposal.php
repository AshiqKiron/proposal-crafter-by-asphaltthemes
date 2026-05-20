<?php

/**
 * File doc comment.
 */

defined( 'ABSPATH' ) || exit;

use ProposalCrafter\App\Repositories\SettingsRepository;

$asphalt_proposal_manager_settings_repo = asphalt_proposal_manager_singleton( SettingsRepository::class );
$asphalt_proposal_manager_template_info = $asphalt_proposal_manager_settings_repo->get_template_info();

$asphalt_proposal_manager_hide_header = $asphalt_proposal_manager_template_info['hide_header'] ?? false;
$asphalt_proposal_manager_hide_footer = $asphalt_proposal_manager_template_info['hide_footer'] ?? false;

$asphalt_proposal_manager_page_title = get_post_meta( get_the_ID(), 'pc_title', true ) ?: get_the_title();

if ( ! $asphalt_proposal_manager_hide_header ) {
	get_header();
} else {
	?>
	<!doctype html>
	<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
	<?php
}
?>

<div class="asphalt-proposal-manager-wrapper">
	<div class="asphalt-proposal-manager-body">
		<?php
		if ( file_exists( asphalt_proposal_manager_dir( 'templates/parts/status-badge.php' ) ) ) {
			include asphalt_proposal_manager_dir( 'templates/parts/status-badge.php' );
		}
		?>
		<?php
		while ( have_posts() ) {
			the_post();
			the_content();
		}
		?>
	</div>
	<div class="asphalt-proposal-manager-footer">
			<div>
				<p class="asphalt-proposal-manager-label">Proposal About</p>
				<h3 class="asphalt-proposal-manager-title"><?php echo esc_html( $asphalt_proposal_manager_page_title ); ?></h3>
			</div>
			<div>
				<?php
				$asphalt_proposal_manager_status      = get_post_status();
				$asphalt_proposal_manager_is_finished = in_array( $asphalt_proposal_manager_status, [ 'approved', 'declined' ], true );
				?>
				<button class="decline-proposal-btn" <?php disabled( $asphalt_proposal_manager_is_finished ); ?>>Decline Proposal</button>
				<button class="accept-proposal-btn" <?php disabled( $asphalt_proposal_manager_is_finished ); ?>>Accept Proposal</button>
			</div>
	</div>
</div>

<?php
if ( file_exists( asphalt_proposal_manager_dir( 'templates/parts/confirm-modal.php' ) ) ) {
	include asphalt_proposal_manager_dir( 'templates/parts/confirm-modal.php' );
}
?>

<?php
if ( ! $asphalt_proposal_manager_hide_footer ) {
	get_footer();
} else {
	wp_footer();
	?>
	</body>
	</html>
	<?php
}
?>

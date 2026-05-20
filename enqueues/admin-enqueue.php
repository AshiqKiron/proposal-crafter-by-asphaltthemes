<?php

/**
 * File doc comment.
 */
use ProposalCrafter\WpMVC\Enqueue\Enqueue;
defined( 'ABSPATH' ) || exit;

wp_enqueue_media();
Enqueue::script( 'asphalt-proposal-manager-dashboard', 'build/js/dashboard' );
Enqueue::style( 'asphalt-proposal-manager-dashboard', 'build/css/dashboard', [ 'wp-components' ] );

wp_localize_script(
	'asphalt-proposal-manager-dashboard',
	'asphaltProposalManager',
	[
		'assetsUrl' => asphalt_proposal_manager_url( 'assets' ),
	]
);

global $post;
if ( $post && 'pc-proposal' === $post->post_type ) {

	Enqueue::script( 'asphalt-proposal-manager-gutenberg', 'build/js/gutenberg' );
	Enqueue::style( 'asphalt-proposal-manager-gutenberg', 'build/css/gutenberg' );
}

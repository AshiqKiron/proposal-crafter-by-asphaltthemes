<?php

/**
 * File doc comment.
 */
use ProposalCrafter\WpMVC\Enqueue\Enqueue;
defined( 'ABSPATH' ) || exit;

global $post;
if ( $post && 'pc-proposal' === $post->post_type ) {
	wp_enqueue_media();

	Enqueue::script( 'asphalt-proposal-manager-frontend', 'build/js/frontend' );
	Enqueue::style( 'asphalt-proposal-manager-frontend', 'build/css/frontend' );

	wp_localize_script(
		'asphalt-proposal-manager-frontend',
		'asphaltProposalManagerFrontend',
		[
			'restApi'   => get_rest_url( null, 'asphalt-proposal-manager/public' ),
			'restNonce' => wp_create_nonce( 'wp_rest' ),
			'postId'    => $post->ID,
		]
	);
}

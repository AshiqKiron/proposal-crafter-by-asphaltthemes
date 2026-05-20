<?php

namespace ProposalCrafter\App\Providers;

defined( 'ABSPATH' ) || exit;

use ProposalCrafter\WpMVC\Contracts\Provider;

class PostTypeServiceProvider implements Provider {
	public function boot() {
		add_action( 'init', [ $this, 'register_post_type' ] );
		add_action( 'init', [ $this, 'register_post_statuses' ] );
		add_action( 'init', [ $this, 'register_meta_fields' ] );
		add_filter( 'single_template', [ $this, 'add_template' ] );
		// add_filter( 'allowed_block_types_all', [$this, 'filter_block_type'], 10, 2 );
	}

	public function register_post_statuses() : void {
		register_post_status(
			'declined',
			[
				'label'                     => _x( 'Declined', 'post', 'asphalt-proposal-manager' ),
				'public'                    => true,
				'exclude_from_search'       => false,
				'show_in_admin_all_list'    => true,
				'show_in_admin_status_list' => true,
				'show_in_rest'              => true,
				/* translators: %s: number of declined posts */
				'label_count'               => _n_noop( 'Declined <span class="count">(%s)</span>', 'Declined <span class="count">(%s)</span>', 'asphalt-proposal-manager' ),
			]
		);

		register_post_status(
			'approved',
			[
				'label'                     => _x( 'Approved', 'post', 'asphalt-proposal-manager' ),
				'public'                    => true,
				'exclude_from_search'       => false,
				'show_in_admin_all_list'    => true,
				'show_in_admin_status_list' => true,
				'show_in_rest'              => true,
				/* translators: %s: number of approved posts */
				'label_count'               => _n_noop( 'Approved <span class="count">(%s)</span>', 'Approved <span class="count">(%s)</span>', 'asphalt-proposal-manager' ),
			]
		);
	}

	public function register_post_type() : void {
		$labels = [
			'name'                  => _x( 'Proposals', 'Post type general name', 'asphalt-proposal-manager' ),
			'singular_name'         => _x( 'Proposal', 'Post type singular name', 'asphalt-proposal-manager' ),
			'menu_name'             => _x( 'Proposals', 'Admin Menu text', 'asphalt-proposal-manager' ),
			'name_admin_bar'        => _x( 'Proposal', 'Add New on Toolbar', 'asphalt-proposal-manager' ),
			'add_new'               => __( 'Add New', 'asphalt-proposal-manager' ),
			'add_new_item'          => __( 'Add New Proposal', 'asphalt-proposal-manager' ),
			'new_item'              => __( 'New Proposal', 'asphalt-proposal-manager' ),
			'edit_item'             => __( 'Edit Proposal', 'asphalt-proposal-manager' ),
			'view_item'             => __( 'View Proposal', 'asphalt-proposal-manager' ),
			'all_items'             => __( 'All Proposals', 'asphalt-proposal-manager' ),
			'search_items'          => __( 'Search Proposals', 'asphalt-proposal-manager' ),
			'parent_item_colon'     => __( 'Parent Proposals:', 'asphalt-proposal-manager' ),
			'not_found'             => __( 'No Proposals found.', 'asphalt-proposal-manager' ),
			'not_found_in_trash'    => __( 'No Proposals found in Trash.', 'asphalt-proposal-manager' ),
			'featured_image'        => _x( 'Proposal Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'asphalt-proposal-manager' ),
			'set_featured_image'    => _x( 'Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'asphalt-proposal-manager' ),
			'remove_featured_image' => _x( 'Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'asphalt-proposal-manager' ),
			'use_featured_image'    => _x( 'Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'asphalt-proposal-manager' ),
			'archives'              => _x( 'Proposal archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'asphalt-proposal-manager' ),
			'insert_into_item'      => _x( 'Insert into Proposal', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'asphalt-proposal-manager' ),
			'uploaded_to_this_item' => _x( 'Uploaded to this Proposal', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'asphalt-proposal-manager' ),
			'filter_items_list'     => _x( 'Filter Proposals list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'asphalt-proposal-manager' ),
			'items_list_navigation' => _x( 'Proposals list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'asphalt-proposal-manager' ),
			'items_list'            => _x( 'Proposals list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'asphalt-proposal-manager' ),
		];

		$args = [
			'labels'             => $labels,
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => false,
			'query_var'          => true,
			'rewrite'            => [ 'slug' => 'proposals' ],
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => null,
			'supports'           => [ 'editor' ],
			'show_in_rest'       => true,
			'show_in_admin_bar'  => false,
		];

		register_post_type( asphalt_proposal_manager_proposal_post_type(), $args );
	}

	public function register_meta_fields() : void {
		$post_type = asphalt_proposal_manager_proposal_post_type();

		// Register meta fields for pc-proposal post type
		$meta_fields = [
			'pc_title'                  => [
				'type'        => 'string',
				'description' => 'Proposal title',
				'single'      => true,
				'default'     => '',
			],
			'pc_sender_email'           => [
				'type'        => 'string',
				'description' => 'Sender email address',
				'single'      => true,
				'default'     => '',
			],
			'pc_sender_name'            => [
				'type'        => 'string',
				'description' => 'Sender name',
				'single'      => true,
				'default'     => '',
			],
			'pc_sender_company'         => [
				'type'        => 'string',
				'description' => 'Sender company name',
				'single'      => true,
				'default'     => '',
			],
			'pc_client_email'           => [
				'type'        => 'string',
				'description' => 'Client email address',
				'single'      => true,
				'default'     => '',
			],
			'pc_client_name'            => [
				'type'        => 'string',
				'description' => 'Client name',
				'single'      => true,
				'default'     => '',
			],
			'pc_client_company'         => [
				'type'        => 'string',
				'description' => 'Client company name',
				'single'      => true,
				'default'     => '',
			],
			'pc_client_signature_type'  => [
				'type'        => 'string',
				'description' => 'Client signature type',
				'single'      => true,
				'default'     => '',
			],
			'pc_client_signature_value' => [
				'type'        => 'string',
				'description' => 'Client signature value',
				'single'      => true,
				'default'     => '',
			],
		];

		foreach ( $meta_fields as $meta_key => $meta_args ) {
			register_post_meta(
				$post_type,
				$meta_key,
				array_merge(
					$meta_args,
					[
						'show_in_rest'  => true,
						'auth_callback' => function() {
							return '__return_true';
						},
					]
				)
			);
		}
	}

	public function add_template( $template ) {
		if ( is_singular( 'pc-proposal' ) ) {
			$plugin_template = asphalt_proposal_manager_dir( 'templates/single-proposal.php' );
			if ( file_exists( $plugin_template ) ) {
				return $plugin_template;
			}
		}
		return $template;
	}

	public function filter_block_type( $allowed_blocks, $editor_context ) {
		if ( ! empty( $editor_context->post ) && $editor_context->post->post_type === 'pc-proposal' ) {
			$plugin_blocks = asphalt_proposal_manager_block_list();
			return array_merge(
				$plugin_blocks,
				[
					'core/paragraph',
				]
			);
		}

		return $allowed_blocks;
	}
}

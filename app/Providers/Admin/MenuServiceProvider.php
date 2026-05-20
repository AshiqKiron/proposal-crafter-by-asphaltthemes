<?php

namespace ProposalCrafter\App\Providers\Admin;

defined( 'ABSPATH' ) || exit;

use ProposalCrafter\WpMVC\Contracts\Provider;

class MenuServiceProvider implements Provider {
	public function boot() {
		add_action( 'admin_menu', [ $this, 'action_admin_menu' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_assets' ] );
	}

	/**
	 * Enqueue admin assets.
	 */
	public function enqueue_admin_assets() : void {
		$custom_css = '
			.wp-submenu-wrap a[href="https://asphaltthemes.com"] {
				color: #f06060 !important;
				font-weight: bold;
			}
		';
		wp_register_style( 'asphalt-proposal-manager-menu-style', false );
		wp_enqueue_style( 'asphalt-proposal-manager-menu-style' );
		wp_add_inline_style( 'asphalt-proposal-manager-menu-style', $custom_css );

		$custom_js = "
			jQuery(($) => {
				const \$scope = $('#toplevel_page_asphalt-proposal-manager-menu');
				const \$submenuWrap = \$scope.find('.wp-submenu-wrap');
				const \$overviewMenu = \$scope.find('.wp-first-item');
				const \$overviewMenuLink = \$overviewMenu.find('a');

				const currentUrl = \$overviewMenuLink.attr('href');
				\$overviewMenuLink.attr('href', currentUrl + '#overview');

				// Handle submenu clicks
				\$submenuWrap.on('click', 'li', function(e) {
					$(this).addClass('current').siblings().removeClass('current');
				});

				// Set active submenu based on URL hash
				const hash = window.location.hash;
				if (hash) {
					const \$activeSubmenu = \$submenuWrap.find(`a[href$=\"\${hash}\"]`).parent();
					if (\$activeSubmenu.length) {
						\$activeSubmenu.addClass('current').siblings().removeClass('current');
					}
				} else {
					\$overviewMenu.addClass('current').siblings().removeClass('current');
				}
			})
		";
		wp_add_inline_script( 'jquery', $custom_js );
	}

	public function action_admin_menu() {
		$page_url = admin_url( 'admin.php?page=asphalt-proposal-manager' );
		$icon_dir = asphalt_proposal_manager_dir( 'assets/svg/plugin-small-icon.svg' );

		$icon = file_get_contents( $icon_dir );
		$icon = 'data:image/svg+xml;base64,' . base64_encode( $icon );

		add_menu_page(
			esc_html__( 'Proposal Crafter', 'asphalt-proposal-manager' ),
			esc_html__( 'Proposal Crafter', 'asphalt-proposal-manager' ),
			'manage_options',
			'asphalt-proposal-manager-menu',
			null,
			$icon,
			81
		);

		add_submenu_page(
			'asphalt-proposal-manager-menu',
			esc_html__( 'Overview', 'asphalt-proposal-manager' ),
			esc_html__( 'Overview', 'asphalt-proposal-manager' ),
			'manage_options',
			'asphalt-proposal-manager',
			[ $this, 'content' ]
		);

		add_submenu_page(
			'asphalt-proposal-manager-menu',
			esc_html__( 'Proposals', 'asphalt-proposal-manager' ),
			esc_html__( 'Proposals', 'asphalt-proposal-manager' ),
			'manage_options',
			$page_url . '#/proposals'
		);

		add_submenu_page(
			'asphalt-proposal-manager-menu',
			esc_html__( 'Templates', 'asphalt-proposal-manager' ),
			esc_html__( 'Templates', 'asphalt-proposal-manager' ),
			'manage_options',
			$page_url . '#/templates'
		);

		add_submenu_page(
			'asphalt-proposal-manager-menu',
			esc_html__( 'Settings', 'asphalt-proposal-manager' ),
			esc_html__( 'Settings', 'asphalt-proposal-manager' ),
			'manage_options',
			$page_url . '#/settings'
		);

		remove_submenu_page( 'asphalt-proposal-manager-menu', 'asphalt-proposal-manager-menu' );
	}

	public function content() {
		echo '<div id="asphalt-proposal-manager-dashboard-root"></div>';
	}
}

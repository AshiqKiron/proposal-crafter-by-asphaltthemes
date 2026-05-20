<?php

/**
 * File doc comment.
 */

defined( 'ABSPATH' ) || exit;

use ProposalCrafter\WpMVC\App;
use ProposalCrafter\Database\Setup;

/**
 * Plugin Name:       Proposal Crafter by Asphalt Themes
 * Description:       Create professional WordPress proposals easily. Send, track, and sign proposals with a simple, powerful plugin.
 * Version:           0.0.2
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Tested up to:      6.9
 * Author:            Asphalt Themes
 * Author URI:        https://asphaltthemes.com/
 * License:           GPL v3 or later
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       asphalt-proposal-manager
 * Domain Path:       /languages
 */

require_once __DIR__ . '/vendor/vendor-src/autoload.php';
require_once __DIR__ . '/app/Helpers/helper.php';

/**
 * Doc comment.
 */
final class ProposalCrafter {
	/**
	 * Doc comment.
	 */
	public static ProposalCrafter $instance;

	/**
	 * Doc comment.
	 */
	public static function instance(): ProposalCrafter {
		if ( empty( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Doc comment.
	 */
	public function load() {
		// Run Activation Tasks.
		register_activation_hook(
			__FILE__,
			function() {
				( new Setup() )->execute();
				(new \ProposalCrafter\App\Providers\PostTypeServiceProvider())->register_post_type();
				flush_rewrite_rules();
			}
		);

		$application = App::instance();

		$application->boot( __FILE__, __DIR__ );

		/**
		 * Fires once activated plugins have loaded.
		 */
		add_action(
			'plugins_loaded',
			function () use ( $application ): void {

				do_action( 'asphalt_proposal_manager_before_load' );

				$application->load();

				do_action( 'asphalt_proposal_manager_after_load' );
			}
		);
	}
}

ProposalCrafter::instance()->load();

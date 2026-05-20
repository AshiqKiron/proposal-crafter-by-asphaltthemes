<?php

/**
 * File doc comment.
 */
defined( 'ABSPATH' ) || exit;
?>

<div id="proposal-confirm-modal" class="asphalt-proposal-manager-modal" style="display: none;">
	<div class="asphalt-proposal-manager-modal-overlay"></div>
	<div class="asphalt-proposal-manager-modal-content">
		<div class="asphalt-proposal-manager-modal-header">
			<h3 class="asphalt-proposal-manager-modal-title"><?php esc_html_e( 'Are you sure?', 'asphalt-proposal-manager' ); ?></h3>
			<button class="asphalt-proposal-manager-modal-close">&times;</button>
		</div>
		<div class="asphalt-proposal-manager-modal-body">
			<p><?php esc_html_e( 'Are you sure you want to decline this proposal? This action cannot be undone.', 'asphalt-proposal-manager' ); ?></p>
		</div>
		<div class="asphalt-proposal-manager-modal-footer">
			<button class="asphalt-proposal-manager-btn asphalt-proposal-manager-btn-secondary asphalt-proposal-manager-modal-cancel"><?php esc_html_e( 'Cancel', 'asphalt-proposal-manager' ); ?></button>
			<button class="asphalt-proposal-manager-btn asphalt-proposal-manager-btn-danger asphalt-proposal-manager-modal-confirm"><?php esc_html_e( 'Decline Proposal', 'asphalt-proposal-manager' ); ?></button>
		</div>
	</div>
</div>

<?php

/**
 * File doc comment.
 */

defined( 'ABSPATH' ) || exit;
$asphalt_proposal_manager_blocks_dir = asphalt_proposal_manager_dir( 'assets/blocks' );

return apply_filters(
	'asphalt_proposal_manager_blocks',
	[
		'asphalt-proposal-manager/container'      => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/proposal-title' => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/sender-name'    => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/sender-email'   => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/sender-company' => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/client-name'    => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/client-email'   => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/client-company' => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/heading'        => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/paragraph'      => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/list'           => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/signature'      => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/image'          => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/table'          => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
		'asphalt-proposal-manager/pricing'        => [
			'dir' => $asphalt_proposal_manager_blocks_dir,
		],
	]
);

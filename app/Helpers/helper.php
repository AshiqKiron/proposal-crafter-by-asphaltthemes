<?php

/**
 * File doc comment.
 */

defined( 'ABSPATH' ) || exit;

use ProposalCrafter\WpMVC\App;
use ProposalCrafter\WpMVC\Container\Container;

/**
 * Doc comment.
 */
function asphalt_proposal_manager():App {
	return App::$instance;
}

/**
 * Doc comment.
 */
function asphalt_proposal_manager_proposal_post_type() {
	return asphalt_proposal_manager_app_config( 'proposal_post_type' );
}

/**
 * Doc comment.
 */
function asphalt_proposal_manager_block_list() {
	$list = asphalt_proposal_manager_config( 'blocks' );
	return array_keys( $list );
}

/**
 * Doc comment.
 */
function asphalt_proposal_manager_config( string $config_key ) {
	return asphalt_proposal_manager()::$config->get( $config_key );
}

/**
 * Doc comment.
 */
function asphalt_proposal_manager_app_config( string $config_key ) {
	return asphalt_proposal_manager_config( "app.{$config_key}" );
}

/**
 * Doc comment.
 */
function asphalt_proposal_manager_version() {
	return asphalt_proposal_manager_app_config( 'version' );
}

/**
 * Doc comment.
 */
function asphalt_proposal_manager_container():Container {
	return asphalt_proposal_manager()::$container;
}

/**
 * Doc comment.
 */
function asphalt_proposal_manager_singleton( string $class ) {
	return asphalt_proposal_manager_container()->get( $class );
}

/**
 * Doc comment.
 */
function asphalt_proposal_manager_url( string $url = '' ) {
	return asphalt_proposal_manager()->get_url( $url );
}

/**
 * Doc comment.
 */
function asphalt_proposal_manager_dir( string $dir = '' ) {
	return asphalt_proposal_manager()->get_dir( $dir );
}

/**
 * Doc comment.
 */
function asphalt_proposal_manager_block_start( $attributes ) {
	$unique_id   = $attributes['uniqueId'] ?? '';
	$block_attrs = get_block_wrapper_attributes(
		[
			'class' => 'pc' . $unique_id,
		]
	);

	// Prevent duplicate classes.
	$block_attrs = preg_replace_callback(
		'/class="([^"]*)"/',
		function ( $matches ) {
			$classes        = explode( ' ', $matches[1] );
			$unique_classes = array_unique( $classes );
			return 'class="' . implode( ' ', $unique_classes ) . '"';
		},
		$block_attrs
	);

	$overlay_class = 'pc' . $unique_id . '__overlay';
	?>
	<div <?php echo $block_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
		<div class="<?php echo esc_attr( $overlay_class ); ?>">
	<?php
}

/**
 * Doc comment.
 */
function asphalt_proposal_manager_block_end() {
	?>
		</div>
		</div>
	<?php
}

/**
 * Doc comment.
 */
function asphalt_proposal_manager_decode_unicode( $str ) {
	if ( ! is_string( $str ) ) {
		return $str;
	}

	// Decode Unicode entities that cause Gutenberg recovery issues.
	$str = str_replace( [ '\\u003c', 'u003c' ], '<', $str );
	$str = str_replace( [ '\\u003e', 'u003e' ], '>', $str );
	$str = str_replace( [ '\\u0026', 'u0026' ], '&', $str );

	return $str;
}

/**
 * Doc comment.
 */
function asphalt_proposal_manager_calculate_price( $post_content ) {
	// extract blocks from post content.
	$blocks = parse_blocks( $post_content );

	// Recursive function to find specific blocks.
	$find_blocks = function ( $blocks, $block_name ) use ( &$find_blocks ) {
		$found = [];
		foreach ( $blocks as $block ) {
			if ( $block['blockName'] === $block_name ) {
				$found[] = $block;
			}
			if ( ! empty( $block['innerBlocks'] ) ) {
				$found = array_merge( $found, $find_blocks( $block['innerBlocks'], $block_name ) );
			}
		}
		return $found;
	};

	$pricing_blocks = $find_blocks( $blocks, 'asphalt-proposal-manager/pricing' );

	$grand_total = 0;

	foreach ( $pricing_blocks as $block ) {
		if ( empty( $block['attrs'] ) ) {
			continue;
		}

		$attrs       = $block['attrs'];
		$items       = $attrs['items'] ?? [];
		$adjustments = $attrs['adjustments'] ?? [];

		$subtotal = 0;

		foreach ( $items as $item ) {
			if ( ! empty( $item['isChecked'] ) && $item['isChecked'] ) {
				$price     = is_numeric( $item['price'] ) ? (float) $item['price'] : 0;
				$quantity  = is_numeric( $item['quantity'] ) ? (float) $item['quantity'] : 1;
				$subtotal += $price * $quantity;
			}
		}

		$total = $subtotal;

		foreach ( $adjustments as $adjustment ) {
			$value  = is_numeric( $adjustment['value'] ) ? (float) $adjustment['value'] : 0;
			$amount = 0;

			if ( isset( $adjustment['amountType'] ) && $adjustment['amountType'] === 'percentage' ) {
				$amount = $subtotal * ( $value / 100 );
			} else {
				$amount = $value;
			}

			$operation = $adjustment['operation'] ?? $adjustment['type'] ?? 'addition';

			if ( 'deduction' === $operation ) {
				$total -= $amount;
			} else {
				$total += $amount;
			}
		}

		$grand_total += $total;
	}

	// round off to 2 decimal places.
	$grand_total = round( $grand_total, 2 );
	// return formated number.
	return number_format( $grand_total, 2, '.', ',' );
}

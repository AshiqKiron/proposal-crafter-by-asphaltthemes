/**
 * External dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import { BlockDiv } from '@gutenberg/block-components';

export default function save( props ) {
	const { attributes } = props;

	return (
		<BlockDiv.Content attributes={ attributes }>
			<InnerBlocks.Content />
		</BlockDiv.Content>
	);
}

import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { memo, useCallback } from '@wordpress/element';
/**
 * Internal dependencies
 */
import blockStyles from './style';
import { useBlockCssGenerator } from '@gutenberg/hooks';
import {
	withBlockAttributeContext,
	withBlockStyleContext,
} from '@gutenberg/higher-order';
import { BlockDiv } from '@gutenberg/block-components';
import {
	CommonInspectorControls,
	InspectorControlsProvider,
} from '@gutenberg/block-controls';
import Controls from './controls';

export const Appender = memo( ( props ) => {
	return ! props.hasInnerBlocks ? (
		<InnerBlocks.ButtonBlockAppender />
	) : (
		<InnerBlocks.DefaultBlockAppender />
	);
} );

const edit = ( props ) => {
	const { attributes, hasInnerBlocks } = props;
	const blockCss = useBlockCssGenerator();

	const renderAppender = useCallback(
		() => <Appender hasInnerBlocks={ hasInnerBlocks } />,
		[ hasInnerBlocks ]
	);

	return (
		<>
			{ blockCss && <style key="block-css">{ blockCss }</style> }
			<InspectorControlsProvider>
				<CommonInspectorControls />
				<Controls />
			</InspectorControlsProvider>
			<BlockDiv attributes={ attributes }>
				<InnerBlocks
					templateLock={ false }
					renderAppender={ renderAppender }
				/>
			</BlockDiv>
		</>
	);
};

const applyWithSelect = withSelect( ( select, ownProps ) => {
	const { clientId } = ownProps;
	const { getBlockOrder } = select( 'core/block-editor' );

	return {
		hasInnerBlocks: getBlockOrder( clientId ).length > 0,
	};
} );

export default compose(
	applyWithSelect,
	withBlockAttributeContext,
	withBlockStyleContext( blockStyles )
)( edit );

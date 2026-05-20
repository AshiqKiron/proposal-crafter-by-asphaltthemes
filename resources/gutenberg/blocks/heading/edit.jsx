import { compose } from '@wordpress/compose';
import classnames from 'classnames/dedupe';
import { RichText } from '@wordpress/block-editor';
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

const edit = ( props ) => {
	const { attributes, setAttributes } = props;
	const blockCss = useBlockCssGenerator();

	return (
		<>
			{ blockCss && <style key="block-css">{ blockCss }</style> }
			<InspectorControlsProvider>
				<CommonInspectorControls />
				<Controls />
			</InspectorControlsProvider>
			<BlockDiv attributes={ attributes }>
				<RichText
					tagName={ attributes.htmlTag || 'h2' }
					className={ classnames( 'pc-heading' ) }
					value={ attributes.content || '' }
					onChange={ ( val ) => setAttributes( { content: val } ) }
					placeholder="Write your heading..."
					keepPlaceholderOnFocus={ true }
				/>
			</BlockDiv>
		</>
	);
};

export default compose(
	withBlockAttributeContext,
	withBlockStyleContext( blockStyles )
)( edit );

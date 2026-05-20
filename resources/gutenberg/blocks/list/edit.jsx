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
	const Tag = attributes.htmlTag || 'ul';

	return (
		<>
			{ blockCss && <style key="block-css">{ blockCss }</style> }
			<InspectorControlsProvider>
				<CommonInspectorControls />
				<Controls />
			</InspectorControlsProvider>
			<BlockDiv attributes={ attributes }>
				<RichText
					tagName={ Tag }
					multiline="li"
					value={
						attributes.content.length > 0
							? attributes.content
									.map( ( item ) => `<li>${ item.li }</li>` )
									.join( '' )
							: '<li></li>'
					}
					onChange={ ( value ) => {
						// Parse the HTML to extract individual list items
						const parser = new DOMParser();
						const doc = parser.parseFromString(
							`<div>${ value }</div>`,
							'text/html'
						);
						const listItems = Array.from(
							doc.querySelectorAll( 'li' )
						);

						const contentArray = listItems.map( ( li ) => ( {
							li: li.innerHTML,
						} ) );

						setAttributes( { content: contentArray } );
					} }
					placeholder="Add list items..."
				/>
			</BlockDiv>
		</>
	);
};

export default compose(
	withBlockAttributeContext,
	withBlockStyleContext( blockStyles )
)( edit );

import { GutenStyleGenerator } from '@gutenberg/block-editor/guten-css';
import { commonStyles } from '@gutenberg/block-controls';

const blockStyles = new GutenStyleGenerator();
commonStyles( blockStyles );

blockStyles.addBlockStyles( 'custom-style', [
	{
		selector:
			'.%s__overlay > .block-editor-inner-blocks > .block-editor-block-list__layout',
		styleRule: 'display',
		attrName: 'display',
		responsive: 'all',
		renderIn: 'edit',
		format: '%s',
		hasUnits: false,
	},
	{
		selector:
			'.%s__overlay > .block-editor-inner-blocks > .block-editor-block-list__layout',
		styleRule: 'flex-direction',
		attrName: 'flexDirection',
		responsive: 'all',
		renderIn: 'edit',
		format: '%s',
		hasUnits: false,
	},
	{
		selector:
			'.%s__overlay > .block-editor-inner-blocks > .block-editor-block-list__layout',
		styleRule: 'align-items',
		attrName: 'alignItems',
		responsive: 'all',
		renderIn: 'edit',
		format: '%s',
		hasUnits: false,
	},
	{
		selector:
			'.%s__overlay > .block-editor-inner-blocks > .block-editor-block-list__layout',
		styleRule: 'justify-content',
		attrName: 'justifyContent',
		responsive: 'all',
		renderIn: 'edit',
		format: '%s',
		hasUnits: false,
	},
	{
		selector: '.%s__overlay',
		styleRule: 'display',
		attrName: 'display',
		responsive: 'all',
		renderIn: 'save',
		format: '%s',
		hasUnits: false,
	},
	{
		selector: '.%s__overlay',
		styleRule: 'flex-direction',
		attrName: 'flexDirection',
		responsive: 'all',
		renderIn: 'save',
		format: '%s',
		hasUnits: false,
	},
	{
		selector: '.%s__overlay',
		styleRule: 'align-items',
		attrName: 'alignItems',
		responsive: 'all',
		renderIn: 'save',
		format: '%s',
		hasUnits: false,
	},
	{
		selector: '.%s__overlay',
		styleRule: 'justify-content',
		attrName: 'justifyContent',
		responsive: 'all',
		renderIn: 'save',
		format: '%s',
		hasUnits: false,
	},
	{
		selector: '.%s',
		styleRule: 'max-width',
		attrName: 'maxWidth',
		responsive: 'all',
		format: '%s',
		hasUnits: false,
		valuePreCallback( value ) {
			if ( ! value ) return '';

			if ( 'custom' === value.type ) {
				return value.value + 'px';
			}
			return value.value;
		},
	},
] );

export default blockStyles;

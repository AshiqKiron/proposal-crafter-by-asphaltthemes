import { GutenStyleGenerator } from '@gutenberg/block-editor/guten-css';
import { commonStyles } from '@gutenberg/block-controls';
import { loadGoogleFont } from '@gutenberg/utils/font';

const blockStyles = new GutenStyleGenerator();
commonStyles( blockStyles );

blockStyles.addBlockStyles( 'layout', [
	{
		selector: '.%s li',
		styleRule: 'text-align',
		attrName: 'alignment',
		responsive: 'all',
		format: '%s',
		hasUnits: false,
		valuePreCallback( value ) {
			return value;
		},
	},
	{
		selector: '.%s li',
		styleRule: 'color',
		attrName: 'color',
		responsive: 'all',
		format: '%s',
		hasUnits: false,
	},
	{
		selector: '.%s li',
		styleRule: 'font-size',
		attrName: 'fontSize',
		responsive: 'all',
		format: '%spx',
		hasUnits: true,
	},
	{
		selector: '.%s li',
		styleRule: 'font-family',
		attrName: 'fontFamily',
		responsive: 'all',
		format: '%s',
		hasUnits: false,
		valuePreCallback( value ) {
			loadGoogleFont( value );
			return value;
		},
	},
	{
		selector: '.%s li',
		styleRule: 'font-weight',
		attrName: 'fontWeight',
		responsive: 'all',
		format: '%s',
		hasUnits: false,
	},
] );

export default blockStyles;

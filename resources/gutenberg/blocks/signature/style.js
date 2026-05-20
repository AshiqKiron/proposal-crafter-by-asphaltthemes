import { GutenStyleGenerator } from '@gutenberg/block-editor/guten-css';
import { commonStyles } from '@gutenberg/block-controls';
import { loadGoogleFont } from '@gutenberg/utils/font';

const blockStyles = new GutenStyleGenerator();
commonStyles( blockStyles );

blockStyles.addBlockStyles( 'layout', [
	{
		selector: '.%s .signature-content',
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
		selector: '.%s',
		styleRule: 'color',
		attrName: 'color',
		responsive: 'all',
		format: '%s',
		hasUnits: false,
	},
	{
		selector: '.%s',
		styleRule: 'font-size',
		attrName: 'fontSize',
		responsive: 'all',
		format: '%spx',
		hasUnits: true,
	},
	{
		selector: '.%s',
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
		selector: '.%s',
		styleRule: 'font-weight',
		attrName: 'fontWeight',
		responsive: 'all',
		format: '%s',
		hasUnits: false,
	},
	{
		selector: '.%s',
		styleRule: 'width',
		attrName: 'width',
		responsive: 'all',
		format: '%spx',
		hasUnits: true,
	},
] );

export default blockStyles;

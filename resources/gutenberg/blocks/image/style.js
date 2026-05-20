import { GutenStyleGenerator } from '@gutenberg/block-editor/guten-css';
import { commonStyles } from '@gutenberg/block-controls';

const blockStyles = new GutenStyleGenerator();
commonStyles(blockStyles);

blockStyles.addBlockStyles('positionX', {
    selector: '.%s .pc-image',
    styleRule: 'left',
    attrName: 'positionX',
    responsive: 'all',
    format: '%spx',
    editorMode: false,
    hasUnits: true,
});

blockStyles.addBlockStyles('positionY', {
    selector: '.%s .pc-image',
    styleRule: 'top',
    attrName: 'positionY',
    responsive: 'all',
    format: '%spx',
    editorMode: false,
    hasUnits: true,
});

blockStyles.addBlockStyles('positionX', {
    selector: '.%s',
    styleRule: 'left',
    attrName: 'positionX',
    responsive: 'all',
    format: '%spx',
    editorMode: true,
    hasUnits: true,
});

blockStyles.addBlockStyles('positionY', {
    selector: '.%s',
    styleRule: 'top',
    attrName: 'positionY',
    responsive: 'all',
    format: '%spx',
    editorMode: true,
    hasUnits: true,
});

blockStyles.addBlockStyles('positionType', {
    selector: '.%s .pc-image',
    styleRule: 'position',
    attrName: 'positionType',
    responsive: 'all',
    format: '%s',
    editorMode: false,
    hasUnits: false,
});

blockStyles.addBlockStyles('positionType', {
    selector: '.%s .pc-image',
    styleRule: 'position',
    attrName: 'positionType',
    responsive: 'all',
    format: '%s',
    editorMode: true,
    hasUnits: false,
});

blockStyles.addBlockStyles('width', {
    selector: '.%s .pc-image',
    styleRule: 'width',
    attrName: 'width',
    responsive: 'all',
    format: '%spx',
    hasUnits: true,
});

blockStyles.addBlockStyles('height', {
    selector: '.%s .pc-image',
    styleRule: 'height',
    attrName: 'height',
    responsive: 'all',
    format: '%spx',
    hasUnits: true,
});

export default blockStyles;

import { GutenStyleGenerator } from '@gutenberg/block-editor/guten-css';
import { commonStyles } from '@gutenberg/block-controls';
import { loadGoogleFont } from '@gutenberg/utils/font';

const blockStyles = new GutenStyleGenerator();
commonStyles(blockStyles);

blockStyles.addBlockStyles('headerBackground', {
    selector: '.%s .pc-table thead th',
    styleRule: 'background-color',
    attrName: 'headerBackground',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('fontFamily', {
    selector: '.%s .pc-table',
    styleRule: 'font-family',
    attrName: 'fontFamily',
    format: '%s',
    hasUnits: false,
    valuePreCallback(value) {
        loadGoogleFont(value);
        return value;
    },
});

blockStyles.addBlockStyles('fontSize', {
    selector: '.%s .pc-table',
    styleRule: 'font-size',
    attrName: 'fontSize',
    responsive: 'all',
    format: '%spx',
    hasUnits: true,
});

blockStyles.addBlockStyles('headerColor', [
    {
        selector: '.%s .pc-table thead th',
        styleRule: 'color',
        attrName: 'headerColor',
        responsive: 'all',
        format: '%s',
        hasUnits: false,
    },
    {
        selector: '.%s .pc-table thead th',
        styleRule: 'font-weight',
        attrName: 'headerFontWeight',
        responsive: 'all',
        format: '%s',
        hasUnits: false,
    },
    {
        selector: '.%s .pc-table thead th',
        styleRule: 'padding',
        attrName: 'headerPadding',
        responsive: 'all',
        format: '%s',
        hasUnits: false,
        valuePreCallback(values) {
            return `${values.top || 0} ${values.right || 0} ${values.bottom || 0
                } ${values.left || 0}`;
        },
    },
    {
        selector: '.%s .pc-table thead th',
        styleRule: 'text-align',
        attrName: 'headerAlignment',
        responsive: 'all',
        format: '%s',
        hasUnits: false,
    }
]);

// Add any specific table styling logic here if needed beyond commonStyles

blockStyles.addBlockStyles('bodyBackgroundOdd', {
    selector: '.%s .pc-table tbody tr:nth-child(odd) td',
    styleRule: 'background-color',
    attrName: 'bodyBackgroundOdd',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('bodyBackgroundEven', {
    selector: '.%s .pc-table tbody tr:nth-child(even) td',
    styleRule: 'background-color',
    attrName: 'bodyBackgroundEven',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('bodyColorOdd', {
    selector: '.%s .pc-table tbody tr:nth-child(odd) td',
    styleRule: 'color',
    attrName: 'bodyColorOdd',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('bodyColorEven', {
    selector: '.%s .pc-table tbody tr:nth-child(even) td',
    styleRule: 'color',
    attrName: 'bodyColorEven',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('bodyFontWeight', {
    selector: '.%s .pc-table tbody td',
    styleRule: 'font-weight',
    attrName: 'bodyFontWeight',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('bodyPadding', {
    selector: '.%s .pc-table tbody td',
    styleRule: 'padding',
    attrName: 'bodyPadding',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
    valuePreCallback(values) {
        return `${values.top || 0} ${values.right || 0} ${values.bottom || 0
            } ${values.left || 0}`;
    },
});

blockStyles.addBlockStyles('bodyAlignment', {
    selector: '.%s .pc-table tbody td',
    styleRule: 'text-align',
    attrName: 'bodyAlignment',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

export default blockStyles;

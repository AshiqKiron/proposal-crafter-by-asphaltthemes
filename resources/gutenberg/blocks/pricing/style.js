import { GutenStyleGenerator } from '@gutenberg/block-editor/guten-css';
import { commonStyles } from '@gutenberg/block-controls';

const blockStyles = new GutenStyleGenerator();
commonStyles(blockStyles);

blockStyles.addBlockStyles('headerBackground', {
    selector: '.%s table thead th',
    styleRule: 'background-color',
    attrName: 'headerBackground',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('headerColor', [
    {
        selector: '.%s table thead th',
        styleRule: 'color',
        attrName: 'headerColor',
        responsive: 'all',
        format: '%s',
        hasUnits: false,
    },
    {
        selector: '.%s table thead th',
        styleRule: 'font-weight',
        attrName: 'headerFontWeight',
        responsive: 'all',
        format: '%s',
        hasUnits: false,
    },
    {
        selector: '.%s table thead th',
        styleRule: 'padding',
        attrName: 'headerPadding',
        responsive: 'all',
        format: '%s',
        hasUnits: false,
        valuePreCallback(values) {
            values = values || {};
            return `${values.top || 0} ${values.right || 0} ${values.bottom || 0} ${values.left || 0}`;
        },
    },
    {
        selector: '.%s table thead th',
        styleRule: 'font-family',
        attrName: 'headerFontFamily',
        responsive: 'all',
        format: '%s',
        hasUnits: false,
    },
    {
        selector: '.%s table thead th',
        styleRule: 'font-size',
        attrName: 'headerFontSize',
        responsive: 'all',
        format: '%spx',
        hasUnits: false,
    }
]);

blockStyles.addBlockStyles('bodyBackground', {
    selector: '.%s table tbody',
    styleRule: 'background-color',
    attrName: 'bodyBackground',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('rowDividerColor', {
    selector: '.%s table tbody tr td',
    styleRule: 'border-bottom-color',
    attrName: 'rowDividerColor',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('bodyPadding', {
    selector: '.%s table tbody tr td',
    styleRule: 'padding',
    attrName: 'bodyPadding',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
    valuePreCallback(values) {
        values = values || {};
        return `${values.top || 0} ${values.right || 0} ${values.bottom || 0} ${values.left || 0}`;
    },
});

blockStyles.addBlockStyles('titleColor', {
    selector: '.%s table tbody tr td .pc-pricing-item-title',
    styleRule: 'color',
    attrName: 'titleColor',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('titleFontFamily', {
    selector: '.%s table tbody tr td .pc-pricing-item-title',
    styleRule: 'font-family',
    attrName: 'titleFontFamily',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('titleFontWeight', {
    selector: '.%s table tbody tr td .pc-pricing-item-title',
    styleRule: 'font-weight',
    attrName: 'titleFontWeight',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('titleFontSize', {
    selector: '.%s table tbody tr td .pc-pricing-item-title',
    styleRule: 'font-size',
    attrName: 'titleFontSize',
    responsive: 'all',
    format: '%spx',
    hasUnits: false,
});

blockStyles.addBlockStyles('titleMargin', {
    selector: '.%s table tbody tr td .pc-pricing-item-wrapper',
    styleRule: 'margin',
    attrName: 'titleMargin',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
    valuePreCallback(values) {
        values = values || {};
        return `${values.top || 0} ${values.right || 0} ${values.bottom || 0} ${values.left || 0}`;
    },
});

blockStyles.addBlockStyles('descriptionColor', {
    selector: '.%s table tbody tr td .pc-pricing-item-description',
    styleRule: 'color',
    attrName: 'descriptionColor',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('descriptionFontFamily', {
    selector: '.%s table tbody tr td .pc-pricing-item-description',
    styleRule: 'font-family',
    attrName: 'descriptionFontFamily',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('descriptionFontWeight', {
    selector: '.%s table tbody tr td .pc-pricing-item-description',
    styleRule: 'font-weight',
    attrName: 'descriptionFontWeight',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('descriptionFontSize', {
    selector: '.%s table tbody tr td .pc-pricing-item-description',
    styleRule: 'font-size',
    attrName: 'descriptionFontSize',
    responsive: 'all',
    format: '%spx',
    hasUnits: false,
});

blockStyles.addBlockStyles('pricingColor', {
    selector: '.%s table tbody tr td.pc-pricing-column',
    styleRule: 'color',
    attrName: 'pricingColor',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('pricingFontFamily', {
    selector: '.%s table tbody tr td.pc-pricing-column',
    styleRule: 'font-family',
    attrName: 'pricingFontFamily',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('pricingFontWeight', {
    selector: '.%s table tbody tr td.pc-pricing-column',
    styleRule: 'font-weight',
    attrName: 'pricingFontWeight',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});

blockStyles.addBlockStyles('pricingFontSize', {
    selector: '.%s table tbody tr td.pc-pricing-column',
    styleRule: 'font-size',
    attrName: 'pricingFontSize',
    responsive: 'all',
    format: '%spx',
    hasUnits: false,
});

/* Subtotal Styles */
blockStyles.addBlockStyles('subtotalColor', {
    selector: '.%s table tfoot tr.pc-subtotal-row td',
    styleRule: 'color',
    attrName: 'subtotalColor',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});
blockStyles.addBlockStyles('subtotalFontFamily', {
    selector: '.%s table tfoot tr.pc-subtotal-row td',
    styleRule: 'font-family',
    attrName: 'subtotalFontFamily',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});
blockStyles.addBlockStyles('subtotalFontWeight', {
    selector: '.%s table tfoot tr.pc-subtotal-row td',
    styleRule: 'font-weight',
    attrName: 'subtotalFontWeight',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});
blockStyles.addBlockStyles('subtotalFontSize', {
    selector: '.%s table tfoot tr.pc-subtotal-row td',
    styleRule: 'font-size',
    attrName: 'subtotalFontSize',
    responsive: 'all',
    format: '%spx',
    hasUnits: false,
});
blockStyles.addBlockStyles('subtotalMargin', {
    selector: '.%s table tfoot tr.pc-subtotal-row td',
    styleRule: 'padding',
    attrName: 'subtotalMargin',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
    valuePreCallback(values) {
        values = values || {};
        return `${values.top || 0} ${values.right || 0} ${values.bottom || 0} ${values.left || 0}`;
    },
});

/* Adjustments Styles */
blockStyles.addBlockStyles('adjustmentsColor', {
    selector: '.%s table tfoot tr.pc-adjustments-row td',
    styleRule: 'color',
    attrName: 'adjustmentsColor',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});
blockStyles.addBlockStyles('adjustmentsFontFamily', {
    selector: '.%s table tfoot tr.pc-adjustments-row td',
    styleRule: 'font-family',
    attrName: 'adjustmentsFontFamily',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});
blockStyles.addBlockStyles('adjustmentsFontWeight', {
    selector: '.%s table tfoot tr.pc-adjustments-row td',
    styleRule: 'font-weight',
    attrName: 'adjustmentsFontWeight',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});
blockStyles.addBlockStyles('adjustmentsFontSize', {
    selector: '.%s table tfoot tr.pc-adjustments-row td',
    styleRule: 'font-size',
    attrName: 'adjustmentsFontSize',
    responsive: 'all',
    format: '%spx',
    hasUnits: false,
});
blockStyles.addBlockStyles('adjustmentsMargin', {
    selector: '.%s table tfoot tr.pc-adjustments-row td',
    styleRule: 'padding',
    attrName: 'adjustmentsMargin',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
    valuePreCallback(values) {
        values = values || {};
        return `${values.top || 0} ${values.right || 0} ${values.bottom || 0} ${values.left || 0}`;
    },
});

/* Total Styles */
blockStyles.addBlockStyles('totalColor', {
    selector: '.%s table tfoot tr.pc-total-row td',
    styleRule: 'color',
    attrName: 'totalColor',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});
blockStyles.addBlockStyles('totalFontFamily', {
    selector: '.%s table tfoot tr.pc-total-row td',
    styleRule: 'font-family',
    attrName: 'totalFontFamily',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});
blockStyles.addBlockStyles('totalFontWeight', {
    selector: '.%s table tfoot tr.pc-total-row td',
    styleRule: 'font-weight',
    attrName: 'totalFontWeight',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
});
blockStyles.addBlockStyles('totalFontSize', {
    selector: '.%s table tfoot tr.pc-total-row td',
    styleRule: 'font-size',
    attrName: 'totalFontSize',
    responsive: 'all',
    format: '%spx',
    hasUnits: false,
});
blockStyles.addBlockStyles('totalMargin', {
    selector: '.%s table tfoot tr.pc-total-row td',
    styleRule: 'padding',
    attrName: 'totalMargin',
    responsive: 'all',
    format: '%s',
    hasUnits: false,
    valuePreCallback(values) {
        values = values || {};
        return `${values.top || 0} ${values.right || 0} ${values.bottom || 0} ${values.left || 0}`;
    },
});

export default blockStyles;

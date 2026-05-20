import { getElements } from './helpers';

const selectors = {
    checkboxes: '.pc-pricing-item-checkbox',
    subtotalValue: '.pc-subtotal-value',
    totalValue: '.pc-total-value',
    pricingTable: '.pc-pricing-table',
    pricingBlock: '.wp-block-asphalt-proposal-manager-pricing'
};

export const getCheckboxState = ($) => {
    const { $pricingBlock } = getElements($(document), selectors);
    const state = {}

    $pricingBlock.each(function () {
        const $block = $(this);
        const $table = $block.find(selectors.pricingTable);
        const $checkboxes = $block.find(selectors.checkboxes);

        const blockId = $table.attr('data-block-id');
        const title = $table.attr('data-title');

        const items = [];
        $checkboxes.each((index, $input) => {
            items.push($input.checked);
        });

        state[blockId] = {
            title,
            blockId,
            items,
            items
        }
    });

    return state;
}

export default function pricing($scope, $) {
    const {
        $checkboxes,
        $subtotalValue,
        $totalValue,
    } = getElements($scope, selectors);

    const calculate = () => {
        let subtotal = 0;
        $checkboxes.each(function () {
            const $cb = $(this);
            if ($cb.is(':checked')) {
                const price = parseFloat($cb.data('price') || 0);
                const quantity = parseFloat($cb.data('quantity') || 1);
                subtotal += price * quantity;
            }
        });

        // Get the currency symbol from the pricing table element
        const $table = $scope.find(selectors.pricingTable);
        const currencySymbol = $table.attr('data-currency-symbol') || '$';

        const adjustments = $table.attr('data-adjustments') || '[]';
        // Note: jQuery.data() automatically parses JSON if it detects it, so we might get an object/array directly.
        // However, if it's a string that jQuery didn't parse (unlikely for valid JSON), or if we need to be safe:
        const parsedAdjustments =
            typeof adjustments === 'string'
                ? JSON.parse(adjustments || '[]')
                : adjustments;

        let adjustmentsTotal = 0;
        parsedAdjustments.forEach((adj) => {
            let val = parseFloat(adj.value || 0);
            if (adj.amountType === 'percentage') {
                val = (val / 100) * subtotal;
            }

            const operation = adj.operation || adj.type || 'addition';
            if (operation === 'deduction') {
                adjustmentsTotal -= val;
            } else {
                adjustmentsTotal += val;
            }
        });

        const total = subtotal + adjustmentsTotal;

        const formatCurrency = (value) => {
            const isNegative = value < 0;
            const absoluteValue = Math.abs(value).toLocaleString();
            return isNegative ? `-${currencySymbol}${absoluteValue}` : `${currencySymbol}${absoluteValue}`;
        };

        $subtotalValue.text(formatCurrency(subtotal));
        $totalValue.text(formatCurrency(total));
    };

    $checkboxes.on('change', calculate);

    // Initial calculation
    calculate();
}

<?php
use ProposalCrafter\App\Repositories\SettingsRepository;

defined( 'ABSPATH' ) || exit;

asphalt_proposal_manager_block_start( $attributes );

// Get Currency from Global Settings
$asphalt_proposal_manager_settings_repo = new SettingsRepository();
$asphalt_proposal_manager_template_info = $asphalt_proposal_manager_settings_repo->get_template_info();
$asphalt_proposal_manager_currency_code = isset($asphalt_proposal_manager_template_info['currency']) ? $asphalt_proposal_manager_template_info['currency'] : 'USD';

$asphalt_proposal_manager_currency_symbols = [
    'USD' => '$',
    'EUR' => '€',
    'GBP' => '£',
    'JPY' => '¥',
    'CAD' => 'C$',
    'AUD' => 'A$',
    'CHF' => 'Fr',
    'CNY' => '¥',
    'INR' => '₹',
    'BRL' => 'R$',
];

$asphalt_proposal_manager_currency_symbol = isset($asphalt_proposal_manager_currency_symbols[$asphalt_proposal_manager_currency_code]) ? $asphalt_proposal_manager_currency_symbols[$asphalt_proposal_manager_currency_code] : '$';

// Helper for formatting currency
if (!function_exists('asphalt_proposal_manager_format_currency')) {
    function asphalt_proposal_manager_format_currency($value, $symbol) {
        $asphalt_proposal_manager_is_negative = $value < 0;
        $asphalt_proposal_manager_abs_value = number_format(abs($value));
        return $asphalt_proposal_manager_is_negative ? '-' . $symbol . $asphalt_proposal_manager_abs_value : $symbol . $asphalt_proposal_manager_abs_value;
    }
}
?>
    <?php
    $asphalt_proposal_manager_items = isset($attributes['items']) ? $attributes['items'] : [];
    $asphalt_proposal_manager_subtotal_label = isset($attributes['subtotalLabel']) ? $attributes['subtotalLabel'] : 'Subtotal';
    $asphalt_proposal_manager_total_label = isset($attributes['totalLabel']) ? $attributes['totalLabel'] : 'Total';
    $asphalt_proposal_manager_show_subtotal = isset($attributes['showSubtotal']) ? $attributes['showSubtotal'] : true;
    $asphalt_proposal_manager_show_total = isset($attributes['showTotal']) ? $attributes['showTotal'] : true;
    $asphalt_proposal_manager_adjustments = isset($attributes['adjustments']) ? $attributes['adjustments'] : [];

    $asphalt_proposal_manager_subtotal_value = 0;
    foreach ($asphalt_proposal_manager_items as $asphalt_proposal_manager_item) {
        if (empty($asphalt_proposal_manager_item['isChecked'])) {
            continue;
        }
        $asphalt_proposal_manager_price = isset($asphalt_proposal_manager_item['price']) ? floatval($asphalt_proposal_manager_item['price']) : 0;
        $asphalt_proposal_manager_quantity = isset($asphalt_proposal_manager_item['quantity']) ? floatval($asphalt_proposal_manager_item['quantity']) : 1;
        $asphalt_proposal_manager_subtotal_value += $asphalt_proposal_manager_price * $asphalt_proposal_manager_quantity;
    }

    $asphalt_proposal_manager_adjustments_total = 0;
    foreach ($asphalt_proposal_manager_adjustments as $asphalt_proposal_manager_adjustment) {
        $asphalt_proposal_manager_val = isset($asphalt_proposal_manager_adjustment['value']) ? floatval($asphalt_proposal_manager_adjustment['value']) : 0;
        $asphalt_proposal_manager_amount_type = isset($asphalt_proposal_manager_adjustment['amountType']) ? $asphalt_proposal_manager_adjustment['amountType'] : 'fixed';
        
        if ($asphalt_proposal_manager_amount_type === 'percentage') {
            $asphalt_proposal_manager_val = ($asphalt_proposal_manager_val / 100) * $asphalt_proposal_manager_subtotal_value;
        }

        $asphalt_proposal_manager_operation = isset($asphalt_proposal_manager_adjustment['operation']) ? $asphalt_proposal_manager_adjustment['operation'] : (isset($asphalt_proposal_manager_adjustment['type']) ? $asphalt_proposal_manager_adjustment['type'] : 'addition');
        
        if ($asphalt_proposal_manager_operation === 'deduction') {
            $asphalt_proposal_manager_adjustments_total -= $asphalt_proposal_manager_val;
        } else {
            $asphalt_proposal_manager_adjustments_total += $asphalt_proposal_manager_val;
        }
    }
    $asphalt_proposal_manager_total_value = $asphalt_proposal_manager_subtotal_value + $asphalt_proposal_manager_adjustments_total;
    ?>
    <table 
        class="pc-pricing-table" 
        data-title="<?php echo esc_attr(isset($attributes['tableTitle']) ? $attributes['tableTitle'] : ''); ?>" 
        data-adjustments="<?php echo esc_attr(json_encode($asphalt_proposal_manager_adjustments)); ?>" 
        data-currency-symbol="<?php echo esc_attr($asphalt_proposal_manager_currency_symbol); ?>"
        data-block-id="<?php echo esc_attr($attributes['uniqueId']); ?>"
    >
        <thead>
            <tr>
                <th style="text-align: left;"><?php echo esc_html(isset($attributes['itemColumnLabel']) ? $attributes['itemColumnLabel'] : 'Item'); ?></th>
                <th style="text-align: right;"><?php echo esc_html(isset($attributes['priceColumnLabel']) ? $attributes['priceColumnLabel'] : 'Price'); ?></th>
                <th style="text-align: right;"><?php echo esc_html(isset($attributes['quantityColumnLabel']) ? $attributes['quantityColumnLabel'] : 'Quantity'); ?></th>
                <th style="text-align: right;"><?php echo esc_html(isset($attributes['totalColumnLabel']) ? $attributes['totalColumnLabel'] : 'Subtotal'); ?></th>
            </tr>
        </thead>
        <tbody>
            <?php if (!empty($asphalt_proposal_manager_items)) : ?>
                <?php foreach ($asphalt_proposal_manager_items as $asphalt_proposal_manager_item) : 
                    $asphalt_proposal_manager_price = isset($asphalt_proposal_manager_item['price']) ? floatval($asphalt_proposal_manager_item['price']) : 0;
                    $asphalt_proposal_manager_quantity = isset($asphalt_proposal_manager_item['quantity']) ? floatval($asphalt_proposal_manager_item['quantity']) : 1;
                    $asphalt_proposal_manager_row_total = $asphalt_proposal_manager_price * $asphalt_proposal_manager_quantity;
                ?>
                    <tr>
                        <td>
                            <label class="pc-pricing-item-wrapper" style="display: inline-flex; align-items: center; cursor: <?php echo !empty($asphalt_proposal_manager_item['isChecked']) ? 'default' : 'pointer'; ?>; <?php echo !empty($asphalt_proposal_manager_item['isChecked']) ? 'pointer-events: none;' : ''; ?>">
                                <input type="checkbox" class="pc-pricing-item-checkbox" data-price="<?php echo esc_attr($asphalt_proposal_manager_price); ?>" data-quantity="<?php echo esc_attr($asphalt_proposal_manager_quantity); ?>" style="margin-right: 4px;" <?php echo !empty($asphalt_proposal_manager_item['isChecked']) ? 'checked' : ''; ?>>
                                <div class="pc-pricing-item-title"><?php echo wp_kses_post(isset($asphalt_proposal_manager_item['title']) ? $asphalt_proposal_manager_item['title'] : ''); ?></div>
                            </label>
                            <div class="pc-pricing-item-description"><?php echo wp_kses_post(isset($asphalt_proposal_manager_item['description']) ? $asphalt_proposal_manager_item['description'] : ''); ?></div>
                        </td>
                        <td class="pc-pricing-column" style="vertical-align: top; text-align: right;">
                            <div style="display: flex; align-items: center; justify-content: flex-end;">
                                <span><?php echo esc_html(asphalt_proposal_manager_format_currency($asphalt_proposal_manager_price, $asphalt_proposal_manager_currency_symbol)); ?></span>
                            </div>
                        </td>
                        <td class="pc-pricing-column" style="vertical-align: top; text-align: right;">
                            <div><?php echo esc_html($asphalt_proposal_manager_quantity); ?></div>
                        </td>
                        <td class="pc-pricing-column" style="vertical-align: top; text-align: right;">
                            <div style="display: flex; align-items: center; justify-content: flex-end;">
                                <span><?php echo esc_html(asphalt_proposal_manager_format_currency($asphalt_proposal_manager_row_total, $asphalt_proposal_manager_currency_symbol)); ?></span>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
        </tbody>
        <?php if ($asphalt_proposal_manager_show_subtotal || $asphalt_proposal_manager_show_total) : ?>
            <tfoot>
                <?php if ($asphalt_proposal_manager_show_subtotal) : ?>
                    <tr class="pc-subtotal-row">
                        <td colspan="3" style="text-align: right; vertical-align: middle;">
                            <?php echo esc_html($asphalt_proposal_manager_subtotal_label); ?>
                        </td>
                        <td style="text-align: right; vertical-align: middle;">
                            <div style="display: flex; align-items: center; justify-content: flex-end;">
                                <span class="pc-subtotal-value"><?php echo esc_html(asphalt_proposal_manager_format_currency($asphalt_proposal_manager_subtotal_value, $asphalt_proposal_manager_currency_symbol)); ?></span>
                            </div>
                        </td>
                    </tr>
                <?php endif; ?>
                
                <?php foreach ($asphalt_proposal_manager_adjustments as $asphalt_proposal_manager_adjustment) : 
                    $asphalt_proposal_manager_val = isset($asphalt_proposal_manager_adjustment['value']) ? floatval($asphalt_proposal_manager_adjustment['value']) : 0;
                    $asphalt_proposal_manager_amount_type = isset($asphalt_proposal_manager_adjustment['amountType']) ? $asphalt_proposal_manager_adjustment['amountType'] : 'fixed';
                    $asphalt_proposal_manager_operation = isset($asphalt_proposal_manager_adjustment['operation']) ? $asphalt_proposal_manager_adjustment['operation'] : (isset($asphalt_proposal_manager_adjustment['type']) ? $asphalt_proposal_manager_adjustment['type'] : 'addition');
                    $asphalt_proposal_manager_is_deduction = $asphalt_proposal_manager_operation === 'deduction';
                ?>
                    <tr class="pc-adjustments-row">
                        <td colspan="3" style="text-align: right; vertical-align: middle;">
                            <?php echo esc_html(isset($asphalt_proposal_manager_adjustment['label']) ? $asphalt_proposal_manager_adjustment['label'] : ''); ?>
                        </td>
                        <td style="text-align: right; vertical-align: middle;">
                            <div style="display: flex; align-items: center; justify-content: flex-end;">
                                <span>
                                    <?php 
                                    if ($asphalt_proposal_manager_amount_type === 'percentage') {
                                        echo ($asphalt_proposal_manager_is_deduction ? '- ' : '') . esc_html(number_format($asphalt_proposal_manager_val) . '%');
                                    } else {
                                        $asphalt_proposal_manager_display_val = $asphalt_proposal_manager_is_deduction ? -$asphalt_proposal_manager_val : $asphalt_proposal_manager_val;
                                        echo esc_html(asphalt_proposal_manager_format_currency($asphalt_proposal_manager_display_val, $asphalt_proposal_manager_currency_symbol));
                                    }
                                    ?>
                                </span>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; ?>

                <?php if ($asphalt_proposal_manager_show_total) : ?>
                    <tr class="pc-total-row">
                        <td colspan="3" style="text-align: right; vertical-align: middle;">
                            <?php echo esc_html($asphalt_proposal_manager_total_label); ?>
                        </td>
                        <td style="text-align: right; vertical-align: middle;">
                            <div style="display: flex; align-items: center; justify-content: flex-end;">
                                <span class="pc-total-value"><?php echo esc_html(asphalt_proposal_manager_format_currency($asphalt_proposal_manager_total_value, $asphalt_proposal_manager_currency_symbol)); ?></span>
                            </div>
                        </td>
                    </tr>
                <?php endif; ?>
            </tfoot>
        <?php endif; ?>
    </table>
<?php 
asphalt_proposal_manager_block_end();
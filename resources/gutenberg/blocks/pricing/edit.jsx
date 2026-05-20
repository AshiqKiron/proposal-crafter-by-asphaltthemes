import { useState, useMemo } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { RichText } from '@wordpress/block-editor';
import { Button, CheckboxControl } from '@wordpress/components';
import { FiPlus } from 'react-icons/fi';
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
import Toolbar from './toolbar';
import blockStyles from './style';
import { CURRENCY_SYMBOLS } from '@dashboard/constants';

const edit = (props) => {
    const { attributes, setAttributes, clientId } = props;
    const { items } = attributes;
    const blockCss = useBlockCssGenerator();
    const [focusedRowIndex, setFocusedRowIndex] = useState(null);
    const { selectBlock } = useDispatch('core/block-editor');

    const currencySymbol = useSelect((select) => {
        const templateInfo = select('asphalt-proposal-manager/settings').getTemplateInfo();
        const currencyCode = templateInfo?.currency || 'USD';
        return CURRENCY_SYMBOLS[currencyCode];
    }, []);

    const addItem = () => {
        const newItems = [
            ...(items || []),
            {
                title: 'New Item',
                description: 'Description',
                price: 0,
                quantity: 1,
                isChecked: false,
            },
        ];
        setAttributes({ items: newItems });
    };

    const updateItem = (index, key, value) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [key]: value };
        setAttributes({ items: newItems });
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setAttributes({ items: newItems });

        if (newItems.length > 0) {
            const newIndex = index < newItems.length ? index : newItems.length - 1;
            setFocusedRowIndex(newIndex);
        } else {
            setFocusedRowIndex(null);
        }

        selectBlock(clientId);
    };

    const formatCurrency = (value) => {
        const isNegative = value < 0;
        const absoluteValue = Math.abs(value).toLocaleString();
        return isNegative ? `-${currencySymbol}${absoluteValue}` : `${currencySymbol}${absoluteValue}`;
    };

    return (
        <>
            {blockCss && <style key="block-css">{blockCss}</style>}
            <Toolbar
                onAddItem={addItem}
                onRemoveItem={() => focusedRowIndex !== null && removeItem(focusedRowIndex)}
                showRemove={focusedRowIndex !== null}
            />
            <InspectorControlsProvider>
                <CommonInspectorControls />
                <Controls />
            </InspectorControlsProvider>

            <BlockDiv attributes={attributes}>
                <table data-title={attributes.tableTitle}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left' }}>
                                <RichText
                                    value={attributes.itemColumnLabel}
                                    onChange={(value) => setAttributes({ itemColumnLabel: value })}
                                    placeholder="Item"
                                />
                            </th>
                            <th style={{ textAlign: 'right' }}>
                                <RichText
                                    value={attributes.priceColumnLabel}
                                    onChange={(value) => setAttributes({ priceColumnLabel: value })}
                                    placeholder="Price"
                                />
                            </th>
                            <th style={{ textAlign: 'right' }}>
                                <RichText
                                    value={attributes.quantityColumnLabel}
                                    onChange={(value) => setAttributes({ quantityColumnLabel: value })}
                                    placeholder="Quantity"
                                />
                            </th>
                            <th style={{ textAlign: 'right' }}>
                                <RichText
                                    value={attributes.totalColumnLabel}
                                    onChange={(value) => setAttributes({ totalColumnLabel: value })}
                                    placeholder="Subtotal"
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.length > 0 ? (
                            items.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="pc-pricing-item-wrapper" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            <CheckboxControl
                                                checked={item.isChecked}
                                                onChange={(value) => updateItem(index, 'isChecked', value)}
                                                onFocus={() => setFocusedRowIndex(index)}
                                                __nextHasNoMarginBottom
                                                style={{ marginRight: '4px' }}
                                            />
                                            <RichText
                                                tagName="div"
                                                className="pc-pricing-item-title"
                                                value={item.title}
                                                onChange={(value) => updateItem(index, 'title', value)}
                                                placeholder="Item Title"
                                                onFocus={() => setFocusedRowIndex(index)}
                                            />
                                        </div>
                                        <div>
                                            <RichText
                                                tagName="div"
                                                className="pc-pricing-item-description"
                                                value={item.description}
                                                onChange={(value) => updateItem(index, 'description', value)}
                                                placeholder="Description"
                                                onFocus={() => setFocusedRowIndex(index)}
                                            />
                                        </div>
                                    </td>
                                    <td className="pc-pricing-column" style={{ verticalAlign: 'top', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>

                                            <RichText
                                                tagName="span"
                                                value={String(item.price)}
                                                onChange={(value) => updateItem(index, 'price', value)}
                                                placeholder="0"
                                                allowedFormats={[]}
                                                onFocus={() => setFocusedRowIndex(index)}
                                            />
                                        </div>
                                    </td>
                                    <td className="pc-pricing-column" style={{ verticalAlign: 'top', textAlign: 'right' }}>
                                        <RichText
                                            tagName="div"
                                            value={String(item.quantity)}
                                            onChange={(value) => updateItem(index, 'quantity', value)}
                                            placeholder="1"
                                            allowedFormats={[]}
                                            onFocus={() => setFocusedRowIndex(index)}
                                        />
                                    </td>
                                    <td className="pc-pricing-column" style={{ verticalAlign: 'top', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <span>
                                                {formatCurrency(parseFloat(item.price || 0) * parseFloat(item.quantity || 1))}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                                    <Button variant="secondary" onClick={addItem} icon={<FiPlus />}>
                                        Add Item
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    {(attributes.showSubtotal || attributes.showTotal) && (
                        <tfoot>
                            {attributes.showSubtotal && (
                                <tr className="pc-subtotal-row">
                                    <td colSpan={3} style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                                        <RichText
                                            value={attributes.subtotalLabel}
                                            onChange={(value) => setAttributes({ subtotalLabel: value })}
                                            placeholder="Subtotal"
                                            style={{}}
                                        />
                                    </td>
                                    <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <span>
                                                {formatCurrency(items.reduce((acc, item) => acc + (item.isChecked ? (parseFloat(item.price || 0) * parseFloat(item.quantity || 1)) : 0), 0))}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {attributes.adjustments && attributes.adjustments.map((adjustment, index) => (
                                <tr key={index} className="pc-adjustments-row">
                                    <td colSpan={3} style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                                        {adjustment.label}
                                    </td>
                                    <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <span>
                                                {(() => {
                                                    if (adjustment.amountType === 'percentage') {
                                                        const isDeduction = adjustment.operation === 'deduction' || adjustment.type === 'deduction';
                                                        return (isDeduction ? '- ' : '') + parseFloat(adjustment.value || 0).toLocaleString() + '%';
                                                    } else {
                                                        const val = parseFloat(adjustment.value || 0);
                                                        const isDeduction = adjustment.operation === 'deduction' || adjustment.type === 'deduction';
                                                        const displayVal = isDeduction ? -val : val;
                                                        return formatCurrency(displayVal);
                                                    }
                                                })()}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {attributes.showTotal && (
                                <tr className="pc-total-row">
                                    <td colSpan={3} style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                                        <RichText
                                            value={attributes.totalLabel}
                                            onChange={(value) => setAttributes({ totalLabel: value })}
                                            placeholder="Total"
                                            style={{}}
                                        />
                                    </td>
                                    <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <span>
                                                {(() => {
                                                    const subtotal = items.reduce((acc, item) => acc + (item.isChecked ? (parseFloat(item.price || 0) * parseFloat(item.quantity || 1)) : 0), 0);

                                                    const adjustmentsTotal = (attributes.adjustments || []).reduce((acc, adj) => {
                                                        let val = parseFloat(adj.value || 0);
                                                        if (adj.amountType === 'percentage') {
                                                            val = (val / 100) * subtotal;
                                                        }

                                                        const operation = adj.operation || adj.type || 'addition';
                                                        return operation === 'deduction' ? acc - val : acc + val;
                                                    }, 0);
                                                    return formatCurrency(subtotal + adjustmentsTotal);
                                                })()}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tfoot>
                    )}
                </table>
            </BlockDiv>
        </>
    );
};

export default compose(
    withBlockAttributeContext,
    withBlockStyleContext(blockStyles)
)(edit);

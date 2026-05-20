import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { FiTrash2, FiPlus } from 'react-icons/fi';

const RepeaterControl = ({
    label,
    value = [],
    onChange,
    defaultItem = {},
    renderItem,
    addItemLabel = __('Add Item', 'asphalt-proposal-manager'),
    emptyLabel = __('No items found.', 'asphalt-proposal-manager'),
}) => {
    // Ensure value is always an array
    const items = Array.isArray(value) ? value : [];

    const handleAdd = () => {
        const newValue = [...items, { ...defaultItem }];
        onChange(newValue);
    };

    const handleRemove = (index) => {
        const newValue = items.filter((_, i) => i !== index);
        onChange(newValue);
    };

    const handleChangeItem = (index, newItem) => {
        const newValue = [...items];
        newValue[index] = newItem;
        onChange(newValue);
    };

    return (
        <div className="asphalt-proposal-manager-repeater-control">
            {label && (
                <div className="components-base-control__label" style={{ marginBottom: '8px' }}>
                    {label}
                </div>
            )}

            <div className="asphalt-proposal-manager-repeater-items">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div
                            key={index}
                            className="asphalt-proposal-manager-repeater-item"
                            style={{
                                marginBottom: '15px',
                                padding: '15px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '4px',
                                background: '#fff',
                                position: 'relative'
                            }}
                        >
                            <div style={{ marginBottom: '10px' }}>
                                {renderItem(item, index, (newItem) => handleChangeItem(index, newItem))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #eee' }}>
                                <Button
                                    isDestructive
                                    variant="link"
                                    size="small"
                                    onClick={() => handleRemove(index)}
                                    style={{
                                        textDecoration: 'none',
                                        boxShadow: 'none',
                                        color: '#cc1818',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}
                                >
                                    <FiTrash2 />
                                    {__('Remove', 'asphalt-proposal-manager')}
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{
                        padding: '20px',
                        textAlign: 'center',
                        background: '#f7f7f7',
                        borderRadius: '4px',
                        marginBottom: '10px',
                        color: '#666',
                        fontSize: '13px'
                    }}>
                        {emptyLabel}
                    </div>
                )}
            </div>

            <Button
                variant="secondary"
                onClick={handleAdd}
                style={{ width: '100%', justifyContent: 'center', display: 'flex', gap: '8px', alignItems: 'center' }}
            >
                <FiPlus />
                {addItemLabel}
            </Button>
        </div>
    );
};

export default RepeaterControl;

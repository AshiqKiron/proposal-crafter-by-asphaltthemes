import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { FiPlus } from 'react-icons/fi';

const TrashIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        focusable="false"
        style={{ fill: 'none' }}
    >
        <path
            d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default function Toolbar({ onAddItem, onRemoveItem, showRemove }) {
    return (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    icon={<FiPlus />}
                    label="Add Row"
                    onClick={onAddItem}
                />
                {showRemove && (
                    <ToolbarButton
                        icon={TrashIcon}
                        label="Remove Row"
                        onClick={onRemoveItem}
                    />
                )}
            </ToolbarGroup>
        </BlockControls>
    );
}

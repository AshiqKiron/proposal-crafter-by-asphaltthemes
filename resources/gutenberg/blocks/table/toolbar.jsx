import { BlockControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';
import { useBlockSetAttributesContext } from '@gutenberg/hooks';

export default function Toolbar({ attributes, selectedCell, setSelectedCell }) {
    const setAttributes = useBlockSetAttributesContext();

    const insertRow = (before = false) => {
        if (!selectedCell) {
            return;
        }

        const { section, rowIndex } = selectedCell;
        const newSection = JSON.parse(JSON.stringify(attributes[section]));
        const cellCount = newSection[0].cells.length;
        const newRow = {
            cells: Array(cellCount)
                .fill(null)
                .map(() => ({
                    content: '',
                    tag: section === 'head' ? 'th' : 'td',
                })),
        };

        if (before) {
            newSection.splice(rowIndex, 0, newRow);
        } else {
            newSection.splice(rowIndex + 1, 0, newRow);
        }

        setAttributes({ [section]: newSection });
    };

    const deleteRow = () => {
        if (!selectedCell) {
            return;
        }

        const { section, rowIndex } = selectedCell;
        const newSection = JSON.parse(JSON.stringify(attributes[section]));

        if (newSection.length <= 1) {
            return; // Don't delete the last row
        }

        newSection.splice(rowIndex, 1);
        setAttributes({ [section]: newSection });
        setSelectedCell(null);
    };

    const insertColumn = (before = false) => {
        if (!selectedCell) {
            return;
        }

        const { colIndex } = selectedCell;
        const sections = ['head', 'body', 'foot'];
        const newAttributes = {};

        sections.forEach((section) => {
            if (attributes[section] && attributes[section].length) {
                const newSection = JSON.parse(
                    JSON.stringify(attributes[section])
                );
                newSection.forEach((row) => {
                    const newCell = {
                        content: '',
                        tag: section === 'head' ? 'th' : 'td',
                    };
                    if (before) {
                        row.cells.splice(colIndex, 0, newCell);
                    } else {
                        row.cells.splice(colIndex + 1, 0, newCell);
                    }
                });
                newAttributes[section] = newSection;
            }
        });

        setAttributes(newAttributes);
    };

    const deleteColumn = () => {
        if (!selectedCell) {
            return;
        }

        const { colIndex } = selectedCell;
        const sections = ['head', 'body', 'foot'];
        const newAttributes = {};

        // Check if it's the last column (check body first, or head)
        const checkSection = attributes.body && attributes.body.length ? 'body' : 'head';
        if (attributes[checkSection] && attributes[checkSection][0].cells.length <= 1) {
            return;
        }

        sections.forEach((section) => {
            if (attributes[section] && attributes[section].length) {
                const newSection = JSON.parse(
                    JSON.stringify(attributes[section])
                );
                newSection.forEach((row) => {
                    row.cells.splice(colIndex, 1);
                });
                newAttributes[section] = newSection;
            }
        });

        setAttributes(newAttributes);
        setSelectedCell(null);
    };

    const TABLE_CONTROLS = [
        {
            icon: 'table-row-before',
            title: 'Insert row before',
            onClick: () => insertRow(true),
        },
        {
            icon: 'table-row-after',
            title: 'Insert row after',
            onClick: () => insertRow(false),
        },
        {
            icon: 'table-row-delete',
            title: 'Delete row',
            onClick: deleteRow,
        },
        {
            icon: 'table-col-before',
            title: 'Insert column before',
            onClick: () => insertColumn(true),
        },
        {
            icon: 'table-col-after',
            title: 'Insert column after',
            onClick: () => insertColumn(false),
        },
        {
            icon: 'table-col-delete',
            title: 'Delete column',
            onClick: deleteColumn,
        },
    ];

    return (
        <BlockControls>
            <ToolbarDropdownMenu
                hasArrowIndicator
                icon="editor-table"
                label="Edit table"
                controls={TABLE_CONTROLS}
            />
        </BlockControls>
    );
}

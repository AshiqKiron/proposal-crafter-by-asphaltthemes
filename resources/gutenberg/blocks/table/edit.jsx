import { compose } from '@wordpress/compose';
import classnames from 'classnames/dedupe';
import { RichText } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Button, Placeholder, TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import blockStyles from './style';
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

const edit = (props) => {
    const { attributes, setAttributes } = props;
    const { head, body, foot, headerVisible } = attributes;
    const blockCss = useBlockCssGenerator();

    // Local state for table creation form
    const [rowCount, setRowCount] = useState(2);
    const [colCount, setColCount] = useState(2);
    const [selectedCell, setSelectedCell] = useState(null);

    const createTable = (e) => {
        e.preventDefault();
        const newBody = [];
        const newHead = [];

        // Create Header
        const headRow = { cells: [] };
        for (let j = 0; j < parseInt(colCount); j++) {
            headRow.cells.push({ content: '', tag: 'th' });
        }
        newHead.push(headRow);

        // Create Body
        for (let i = 0; i < parseInt(rowCount); i++) {
            const row = { cells: [] };
            for (let j = 0; j < parseInt(colCount); j++) {
                row.cells.push({ content: '', tag: 'td' });
            }
            newBody.push(row);
        }
        setAttributes({ body: newBody, head: newHead });
    };

    const isEmpty =
        (!body || !body.length) &&
        (!head || !head.length) &&
        (!foot || !foot.length);

    if (isEmpty) {
        return (
            <Placeholder
                icon="editor-table"
                label="Table"
                instructions="Insert a table for sharing data."
            >
                <form
                    onSubmit={createTable}
                    className="blocks-table__placeholder-form"
                >
                    <TextControl
                        type="number"
                        label="COLUMN COUNT"
                        value={colCount}
                        onChange={(val) => setColCount(val)}
                        min="1"
                    />
                    <TextControl
                        type="number"
                        label="ROW COUNT"
                        value={rowCount}
                        onChange={(val) => setRowCount(val)}
                        min="1"
                    />
                    <Button variant="primary" type="submit">
                        Create Table
                    </Button>
                </form>
            </Placeholder>
        );
    }

    const updateCell = (section, rowIndex, colIndex, content) => {
        // Deep clone to avoid mutation
        const newSection = JSON.parse(JSON.stringify(attributes[section]));
        if (
            newSection[rowIndex] &&
            newSection[rowIndex].cells[colIndex]
        ) {
            newSection[rowIndex].cells[colIndex].content = content;
            setAttributes({ [section]: newSection });
        }
    };

    const renderSection = (sectionName, TagName) => {
        const rows = attributes[sectionName] || [];
        return rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.cells.map((cell, colIndex) => (
                    <TagName key={colIndex}>
                        <RichText
                            value={cell.content}
                            onChange={(value) =>
                                updateCell(
                                    sectionName,
                                    rowIndex,
                                    colIndex,
                                    value
                                )
                            }
                            onFocus={() =>
                                setSelectedCell({
                                    section: sectionName,
                                    rowIndex,
                                    colIndex,
                                })
                            }
                            placeholder={
                                sectionName === 'head'
                                    ? ['Header', 'Title', 'Name'][
                                    colIndex % 3
                                    ]
                                    : ''
                            }
                        />
                    </TagName>
                ))}
            </tr>
        ));
    };

    return (
        <>
            {blockCss && <style key="block-css">{blockCss}</style>}
            <Toolbar
                attributes={attributes}
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}
            />
            <InspectorControlsProvider>
                <CommonInspectorControls />
                <Controls attributes={attributes} />
            </InspectorControlsProvider>
            <BlockDiv attributes={attributes}>
                <table className="pc-table">
                    {headerVisible && <thead>{renderSection('head', 'th')}</thead>}
                    <tbody>{renderSection('body', 'td')}</tbody>
                    <tfoot>{renderSection('foot', 'td')}</tfoot>
                </table>
            </BlockDiv>
        </>
    );
};

export default compose(
    withBlockAttributeContext,
    withBlockStyleContext(blockStyles)
)(edit);

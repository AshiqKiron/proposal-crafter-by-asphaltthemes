/**
 * Internal dependencies
 */
import { BlockDiv } from '@gutenberg/block-components';
import classnames from 'classnames/dedupe';

export default function save(props) {
    const { attributes } = props;
    const { head, body, headerVisible } = attributes;

    const renderSection = (rows, TagName) => {
        if (!rows || !rows.length) {
            return null;
        }
        return rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.cells.map((cell, colIndex) => (
                    <TagName
                        key={colIndex}
                        dangerouslySetInnerHTML={{ __html: cell.content }}
                    />
                ))}
            </tr>
        ));
    };

    return (
        <BlockDiv.Content attributes={attributes}>
            <table className="pc-table">
                {headerVisible && head && head.length > 0 && (
                    <thead>{renderSection(head, 'th')}</thead>
                )}
                {body && body.length > 0 && (
                    <tbody>{renderSection(body, 'td')}</tbody>
                )}

            </table>
        </BlockDiv.Content>
    );
}

/**
 * Internal dependencies
 */
import { BlockDiv } from '@gutenberg/block-components';

export default function save(props) {
    const { attributes } = props;
    const { imageUrl, imageAlt } = attributes;

    return (
        <BlockDiv.Content attributes={attributes}>
            {imageUrl && (
                <img src={imageUrl} alt={imageAlt} className="pc-image" />
            )}
        </BlockDiv.Content>
    );
}
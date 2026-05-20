import { compose } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';
import { Button, Placeholder } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

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
    const { attributes, setAttributes, isSelected, clientId } = props;
    const { selectBlock } = useDispatch('core/block-editor');
    const blockCss = useBlockCssGenerator();
    const { imageUrl, imageId, imageAlt } = attributes;

    const onSelectMedia = (media) => {
        setAttributes({
            imageUrl: media.url,
            imageId: media.id,
            imageAlt: media.alt || media.title || '',
        });
    };

    const removeMedia = () => {
        setAttributes({
            imageUrl: '',
            imageId: undefined,
            imageAlt: '',
        });
    };

    return (
        <>
            {blockCss && <style key="block-css">{blockCss}</style>}
            <InspectorControlsProvider>
                <CommonInspectorControls />
                <Controls />
            </InspectorControlsProvider>
            {imageUrl && (
                <Toolbar
                    imageId={imageId}
                    onSelectMedia={onSelectMedia}
                    removeMedia={removeMedia}
                />
            )}
            <BlockDiv attributes={attributes} className="pc-image">
                {!imageUrl ? (
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectMedia}
                            allowedTypes={['image']}
                            value={imageId}
                            render={({ open }) => (
                                <Placeholder
                                    icon="format-image"
                                    label={__('Image', 'asphalt-proposal-manager')}
                                    instructions={__('Upload an image or pick one from your media library.', 'asphalt-proposal-manager')}
                                >
                                    <Button variant="primary" onClick={open}>
                                        {__('Upload', 'asphalt-proposal-manager')}
                                    </Button>
                                </Placeholder>
                            )}
                        />
                    </MediaUploadCheck>
                ) : (
                    <div className="pc-image-wrapper">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="pc-image"
                            draggable
                            onClick={() => {
                                if (!isSelected) {
                                    selectBlock(clientId);
                                }
                            }}
                        />
                    </div>
                )}
            </BlockDiv>
        </>
    );
};

export default compose(
    withBlockAttributeContext,
    withBlockStyleContext(blockStyles)
)(edit);

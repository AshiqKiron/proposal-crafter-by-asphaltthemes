import { BlockControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Toolbar = (props) => {
    const { imageId, onSelectMedia, removeMedia } = props;

    return (
        <BlockControls>
            <ToolbarGroup>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelectMedia}
                        allowedTypes={['image']}
                        value={imageId}
                        render={({ open }) => (
                            <ToolbarButton
                                onClick={open}
                                label={__('Replace', 'asphalt-proposal-manager')}
                                icon="edit"
                            />
                        )}
                    />
                </MediaUploadCheck>
                <ToolbarButton
                    onClick={removeMedia}
                    label={__('Remove', 'asphalt-proposal-manager')}
                    icon="trash"
                />
            </ToolbarGroup>
        </BlockControls>
    );
};

export default Toolbar;

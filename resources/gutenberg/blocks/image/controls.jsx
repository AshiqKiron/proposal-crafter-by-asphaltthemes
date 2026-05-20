import {
    StaticControl,
    InspectorGeneralControls,
    InspectorStyleControls,
    PanelBody,
    ResponsiveControl,
    Slider,
    Select,
} from '@gutenberg/block-controls';
import { useBlockSetAttributesContext } from '@gutenberg/hooks';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Controls() {
    const setAttributes = useBlockSetAttributesContext();

    return (
        <>
            <InspectorGeneralControls>
                <PanelBody title={__('Image Settings', 'asphalt-proposal-manager')} initialOpen={true}>
                    <StaticControl
                        attrNameTemplate="imageAlt"
                        setAttributes={setAttributes}
                        label={__('Alt Text', 'asphalt-proposal-manager')}
                    >
                        <TextControl
                            help={__('Alternative text describes your image to people who can\'t see it. Add a short description with its key details.', 'asphalt-proposal-manager')}
                        />
                    </StaticControl>
                </PanelBody>
            </InspectorGeneralControls>
            <InspectorStyleControls>
                <PanelBody title={__('Position', 'asphalt-proposal-manager')}>
                    <ResponsiveControl
                        attrNameTemplate="positionType%s"
                        setAttributes={setAttributes}
                        label={__('Position', 'asphalt-proposal-manager')}
                    >
                        <Select
                            options={[
                                { label: 'Static', value: 'static' },
                                { label: 'Relative', value: 'relative' },
                                { label: 'Absolute', value: 'absolute' },
                                { label: 'Fixed', value: 'fixed' }
                            ]}
                        />
                    </ResponsiveControl>
                    <ResponsiveControl
                        attrNameTemplate="positionX%s"
                        setAttributes={setAttributes}
                        label={__('Horizontal Position', 'asphalt-proposal-manager')}
                    >
                        <Slider min={-500} max={500} />
                    </ResponsiveControl>
                    <ResponsiveControl
                        attrNameTemplate="positionY%s"
                        setAttributes={setAttributes}
                        label={__('Vertical Position', 'asphalt-proposal-manager')}
                    >
                        <Slider min={-500} max={500} />
                    </ResponsiveControl>
                </PanelBody>
                <PanelBody title={__('Dimensions', 'asphalt-proposal-manager')}>
                    <ResponsiveControl
                        attrNameTemplate="width%s"
                        setAttributes={setAttributes}
                        label={__('Width', 'asphalt-proposal-manager')}
                    >
                        <Slider min={0} max={1000} />
                    </ResponsiveControl>
                    <ResponsiveControl
                        attrNameTemplate="height%s"
                        setAttributes={setAttributes}
                        label={__('Height', 'asphalt-proposal-manager')}
                    >
                        <Slider min={0} max={1000} />
                    </ResponsiveControl>
                </PanelBody>
            </InspectorStyleControls>
        </>
    );
}

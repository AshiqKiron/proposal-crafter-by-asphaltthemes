import {
    StaticControl,
    InspectorGeneralControls,
    InspectorStyleControls,
    PanelBody,
    Toggle,
    ColorPicker,
    ResponsiveControl,
    Slider,
    FontFamilyControl,
    Select,
    BoxControl,
    Radio,
} from '@gutenberg/block-controls';
import { TabPanel } from '@wordpress/components';
import { useBlockSetAttributesContext } from '@gutenberg/hooks';

export default function Controls({ attributes }) {
    const setAttributes = useBlockSetAttributesContext();
    const { head, headerVisible } = attributes;

    const toggleHeader = () => {
        const newVisibility = !headerVisible;
        if (newVisibility && (!head || !head.length)) {
            const bodyRow = attributes.body[0];
            const colCount = bodyRow ? bodyRow.cells.length : 2;
            const row = { cells: [] };
            for (let i = 0; i < colCount; i++) {
                row.cells.push({
                    content: '',
                    tag: 'th',
                });
            }
            setAttributes({ headerVisible: newVisibility, head: [row] });
        } else {
            setAttributes({ headerVisible: newVisibility });
        }
    };

    return (
        <>
            <InspectorGeneralControls>
                <PanelBody title="Table Settings" initialOpen={true}>
                    <Toggle
                        label="Header section"
                        checked={headerVisible}
                        onChange={toggleHeader}
                    />

                </PanelBody>
            </InspectorGeneralControls>
            <InspectorStyleControls>
                <PanelBody title="Typography" initialOpen={false}>
                    <StaticControl
                        attrNameTemplate="fontFamily"
                        setAttributes={setAttributes}
                        label="Font Family"
                    >
                        <FontFamilyControl />
                    </StaticControl>
                    <ResponsiveControl
                        attrNameTemplate="fontSize%s"
                        setAttributes={setAttributes}
                        label="Font Size"
                    >
                        <Slider min={1} max={200} />
                    </ResponsiveControl>
                </PanelBody>
                <PanelBody title="Header" initialOpen={false}>
                    <StaticControl
                        attrNameTemplate="headerBackground"
                        setAttributes={setAttributes}
                        label="Background Color"
                    >
                        <ColorPicker />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="headerColor"
                        setAttributes={setAttributes}
                        label="Text Color"
                    >
                        <ColorPicker />
                    </StaticControl>

                    <StaticControl
                        attrNameTemplate="headerFontWeight"
                        setAttributes={setAttributes}
                        label="Font Weight"
                    >
                        <Select
                            options={[
                                { label: '100 - Thin', value: '100' },
                                { label: '200 - Extra Light', value: '200' },
                                { label: '300 - Light', value: '300' },
                                { label: '400 - Normal', value: '400' },
                                { label: '500 - Medium', value: '500' },
                                { label: '600 - Semi Bold', value: '600' },
                                { label: '700 - Bold', value: '700' },
                                { label: '800 - Extra Bold', value: '800' },
                                { label: '900 - Black', value: '900' },
                            ]}
                        />
                    </StaticControl>
                    <ResponsiveControl
                        attrNameTemplate="headerPadding%s"
                        setAttributes={setAttributes}
                        label="Padding"
                    >
                        <BoxControl />
                    </ResponsiveControl>
                    <StaticControl
                        attrNameTemplate="headerAlignment"
                        setAttributes={setAttributes}
                        label="Alignment"
                    >
                        <Radio />
                    </StaticControl>
                </PanelBody>
                <PanelBody title="Body" initialOpen={false}>
                    <div className="pc-tab-panel-wrapper" style={{ marginBottom: '20px' }}>
                        <TabPanel
                            className="pc-tab-panel"
                            activeClass="is-active"
                            tabs={[
                                {
                                    name: 'odd',
                                    title: 'Odd Rows',
                                    className: 'pc-tab-odd',
                                },
                                {
                                    name: 'even',
                                    title: 'Even Rows',
                                    className: 'pc-tab-even',
                                },
                            ]}
                        >
                            {(tab) => (
                                <div style={{ marginTop: '15px' }}>
                                    {tab.name === 'odd' && (
                                        <>
                                            <StaticControl
                                                attrNameTemplate="bodyBackgroundOdd"
                                                setAttributes={setAttributes}
                                                label="Odd Row Background"
                                            >
                                                <ColorPicker />
                                            </StaticControl>
                                            <div style={{ marginTop: '20px' }}>
                                                <StaticControl
                                                    attrNameTemplate="bodyColorOdd"
                                                    setAttributes={setAttributes}
                                                    label="Odd Row Text Color"
                                                >
                                                    <ColorPicker />
                                                </StaticControl>
                                            </div>
                                        </>
                                    )}
                                    {tab.name === 'even' && (
                                        <>
                                            <StaticControl
                                                attrNameTemplate="bodyBackgroundEven"
                                                setAttributes={setAttributes}
                                                label="Even Row Background"
                                            >
                                                <ColorPicker />
                                            </StaticControl>
                                            <div style={{ marginTop: '20px' }}>
                                                <StaticControl
                                                    attrNameTemplate="bodyColorEven"
                                                    setAttributes={setAttributes}
                                                    label="Even Row Text Color"
                                                >
                                                    <ColorPicker />
                                                </StaticControl>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </TabPanel>
                    </div>
                    <StaticControl
                        attrNameTemplate="bodyFontWeight"
                        setAttributes={setAttributes}
                        label="Font Weight"
                    >
                        <Select
                            options={[
                                { label: '100 - Thin', value: '100' },
                                { label: '200 - Extra Light', value: '200' },
                                { label: '300 - Light', value: '300' },
                                { label: '400 - Normal', value: '400' },
                                { label: '500 - Medium', value: '500' },
                                { label: '600 - Semi Bold', value: '600' },
                                { label: '700 - Bold', value: '700' },
                                { label: '800 - Extra Bold', value: '800' },
                                { label: '900 - Black', value: '900' },
                            ]}
                        />
                    </StaticControl>
                    <ResponsiveControl
                        attrNameTemplate="bodyPadding%s"
                        setAttributes={setAttributes}
                        label="Padding"
                    >
                        <BoxControl />
                    </ResponsiveControl>
                    <StaticControl
                        attrNameTemplate="bodyAlignment"
                        setAttributes={setAttributes}
                        label="Alignment"
                    >
                        <Radio />
                    </StaticControl>
                </PanelBody>
            </InspectorStyleControls>
        </>
    );
}

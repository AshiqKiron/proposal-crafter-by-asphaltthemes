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
    RepeaterControl,
} from '@gutenberg/block-controls';
import { useEffect } from '@wordpress/element';
import { TextControl, SelectControl } from '@wordpress/components';
import { useBlockSetAttributesContext, useBlockAttributesContext } from '@gutenberg/hooks';

export default function Controls() {
    const setAttributes = useBlockSetAttributesContext();
    const attributes = useBlockAttributesContext();



    return (
        <>
            <InspectorGeneralControls>
                <PanelBody title="Settings" initialOpen={true}>
                    <StaticControl
                        attrNameTemplate="tableTitle"
                        setAttributes={setAttributes}
                        label="Table Title"
                    >
                        <TextControl help="For internal use only" />
                    </StaticControl>

                    <StaticControl
                        attrNameTemplate="showSubtotal"
                        setAttributes={setAttributes}
                        label="Show Subtotal"
                    >
                        <Toggle />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="showTotal"
                        setAttributes={setAttributes}
                        label="Show Total"
                    >
                        <Toggle />
                    </StaticControl>
                </PanelBody>
                <PanelBody title="Adjustments" initialOpen={false}>
                    <StaticControl
                        attrNameTemplate="adjustments"
                        setAttributes={setAttributes}
                    >
                        <RepeaterControl
                            defaultItem={{ label: 'New Adjustment', operation: 'addition', amountType: 'fixed', value: 0 }}
                            addItemLabel="Add Adjustment"
                            emptyLabel="No adjustments added."
                            renderItem={(item, index, onChangeItem) => (
                                <>
                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px' }}>Label</label>
                                        <TextControl
                                            value={item.label}
                                            onChange={(newLabel) => onChangeItem({ ...item, label: newLabel })}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px' }}>Operation</label>
                                        <SelectControl
                                            value={item.operation}
                                            options={[
                                                { label: 'Add (+)', value: 'addition' },
                                                { label: 'Subtract (-)', value: 'deduction' },
                                            ]}
                                            onChange={(newOp) => onChangeItem({ ...item, operation: newOp })}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px' }}>Amount Type</label>
                                        <SelectControl
                                            value={item.amountType}
                                            options={[
                                                { label: 'Fixed', value: 'fixed' },
                                                { label: 'Percentage (%)', value: 'percentage' },
                                            ]}
                                            onChange={(newType) => onChangeItem({ ...item, amountType: newType })}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px' }}>Amount</label>
                                        <TextControl
                                            type="number"
                                            value={item.value}
                                            onChange={(newValue) => onChangeItem({ ...item, value: parseFloat(newValue) || 0 })}
                                        />
                                    </div>
                                </>
                            )}
                        />
                    </StaticControl>
                </PanelBody>
            </InspectorGeneralControls >
            <InspectorStyleControls>
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
                        attrNameTemplate="headerFontFamily"
                        setAttributes={setAttributes}
                        label="Font Family"
                    >
                        <FontFamilyControl />
                    </StaticControl>
                    <ResponsiveControl
                        attrNameTemplate="headerFontSize%s"
                        setAttributes={setAttributes}
                        label="Font Size"
                    >
                        <Slider min={1} max={100} />
                    </ResponsiveControl>

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
                </PanelBody>
                <PanelBody title="Body" initialOpen={false}>
                    <StaticControl
                        attrNameTemplate="bodyBackground"
                        setAttributes={setAttributes}
                        label="Background Color"
                    >
                        <ColorPicker />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="rowDividerColor"
                        setAttributes={setAttributes}
                        label="Row Divider Color"
                    >
                        <ColorPicker />
                    </StaticControl>
                    <ResponsiveControl
                        attrNameTemplate="bodyPadding%s"
                        setAttributes={setAttributes}
                        label="Padding"
                    >
                        <BoxControl />
                    </ResponsiveControl>
                </PanelBody>
                <PanelBody title="Title" initialOpen={false}>
                    <StaticControl
                        attrNameTemplate="titleColor"
                        setAttributes={setAttributes}
                        label="Color"
                    >
                        <ColorPicker />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="titleFontFamily"
                        setAttributes={setAttributes}
                        label="Font Family"
                    >
                        <FontFamilyControl />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="titleFontWeight"
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
                        attrNameTemplate="titleFontSize%s"
                        setAttributes={setAttributes}
                        label="Font Size"
                    >
                        <Slider min={1} max={100} />
                    </ResponsiveControl>
                    <ResponsiveControl
                        attrNameTemplate="titleMargin%s"
                        setAttributes={setAttributes}
                        label="Margin"
                    >
                        <BoxControl />
                    </ResponsiveControl>
                </PanelBody>
                <PanelBody title="Description" initialOpen={false}>
                    <StaticControl
                        attrNameTemplate="descriptionColor"
                        setAttributes={setAttributes}
                        label="Color"
                    >
                        <ColorPicker />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="descriptionFontFamily"
                        setAttributes={setAttributes}
                        label="Font Family"
                    >
                        <FontFamilyControl />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="descriptionFontWeight"
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
                        attrNameTemplate="descriptionFontSize%s"
                        setAttributes={setAttributes}
                        label="Font Size"
                    >
                        <Slider min={1} max={100} />
                    </ResponsiveControl>
                </PanelBody>
                <PanelBody title="Pricing" initialOpen={false}>
                    <StaticControl
                        attrNameTemplate="pricingColor"
                        setAttributes={setAttributes}
                        label="Color"
                    >
                        <ColorPicker />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="pricingFontFamily"
                        setAttributes={setAttributes}
                        label="Font Family"
                    >
                        <FontFamilyControl />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="pricingFontWeight"
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
                        attrNameTemplate="pricingFontSize%s"
                        setAttributes={setAttributes}
                        label="Font Size"
                    >
                        <Slider min={1} max={100} />
                    </ResponsiveControl>
                </PanelBody>
                <PanelBody title="Subtotal" initialOpen={false}>
                    <StaticControl
                        attrNameTemplate="subtotalColor"
                        setAttributes={setAttributes}
                        label="Color"
                    >
                        <ColorPicker />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="subtotalFontFamily"
                        setAttributes={setAttributes}
                        label="Font Family"
                    >
                        <FontFamilyControl />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="subtotalFontWeight"
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
                        attrNameTemplate="subtotalFontSize%s"
                        setAttributes={setAttributes}
                        label="Font Size"
                    >
                        <Slider min={1} max={100} />
                    </ResponsiveControl>
                    <ResponsiveControl
                        attrNameTemplate="subtotalMargin%s"
                        setAttributes={setAttributes}
                        label="Margin"
                    >
                        <BoxControl />
                    </ResponsiveControl>
                </PanelBody>
                <PanelBody title="Adjustments" initialOpen={false}>
                    <StaticControl
                        attrNameTemplate="adjustmentsColor"
                        setAttributes={setAttributes}
                        label="Color"
                    >
                        <ColorPicker />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="adjustmentsFontFamily"
                        setAttributes={setAttributes}
                        label="Font Family"
                    >
                        <FontFamilyControl />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="adjustmentsFontWeight"
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
                        attrNameTemplate="adjustmentsFontSize%s"
                        setAttributes={setAttributes}
                        label="Font Size"
                    >
                        <Slider min={1} max={100} />
                    </ResponsiveControl>
                    <ResponsiveControl
                        attrNameTemplate="adjustmentsMargin%s"
                        setAttributes={setAttributes}
                        label="Margin"
                    >
                        <BoxControl />
                    </ResponsiveControl>
                </PanelBody>
                <PanelBody title="Total" initialOpen={false}>
                    <StaticControl
                        attrNameTemplate="totalColor"
                        setAttributes={setAttributes}
                        label="Color"
                    >
                        <ColorPicker />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="totalFontFamily"
                        setAttributes={setAttributes}
                        label="Font Family"
                    >
                        <FontFamilyControl />
                    </StaticControl>
                    <StaticControl
                        attrNameTemplate="totalFontWeight"
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
                        attrNameTemplate="totalFontSize%s"
                        setAttributes={setAttributes}
                        label="Font Size"
                    >
                        <Slider min={1} max={100} />
                    </ResponsiveControl>
                    <ResponsiveControl
                        attrNameTemplate="totalMargin%s"
                        setAttributes={setAttributes}
                        label="Margin"
                    >
                        <BoxControl />
                    </ResponsiveControl>
                </PanelBody>
            </InspectorStyleControls>
        </>
    );
}

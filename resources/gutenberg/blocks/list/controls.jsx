import {
	ResponsiveControl,
	StaticControl,
	InspectorGeneralControls,
	InspectorStyleControls,
	PanelBody,
	Select,
	Radio,
	ColorPicker,
	Slider,
	FontFamilyControl,
} from '@gutenberg/block-controls';
import { useBlockSetAttributesContext } from '@gutenberg/hooks';

export default function Controls() {
	const setAttributes = useBlockSetAttributesContext();

	return (
		<>
			<InspectorGeneralControls>
				<PanelBody title="Content" initialOpen={ true }>
					<ResponsiveControl
						attrNameTemplate="alignment%s"
						setAttributes={ setAttributes }
						label="Alignment"
					>
						<Radio />
					</ResponsiveControl>
					<StaticControl
						attrNameTemplate="htmlTag"
						setAttributes={ setAttributes }
						label="HTML Tag"
					>
						<Select
							options={ [
								{ label: 'ul', value: 'ul' },
								{ label: 'ol', value: 'ol' },
							] }
						/>
					</StaticControl>
				</PanelBody>
			</InspectorGeneralControls>
			<InspectorStyleControls>
				<PanelBody title="Color">
					<StaticControl
						attrNameTemplate="color%s"
						setAttributes={ setAttributes }
						label={ false }
					>
						<ColorPicker />
					</StaticControl>
				</PanelBody>
				<PanelBody title="Typography">
					<ResponsiveControl
						attrNameTemplate="fontSize%s"
						setAttributes={ setAttributes }
						label="Font Size"
					>
						<Slider min={ 1 } max={ 200 } />
					</ResponsiveControl>
					<StaticControl
						attrNameTemplate="fontFamily%s"
						setAttributes={ setAttributes }
						label="Font Family"
					>
						<FontFamilyControl />
					</StaticControl>
					<StaticControl
						attrNameTemplate="fontWeight"
						setAttributes={ setAttributes }
						label="Font Weight"
					>
						<Select
							options={ [
								{ label: '100 - Thin', value: '100' },
								{ label: '200 - Extra Light', value: '200' },
								{ label: '300 - Light', value: '300' },
								{ label: '400 - Normal', value: '400' },
								{ label: '500 - Medium', value: '500' },
								{ label: '600 - Semi Bold', value: '600' },
								{ label: '700 - Bold', value: '700' },
								{ label: '800 - Extra Bold', value: '800' },
								{ label: '900 - Black', value: '900' },
							] }
						/>
					</StaticControl>
				</PanelBody>
			</InspectorStyleControls>
		</>
	);
}

/**
 * Internal dependencies
 */
import {
	InspectorStyleControls,
	InspectorAdvancedControls,
} from './inspector-tabs';

import { ResponsiveControl } from './responsive-control';
import { StaticControl } from './static-control';
import { PanelBody } from './panel-body';
import { BoxControl } from './box-control';
import { ColorPicker } from './color-picker';
import { BackgroundGroup } from './background-group';
import { Select } from './select';

import { useBlockSetAttributesContext } from '@gutenberg/hooks';

export const CommonInspectorControls = () => {
	const setAttributes = useBlockSetAttributesContext();

	return (
		<>
			<InspectorStyleControls>
				<PanelBody title="Background">
					<StaticControl
						attrNameTemplate="background"
						setAttributes={ setAttributes }
						label={ false }
					>
						<BackgroundGroup />
					</StaticControl>
				</PanelBody>
				<PanelBody title="Background Overlay">
					<StaticControl
						attrNameTemplate="backgroundOverlay"
						setAttributes={ setAttributes }
						label={ false }
					>
						<ColorPicker />
					</StaticControl>
				</PanelBody>
			</InspectorStyleControls>
			<InspectorAdvancedControls>
				<PanelBody title="Layout">
					<ResponsiveControl
						attrNameTemplate="padding%s"
						setAttributes={ setAttributes }
						label="Padding"
					>
						<BoxControl />
					</ResponsiveControl>
					<ResponsiveControl
						attrNameTemplate="margin%s"
						setAttributes={ setAttributes }
						label="Margin"
					>
						<BoxControl />
					</ResponsiveControl>
				</PanelBody>
				<PanelBody title="Border">
					<StaticControl
						attrNameTemplate="borderStyle"
						setAttributes={ setAttributes }
						label="Border Style"
					>
						<Select
							options={ [
								{ label: 'None', value: 'none' },
								{ label: 'Solid', value: 'solid' },
								{ label: 'Dashed', value: 'dashed' },
								{ label: 'Dotted', value: 'dotted' },
								{ label: 'Double', value: 'double' },
							] }
						/>
					</StaticControl>
					<StaticControl
						attrNameTemplate="borderColor"
						setAttributes={ setAttributes }
						label="Border Color"
					>
						<ColorPicker />
					</StaticControl>
					<ResponsiveControl
						attrNameTemplate="borderWidth%s"
						setAttributes={ setAttributes }
						label="Border Width"
					>
						<BoxControl />
					</ResponsiveControl>
				</PanelBody>
			</InspectorAdvancedControls>
		</>
	);
};

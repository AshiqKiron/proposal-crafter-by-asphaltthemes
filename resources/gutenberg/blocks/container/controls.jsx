import {
	Width,
	ResponsiveControl,
	InspectorGeneralControls,
	PanelBody,
	Select,
} from '@gutenberg/block-controls';
import { useBlockSetAttributesContext } from '@gutenberg/hooks';

export default function Controls() {
	const setAttributes = useBlockSetAttributesContext();

	return (
		<>
			<InspectorGeneralControls>
				<PanelBody title="Layout" initialOpen={ true }>
					<ResponsiveControl
						attrNameTemplate="maxWidth%s"
						setAttributes={ setAttributes }
						label={ false }
					>
						<Width />
					</ResponsiveControl>
				</PanelBody>
				<PanelBody title="Display" initialOpen={ false }>
					<ResponsiveControl
						attrNameTemplate="display%s"
						setAttributes={ setAttributes }
						label="Display"
					>
						<Select
							options={ [
								{ label: 'Block', value: 'block' },
								{ label: 'Flex', value: 'flex' },
								{ label: 'Inline Flex', value: 'inline-flex' },
							] }
						/>
					</ResponsiveControl>
					<ResponsiveControl
						attrNameTemplate="flexDirection%s"
						setAttributes={ setAttributes }
						label="Flex Direction"
					>
						<Select
							options={ [
								{ label: 'Row', value: 'row' },
								{ label: 'Column', value: 'column' },
								{ label: 'Row Reverse', value: 'row-reverse' },
								{
									label: 'Column Reverse',
									value: 'column-reverse',
								},
							] }
						/>
					</ResponsiveControl>
					<ResponsiveControl
						attrNameTemplate="alignItems%s"
						setAttributes={ setAttributes }
						label="Align Items"
					>
						<Select
							options={ [
								{ label: 'Stretch', value: 'stretch' },
								{ label: 'Flex Start', value: 'flex-start' },
								{ label: 'Flex End', value: 'flex-end' },
								{ label: 'Center', value: 'center' },
								{ label: 'Baseline', value: 'baseline' },
							] }
						/>
					</ResponsiveControl>
					<ResponsiveControl
						attrNameTemplate="justifyContent%s"
						setAttributes={ setAttributes }
						label="Justify Content"
					>
						<Select
							options={ [
								{ label: 'Flex Start', value: 'flex-start' },
								{ label: 'Flex End', value: 'flex-end' },
								{ label: 'Center', value: 'center' },
								{
									label: 'Space Between',
									value: 'space-between',
								},
								{
									label: 'Space Around',
									value: 'space-around',
								},
								{
									label: 'Space Evenly',
									value: 'space-evenly',
								},
							] }
						/>
					</ResponsiveControl>
				</PanelBody>
			</InspectorGeneralControls>
		</>
	);
}

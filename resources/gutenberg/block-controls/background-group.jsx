/**
 * Wordpress dependencies
 */
import {
	__experimentalRadio as RadioControl,
	__experimentalRadioGroup as ToggleGroupControl,
	TabPanel,
} from '@wordpress/components';
import styled from '@emotion/styled';
/**
 * Internal dependencies
 */
import { ColorPicker } from './color-picker';
import { ImagePicker } from './image-picker';

const ControlBox = styled( TabPanel )`
	.components-tab-panel__tabs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border: 1px solid #ddd;

		button:focus,
		button.is-active,
		button {
			outout: 0;
			box-shadow: none;
			height: 38px !important;
			justify-content: center !important;
		}

		button.is-active {
			background-color: #eee;
		}
	}

	.components-tab-panel__tab-content {
		padding: 7px 0 0 0 !important;
		border: none !important;
	}
`;

const RadioContainer = styled( ToggleGroupControl )`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	margin-top: 10px;
	margin-bottom: 10px;
	button {
		display: inline-block !important;
		text-align: center;
	}
`;

const tablist = [
	{
		name: 'color',
		title: 'Color',
	},
	{
		name: 'image',
		title: 'Image',
	},
];

const innerComponents = {
	color: ColorPicker,
	image: ImagePicker,
};

export function BackgroundGroup( props ) {
	const value = props.value || {
		type: 'color',
		repeat: 'no-repeat',
		size: 'cover',
		value: '',
	};

	const onTabChange = ( activeTab ) => {
		if ( activeTab === value.type ) return;

		props.onChange( {
			...value,
			value: '',
			type: activeTab,
		} );
	};

	const onInnerComponentChange = ( key, val ) => {
		props.onChange( {
			...value,
			[ key ]: val,
		} );
	};

	const onValueChange = ( val ) => {
		props.onChange( {
			...value,
			value: val,
		} );
	};

	const tabValue = value.type || 'color';

	return (
		<div>
			<ControlBox
				activeClass="is-active"
				onSelect={ onTabChange }
				initialTabName={ tabValue }
				tabs={ tablist }
			>
				{ ( tab ) => {
					const Component = innerComponents[ tab.name ];
					return (
						<>
							<Component
								value={ value.value }
								onChange={ onValueChange }
							/>
							{ tabValue === 'image' && (
								<>
									<RadioContainer
										checked={ value.size }
										onChange={ ( val ) =>
											onInnerComponentChange(
												'size',
												val
											)
										}
									>
										<RadioControl value="contain">
											Contain
										</RadioControl>
										<RadioControl value="cover">
											Cover
										</RadioControl>
										<RadioControl value="auto">
											Auto
										</RadioControl>
									</RadioContainer>

									<RadioContainer
										checked={ value.repeat }
										onChange={ ( val ) =>
											onInnerComponentChange(
												'repeat',
												val
											)
										}
									>
										<RadioControl value="no-repeat">
											No Repeat
										</RadioControl>
										<RadioControl value="repeat">
											Repeat
										</RadioControl>
									</RadioContainer>
								</>
							) }
						</>
					);
				} }
			</ControlBox>
		</div>
	);
}

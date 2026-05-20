import { ColorPalette } from '@wordpress/components';
import styled from '@emotion/styled';

const Wrapper = styled.div``;

const colors = [
	{ name: 'black', color: '#000000' },
	{ name: 'white', color: '#ffffff' },
	{ name: 'lavender', color: '#CBBAFC' },
	{ name: 'yellow', color: '#FFF855' },
	{ name: 'blue', color: '#529FFFB0' },
	{ name: 'orange', color: '#FF9100' },
];

export const ColorPicker = ( props ) => {
	const onChange = ( value ) => {
		props.onChange( value );
	};

	return (
		<Wrapper>
			<ColorPalette
				label={ false }
				value={ props.value }
				onChange={ onChange }
				enableAlpha
				clearable={ false }
				colors={ colors }
			/>
		</Wrapper>
	);
};

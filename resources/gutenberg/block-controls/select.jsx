import { default as ReactSelect } from 'react-select';
import styled from '@emotion/styled';

const Wrapper = styled.div`
	position: relative;
	input[type='text']:focus {
		box-shadow: none !important;
	}

	.pc-select-dropdown {
		z-index: 9999;
	}
`;

export function Select( props ) {
	let defaultValue = {};

	if ( props.value ) {
		( props.options || [] ).map( ( item ) => {
			if ( props.value == item.value ) {
				defaultValue = item;
			}
		} );
	}

	return (
		<Wrapper>
			<ReactSelect
				value={ defaultValue }
				maxMenuHeight={ 300 }
				menuPlacement="auto"
				classNames={ {
					menu: () => 'pc-select-dropdown',
				} }
				onChange={ ( val ) => {
					props.onChange( val.value );
				} }
				options={ props.options || [] }
			/>
		</Wrapper>
	);
}

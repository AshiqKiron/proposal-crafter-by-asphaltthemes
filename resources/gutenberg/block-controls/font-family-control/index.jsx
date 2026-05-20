import { default as ReactSelect } from 'react-select';
import styled from '@emotion/styled';
import { useState, useEffect } from '@wordpress/element';

const loadGoogleFonts = async () => {
	const { default: fonts } = await import(
		/* webpackChunkName: "google-fonts" */ './google-fonts.json'
	);
	return fonts.map( ( font ) => ( {
		label: font.family,
		value: font.family,
	} ) );
};

const Wrapper = styled.div`
	position: relative;
	z-index: 9999;
	input[type='text']:focus {
		box-shadow: none !important;
	}
`;

export function FontFamilyControl( props ) {
	let defaultValue = {};

	const [ googleFontOptions, setGoogleFontOptions ] = useState( [] );

	useEffect( () => {
		loadGoogleFonts().then( ( fontOptions ) => {
			setGoogleFontOptions( fontOptions );
		} );
	}, [] );

	if ( props.value ) {
		( googleFontOptions || [] ).map( ( item ) => {
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
				onChange={ ( val ) => {
					props.onChange( val.value );
				} }
				options={ googleFontOptions || [] }
			/>
		</Wrapper>
	);
}

import { BoxControl as CoreBoxControl } from '@wordpress/components';
import styled from '@emotion/styled';

const Wrapper = styled.div`
	margin-top: -30px;

	.components-base-control {
		margin-bottom: 0;
	}

	.components-grid {
		gap: 4px;
	}
`;

export const BoxControl = ( props ) => {
	const onChange = ( value ) => {
		const newValue = {};
		Object.keys( value ).forEach( ( key ) => {
			if ( ! isNaN( Number( value[ key ] ) ) ) {
				newValue[ key ] = `${ value[ key ] }px`;
				return;
			}
			newValue[ key ] = value[ key ];
		} );

		props.onChange( newValue );
	};

	return (
		<Wrapper>
			<CoreBoxControl
				label={ false }
				values={ props.value }
				allowReset={ false }
				onChange={ onChange }
			/>
		</Wrapper>
	);
};

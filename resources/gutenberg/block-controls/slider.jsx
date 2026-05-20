import { RangeControl } from '@wordpress/components';
import styled from '@emotion/styled';

const SliderControl = styled( RangeControl )`
	padding: 0 !important;
	border-bottom: 0 !important;
`;

export function Slider( props ) {
	return (
		<SliderControl
			value={ props.value }
			onChange={ props.onChange }
			min={ props.min || 0 }
			max={ props.max || 100 }
		/>
	);
}

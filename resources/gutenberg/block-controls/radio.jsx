/**
 * Wordpress dependencies
 */
import {
	__experimentalRadio as ExpRadio,
	__experimentalRadioGroup as ExpRadioGroup,
} from '@wordpress/components';
/**
 * External dependencies
 */
import styled from '@emotion/styled';

const RadioContainer = styled( ExpRadioGroup )`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	button {
		display: inline-block !important;
		text-align: center;
	}
`;

const horizontalAlign = [
	{
		value: 'left',
		label: '<span class="dashicons dashicons-align-pull-left"></span>',
	},
	{
		value: 'center',
		label: '<span class="dashicons dashicons-align-center"></span>',
	},
	{
		value: 'right',
		label: '<span class="dashicons dashicons-align-pull-right"></span>',
	},
];

export function Radio( props ) {
	const options = props.options || horizontalAlign;

	return (
		<RadioContainer checked={ props.value } onChange={ props.onChange }>
			{ options.map( ( item, index ) => (
				<ExpRadio key={ index } value={ item.value }>
					<span
						title={ item.label }
						dangerouslySetInnerHTML={ { __html: item.label } }
					/>
				</ExpRadio>
			) ) }
		</RadioContainer>
	);
}

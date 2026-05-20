import styled from '@emotion/styled';
import { CheckboxControl } from '@wordpress/components';

const StyledCheckboxControl = styled(CheckboxControl)`
	margin-bottom: 0 !important;
	
	.components-checkbox-control__input {
		appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 4px;
		border: 1px solid ${({ theme }) => theme.colors.grey200};
		background-color: #fff;
		cursor: pointer;
		margin: 0;
		transition: all 0.2s ease;
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;

		&:checked {
			background-color: #4F46E5;
			border-color: #4F46E5;
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");
			background-size: 14px 14px;
			background-position: center;
			background-repeat: no-repeat;
		}

		&:hover:not(:checked) {
			border-color: #CBD5E1;
			background-color: #F8FAFC;
		}

		&:focus {
			outline: 0;
			outline-offset: 0;
			box-shadow: none;
            border-color: ${({ theme }) => theme.colors.grey200};
		}
	}
	
	/* Hide the default SVG checkmark if WP adds one, though appearance:none usually handles it on the input */
	.components-checkbox-control__checked {
		display: none;
	}
`;

export const Checkbox = (props) => {
	return <StyledCheckboxControl __nextHasNoMarginBottom {...props} />;
};

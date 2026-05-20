import styled from '@emotion/styled';
import { cloneElement } from '@wordpress/element';
import { v4 as uuidv4 } from 'uuid';

const Wrapper = styled.div`
	display: grid;
	gap: 8px;
	position: relative;

	input {
		--border-color: ${({ hasError, theme }) =>
		hasError ? theme.colors.danger : '#CBD5E1'}; // Darker grey for border
		--placeholder-color: ${({ hasError, theme }) =>
		hasError ? theme.colors.danger : theme.colors.grey200};
		--text-color: ${({ hasError, theme }) =>
		hasError ? theme.colors.danger : theme.colors.dark};
		font-size: 15px;
		padding: 12px 16px;
		border: 1px solid var( --border-color );
		font-family: ${({ theme }) => theme.fonts.inter};
		border-radius: 5px;
		width: 100%;
		display: block;
		color: var( --text-color );

		&::placeholder {
			color: var( --placeholder-color );
		}

		&:hover {
			border-color: ${({ theme, hasError }) =>
		hasError ? theme.colors.danger : theme.colors.primary};
		}

		&:focus {
			outline: none !important;
			box-shadow: none !important;
			border-color: ${({ theme, hasError }) =>
		hasError ? theme.colors.danger : theme.colors.primary};
		}
	}

	${({ sx }) => sx || ''}
`;

const Label = styled.label`
	font-family: ${({ theme }) => theme.fonts.inter};
	font-weight: 400;
	font-style: Regular;
	font-size: 14px;
	letter-spacing: 0%;
	vertical-align: middle;
`;

const RedAsterisk = styled.span`
	color: #EF4444; 
`;

const ErrorMessage = styled.span`
	color: ${({ theme }) => theme.colors.danger};
	font-size: 10px;
	position: absolute;
	bottom: -19px;
`;

export const InputBase = (props) => {
	const instanceId = uuidv4();

	// Check if label ends with *
	const hasAsterisk = props.label && props.label.endsWith('*');
	const labelText = hasAsterisk ? props.label.slice(0, -1) : props.label;

	return (
		<Wrapper hasError={!!props.errorMessage} sx={props.sx}>
			<Label htmlFor={instanceId}>
				{labelText}
				{hasAsterisk && <RedAsterisk>*</RedAsterisk>}
			</Label>
			<div>{cloneElement(props.children, { id: instanceId })}</div>
			{props.errorMessage && (
				<ErrorMessage>{props.errorMessage}</ErrorMessage>
			)}
		</Wrapper>
	);
};

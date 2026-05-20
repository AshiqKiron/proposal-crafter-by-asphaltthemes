import styled from '@emotion/styled';
import { DeviceSwitcher } from './device-switcher';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const LabelWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 0px;
`;

const Label = styled.label`
	font-weight: 500;
	font-size: 13px;
	line-height: 1;
`;

export const ControlBase = ( props ) => {
	const hasLabel = !! props.label;

	return (
		<Wrapper>
			{ hasLabel && (
				<LabelWrapper>
					<Label>{ props.label }</Label>
					{ props.responsive && <DeviceSwitcher /> }
				</LabelWrapper>
			) }
			<div>{ props.children }</div>
		</Wrapper>
	);
};

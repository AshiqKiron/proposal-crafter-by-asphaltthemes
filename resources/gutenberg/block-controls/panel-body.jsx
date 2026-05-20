import { PanelBody as CorePanelBody } from '@wordpress/components';
import styled from '@emotion/styled';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const PanelBody = ( props ) => {
	return (
		<CorePanelBody initialOpen={ props.initialOpen } title={ props.title }>
			<Wrapper>{ props.children }</Wrapper>
		</CorePanelBody>
	);
};

PanelBody.defaultProps = {
	initialOpen: false,
	title: 'Panel Title',
};

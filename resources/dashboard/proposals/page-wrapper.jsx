import styled from '@emotion/styled';
import { doAction } from '@wordpress/hooks';
import { PrimaryButton } from '@dashboard/components';

const Wrapper = styled.div`
	padding: 10px;
`;

const Header = styled.div`
	margin-bottom: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Heading = styled.h2`
	font-family: ${({ theme }) => theme.fonts.inter};
	color: ${({ theme }) => theme.colors.dark};
	margin: 0;
	padding: 0;
	font-size: 36px;
	font-weight: 700;
`;

const HeaderActions = styled.div``;

const Body = styled.div``;

export default function PageWrapper(props) {
	const openCreateProposalModal = () => {
		doAction('asphalt-proposal-manager.open-create-proposal-modal', true);
	};

	return (
		<Wrapper>
			<Header>
				<Heading>Proposals</Heading>
				<HeaderActions>
					<PrimaryButton onClick={openCreateProposalModal}>
						Create New Proposal
					</PrimaryButton>
				</HeaderActions>
			</Header>
			<Body>{props.children}</Body>
		</Wrapper>
	);
}

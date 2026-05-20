import styled from '@emotion/styled';
import { doAction } from '@wordpress/hooks';
/**
 * Internal dependencies
 */
import { assetsUrl } from '@dashboard/utils';
import Card from './card';
import { PrimaryButton } from '@dashboard/components';

const Wrapper = styled.div`
	background-color: ${ ( { theme } ) => theme.colors.white };
	border-radius: ${ ( { theme } ) => theme.radius.xxl };
	margin-top: 16px;
	display: flex;
	align-items: center;
	gap: 16px;
	overflow: hidden;
`;

const Image = styled.img`
	pointer-events: none;
	user-select: none;
`;

export default function CreateProposal() {
	const openCreateProposalModal = () => {
		doAction( 'asphalt-proposal-manager.open-create-proposal-modal', true );
	};

	return (
		<Wrapper>
			<Image
				src={ assetsUrl( '/images/target-colorful.png' ) }
				width={ 272 }
				height={ 222 }
				loading="lazy"
				alt="target"
			/>
			<Card maxWidth="500px">
				<Card.Content>
					<Card.Subtitle>🌟 Let’s get started!</Card.Subtitle>
					<Card.Title>
						Effortlessly Craft Winning Proposals
					</Card.Title>
					<Card.Text>
						Create stunning professional proposals in minutes.
						Customize templates and get faster approvals. Perfect
						for freelancers and agencies.
					</Card.Text>
				</Card.Content>
				<PrimaryButton onClick={ openCreateProposalModal }>
					+ Create Proposal
				</PrimaryButton>
			</Card>
		</Wrapper>
	);
}

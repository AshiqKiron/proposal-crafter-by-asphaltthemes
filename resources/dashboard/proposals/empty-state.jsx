/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { doAction } from '@wordpress/hooks';
/**
 * Internal dependencies
 */
import { assetsUrl } from '@dashboard/utils';
import { PrimaryButton } from '@dashboard/components';

const Wrapper = styled.div`
	background-color: ${ ( { theme } ) => theme.colors.white };
	border-radius: ${ ( { theme } ) => theme.radius.lg };
	max-width: 700px;
	margin: 12vh auto 0 auto;
	padding: 60px 40px;
	text-align: center;
`;

const Image = styled.img`
	pointer-events: none;
	user-select: none;
	display: block;
	margin: 0 auto 20px auto;
`;

const Heading = styled.h2`
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	color: ${ ( { theme } ) => theme.colors.dark };
	margin: 0 0 8px 0;
	padding: 0;
	font-size: 16px;
	font-weight: 600;
`;

const Text = styled.p`
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	color: ${ ( { theme } ) => theme.colors.grey300 };
	font-size: 14px;
	margin: 0 0 20px 0;
	padding: 0;
`;

export default function EmptyState() {
	const openCreateProposalModal = () => {
		doAction( 'asphalt-proposal-manager.open-create-proposal-modal', true );
	};

	return (
		<Wrapper>
			<Image
				src={ assetsUrl( '/images/empty-proposal.png' ) }
				width={ 177 }
				height={ 137 }
				loading="lazy"
				alt="empty-proposal"
			/>
			<Heading>You haven’t created any proposal yet</Heading>
			<Text>Create your first proposal now!</Text>
			<PrimaryButton onClick={ openCreateProposalModal }>
				Create New Proposal
			</PrimaryButton>
		</Wrapper>
	);
}

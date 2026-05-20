import styled from '@emotion/styled';
import { assetsUrl } from '@dashboard/utils';
import Card from './card';
import { SecondaryOutlineButton } from '@dashboard/components';

const Wrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: ${({ theme }) => theme.radius.xxl};
	margin-top: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	padding-left: 25px;
	overflow: hidden;
`;

const Image = styled.img`
	pointer-events: none;
	user-select: none;
`;

export default function ProductGuides() {
	const openUrl = (target = '_blank') => {
		window.open('https://asphaltthemes.com/docs/asphalt-proposal-manager/', target);
	};

	return (
		<Wrapper>
			<Card maxWidth="360px">
				<Card.Content>
					<Card.Subtitle>
						📌 Proposal Craft Feedback Portal
					</Card.Subtitle>
					<Card.Title>Stay Informed and Involved</Card.Title>
					<Card.Text>
						Get the latest updates and track the progress of Back
						Office development
					</Card.Text>
				</Card.Content>
				<SecondaryOutlineButton onClick={openUrl}>
					Check our product guides!
				</SecondaryOutlineButton>
			</Card>
			<Image
				src={assetsUrl('/images/product-guides.png')}
				width={275}
				height={223}
				loading="lazy"
				alt="product-guides"
			/>
		</Wrapper>
	);
}

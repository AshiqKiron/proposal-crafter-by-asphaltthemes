import styled from '@emotion/styled';
import { useCopyToClipboard } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { SecondaryOutlineButton } from '@dashboard/components';
import { assetsUrl } from '@dashboard/utils';

const Wrapper = styled.div`
	margin-top: 32px;
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const Title = styled.div`
	font-size: 16px;
	font-weight: 600;
	font-family: ${({ theme }) => theme.fonts.inter};
	color: ${({ theme }) => theme.colors.dark};
	margin-bottom: 6px;
`;

const Text = styled.div`
	font-size: 14px;
	font-family: ${({ theme }) => theme.fonts.inter};
	color: ${({ theme }) => theme.colors.dark};
	line-height: 1.5 !important;
`;

const ImageBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 26px;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: ${({ theme }) => theme.radius.xxl};
	padding: 16px;
`;

const Content = styled.div`
	display: flex;
	gap: 26px;
	align-items: center;
`;

Content.Title = styled.div`
	font-size: 16px;
	font-family: ${({ theme }) => theme.fonts.inter};
	color: ${({ theme }) => theme.colors.dark};
	margin-bottom: 6px;
`;

Content.Text = styled.div`
	font-size: 14px;
	font-family: ${({ theme }) => theme.fonts.inter};
	color: ${({ theme }) => theme.colors.grey300};
`;

const Image = styled.img`
	pointer-events: none;
	user-select: none;
`;

export default function Support() {
	const [btnText, setBtnText] = useState('Copy Email');
	let timer = null;

	const copyRef = useCopyToClipboard('contact.asphaltthemes@gmail.com', () => {
		setBtnText('Copied!');

		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			setBtnText('Copy Email');
		}, 1000);
	});

	return (
		<Wrapper>
			<div>
				<Title>Need Help?</Title>
				<Text>
					Contact us if you have any issues using the site or want an
					update on developments.
				</Text>
			</div>
			<ImageBox>
				<Content>
					<Image
						src={assetsUrl('/images/copy-email.png')}
						width={102}
						height={80}
						loading="lazy"
						alt="copy-email"
					/>
					<div>
						<Content.Title>
							Hi, need any help? Send us an email
						</Content.Title>
						<Content.Text>contact.asphaltthemes@gmail.com</Content.Text>
					</div>
				</Content>
				<SecondaryOutlineButton
					style={{ width: '143px' }}
					ref={copyRef}
				>
					{btnText}
				</SecondaryOutlineButton>
			</ImageBox>
		</Wrapper>
	);
}

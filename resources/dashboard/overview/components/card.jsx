import styled from '@emotion/styled';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 16px;
	align-items: flex-start;
	max-width: ${ ( props ) => props.maxWidth };
`;

export default function Card( props ) {
	return <Wrapper { ...props } />;
}

Card.Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

Card.Subtitle = styled.div`
	font-size: 14px;
	font-family: ${ ( { theme } ) => theme.fonts.inter };
`;

Card.Title = styled.div`
	font-size: 20px;
	font-weight: 600;
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	color: ${ ( { theme } ) => theme.colors.dark };
`;

Card.Text = styled.div`
	font-size: 14px;
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	color: ${ ( { theme } ) => theme.colors.grey300 };
	line-height: 1.5 !important;
`;

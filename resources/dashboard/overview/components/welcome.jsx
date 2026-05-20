import styled from '@emotion/styled';
import { capitalize } from 'lodash';
import { FaRegCalendarAlt } from 'react-icons/fa';

/**
 * Internal dependencies
 */
import { useCurrentUser } from '@dashboard/hooks';

const Wrapper = styled.div`
	background-color: ${ ( { theme } ) => theme.colors.white };
	border-radius: ${ ( { theme } ) => theme.radius.xxl };
	padding: 24px 34px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
`;

const Trophy = styled.div`
	font-size: 64px;
`;

const Heading = styled.h2`
	font-size: 32px;
	font-weight: 600;
	margin: 8px 0 6px 0;
	line-height: 1.2;
	font-family: ${ ( { theme } ) => theme.fonts.inter };
`;

const Subheading = styled.div`
	font-size: 16px;
	font-family: ${ ( { theme } ) => theme.fonts.inter };
`;

const DateText = styled.div`
	font-size: 14px;
	display: flex;
	align-items: center;
	gap: 4px;
	color: ${ ( { theme } ) => theme.colors.grey300 };
`;

const today = new Date();
const day = today.getDate().toString().padStart( 2, '0' );
const month = today.toLocaleString( 'en-US', { month: 'short' } );
const year = today.getFullYear();
const formatted = `${ day } ${ month }, ${ year }`;

export default function Welcome() {
	const { data } = useCurrentUser();

	return (
		<Wrapper>
			<div>
				<Subheading>Welcome to Proposal Crafter by Asphalt Themes</Subheading>
				<Heading>
					{ data ? `Hi ${ capitalize( data.name ) }, ` : '' }
					Welcome Back!
				</Heading>
				<DateText>
					<FaRegCalendarAlt />
					Today: { formatted }
				</DateText>
			</div>
			<Trophy>🏆</Trophy>
		</Wrapper>
	);
}

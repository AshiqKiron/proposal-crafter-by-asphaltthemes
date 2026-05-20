/**
 * External dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';

const Wrapper = styled.div`
	--pc-top-spacing: 35px;
	max-width: 957px;
	margin: var( --pc-top-spacing ) auto 50px auto;
`;

const withPageWrapper = ( parentProps ) =>
	createHigherOrderComponent(
		( WrappedComponent ) => ( props ) => {
			return (
				<Wrapper>
					<Helmet>
						<title>{ parentProps.title } - Proposal Crafter by Asphalt Themes</title>
					</Helmet>
					<WrappedComponent { ...props } />
				</Wrapper>
			);
		},
		'withPageWrapper'
	);

export default withPageWrapper;

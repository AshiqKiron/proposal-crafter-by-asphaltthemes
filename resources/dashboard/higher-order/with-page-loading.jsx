/**
 * External dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import Skeleton from 'react-loading-skeleton';

import styled from '@emotion/styled';

const Wrapper = styled.div`
	background-color: ${ ( { theme } ) => theme.colors.white };
	border-radius: ${ ( { theme } ) => theme.radius.lg };
	padding: 20px;
`;

const Grid = styled.div`
	& > span {
		display: flex;
		gap: 2px;
	}
`;

const withPageLoading = () =>
	createHigherOrderComponent(
		( WrappedComponent ) => ( props ) => {
			const { hasFinishedResolution } = props;

			if ( ! hasFinishedResolution ) {
				return (
					<Wrapper>
						<Skeleton
							count={ 1 }
							height={ 80 }
							style={ { marginBottom: '4px' } }
						/>
						<Grid>
							<Skeleton
								count={ 3 }
								height={ 50 }
								style={ { marginBottom: '4px' } }
							/>
						</Grid>
						<Skeleton
							count={ 2 }
							height={ 80 }
							style={ { marginBottom: '4px' } }
						/>
						<Grid>
							<Skeleton
								count={ 2 }
								height={ 100 }
								style={ { marginBottom: '4px' } }
							/>
						</Grid>
					</Wrapper>
				);
			}

			return <WrappedComponent { ...props } />;
		},
		'withPageLoading'
	);

export default withPageLoading;

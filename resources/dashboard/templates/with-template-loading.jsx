import { TemplateGrid } from './style';
import Skeleton from 'react-loading-skeleton';
import { createHigherOrderComponent } from '@wordpress/compose';

const withTemplateLoading = () =>
	createHigherOrderComponent(
		( WrappedComponent ) => ( props ) => {
			const { hasFinishedResolution } = props;

			if ( hasFinishedResolution ) {
				return <WrappedComponent { ...props } />;
			}

			return (
				<TemplateGrid>
					<Skeleton count={ 1 } height={ 140 } />
					<Skeleton count={ 1 } height={ 140 } />
					<Skeleton count={ 1 } height={ 140 } />
					<Skeleton count={ 1 } height={ 140 } />
					<Skeleton count={ 1 } height={ 140 } />
					<Skeleton count={ 1 } height={ 140 } />
				</TemplateGrid>
			);
		},
		'withTemplateLoading'
	);

export default withTemplateLoading;

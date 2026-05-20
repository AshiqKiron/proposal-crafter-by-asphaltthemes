import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockAttributesProvider } from '@gutenberg/hooks';

const withBlockAttributeContext = createHigherOrderComponent(
	( WrappedComponent ) => ( props ) => {
		return (
			<BlockAttributesProvider { ...props }>
				<WrappedComponent { ...props } />
			</BlockAttributesProvider>
		);
	},
	'withBlockAttributeContext'
);

export default withBlockAttributeContext;

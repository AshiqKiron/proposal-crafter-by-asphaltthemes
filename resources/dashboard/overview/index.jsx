/**
 * External dependencies
 */
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */
import { withPageWrapper } from '@dashboard/higher-order';
import Welcome from './components/welcome';
import CreateProposal from './components/create-proposal';
import ProductGuides from './components/product-guides';
import Support from './components/support';

function Overview() {
	return (
		<>
			<Welcome />
			<CreateProposal />
			<ProductGuides />
			<Support />
		</>
	);
}

export default compose(
	withPageWrapper( {
		title: 'Overview',
	} )
)( Overview );

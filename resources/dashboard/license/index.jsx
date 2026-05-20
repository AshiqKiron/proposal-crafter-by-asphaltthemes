/**
 * External dependencies
 */
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */
import { withPageWrapper } from '@dashboard/higher-order';
import ActivePlan from './active-plan';
import TableHeader from './table-header';
import TableBody from './table-body';
import TableFooter from './table-footer';
import { PageWrapper } from './style';

function License() {
	return (
		<PageWrapper>
			<ActivePlan />
			<TableHeader />
			<div>
				<TableBody />
				<TableFooter />
			</div>
		</PageWrapper>
	);
}

export default compose(
	withPageWrapper( {
		title: 'License',
	} )
)( License );

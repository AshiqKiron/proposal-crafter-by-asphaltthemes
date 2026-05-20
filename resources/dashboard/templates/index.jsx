/**
 * External dependencies
 */
import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { withPageWrapper } from '@dashboard/higher-order';
import { useWrapperPosition } from '@dashboard/hooks';
import { assetsUrl } from '@dashboard/utils';
import {
	Wrapper,
	Header,
	HeaderContent,
	TemplateRequestButton,
	Heading,
	Paragraph,
	FilterHeader,
	FilterItem,
} from './style';
import TemplateList from './template-list';
import { TemplateDetailsModal } from './template-details-modal';

function Templates() {
	const [activeFilter, setActiveFilter] = useState('all');
	const { wrapperRef, position } = useWrapperPosition();

	return (
		<Wrapper ref={wrapperRef} style={position}>
			<Header>
				<HeaderContent>
					<Heading>Templates</Heading>
					<Paragraph>
						Create stunning, professional proposals in minutes.
						Customize templates, manage projects, and get faster
						approvals. Perfect for freelancers and agencies.
					</Paragraph>
				</HeaderContent>
				{/* <TemplateRequestButton
					href="https://proposalcrafter.com/template-request/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={ assetsUrl( 'svg/template-icon.svg' ) }
						width={ 16 }
						height={ 16 }
						alt="template-icon"
					/>
					<span>Submit Template Request</span>
				</TemplateRequestButton> */}
			</Header>
			{/* <FilterHeader>
				<FilterItem
					active={activeFilter === 'all'}
					onClick={() => setActiveFilter('all')}
				>
					All Templates
				</FilterItem>
				<FilterItem
					active={activeFilter === 'saved'}
					onClick={() => setActiveFilter('saved')}
				>
					Saved Templates
				</FilterItem>
			</FilterHeader> */}
			<TemplateList filter={activeFilter} />
			<TemplateDetailsModal />
		</Wrapper>
	);
}

export default compose(
	withPageWrapper({
		title: 'Templates',
	})
)(Templates);

import styled from '@emotion/styled';
import { useFormikContext } from 'formik';
import { Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { useNavigator, Fill } from '@wordpress/components';
import { doAction } from '@wordpress/hooks';
import Skeleton from 'react-loading-skeleton';
/**
 * Internal dependencies
 */
import {
	Footer,
	Header,
	Heading,
	Paragraph,
	TemplateGrid,
	CloseButton,
} from './style';
import { PrimaryButtonFull, PrimaryButtonOutline } from '@dashboard/components';
import { useFormSubmissionStatus } from './hooks';
import { TemplateCard } from './template-card';
import CrossIcon from './icons/cross';

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	min-width: 700px;
	max-width: 800px;
`;

const Body = styled.div`
	padding: 0 28px;
`;

function Templates( props ) {
	const { templates, hasFinishedResolution } = props;
	const [ isSubmitting ] = useFormSubmissionStatus();
	const navigator = useNavigator();

	const { values, setFieldValue, handleSubmit } = useFormikContext();

	const onChangeTemplateId = ( template ) => {
		if ( template.package === 'paid' || template.coming_soon ) {
			return;
		}

		setFieldValue( 'templateId', template.id );
	};

	return (
		<Fragment>
			<Content>
				<Header>
					<Heading>Choose template</Heading>
					<Paragraph>
						Create stunning professional proposals in minutes.
						Customize templates and get faster approvals. Perfect
						for freelancers and agencies.
					</Paragraph>
					<CloseButton
						onClick={ () =>
							doAction(
								'asphalt-proposal-manager.open-create-proposal-modal',
								false
							)
						}
					>
						<CrossIcon />
					</CloseButton>
				</Header>
				<Body>
					{ hasFinishedResolution ? (
						<TemplateGrid>
							{ templates.map( ( item ) => (
								<TemplateCard
									key={ item.id }
									onClick={ () => onChangeTemplateId( item ) }
									selected={ values.templateId === item.id }
									isComingSoon={ item.coming_soon }
								>
									<TemplateCard.Header
										isPaid={ item.package === 'paid' }
										isComingSoon={ item.coming_soon }
									>
										<TemplateCard.Image
											src={ item.thumbnail_image }
											alt={ item.title }
										/>
									</TemplateCard.Header>
									<TemplateCard.Body isComingSoon={ item.coming_soon }>
										<TemplateCard.Heading>
											{ item.title }
										</TemplateCard.Heading>
									</TemplateCard.Body>
								</TemplateCard>
							) ) }
						</TemplateGrid>
					) : (
						<TemplateGrid>
							<Skeleton count={ 1 } height={ 140 } />
							<Skeleton count={ 1 } height={ 140 } />
							<Skeleton count={ 1 } height={ 140 } />
							<Skeleton count={ 1 } height={ 140 } />
							<Skeleton count={ 1 } height={ 140 } />
							<Skeleton count={ 1 } height={ 140 } />
						</TemplateGrid>
					) }
				</Body>
			</Content>
			<Fill name="ProposalModalFooter">
				<Footer>
					<PrimaryButtonOutline onClick={ navigator.goBack }>
						Go Back
					</PrimaryButtonOutline>
					<PrimaryButtonFull
						type="submit"
						onClick={ handleSubmit }
						disabled={isSubmitting || !hasFinishedResolution || !values.templateId}
					>
						{ isSubmitting ? 'Processing...' : 'Create Proposal' }
					</PrimaryButtonFull>
				</Footer>
			</Fill>
		</Fragment>
	);
}

const applyWithSelect = withSelect( ( select ) => {
	const templates = select( 'asphalt-proposal-manager/templates' );
	return {
		templates: templates.getList(),
		hasFinishedResolution: templates.hasFinishedResolution( 'getList' ),
	};
} );

export default compose( applyWithSelect )( Templates );

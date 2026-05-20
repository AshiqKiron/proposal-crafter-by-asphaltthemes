import styled from '@emotion/styled';
import { useFormikContext } from 'formik';
import { Fragment } from '@wordpress/element';
import { useNavigator, Fill } from '@wordpress/components';
import { doAction } from '@wordpress/hooks';
/**
 * Internal dependencies
 */
import { Card } from './card';
import { assetsUrl } from '@dashboard/utils';
import { Footer, Header, Heading, Paragraph, CloseButton } from './style';
import { PrimaryButtonFull } from '@dashboard/components';
import CrossIcon from './icons/cross';

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
`;

const Body = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 18px;
	padding: 0 28px;
	max-width: 650px;
	margin: 0 auto;
`;

export function TemplateSource() {
	const { values, setFieldValue } = useFormikContext();
	const navigator = useNavigator();

	const onChangeSourceType = ( type ) => {
		setFieldValue( 'sourceType', type );
	};

	const goNextStep = () => {
		navigator.goTo( '/info-form' );
	};

	return (
		<Fragment>
			<Content>
				<Header>
					<Heading>🏆 Create Your Next Winning Proposal</Heading>
					<Paragraph>Quick and Easy Steps to Success</Paragraph>
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
					<Card
						onClick={ () => onChangeSourceType( 'scratch' ) }
						selected={ values.sourceType === 'scratch' }
					>
						<Card.Image
							src={ assetsUrl( 'images/create-from-empty.svg' ) }
						/>
						<Card.Body>
							<Card.Heading>Create from scratch</Card.Heading>
							<Card.Text>
								Start from a blank template and customize as you
								like
							</Card.Text>
						</Card.Body>
					</Card>
					<Card
						onClick={ () => onChangeSourceType( 'template' ) }
						selected={ values.sourceType === 'template' }
					>
						<Card.Image
							src={ assetsUrl(
								'images/create-from-template.svg'
							) }
						/>
						<Card.Body>
							<Card.Heading>Create from templates</Card.Heading>
							<Card.Text>
								Use our beautiful templates to quick start
								easily
							</Card.Text>
						</Card.Body>
					</Card>
				</Body>
			</Content>
			<Fill name="ProposalModalFooter">
				<Footer>
					<PrimaryButtonFull
						style={ { gridColumn: '1/3' } }
						onClick={ goNextStep }
					>
						Let’s Get Started
					</PrimaryButtonFull>
				</Footer>
			</Fill>
		</Fragment>
	);
}

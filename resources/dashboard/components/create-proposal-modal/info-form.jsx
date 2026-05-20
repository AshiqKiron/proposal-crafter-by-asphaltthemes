import styled from '@emotion/styled';
import { useFormikContext } from 'formik';
import { Fragment } from '@wordpress/element';
import { useNavigator, Fill } from '@wordpress/components';
import { doAction } from '@wordpress/hooks';
/**
 * Internal dependencies
 */
import {
	Footer,
	Header,
	Heading,
	Paragraph,
	Divider,
	InputGroup,
	CloseButton,
} from './style';
import {
	PrimaryButtonFull,
	PrimaryButtonOutline,
	TextInput,
	InputBase,
} from '@dashboard/components';
import { useFormSubmissionStatus } from './hooks';
import CrossIcon from './icons/cross';

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	min-width: 800px;
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 0 28px;
`;

export function InfoForm() {
	const [ isSubmitting ] = useFormSubmissionStatus();
	const {
		values,
		setFieldValue,
		errors,
		validateField,
		isValid,
		touched,
		setTouched,
		setFieldTouched,
		handleSubmit,
	} = useFormikContext();

	const isScratch = values.sourceType === 'scratch';
	const isTemplate = values.sourceType === 'template';

	const navigator = useNavigator();

	const setTouchedForm = () => {
		setTouched( {
			title: true,
			senderEmail: true,
			senderName: true,
			clientEmail: true,
			clientName: true,
		} );
	};

	const validateFields = () => {
		validateField( 'title' );
		validateField( 'senderEmail' );
		validateField( 'senderName' );
		validateField( 'clientEmail' );
		validateField( 'clientName' );
	};

	const goToTemplateSelection = () => {
		setTouchedForm();
		validateFields();
		if ( isValid ) {
			navigator.goTo( '/info-form/templates' );
		}
	};

	return (
		<Fragment>
			<Content>
				<Header>
					<Heading>Create your proposal</Heading>
					<Paragraph>
						Create stunning, professional proposals in minutes.{ ' ' }
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
					<InputBase
						label="Proposal Title*"
						errorMessage={ touched.title && errors.title }
					>
						<TextInput
							placeholder="Type name here"
							value={ values.title }
							onBlur={ () => setFieldTouched( 'title', true ) }
							onChange={ ( e ) =>
								setFieldValue( 'title', e.target.value )
							}
						/>
					</InputBase>
					<Divider />
					<InputGroup>
						<InputBase
							label="Sender Email*"
							errorMessage={
								touched.senderEmail && errors.senderEmail
							}
						>
							<TextInput
								placeholder="example@mail.com"
								value={ values.senderEmail }
								onBlur={ () =>
									setFieldTouched( 'senderEmail', true )
								}
								onChange={ ( e ) =>
									setFieldValue(
										'senderEmail',
										e.target.value
									)
								}
							/>
						</InputBase>
						<InputBase
							label="Sender Name*"
							errorMessage={
								touched.senderName && errors.senderName
							}
						>
							<TextInput
								placeholder="Type name here"
								value={ values.senderName }
								onBlur={ () =>
									setFieldTouched( 'senderName', true )
								}
								onChange={ ( e ) =>
									setFieldValue(
										'senderName',
										e.target.value
									)
								}
							/>
						</InputBase>
						<InputBase
							label="Sender Company"
							errorMessage={
								touched.senderCompany && errors.senderCompany
							}
						>
							<TextInput
								placeholder="Type name here"
								value={ values.senderCompany }
								onBlur={ () =>
									setFieldTouched( 'senderCompany', true )
								}
								onChange={ ( e ) =>
									setFieldValue(
										'senderCompany',
										e.target.value
									)
								}
							/>
						</InputBase>
					</InputGroup>
					<Divider />
					<InputGroup>
						<InputBase
							label="Client Email*"
							errorMessage={
								touched.clientEmail && errors.clientEmail
							}
						>
							<TextInput
								placeholder="example@mail.com"
								value={ values.clientEmail }
								onBlur={ () =>
									setFieldTouched( 'clientEmail', true )
								}
								onChange={ ( e ) =>
									setFieldValue(
										'clientEmail',
										e.target.value
									)
								}
							/>
						</InputBase>
						<InputBase
							label="Client Name*"
							errorMessage={
								touched.clientName && errors.clientName
							}
						>
							<TextInput
								placeholder="Type name here"
								value={ values.clientName }
								onBlur={ () =>
									setFieldTouched( 'clientName', true )
								}
								onChange={ ( e ) =>
									setFieldValue(
										'clientName',
										e.target.value
									)
								}
							/>
						</InputBase>
						<InputBase
							label="Client Company"
							errorMessage={
								touched.clientCompany && errors.clientCompany
							}
						>
							<TextInput
								placeholder="Type name here"
								value={ values.clientCompany }
								onBlur={ () =>
									setFieldTouched( 'clientCompany', true )
								}
								onChange={ ( e ) =>
									setFieldValue(
										'clientCompany',
										e.target.value
									)
								}
							/>
						</InputBase>
					</InputGroup>
				</Body>
			</Content>
			<Fill name="ProposalModalFooter">
				<Footer>
					<PrimaryButtonOutline
						disabled={ isSubmitting }
						onClick={ navigator.goBack }
					>
						Go Back
					</PrimaryButtonOutline>
					{ isTemplate && (
						<PrimaryButtonFull onClick={ goToTemplateSelection }>
							Select Template
						</PrimaryButtonFull>
					) }

					{ isScratch && (
						<PrimaryButtonFull
							type="submit"
							onClick={ handleSubmit }
							disabled={ isSubmitting }
						>
							{ isSubmitting
								? 'Processing...'
								: 'Create Proposal' }
						</PrimaryButtonFull>
					) }
				</Footer>
			</Fill>
		</Fragment>
	);
}

/**
 * External dependencies
 */
import { Formik } from 'formik';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import Skeleton from 'react-loading-skeleton';

/**
 * Internal dependencies
 */
import {
	senderSchema,
	initialSenderValues,
	SIGNATURE_TYPE_UPLOAD,
	SIGNATURE_TYPE_TYPE,
} from './schema';
import SignatureUpload from './signature-upload';
import { TextInput, InputBase, PrimaryButton } from '@dashboard/components';
import {
	Wrapper,
	FormBody,
	InputGroup,
	Divider,
	Footer,
	SignatureSection,
	SignatureTypeToggle,
	ToggleButton,
	SignatureTextarea,
	TemplateGrid,
} from './style';

function Sender(props) {
	const { senderInfo, saveSenderInfo, isFetching } = props;

	const onSubmit = async (values, actions) => {
		try {
			await saveSenderInfo(values);
			console.log('Sender info saved successfully');
			// Optionally show a success message here
		} catch (error) {
			console.error('Error saving sender info:', error);
			// Optionally show an error message here
		}
	};

	if (isFetching) {
		return (
			<dvi>
				<TemplateGrid>
					<Skeleton count={1} height={50} />
					<Skeleton count={1} height={50} />
					<Skeleton count={1} height={50} />
					<Skeleton count={1} height={50} />
					<Skeleton count={1} height={50} />
					<Skeleton count={1} height={50} />
				</TemplateGrid>
				<Skeleton count={1} height={150} />
			</dvi>
		);
	}

	return (
		<Wrapper>
			<Formik
				initialValues={Object.assign(
					initialSenderValues,
					senderInfo
				)}
				validationSchema={senderSchema}
				onSubmit={onSubmit}
			>
				{({
					values,
					setFieldValue,
					errors,
					touched,
					setFieldTouched,
					handleSubmit,
					isSubmitting,
				}) => (
					<FormBody>
						<InputGroup>
							<InputBase
								label="Name"
								errorMessage={touched.name && errors.name}
							>
								<TextInput
									placeholder="Enter your name"
									value={values.name}
									onBlur={() =>
										setFieldTouched('name', true)
									}
									onChange={(e) =>
										setFieldValue('name', e.target.value)
									}
								/>
							</InputBase>

							<InputBase
								label="Email"
								errorMessage={touched.email && errors.email}
							>
								<TextInput
									placeholder="example@mail.com"
									value={values.email}
									onBlur={() =>
										setFieldTouched('email', true)
									}
									onChange={(e) =>
										setFieldValue('email', e.target.value)
									}
								/>
							</InputBase>
						</InputGroup>

						<InputGroup>
							<InputBase
								label="Company"
								errorMessage={
									touched.company && errors.company
								}
							>
								<TextInput
									placeholder="Your company name"
									value={values.company}
									onBlur={() =>
										setFieldTouched('company', true)
									}
									onChange={(e) =>
										setFieldValue(
											'company',
											e.target.value
										)
									}
								/>
							</InputBase>

							<InputBase
								label="WhatsApp Number"
								errorMessage={
									touched.whatsapp_number &&
									errors.whatsapp_number
								}
							>
								<TextInput
									placeholder="+1234567890"
									value={values.whatsapp_number}
									onBlur={() =>
										setFieldTouched(
											'whatsapp_number',
											true
										)
									}
									onChange={(e) =>
										setFieldValue(
											'whatsapp_number',
											e.target.value
										)
									}
								/>
							</InputBase>
						</InputGroup>

						<Divider />

						<SignatureSection>
							<SignatureTypeToggle>
								<ToggleButton
									type="button"
									active={
										values.signature_type ===
										SIGNATURE_TYPE_TYPE
									}
									onClick={() => {
										if (
											values.signature_type !==
											SIGNATURE_TYPE_TYPE
										) {
											setFieldValue(
												'signature_type',
												SIGNATURE_TYPE_TYPE
											);
										}
									}}
								>
									Type
								</ToggleButton>
								<ToggleButton
									type="button"
									active={
										values.signature_type ===
										SIGNATURE_TYPE_UPLOAD
									}
									onClick={() => {
										if (
											values.signature_type !==
											SIGNATURE_TYPE_UPLOAD
										) {
											setFieldValue(
												'signature_type',
												SIGNATURE_TYPE_UPLOAD
											);
										}
									}}
								>
									Upload
								</ToggleButton>
							</SignatureTypeToggle>

							{values.signature_type === SIGNATURE_TYPE_TYPE && (
								<InputBase
									errorMessage={
										touched.signature_text &&
										errors.signature_text
									}
								>
									<SignatureTextarea
										placeholder="Type here..."
										value={values.signature_text}
										onBlur={() =>
											setFieldTouched(
												'signature_text',
												true
											)
										}
										onChange={(e) =>
											setFieldValue(
												'signature_text',
												e.target.value
											)
										}
									/>
								</InputBase>
							)}

							{values.signature_type ===
								SIGNATURE_TYPE_UPLOAD && (
									<InputBase
										errorMessage={
											touched.signature_image &&
											errors.signature_image
										}
									>
										<SignatureUpload
											value={values.signature_image}
											onChange={(id) =>
												setFieldValue(
													'signature_image',
													id
												)
											}
										/>
									</InputBase>
								)}
						</SignatureSection>

						<Divider />

						<Footer>
							<PrimaryButton
								type="submit"
								onClick={handleSubmit}
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Saving...' : 'Save Settings'}
							</PrimaryButton>
						</Footer>
					</FormBody>
				)}
			</Formik>
		</Wrapper>
	);
}

const applyWithSelect = withSelect((select) => {
	const settings = select('asphalt-proposal-manager/settings');

	return {
		senderInfo: settings.getSenderInfo(),
		isFetching: !settings.hasFinishedResolution('getSenderInfo'),
	};
});

const applyWithDispatch = withDispatch((dispatch) => {
	const settings = dispatch('asphalt-proposal-manager/settings');
	return {
		saveSenderInfo: settings.saveSenderInfo,
	};
});

export default compose(applyWithSelect, applyWithDispatch)(Sender);

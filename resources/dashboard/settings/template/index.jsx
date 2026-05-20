/**
 * External dependencies
 */
import { Formik } from 'formik';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { ToggleControl, Tooltip } from '@wordpress/components';
import { LuInfo } from 'react-icons/lu';
import Skeleton from 'react-loading-skeleton';

/**
 * Internal dependencies
 */
import { PrimaryButton, SearchableSelect, InputBase } from '@dashboard/components';
import { CURRENCY_SYMBOLS } from '@dashboard/constants';
import { templateSchema, initialTemplateValues } from './schema';
import {
	Wrapper,
	FormBody,
	Footer,
	ToggleSection,
	ToggleWrapper,
	Divider,
} from './style';

const currencyOptions = Object.keys(CURRENCY_SYMBOLS).map((currency) => ({
	value: currency,
	label: `${currency} (${CURRENCY_SYMBOLS[currency]})`,
}));

function Template(props) {
	const { templateInfo, saveTemplateInfo, isFetching } = props;

	const onSubmit = async (values, actions) => {
		try {
			await saveTemplateInfo(values);
		} catch (error) {
			console.error('Error saving template info:', error);
		}
	};

	if (isFetching) {
		return (
			<Wrapper>
				<Skeleton count={1} height={150} />
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<Formik
				initialValues={Object.assign(
					{},
					initialTemplateValues,
					templateInfo
				)}
				validationSchema={templateSchema}
				onSubmit={onSubmit}
			>
				{({
					values,
					setFieldValue,
					handleSubmit,
					isSubmitting,
					errors,
					touched,
				}) => (
					<FormBody>
						<InputBase
							label="Currency"
							errorMessage={touched.currency && errors.currency}
							sx={{ maxWidth: '250px' }}
						>
							<SearchableSelect
								options={currencyOptions}
								value={currencyOptions.find(
									(option) => option.value === values.currency
								)}
								onChange={(val) =>
									setFieldValue('currency', val.value)
								}
								placeholder="Select Currency"
							/>
						</InputBase>

						<ToggleSection>
							<ToggleWrapper>
								<ToggleControl
									label={
										<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
											Hide Header
											<Tooltip text="Hide the header in the proposal">
												<span style={{ display: 'flex', color: '#9CA3AF' }}>
													<LuInfo size={16} />
												</span>
											</Tooltip>
										</div>
									}
									checked={values.hide_header}
									onChange={(value) =>
										setFieldValue('hide_header', value)
									}
								/>
							</ToggleWrapper>

							<ToggleWrapper>
								<ToggleControl
									label={
										<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
											Hide Footer
											<Tooltip text="Hide the footer in the proposal">
												<span style={{ display: 'flex', color: '#9CA3AF' }}>
													<LuInfo size={16} />
												</span>
											</Tooltip>
										</div>
									}
									checked={values.hide_footer}
									onChange={(value) =>
										setFieldValue('hide_footer', value)
									}
								/>
							</ToggleWrapper>
						</ToggleSection>



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
		templateInfo: settings.getTemplateInfo(),
		isFetching: !settings.hasFinishedResolution('getTemplateInfo'),
	};
});

const applyWithDispatch = withDispatch((dispatch) => {
	const settings = dispatch('asphalt-proposal-manager/settings');
	return {
		saveTemplateInfo: settings.saveTemplateInfo,
	};
});

export default compose(applyWithSelect, applyWithDispatch)(Template);

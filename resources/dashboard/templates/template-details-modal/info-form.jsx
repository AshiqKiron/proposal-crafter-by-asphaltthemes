import { useNavigator } from '@wordpress/components';
import { InputBase, TextInput, PrimaryButton, SecondaryOutlineButton } from '@dashboard/components';
import { FiArrowLeft } from 'react-icons/fi';
import { useFormik } from 'formik';
import apiFetch from '@wordpress/api-fetch';
import { adminApiPath } from '@dashboard/utils';
import { infoFormSchema, initialInfoFormValues } from './schema';
import {
    FormContainer,
    FormHeader,
    FormTitle,
    FormDescription,
    TwoColGrid,
    FormFooter
} from './style';

export default function InfoForm({ template, setIsOpen }) {
    const navigator = useNavigator();

    const formik = useFormik({
        initialValues: initialInfoFormValues,
        validationSchema: infoFormSchema,
        onSubmit: async (values, actions) => {
            try {
                const payload = {
                    ...values,
                    sourceType: 'template',
                    templateId: template.id
                };

                const response = await apiFetch({
                    path: adminApiPath('proposals/create'),
                    method: 'POST',
                    data: payload,
                });

                actions.resetForm();
                if (setIsOpen) setIsOpen(false);
                window.location.href = response.data.edit_url;
            } catch (error) {
                console.error('Error creating proposal:', error);
            } finally {
                actions.setSubmitting(false);
            }
        },
    });

    return (
        <FormContainer>
            <div>
                <FormHeader>
                    <div>
                        <FormTitle>Create your proposal</FormTitle>
                        <FormDescription>Create stunning, professional proposals in minutes.</FormDescription>
                    </div>
                </FormHeader>
            </div>
            <div>
                <InputBase
                    label="Proposal Title*"
                    errorMessage={formik.touched.title && formik.errors.title}
                >
                    <TextInput
                        placeholder="Type name here"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </InputBase>
            </div>

            <div>
                <InputBase
                    label="Sender Email*"
                    errorMessage={formik.touched.senderEmail && formik.errors.senderEmail}
                >
                    <TextInput
                        placeholder="example@mail.com"
                        type="email"
                        name="senderEmail"
                        value={formik.values.senderEmail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </InputBase>
                <TwoColGrid style={{ marginTop: 16 }}>
                    <InputBase
                        label="Sender Name*"
                        errorMessage={formik.touched.senderName && formik.errors.senderName}
                    >
                        <TextInput
                            placeholder="Type name here"
                            name="senderName"
                            value={formik.values.senderName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </InputBase>
                    <InputBase
                        label="Sender Company"
                        errorMessage={formik.touched.senderCompany && formik.errors.senderCompany}
                    >
                        <TextInput
                            placeholder="Type name here"
                            name="senderCompany"
                            value={formik.values.senderCompany}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </InputBase>
                </TwoColGrid>
            </div>

            <div>
                <InputBase
                    label="Client Email*"
                    errorMessage={formik.touched.clientEmail && formik.errors.clientEmail}
                >
                    <TextInput
                        placeholder="example@mail.com"
                        type="email"
                        name="clientEmail"
                        value={formik.values.clientEmail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </InputBase>
                <TwoColGrid style={{ marginTop: 16 }}>
                    <InputBase
                        label="Client Name*"
                        errorMessage={formik.touched.clientName && formik.errors.clientName}
                    >
                        <TextInput
                            placeholder="Type name here"
                            name="clientName"
                            value={formik.values.clientName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </InputBase>
                    <InputBase
                        label="Client Company"
                        errorMessage={formik.touched.clientCompany && formik.errors.clientCompany}
                    >
                        <TextInput
                            placeholder="Type name here"
                            name="clientCompany"
                            value={formik.values.clientCompany}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </InputBase>
                </TwoColGrid>
            </div>

            <FormFooter>
                <SecondaryOutlineButton onClick={navigator.goBack} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FiArrowLeft /> Back
                </SecondaryOutlineButton>
                <PrimaryButton
                    onClick={formik.handleSubmit}
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? 'Processing...' : 'Create Proposal'}
                </PrimaryButton>
            </FormFooter>
        </FormContainer>
    );
}
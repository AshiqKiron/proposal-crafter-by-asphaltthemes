/**
 * External dependencies
 */
import {
	Modal,
	Navigator,
	SlotFillProvider,
	Slot,
} from '@wordpress/components';
import { addAction, removeAction } from '@wordpress/hooks';
import { useEffect, useState } from '@wordpress/element';
import { Formik } from 'formik';
import apiFetch from '@wordpress/api-fetch';
/**
 * Internal dependencies
 */
import { Wrapper } from './style';
import { proposalSchema, initialProposalValues } from './schema';
import { TemplateSource } from './template-source';
import Templates from './templates';
import { adminApiPath } from '@dashboard/utils';
import { InfoForm } from './info-form';
import { useFormSubmissionStatus } from './hooks';

export function CreateProposalModal() {
	const [ isOpen, setIsOpen ] = useState( false );

	const [ isSubmitting, setIsSubmitting ] = useFormSubmissionStatus();
	const onSubmit = async ( values, actions ) => {
		try {
			if ( isSubmitting ) {
				return;
			}

			setIsSubmitting( true );
			const response = await apiFetch( {
				path: adminApiPath( 'proposals/create' ),
				method: 'POST',
				data: values,
			} );

			actions.resetForm();
			setIsOpen( false );
			location.href = response.data.edit_url;
		} catch ( error ) {
			console.error( 'Error creating proposal:', error );
		} finally {
			setIsSubmitting( false );
		}
	};

	useEffect( () => {
		addAction(
			'asphalt-proposal-manager.open-create-proposal-modal',
			'asphalt-proposal-manager',
			setIsOpen
		);

		return () => {
			removeAction(
				'asphalt-proposal-manager.open-create-proposal-modal',
				'asphalt-proposal-manager'
			);
		};
	}, [] );

	return (
		<SlotFillProvider>
			<Wrapper>
				{ isOpen && (
					<Modal
						__experimentalHideHeader
						shouldCloseOnClickOutside={ false }
						className="create-proposal-modal"
						onRequestClose={ () => setIsOpen( false ) }
					>
						<Formik
							initialValues={ initialProposalValues }
							validationSchema={ proposalSchema }
							onSubmit={ onSubmit }
						>
							<div>
								<Navigator initialPath="/">
									<Navigator.Screen path="/">
										<TemplateSource />
									</Navigator.Screen>

									<Navigator.Screen path="/info-form">
										<InfoForm />
									</Navigator.Screen>

									<Navigator.Screen path="/info-form/templates">
										<Templates />
									</Navigator.Screen>
								</Navigator>
								<Slot name="ProposalModalFooter" />
							</div>
						</Formik>
					</Modal>
				) }
			</Wrapper>
		</SlotFillProvider>
	);
}

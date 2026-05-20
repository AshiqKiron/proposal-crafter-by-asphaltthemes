import { useState, useEffect } from '@wordpress/element';
import { addAction, removeAction, doAction } from '@wordpress/hooks';

export const useFormSubmissionStatus = () => {
	const [ isSubmitting, setIsSubmitting ] = useState( false );
	const hookName = 'asphalt-proposal-manager.form-submission-status-changed';

	useEffect( () => {
		const handleStatusChange = ( status ) => {
			setIsSubmitting( status );
		};

		addAction( hookName, 'asphalt-proposal-manager', handleStatusChange );

		return () => {
			removeAction( hookName, 'asphalt-proposal-manager' );
		};
	}, [] );

	const setIsSubmittingStatus = ( status ) => {
		doAction( hookName, status );
	};

	return [ isSubmitting, setIsSubmittingStatus ];
};

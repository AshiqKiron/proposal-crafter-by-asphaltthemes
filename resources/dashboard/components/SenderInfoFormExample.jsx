import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';

/**
 * Example component showing how to save sender info
 */
export default function SenderInfoForm() {
	const { saveSenderInfo } = useDispatch( 'asphalt-proposal-manager/settings' );
	const [ formData, setFormData ] = useState( {
		name: '',
		email: '',
		company: '',
		whatsapp_number: '',
		signature_type: 'type', // 'upload' or 'type'
		signature_value: '',
	} );
	const [ isSaving, setIsSaving ] = useState( false );

	const handleChange = ( field, value ) => {
		setFormData( ( prev ) => ( {
			...prev,
			[ field ]: value,
		} ) );
	};

	const handleSubmit = async ( e ) => {
		e.preventDefault();
		setIsSaving( true );

		try {
			await saveSenderInfo( formData );
			alert( 'Sender information saved successfully!' );
		} catch ( error ) {
			console.error( 'Error saving sender info:', error );
			alert( 'Failed to save sender information.' );
		} finally {
			setIsSaving( false );
		}
	};

	return (
		<form onSubmit={ handleSubmit }>
			<div>
				<label>Name:</label>
				<input
					type="text"
					value={ formData.name }
					onChange={ ( e ) => handleChange( 'name', e.target.value ) }
					required
				/>
			</div>

			<div>
				<label>Email:</label>
				<input
					type="email"
					value={ formData.email }
					onChange={ ( e ) =>
						handleChange( 'email', e.target.value )
					}
					required
				/>
			</div>

			<div>
				<label>Company:</label>
				<input
					type="text"
					value={ formData.company }
					onChange={ ( e ) =>
						handleChange( 'company', e.target.value )
					}
					required
				/>
			</div>

			<div>
				<label>WhatsApp Number:</label>
				<input
					type="text"
					value={ formData.whatsapp_number }
					onChange={ ( e ) =>
						handleChange( 'whatsapp_number', e.target.value )
					}
					required
				/>
			</div>

			<div>
				<label>Signature Type:</label>
				<select
					value={ formData.signature_type }
					onChange={ ( e ) =>
						handleChange( 'signature_type', e.target.value )
					}
					required
				>
					<option value="type">Type</option>
					<option value="upload">Upload</option>
				</select>
			</div>

			<div>
				<label>Signature Value:</label>
				<input
					type="text"
					value={ formData.signature_value }
					onChange={ ( e ) =>
						handleChange( 'signature_value', e.target.value )
					}
					required
				/>
			</div>

			<button type="submit" disabled={ isSaving }>
				{ isSaving ? 'Saving...' : 'Save Sender Info' }
			</button>
		</form>
	);
}

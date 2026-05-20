import { object, string } from 'yup';

// Signature type constants matching SenderInfoDTO
export const SIGNATURE_TYPE_UPLOAD = 'upload';
export const SIGNATURE_TYPE_TYPE = 'type';

export const senderSchema = object({
	name: string().trim().max(100, 'Name must be at most 100 characters.'),
	email: string().trim().email('Invalid email format.'),
	company: string()
		.trim()
		.max(100, 'Company name must be at most 100 characters.'),
	whatsapp_number: string()
		.trim()
		.matches(/^\+?[1-9]\d{1,14}$/, 'Invalid WhatsApp number format.')
		.max(15, 'WhatsApp number must be at most 15 characters.'),
	signature_type: string().oneOf(
		[SIGNATURE_TYPE_UPLOAD, SIGNATURE_TYPE_TYPE],
		'Invalid signature type.'
	),
	signature_text: string()
		.trim()
		.max(100, 'Signature text must be at most 100 characters.'),
	signature_image: string(),
});

export const initialSenderValues = {
	name: '',
	email: '',
	company: '',
	whatsapp_number: '',
	signature_type: SIGNATURE_TYPE_TYPE,
	signature_text: '',
	signature_image: '',
};

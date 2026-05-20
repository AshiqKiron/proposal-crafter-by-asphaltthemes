import { object, string } from 'yup';

export const proposalSchema = object({
	sourceType: string()
		.oneOf(['scratch', 'template'])
		.required('Source type is required.'),
	title: string().trim().required('Title is required.').max(100),
	senderEmail: string()
		.trim()
		.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format.')
		.required('Sender email is required.'),
	senderName: string()
		.trim()
		.required('Sender name is required.')
		.max(50),
	senderCompany: string().trim().max(100),
	clientEmail: string()
		.trim()
		.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format.')
		.required('Client email is required.'),
	clientName: string()
		.trim()
		.required('Client name is required.')
		.max(50),
	clientCompany: string().trim().max(100),
	templateId: string().nullable(),
});

export const initialProposalValues = {
	sourceType: 'scratch',
	title: '',
	senderEmail: '',
	senderName: '',
	senderCompany: '',
	clientEmail: '',
	clientName: '',
	clientCompany: '',
	templateId: null,
};

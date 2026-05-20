import { object, string } from 'yup';

export const infoFormSchema = object({
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
});

export const initialInfoFormValues = {
    title: '',
    senderEmail: '',
    senderName: '',
    senderCompany: '',
    clientEmail: '',
    clientName: '',
    clientCompany: '',
};

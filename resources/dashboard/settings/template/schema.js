import { object, boolean, string } from 'yup';

export const templateSchema = object({
    hide_footer: boolean(),
    hide_header: boolean(),
    currency: string(),
});

export const initialTemplateValues = {
    hide_footer: true,
    hide_header: true,
    currency: 'USD',
};

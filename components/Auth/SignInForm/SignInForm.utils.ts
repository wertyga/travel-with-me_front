import * as yup from 'yup';

export const SIGNIN_FORM_SCHEMA = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  })
  .required();

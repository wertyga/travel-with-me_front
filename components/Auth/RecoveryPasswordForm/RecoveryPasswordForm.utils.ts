import * as yup from 'yup';

export const getRecoveryPasswordSchema = (isSent?: boolean) => {
  const yupObject: any = {
    email: yup
      .string()
      .required('This field should not be empty')
      .email('E-mail must be a valid e-mail'),
  };

  if (isSent) {
    yupObject.code = yup.string().required();
    yupObject.password = yup
      .string()
      .required('This field should not be empty')
      .min(6);
    yupObject.confirmPassword = yup
      .string()
      .required('This field should not be empty')
      .oneOf([yup.ref('password')], 'passwords must match');
  }

  return yup.object(yupObject).required();
};

import { FormikProps } from 'formik';

export type MyFormikProps = FormikProps<{
  email?: string;
  username?: string;
  usernameOrEmail?: string;
  password?: string;
  newPassword?: string;
}>;

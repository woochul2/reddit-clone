import { FormikProps } from 'formik';

export type AuthFormikProps = FormikProps<{
  email?: string;
  username?: string;
  usernameOrEmail?: string;
  password?: string;
  newPassword?: string;
}>;

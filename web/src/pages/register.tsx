import { Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import Form from '../components/Form';
import { HOME } from '../constants';
import { useRegisterMutation } from '../generated/graphql';
import { Container } from '../pages-styles/register';
import { MyFormikProps } from '../types';
import { createUrqlClient } from '../utils/createUrqlClient';
import { errorsToMap } from '../utils/errorsToMap';

const Register = () => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Container>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(errorsToMap(response.data.register.errors));
            return;
          }
          if (response.data?.register.user) {
            router.push(HOME);
          }
        }}
      >
        {(formik) => (
          <Form
            formik={formik as MyFormikProps}
            title="회원가입"
            buttonLabel="가입"
          />
        )}
      </Formik>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(Register);

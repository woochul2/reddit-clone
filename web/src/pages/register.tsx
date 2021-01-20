import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Container } from '../pages-styles/register';
import { useRegisterMutation } from '../generated/graphql';
import { convertErrorsToMap } from '../utils/convertErrorsToMap';
import { useRouter } from 'next/router';
import { HOME } from '../constants/paths';
import { Formik } from 'formik';
import Form from '../components/Form';

const Register = () => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Container>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(convertErrorsToMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push(HOME);
          }
        }}
      >
        {(formik) => (
          <Form formik={formik} title="회원가입" buttonLabel="가입" />
        )}
      </Formik>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(Register);

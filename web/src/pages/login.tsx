import { Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Form from '../components/Form';
import { FORGOT_PASSWORD, HOME } from '../constants';
import { useLoginMutation } from '../generated/graphql';
import { Container, Link } from '../pages-styles/login';
import { MyFormikProps } from '../types';
import { createUrqlClient } from '../utils/createUrqlClient';
import { errorsToMap } from '../utils/errorsToMap';

const Login = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Container>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(errorsToMap(response.data.login.errors));
            return;
          }
          if (response.data?.login.user) {
            router.push(HOME);
          }
        }}
      >
        {(formik) => (
          <>
            <Form
              formik={formik as MyFormikProps}
              title="로그인"
              buttonLabel="로그인"
            >
              <NextLink href={FORGOT_PASSWORD} passHref>
                <Link>비밀번호를 잊으셨습니까?</Link>
              </NextLink>
            </Form>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(Login);

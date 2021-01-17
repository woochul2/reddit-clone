import React from 'react';
import { Container, Form, FormTitle, Error } from '../pages-styles/register';
import { useRegisterMutation } from '../generated/graphql';
import { convertErrorsToMap } from '../utils/convertErrorsToMap';
import { useRouter } from 'next/router';
import { HOME } from '../constants/paths';
import { Formik } from 'formik';
import Input from '../components/Input';
import ReactLoading from 'react-loading';
import Button from '../components/Button';

export default function Register() {
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
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <FormTitle>회원가입</FormTitle>
            <Input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              label="아이디"
            />
            <Error>{errors.username}</Error>
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              label="비밀번호"
            />
            <Error>{errors.password}</Error>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <ReactLoading
                  type={'spokes'}
                  width={'1.125em'}
                  height={'1.125em'}
                />
              ) : (
                '가입'
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

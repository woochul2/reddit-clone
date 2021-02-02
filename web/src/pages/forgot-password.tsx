import { Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import validator from 'validator';
import AuthForm from '../components/AuthForm';
import Confirmation from '../components/Confirmation';
import Layout from '../components/Layout';
import { useForgotPasswordMutation } from '../generated/graphql';
import { Container } from '../page-styles/forgot-password';
import { AuthFormikProps } from '../types';
import { createUrqlClient } from '../utils/createUrqlClient';

const ForgotPassword = () => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [isFinished, setIsFinished] = useState(false);

  return (
    <Layout searchBox="off">
      <Container>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={async (values, { setErrors }) => {
            if (!validator.isEmail(values.email)) {
              setErrors({ email: '올바른 이메일 주소를 입력해주세요.' });
              return;
            }
            setIsFinished(true);
            await forgotPassword(values);
          }}
        >
          {(formik) => (
            <>
              {isFinished ? (
                <Confirmation text="이메일로 비밀번호 재설정 링크를 보내드렸습니다." />
              ) : (
                <AuthForm
                  formik={formik as AuthFormikProps}
                  title="비밀번호 찾기"
                  subTitle="이메일을 입력하고 확인 버튼을 누르시면, 해당 이메일로 비밀번호 재설정 링크를 보내드립니다."
                  buttonLabel="확인"
                />
              )}
            </>
          )}
        </Formik>
      </Container>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);

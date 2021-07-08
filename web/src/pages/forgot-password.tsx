import { Formik } from 'formik';
import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import Confirmation from '../components/Confirmation';
import Layout from '../components/Layout';
import { useForgotPasswordMutation } from '../generated/graphql';
import { AuthFormikProps } from '../types';
import { changeErrorsToMap } from '../utils/changeErrorsToMap';
import withApollo from '../utils/withApollo';

function ForgotPassword() {
  const [forgotPassword] = useForgotPasswordMutation();
  const [isFinished, setIsFinished] = useState(false);

  return (
    <Layout searchBox="off" title="reddit clone 비밀번호 찾기">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await forgotPassword({ variables: values });
          const errors = response.data?.forgotPassword.errors;
          if (errors) {
            const errorMap = changeErrorsToMap(errors);
            setErrors(errorMap);
            return;
          }
          setIsFinished(true);
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
    </Layout>
  );
}

export default withApollo()(ForgotPassword);

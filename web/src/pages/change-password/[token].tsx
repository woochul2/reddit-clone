import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AuthForm from '../../components/AuthForm';
import Confirmation from '../../components/Confirmation';
import Layout from '../../components/Layout';
import { useChangePasswordMutation, useUserIdQuery } from '../../generated/graphql';
import { AuthFormikProps } from '../../types';
import { changeErrorsToMap } from '../../utils/changeErrorsToMap';
import withApollo from '../../utils/withApollo';

function ChangePassword() {
  const router = useRouter();
  const token = (router.query.token as string) || '';
  const { data: userIdData, loading: loadingUserId } = useUserIdQuery({ variables: { token } });
  const [changePassword] = useChangePasswordMutation();
  const [isFinished, setIsFinished] = useState(false);

  return (
    <Layout searchBox="off" title="reddit clone 비밀번호 변경">
      {!loadingUserId && (
        <>
          {userIdData?.userId ? (
            <Formik
              initialValues={{ newPassword: '' }}
              onSubmit={async (values, { setErrors }) => {
                const response = await changePassword({ variables: { token, newPassword: values.newPassword } });
                const errors = response.data?.changePassword.errors;
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
                    <Confirmation text="비밀번호를 성공적으로 변경했습니다." />
                  ) : (
                    <AuthForm formik={formik as AuthFormikProps} title="비밀번호 재설정" buttonLabel="확인" />
                  )}
                </>
              )}
            </Formik>
          ) : (
            <Confirmation text="유효 기간이 만료되었습니다." />
          )}
        </>
      )}
    </Layout>
  );
}

export default withApollo()(ChangePassword);

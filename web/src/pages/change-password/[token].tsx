import { Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useState } from 'react';
import Confirmation from '../../components/Confirmation';
import Form from '../../components/Form';
import {
  useChangePasswordMutation,
  useUserIdQuery,
} from '../../generated/graphql';
import { Container, ExpirationError } from '../../pages-styles/change-password';
import { MyFormikProps } from '../../types';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { errorsToMap } from '../../utils/errorsToMap';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [{ data: userIdData, fetching: fetchingUserId }] = useUserIdQuery({
    variables: { token },
  });
  const [, changePassword] = useChangePasswordMutation();
  const [isFinished, setIsFinished] = useState(false);

  return (
    <Container>
      {!fetchingUserId && userIdData?.userId && (
        <Formik
          initialValues={{ newPassword: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePassword({
              token,
              newPassword: values.newPassword,
            });
            if (response.data?.changePassword.errors) {
              setErrors(errorsToMap(response.data.changePassword.errors));
              return;
            }
            setIsFinished(true);
          }}
        >
          {(formik) => (
            <>
              {isFinished ? (
                <>
                  <Confirmation text="비밀번호를 성공적으로 변경했습니다." />
                </>
              ) : (
                <Form
                  formik={formik as MyFormikProps}
                  title="비밀번호 재설정"
                  buttonLabel="확인"
                />
              )}
            </>
          )}
        </Formik>
      )}
      {!fetchingUserId && !userIdData?.userId && (
        <ExpirationError>유효 기간이 만료되었습니다.</ExpirationError>
      )}
    </Container>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword as any);
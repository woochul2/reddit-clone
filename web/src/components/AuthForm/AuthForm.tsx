import React from 'react';
import ReactLoading from 'react-loading';
import { AuthFormikProps } from '../../types';
import Button from '../Button';
import Input from '../Input';
import * as Styled from './styles/AuthForm';

interface Props {
  formik: AuthFormikProps;
  title: string;
  subTitle?: string;
  buttonLabel: string;
  children?: React.ReactChild;
}

export default function AuthForm({ formik, title, subTitle, buttonLabel, children }: Props) {
  const { values, handleChange, handleSubmit, isSubmitting } = formik;
  const errors = formik.errors as Record<string, string>;

  const labelMap: Record<string, string> = {
    email: '이메일',
    usernameOrEmail: '아이디 또는 이메일',
    username: '아이디',
    password: '비밀번호',
    newPassword: '새 비밀번호',
  };

  return (
    <Styled.Container onSubmit={handleSubmit}>
      <Styled.Inside>
        <Styled.Title>{title}</Styled.Title>
        {subTitle && <Styled.SubTitle>{subTitle}</Styled.SubTitle>}
        {Object.entries(values).map(([key, value], idx) => (
          <div key={idx}>
            <Input
              variant="labeled"
              type={key === 'newPasword' ? 'password' : key}
              name={key}
              value={value}
              onChange={handleChange}
              label={labelMap[key]}
              focus={errors[key] !== undefined}
            />
            <Styled.Error>{errors[key]}</Styled.Error>
          </div>
        ))}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <ReactLoading type={'spokes'} width={'1.125em'} height={'1.125em'} /> : <>{buttonLabel}</>}
        </Button>
        {children}
      </Styled.Inside>
    </Styled.Container>
  );
}

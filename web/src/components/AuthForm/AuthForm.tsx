import React from 'react';
import ReactLoading from 'react-loading';
import { AuthFormikProps } from '../../types';
import Button from '../Button';
import Input from '../Input';
import { Container, Error, SubTitle, Title } from './auth-form';

interface Props {
  formik: AuthFormikProps;
  title: string;
  subTitle?: string;
  buttonLabel: string;
  children?: React.ReactChild;
  styles?: string;
}

const valuesKeyToType = (key: string) => {
  if (key === 'newPassword') {
    return 'password';
  }
  return key;
};

const valuesKeyToLabel = (key: string) => {
  if (key === 'email') {
    return '이메일';
  }
  if (key === 'usernameOrEmail') {
    return '아이디 또는 이메일';
  }
  if (key === 'username') {
    return '아이디';
  }
  if (key === 'password') {
    return '비밀번호';
  }
  if (key === 'newPassword') {
    return '새 비밀번호';
  }
  return key;
};

export default function AuthForm({
  formik,
  title,
  subTitle,
  buttonLabel,
  children,
  styles,
}: Props) {
  const { values, handleChange, handleSubmit, isSubmitting } = formik;
  const errors = formik.errors as Record<string, string>;
  return (
    <Container onSubmit={handleSubmit} autoComplete="off" styles={styles}>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      {Object.entries(values).map(([key, value], idx) => (
        <div key={idx}>
          <Input
            variant="labeled"
            type={valuesKeyToType(key)}
            name={key}
            value={value}
            onChange={handleChange}
            label={valuesKeyToLabel(key)}
            focus={errors[key] !== undefined}
          />
          <Error>{errors[key]}</Error>
        </div>
      ))}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <ReactLoading type={'spokes'} width={'1.125em'} height={'1.125em'} />
        ) : (
          <>{buttonLabel}</>
        )}
      </Button>
      {children}
    </Container>
  );
}

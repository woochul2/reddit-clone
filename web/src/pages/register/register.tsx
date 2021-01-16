import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Container, Form, FormTitle } from './register-styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormTitle>회원가입</FormTitle>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          labelValue="이메일 주소"
        />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          labelValue="비밀번호"
        />
        <Button>가입</Button>
      </Form>
    </Container>
  );
}

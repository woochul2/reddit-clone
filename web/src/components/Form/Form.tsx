import { Container, Title, Error } from './form';
import { FormikProps } from 'formik';
import Input from '../Input';
import ReactLoading from 'react-loading';
import Button from '../Button';

interface Props {
  formik: FormikProps<{
    username: string;
    password: string;
  }>;
  title: string;
  buttonLabel: string;
  styles?: string;
}

export default function Form({ formik, title, buttonLabel, styles }: Props) {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;
  return (
    <Container onSubmit={handleSubmit} autoComplete="off" styles={styles}>
      <Title>{title}</Title>
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
          <ReactLoading type={'spokes'} width={'1.125em'} height={'1.125em'} />
        ) : (
          <>{buttonLabel}</>
        )}
      </Button>
    </Container>
  );
}

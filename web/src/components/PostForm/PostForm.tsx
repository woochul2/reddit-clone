import React from 'react';
import ReactLoading from 'react-loading';
import { FlattenSimpleInterpolation } from 'styled-components';
import { PostFormikProps } from '../../types';
import Button from '../Button';
import Textarea from '../TextArea';
import { Container, textAreaStyles, Title } from './post-form';

interface Props {
  formik: PostFormikProps;
  title: string;
  styles?: FlattenSimpleInterpolation;
}

export default function PostForm({ formik, title, styles }: Props) {
  const { values, handleChange, handleSubmit, isSubmitting } = formik;

  return (
    <Container onSubmit={handleSubmit} autoComplete="off" styles={styles}>
      <Title>{title}</Title>
      <Textarea
        name="title"
        minRows={1}
        value={values.title}
        onChange={handleChange}
        placeholder="제목"
        styles={textAreaStyles}
      />
      <Textarea
        name="text"
        minRows={10}
        value={values.text}
        onChange={handleChange}
        placeholder="내용"
        styles={textAreaStyles}
      />
      <Button
        type="submit"
        disabled={values.title === '' || values.text === ''}
      >
        {isSubmitting ? (
          <ReactLoading type={'spokes'} width={'1.125em'} height={'1.125em'} />
        ) : (
          <>제출</>
        )}
      </Button>
    </Container>
  );
}

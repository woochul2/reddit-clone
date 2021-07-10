import React from 'react';
import ReactLoading from 'react-loading';
import { PostFormikProps } from '../../types';
import Button from '../Button';
import TextArea from '../TextArea';
import * as Styled from './styles/PostForm';

interface Props {
  formik: PostFormikProps;
  title: string;
}

export default function PostForm({ formik, title }: Props) {
  const { values, handleChange, handleSubmit, isSubmitting } = formik;

  return (
    <Styled.Container onSubmit={handleSubmit} autoComplete="off">
      <Styled.Inside>
        <Styled.Title>{title}</Styled.Title>
        <TextArea
          name="title"
          minRows={1}
          value={values.title}
          onChange={handleChange}
          placeholder="제목"
          style={{ margin: '0 0 0.625rem' }}
        />
        <TextArea
          name="text"
          minRows={10}
          value={values.text}
          onChange={handleChange}
          placeholder="내용"
          style={{ margin: '0 0 0.625rem' }}
        />
        <Button type="submit" disabled={values.title === '' || values.text === '' || isSubmitting}>
          {isSubmitting ? <ReactLoading type={'spokes'} width={'1.125em'} height={'1.125em'} /> : <>제출</>}
        </Button>
      </Styled.Inside>
    </Styled.Container>
  );
}

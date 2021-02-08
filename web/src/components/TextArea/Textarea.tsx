import React, { ChangeEvent } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { Container } from './textarea';

interface Props {
  name: string;
  minRows: number;
  value?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  styles?: FlattenSimpleInterpolation;
}

export default function Textarea({
  name,
  minRows,
  value,
  onChange,
  placeholder,
  styles,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event);
  };

  return (
    <Container
      name={name}
      minRows={minRows}
      value={value}
      onChange={(event) => handleChange(event)}
      placeholder={placeholder}
      styles={styles}
    />
  );
}

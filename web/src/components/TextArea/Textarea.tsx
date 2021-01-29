import React, { ChangeEvent } from 'react';
import { Container } from './textarea';

interface Props {
  name: string;
  rows: number;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  styles?: string;
}

export default function Textarea({
  name,
  rows,
  value,
  onChange,
  placeholder,
  styles,
}: Props) {
  return (
    <Container
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      styles={styles}
    />
  );
}

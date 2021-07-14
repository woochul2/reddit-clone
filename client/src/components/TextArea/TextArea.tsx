import React, { ChangeEvent } from 'react';
import * as Styled from './styles/TextArea';

interface Props {
  name: string;
  minRows: number;
  value?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

export default function TextArea({ name, minRows, value, onChange, placeholder, style }: Props) {
  return (
    <Styled.Container
      name={name}
      minRows={minRows}
      value={value}
      onChange={(event) => onChange(event)}
      placeholder={placeholder}
      style={style}
    />
  );
}

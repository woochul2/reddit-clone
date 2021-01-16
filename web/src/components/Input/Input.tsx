import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { Container } from './InputStyles';

interface Props {
  type: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  labelValue: string;
  autoFocus?: boolean;
  styles?: string;
}

export default function Input({
  type,
  name,
  value,
  onChange,
  labelValue,
  autoFocus,
  styles,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const textInput = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      textInput.current.focus();
    }
  }, []);

  return (
    <Container
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      isFocused={isFocused}
      value={value}
      styles={styles}
    >
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        ref={textInput}
      />
      <label onClick={() => textInput.current.focus()}>{labelValue}</label>
    </Container>
  );
}

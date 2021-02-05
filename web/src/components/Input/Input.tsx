import React, {
  ChangeEvent,
  FocusEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { Container } from './input';

interface Props {
  variant?: 'default' | 'labeled';
  type: string;
  name: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  label: string;
  autoFocus?: boolean;
  focus?: boolean;
  autoComplete?: 'on' | 'off';
  styles?: FlattenSimpleInterpolation;
}

export default function Input({
  variant = 'default',
  type,
  name,
  value,
  onChange,
  onBlur,
  label,
  autoFocus,
  focus,
  autoComplete = 'on',
  styles,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const textInput = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (autoFocus) {
      textInput.current.focus();
    }
  }, []);

  useEffect(() => {
    if (focus) {
      textInput.current.focus();
    }
  }, [focus]);

  return (
    <Container
      variant={variant}
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
        onBlur={onBlur}
        placeholder={variant === 'default' ? label : ''}
        ref={textInput}
        autoComplete={autoComplete}
      />
      <label onClick={() => textInput.current.focus()}>
        {variant === 'labeled' && label}
      </label>
    </Container>
  );
}

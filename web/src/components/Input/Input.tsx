import {
  ChangeEvent,
  FocusEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Container } from './input';

interface Props {
  type: string;
  name: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  label: string;
  autoFocus?: boolean;
  focus?: boolean;
  styles?: string;
}

export default function Input({
  type,
  name,
  value,
  onChange,
  onBlur,
  label,
  autoFocus,
  focus,
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
        ref={textInput}
      />
      <label onClick={() => textInput.current.focus()}>{label}</label>
    </Container>
  );
}

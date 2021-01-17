import {
  ChangeEvent,
  FocusEvent,
  useState,
  useRef,
  useEffect,
  MutableRefObject,
} from 'react';
import { Container } from './InputStyles';

interface Props {
  type: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  label: string;
  autoFocus?: boolean;
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
  styles,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const textInput = useRef() as MutableRefObject<HTMLInputElement>;

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
        onBlur={onBlur}
        ref={textInput}
      />
      <label onClick={() => textInput.current.focus()}>{label}</label>
    </Container>
  );
}

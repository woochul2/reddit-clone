import React, { ChangeEvent, FocusEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import * as Styled from './styles/Input';

interface Props {
  variant?: 'default' | 'labeled' | 'search';
  type: string;
  name: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  label: string;
  focus?: boolean;
  autoComplete?: 'on' | 'off';
}

export default function Input({
  variant = 'default',
  type,
  name,
  value,
  onChange,
  onBlur,
  label,
  focus,
  autoComplete = 'on',
}: Props) {
  const textInputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (focus) {
      textInputRef.current.focus();
    }
  }, [focus]);

  const getTextInputStyles = (): React.CSSProperties => {
    if (variant === 'labeled') {
      return { padding: '1.5em 0.625em 0.75em' };
    } else if (variant === 'search') {
      return {
        backgroundColor: 'var(--search-box-background-color)',
        padding: '0.375rem 2.5rem 0.375rem 3.125rem',
      };
    }
    return {};
  };

  const getLabelStyles = (): React.CSSProperties => {
    if (variant === 'labeled' && (isFocused || value)) {
      return {
        top: '25%',
        left: '0.84em',
        fontSize: '0.75em',
        fontWeight: 'bold',
      };
    }
    return {};
  };

  return (
    <Styled.Container
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={variant === 'search' ? { margin: 0 } : {}}
    >
      <input
        ref={textInputRef}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={variant === 'labeled' ? '' : label}
        autoComplete={autoComplete}
        style={getTextInputStyles()}
      />
      <label onClick={() => textInputRef.current.focus()} style={getLabelStyles()}>
        {variant === 'labeled' && label}
      </label>
    </Styled.Container>
  );
}

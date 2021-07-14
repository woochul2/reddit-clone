import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: var(--tooltip-background-color);
  color: var(--tooltip-text-color);

  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0.25rem;
    border-style: solid;
    border-color: transparent transparent var(--tooltip-background-color) transparent;
  }
`;

import styled, { css } from 'styled-components';
import { BREAKPOINTS } from '../../../constants';

export const Container = styled.header`
  z-index: 3;
  position: sticky;
  top: 0;
  padding: 0.375rem 0;
  border-bottom: 0.065rem solid var(--header-border-color);
  background-color: var(--body-background-color);
`;

export const DesktopInside = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 75rem;
  margin: 0 auto;
  padding: 0 1.5rem;

  @media (max-width: ${BREAKPOINTS.MD}) {
    display: none;
  }
`;

export const MobileInside = styled.div`
  display: none;
  align-items: center;
  justify-content: space-between;
  height: 2.375rem;
  padding: 0 1.5rem;

  @media (max-width: ${BREAKPOINTS.MD}) {
    display: flex;
  }
`;

export const Logo = styled.a`
  text-decoration: none;
  font-size: 1.5rem;
  outline: 0;
  padding: 0.16rem 0;
  border-radius: 0.125em;
  color: var(--body-text-color);

  @media (max-width: ${BREAKPOINTS.MD}) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  span {
    font-size: 1.125rem;
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--body-text-color);
  }
`;

export const RightPanel = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const iconStyles = css`
  position: relative;
  outline: 0;
  border-radius: 0.125em;
  color: var(--body-text-color);

  svg {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .original {
    visibility: visible;
  }

  .hovered {
    visibility: hidden;
  }

  .tooltip {
    visibility: hidden;
    transition: visibility 0s;
  }

  &:hover,
  &:focus-visible {
    .original {
      visibility: hidden;
    }

    .hovered {
      visibility: visible;
    }

    .tooltip {
      visibility: visible;
      transition: visibility 0s linear 0.5s;
    }
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--body-text-color);
  }
`;

export const IconButton = styled.button`
  ${iconStyles};
  cursor: pointer;
  width: 1.25rem;
  height: 1.25rem;
  border: 0;
  background: 0;
`;

export const IconLink = styled.a`
  ${iconStyles};
  width: 1.25rem;
  height: 1.25rem;
`;

const AuthButtonStyles = css`
  outline: 0;
  border-radius: 0.125em;
  color: var(--body-text-color);

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--body-text-color);
  }
`;

export const LogoutButton = styled.button`
  ${AuthButtonStyles}
  cursor: pointer;
  border: none;
  background: none;
`;

export const AuthLink = styled.a`
  ${AuthButtonStyles}
  position: relative;
  text-decoration: none;
`;

export const MenuButton = styled.button`
  background: 0;
  outline: 0;
  border: 0;
  border-radius: 0.25rem;
  color: var(--body-text-color);

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--body-text-color);
  }

  .close-icon {
    width: 1rem;
    height: 1rem;
  }
`;

export const MobileMenu = styled.div`
  z-index: 2;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--body-background-color);
`;

export const MobileMenuInside = styled.div<{ height: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: ${({ height }) => height};
  padding: 4rem 0.25rem 2rem;
`;

export const MobileMenuBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.125rem;

  button {
    padding: 0;
    outline: 0;
    border: 0;
    border-radius: 0.25rem;
    background: 0;
    color: var(--body-text-color);

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      box-shadow: 0 0 0 0.125rem var(--body-text-color);
    }
  }
`;

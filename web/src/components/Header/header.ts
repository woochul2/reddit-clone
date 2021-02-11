import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { BREAKPOINT_MD } from '../../constants';

interface ContainerProps {
  styles?: FlattenSimpleInterpolation;
}

export const Container = styled.header<ContainerProps>`
  z-index: 3;
  position: sticky;
  top: 0;
  padding: 0.375rem 0;
  border-bottom: 0.065rem solid var(--header-border-color);
  background-color: var(--body-background-color);
  ${({ styles }) => styles}
`;

export const Inside = styled.div`
  .inside__desktop {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    max-width: 75rem;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media (max-width: ${BREAKPOINT_MD}) {
      display: none;
    }
  }

  .inside__mobile {
    display: none;
    align-items: center;
    justify-content: space-between;
    height: 2.375rem;
    padding: 0 1.5rem;

    @media (max-width: ${BREAKPOINT_MD}) {
      display: flex;
    }
  }
`;

export const MenuButton = styled.button`
  background: 0;
  border: 0;
  color: var(--body-text-color);

  .close-icon {
    width: 1rem;
    height: 1rem;
  }
`;

export const RightPanel = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const Logo = styled.a`
  text-decoration: none;
  font-size: 1.5rem;
  outline: 0;
  padding: 0.16rem 0;
  border-radius: 0.125em;
  color: var(--body-text-color);

  @media (max-width: ${BREAKPOINT_MD}) {
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

export const LogoutButton = styled.button`
  cursor: pointer;
  outline: 0;
  border: none;
  border-radius: 0.125em;
  background: none;
  color: var(--body-text-color);

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--body-text-color);
  }
`;

export const Link = styled.a`
  position: relative;
  text-decoration: none;
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

export const iconStyles = css`
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

export const MobileMenu = styled.div<{ offset: string }>`
  z-index: 2;
  position: absolute;
  top: ${({ offset }) => offset};
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  padding: 4rem 0.25rem 2rem;
  background-color: var(--body-background-color);
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.125rem;

  button {
    padding: 0;
    border: 0;
    background: 0;
    color: var(--body-text-color);

    &:hover {
      text-decoration: underline;
    }
  }
`;

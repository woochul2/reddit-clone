import { useRouter } from 'next/router';
import React from 'react';
import { css } from 'styled-components';
import { PAGES } from '../../constants';
import { Post } from '../../generated/graphql';
import Close from '../../icons/Close';
import Tooltip from '../Tooltip';
import VoteIcon from '../VoteIcon';
import * as Styled from './styles/PostTopPanel';

interface Props {
  post: Post;
  topPanelOffset: number;
}

export default function PostTopPanel({ post, topPanelOffset }: Props) {
  const router = useRouter();

  const handleClose = async () => {
    await router.push(PAGES.HOME);
  };

  return (
    <Styled.Container style={{ top: `${topPanelOffset}px` }}>
      <Styled.Inside>
        <Styled.VotePanel>
          <VoteIcon id={post.id} voteStatus={post.voteStatus} styles={voteIconStyles} />
          <Styled.VoteCount>{post.voteCount}</Styled.VoteCount>
          <VoteIcon variant="down" id={post.id} voteStatus={post.voteStatus} styles={voteIconStyles} />
        </Styled.VotePanel>
        <Styled.Title>{post.title}</Styled.Title>
        <Styled.CloseIcon onClick={handleClose}>
          <Close />
          <Tooltip className="tooltip">닫기</Tooltip>
        </Styled.CloseIcon>
      </Styled.Inside>
    </Styled.Container>
  );
}

const voteIconStyles = css`
  margin: 0;
  color: var(--top-panel-text-color);

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--post-top-panel-text-color);
  }

  &:hover {
    background-color: var(--post-top-panel-icon-hover-background-color);
  }
`;

import { useRouter } from 'next/router';
import React from 'react';
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
          <VoteIcon variant="topPanel" id={post.id} voteStatus={post.voteStatus} />
          <Styled.VoteCount>{post.voteCount}</Styled.VoteCount>
          <VoteIcon variant="topPanel" direction="down" id={post.id} voteStatus={post.voteStatus} />
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

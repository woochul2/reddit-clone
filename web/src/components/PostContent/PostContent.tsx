import { useRouter } from 'next/router';
import React from 'react';
import { PAGES } from '../../constants';
import { Post, useDeletePostMutation } from '../../generated/graphql';
import { getLocalDate } from '../../utils/getLocalDate';
import * as Styled from './styles/PostContent';

interface Props {
  post: Post;
  currentUserId?: number;
}

export default function PostContent({ post, currentUserId }: Props) {
  const router = useRouter();

  const [deletePost] = useDeletePostMutation();

  const handleDeletePost = async (id: number) => {
    await deletePost({
      variables: { id },
      update: (cache) => {
        cache.evict({ fieldName: 'posts' });
      },
    });
    await router.push(PAGES.HOME);
  };

  return (
    <Styled.Container>
      <Styled.Title>{post.title}</Styled.Title>
      <Styled.CreationInfo>
        <span>{post.creator.username}</span>
        <Styled.CreationDate>
          <span className="desktop">{getLocalDate(post.createdAt)}</span>
          <span className="mobile">{getLocalDate(post.createdAt, 'dot')}</span>
        </Styled.CreationDate>
        {currentUserId === post.creatorId && (
          <Styled.ButtonContainer>
            <button onClick={async () => await router.push(`${PAGES.EDIT_POST}/${post.id}`)}>수정</button>
            <button onClick={() => handleDeletePost(post.id)}>삭제</button>
          </Styled.ButtonContainer>
        )}
      </Styled.CreationInfo>
      <Styled.ContentText>{post.text}</Styled.ContentText>
    </Styled.Container>
  );
}

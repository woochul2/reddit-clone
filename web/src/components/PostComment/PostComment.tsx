import React, { useState } from 'react';
import { Comment, useDeleteCommentMutation, useUpdateCommentMutation } from '../../generated/graphql';
import { getLocalDate } from '../../utils/getLocalDate';
import TextArea from '../TextArea';
import * as Styled from './styles/PostComment';

interface Props {
  comment: Comment;
  postId: number;
  currentUserId?: number;
  editedCommentId: number;
  setEditedCommentId: React.Dispatch<React.SetStateAction<number>>;
}

export default function PostComment({ comment, postId, currentUserId, editedCommentId, setEditedCommentId }: Props) {
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [updatedCommentText, setUpdatedCommentText] = useState('');

  const handleUpdateComment = async (event: React.FormEvent<HTMLFormElement>, commentId: number) => {
    event.preventDefault();

    if (!updatedCommentText) {
      handleDeleteComment();
      return;
    }

    await updateComment({
      variables: { id: commentId, text: updatedCommentText },
      update: (cache) => {
        cache.evict({ id: 'Post:' + postId });
      },
    });
    setEditedCommentId(-1);
  };

  const handleDeleteComment = async () => {
    await deleteComment({
      variables: { id: comment.id },
      update: (cache) => {
        cache.evict({ id: 'Post:' + postId });
      },
    });
  };

  return (
    <Styled.Container>
      <Styled.TopPanel>
        <div>
          <Styled.Creator>{comment.creator.username}</Styled.Creator> &middot;{' '}
          <span className="desktop">{getLocalDate(comment.createdAt)}</span>
          <span className="mobile">{getLocalDate(comment.createdAt, 'dot')}</span>
        </div>
        {currentUserId === comment.creatorId && (
          <Styled.ButtonContainer>
            {editedCommentId === comment.id ? (
              <button onClick={() => setEditedCommentId(-1)}>취소</button>
            ) : (
              <button
                onClick={() => {
                  setEditedCommentId(comment.id);
                  setUpdatedCommentText(comment.text);
                }}
              >
                수정
              </button>
            )}
            <button onClick={handleDeleteComment}>삭제</button>
          </Styled.ButtonContainer>
        )}
      </Styled.TopPanel>
      {editedCommentId === comment.id ? (
        <Styled.EditedCommentForm onSubmit={(event) => handleUpdateComment(event, comment.id)}>
          <TextArea
            name="comment"
            minRows={1}
            value={updatedCommentText}
            onChange={(event) => setUpdatedCommentText(event.target.value)}
            style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}
          />
          <button type="submit">확인</button>
        </Styled.EditedCommentForm>
      ) : (
        <Styled.Text>{comment.text}</Styled.Text>
      )}
    </Styled.Container>
  );
}

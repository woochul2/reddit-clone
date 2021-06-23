import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { css } from 'styled-components';
import Button from '../../components/Button';
import Confirmation from '../../components/Confirmation';
import Layout from '../../components/Layout';
import TextArea from '../../components/TextArea';
import Tooltip from '../../components/Tooltip';
import VoteIcon from '../../components/VoteIcon';
import { PAGES } from '../../constants';
import {
  useCurrentUserQuery,
  useDeleteCommentMutation,
  useDeletePostMutation,
  usePostQuery,
  useUpdateCommentMutation,
  useWriteCommentMutation,
} from '../../generated/graphql';
import Close from '../../icons/Close';
import * as Styled from '../../page-styles/post-detail';
import { getLocalDate } from '../../utils/getLocalDate';
import withApollo from '../../utils/withApollo';

function PostDetail() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: postData, loading: loadingPost } = usePostQuery({
    variables: { id: parseInt(id) },
  });
  const post = postData?.post;
  const [topPanelOffset, setTopPanelOffest] = useState(0);
  const [commentText, setCommentText] = useState('');
  const { data: currentUserData, loading: loadingCurrentUser } = useCurrentUserQuery();
  const [deletePost] = useDeletePostMutation();
  const [hasCommentError, setHasCommentError] = useState(false);
  const [writeComment, { loading: loadingWriteComment }] = useWriteCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [updatedCommentId, setUpdatedCommentID] = useState(-1);
  const [updatedCommentText, setUpdatedCommentText] = useState('');
  const [updateComment] = useUpdateCommentMutation();

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      const headerRect = header.getBoundingClientRect();
      setTopPanelOffest(headerRect.height);
    }
  }, [post]);

  const handleClickBackground = async () => {
    await router.push(PAGES.HOME);
  };

  const handleDeletePost = async (id: number) => {
    await deletePost({
      variables: { id },
      update: (cache) => {
        cache.evict({ fieldName: 'posts' });
      },
    });
    await router.push(PAGES.HOME);
  };

  const getMinHeight = () => {
    if (typeof window !== 'undefined') {
      return `${window.innerHeight - topPanelOffset}px`;
    }
    return '0px';
  };

  const handleSubmitComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentUserData?.currentUser) {
      await router.push(PAGES.LOGIN);
      return;
    }

    if (!commentText) {
      setHasCommentError(true);
      return;
    }

    if (!post) {
      return;
    }
    await writeComment({
      variables: { input: { postId: post.id, text: commentText } },
      update: (cache) => {
        cache.evict({ id: 'Post:' + id });
      },
    });
    setCommentText('');
    setUpdatedCommentID(-1);
  };

  const handleCommentChange = () => {
    setHasCommentError(false);
  };

  const handleUpdateComment = async (event: React.FormEvent<HTMLFormElement>, commentId: number) => {
    event.preventDefault();
    await updateComment({
      variables: { id: commentId, text: updatedCommentText },
      update: (cache) => {
        cache.evict({ id: 'Post:' + id });
      },
    });
    setUpdatedCommentID(-1);
  };

  return (
    <>
      {loadingPost && (
        <Layout>
          <ReactLoading
            className="layout__loading-icon"
            type="spinningBubbles"
            width="1.5em"
            height="1.5em"
            color="var(--body-text-color)"
          />
        </Layout>
      )}
      {!loadingPost && !loadingCurrentUser && post && (
        <Layout variant="modal" onClickBackground={handleClickBackground}>
          <Styled.Container onClick={(event) => event.stopPropagation()} minHeight={getMinHeight()}>
            <Styled.TopPanel offset={`${topPanelOffset}px`}>
              <Styled.TopPanelInside>
                <div className="top-panel-inside__vote">
                  <VoteIcon
                    color="var(--top-panel-text-color)"
                    id={post.id}
                    voteStatus={post.voteStatus}
                    styles={css`
                      margin: 0;
                      &:focus-visible {
                        box-shadow: 0 0 0 0.125rem var(--post-top-panel-text-color);
                      }
                      &:hover {
                        background-color: var(--post-top-panel-icon-hover-background-color);
                      }
                    `}
                  />
                  <Styled.VoteCounts>{post.voteCounts}</Styled.VoteCounts>
                  <VoteIcon
                    variant="down"
                    color="var(--top-panel-text-color)"
                    id={post.id}
                    voteStatus={post.voteStatus}
                    styles={css`
                      margin: 0;
                      &:focus-visible {
                        box-shadow: 0 0 0 0.125rem var(--post-top-panel-text-color);
                      }
                      &:hover {
                        background-color: var(--post-top-panel-icon-hover-background-color);
                      }
                    `}
                  />
                </div>
                <Styled.SmallTitle>{post.title}</Styled.SmallTitle>
                <Styled.CloseIcon onClick={async () => await router.push(PAGES.HOME)}>
                  <Close className="close-icon" />
                  <Tooltip className="tooltip">닫기</Tooltip>
                </Styled.CloseIcon>
              </Styled.TopPanelInside>
            </Styled.TopPanel>
            <Styled.MainPanel>
              <Styled.LeftPanel>
                <VoteIcon id={post.id} voteStatus={post.voteStatus} />
                <Styled.VoteCounts>{post.voteCounts}</Styled.VoteCounts>
                <VoteIcon variant="down" id={post.id} voteStatus={post.voteStatus} />
              </Styled.LeftPanel>
              <Styled.RightPanel>
                <Styled.ContentPanel>
                  <Styled.Title>{post.title}</Styled.Title>
                  <Styled.CreationInfo>
                    <div className="creation-info__left">
                      <span>{post.creator.username}</span>
                      <span className="creation-info__date">
                        <span className="desktop">{getLocalDate(post.createdAt)}</span>
                        <span className="mobile">{getLocalDate(post.createdAt, 'dot')}</span>
                      </span>
                    </div>
                    {currentUserData?.currentUser?.id === post.creatorId && (
                      <div className="creation-info__button-container">
                        <button onClick={async () => await router.push(`${PAGES.EDIT_POST}/${post.id}`)}>수정</button>
                        <button onClick={() => handleDeletePost(post.id)}>삭제</button>
                      </div>
                    )}
                  </Styled.CreationInfo>
                  <Styled.ContentText>{post.text}</Styled.ContentText>
                </Styled.ContentPanel>
                <Styled.CommentForm onSubmit={handleSubmitComment} onChange={handleCommentChange}>
                  <Styled.CommentCount>댓글 {post.comments.length}개</Styled.CommentCount>
                  <TextArea
                    name="commentText"
                    minRows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    styles={Styled.commentTextAreaStyles}
                  />
                  {hasCommentError && <Styled.CommentError>댓글이 비어있습니다.</Styled.CommentError>}
                  <Button styles={Styled.buttonStyles} type="submit" disabled={loadingWriteComment}>
                    작성
                  </Button>
                </Styled.CommentForm>
                <Styled.Comments>
                  {post.comments &&
                    post.comments.map((comment) => (
                      <div className="comment" key={comment.id}>
                        <div className="comment__top">
                          <p className="comment__top-left">
                            {comment.creator.username} <span className="comment__middot">&middot; </span>
                            <span className="comment__created-date">
                              <span className="desktop">{getLocalDate(comment.createdAt)}</span>
                              <span className="mobile">{getLocalDate(comment.createdAt, 'dot')}</span>
                            </span>
                          </p>
                          <div className="comment__top-right">
                            {currentUserData?.currentUser?.id === comment.creatorId && (
                              <>
                                {updatedCommentId !== comment.id ? (
                                  <button
                                    className="comment__button"
                                    onClick={() => {
                                      setUpdatedCommentID(comment.id);
                                      setUpdatedCommentText(comment.text);
                                    }}
                                  >
                                    수정
                                  </button>
                                ) : (
                                  <button
                                    className="comment__button"
                                    onClick={() => {
                                      setUpdatedCommentID(-1);
                                    }}
                                  >
                                    취소
                                  </button>
                                )}
                                <button
                                  className="comment__button"
                                  onClick={async () => {
                                    await deleteComment({
                                      variables: { id: comment.id },
                                      update: (cache) => {
                                        cache.evict({ id: 'Post:' + id });
                                      },
                                    });
                                  }}
                                >
                                  삭제
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {updatedCommentId === comment.id ? (
                          <Styled.UpdatedCommentForm onSubmit={(e) => handleUpdateComment(e, comment.id)}>
                            <TextArea
                              name="comment"
                              minRows={1}
                              value={updatedCommentText}
                              onChange={(e) => setUpdatedCommentText(e.target.value)}
                              styles={css`
                                font-size: 0.875rem;
                              `}
                            />
                            <button type="submit">확인</button>
                          </Styled.UpdatedCommentForm>
                        ) : (
                          <p className="comment__text">{comment.text}</p>
                        )}
                      </div>
                    ))}
                </Styled.Comments>
              </Styled.RightPanel>
            </Styled.MainPanel>
          </Styled.Container>
        </Layout>
      )}
      {!loadingPost && !post && (
        <Layout>
          <Confirmation text="게시물이 존재하지 않습니다." />
        </Layout>
      )}
    </>
  );
}

export default withApollo({ ssr: true })(PostDetail);

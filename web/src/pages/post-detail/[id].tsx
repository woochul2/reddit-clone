import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { css } from 'styled-components';
import Button from '../../components/Button';
import Confirmation from '../../components/Confirmation';
import Layout from '../../components/Layout';
import TextArea from '../../components/TextArea';
import Tooltip from '../../components/Tooltip';
import VoteIcon from '../../components/VoteIcon';
import { EDIT_POST, HOME, LOGIN } from '../../constants';
import {
  useCurrentUserQuery,
  useDeleteCommentMutation,
  useDeletePostMutation,
  usePostQuery,
  useUpdateCommentMutation,
  useWriteCommentMutation,
} from '../../generated/graphql';
import Close from '../../icons/Close';
import {
  buttonStyles,
  CloseIcon,
  CommentCount,
  CommentError,
  CommentForm,
  Comments,
  commentTextAreaStyles,
  Container,
  ContentPanel,
  ContentText,
  CreationInfo,
  LeftPanel,
  MainPanel,
  RightPanel,
  SmallTitle,
  Title,
  TopPanel,
  TopPanelInside,
  UpdatedCommentForm,
  VoteCounts,
} from '../../page-styles/post-detail';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { getLocalDate } from '../../utils/getLocalDate';
import { isServer } from '../../utils/isServer';

const PostDetail: NextPage<{ id: string }> = ({ id }) => {
  const [{ data: postData, fetching: fetchingPost }] = usePostQuery({
    variables: { id: parseInt(id) },
  });
  const post = postData?.post;
  const router = useRouter();
  const [topPanelOffset, setTopPanelOffest] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [
    { data: currentUserData, fetching: fetchingCurrentUser },
  ] = useCurrentUserQuery();
  const [, deletePost] = useDeletePostMutation();
  const [hasCommentError, setHasCommentError] = useState(false);
  const [, writeComment] = useWriteCommentMutation();
  const [, deleteComment] = useDeleteCommentMutation();
  const [updatedCommentId, setUpdatedCommentID] = useState(-1);
  const [updatedCommentText, setUpdatedCommentText] = useState('');
  const [, updateComment] = useUpdateCommentMutation();

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      const headerRect = header.getBoundingClientRect();
      setTopPanelOffest(headerRect.height);
    }
  }, [post]);

  const handleClickBackground = async () => {
    await router.push(HOME);
  };

  const handleDeletePost = async (id: number) => {
    await deletePost({ id });
    await router.push(HOME);
  };

  const getMinHeight = () => {
    if (!isServer()) {
      return `${window.innerHeight - topPanelOffset}px`;
    }
    return '0px';
  };

  const handleSubmitComment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!currentUserData?.currentUser) {
      await router.push(LOGIN);
      return;
    }

    if (!commentText) {
      setHasCommentError(true);
      return;
    }

    if (!post) {
      return;
    }
    await writeComment({ input: { postId: post.id, text: commentText } });
    setCommentText('');
    setUpdatedCommentID(-1);
  };

  const handleCommentChange = () => {
    setHasCommentError(false);
  };

  const handleUpdateComment = async (
    event: React.FormEvent<HTMLFormElement>,
    commentId: number
  ) => {
    event.preventDefault();
    await updateComment({ id: commentId, text: updatedCommentText });
    setUpdatedCommentID(-1);
  };

  return (
    <>
      {!fetchingPost && !fetchingCurrentUser && post && (
        <Layout variant="modal" onClickBackground={handleClickBackground}>
          <Container
            onClick={(event) => event.stopPropagation()}
            minHeight={getMinHeight()}
          >
            <TopPanel offset={`${topPanelOffset}px`}>
              <TopPanelInside>
                <div className="top-panel-inside__vote">
                  <VoteIcon
                    color="var(--top-panel-text-color)"
                    backgroundColor="var(--post-top-panel-icon-hover-background-color)"
                    id={post.id}
                    voteStatus={post.voteStatus}
                    styles={css`
                      margin: 0;
                      &:focus-visible {
                        box-shadow: 0 0 0 0.125rem var(--body-text-color);
                      }
                    `}
                  />
                  <VoteCounts>{post.voteCounts}</VoteCounts>
                  <VoteIcon
                    variant="down"
                    color="var(--top-panel-text-color)"
                    backgroundColor="var(--post-top-panel-icon-hover-background-color)"
                    id={post.id}
                    voteStatus={post.voteStatus}
                    styles={css`
                      margin: 0;
                      &:focus-visible {
                        box-shadow: 0 0 0 0.125rem var(--body-text-color);
                      }
                    `}
                  />
                </div>
                <SmallTitle>{post.title}</SmallTitle>
                <CloseIcon onClick={async () => await router.push(HOME)}>
                  <Close className="close-icon" />
                  <Tooltip className="tooltip">닫기</Tooltip>
                </CloseIcon>
              </TopPanelInside>
            </TopPanel>
            <MainPanel>
              <LeftPanel>
                <VoteIcon id={post.id} voteStatus={post.voteStatus} />
                <VoteCounts>{post.voteCounts}</VoteCounts>
                <VoteIcon
                  variant="down"
                  id={post.id}
                  voteStatus={post.voteStatus}
                />
              </LeftPanel>
              <RightPanel>
                <ContentPanel>
                  <Title>{post.title}</Title>
                  <CreationInfo>
                    <div className="creation-info__left">
                      <span>{post.creator.username}</span>
                      <span className="creation-info__date">
                        <span className="desktop">
                          {getLocalDate(post.createdAt)}
                        </span>
                        <span className="mobile">
                          {getLocalDate(post.createdAt, 'dot')}
                        </span>
                      </span>
                    </div>
                    {currentUserData?.currentUser?.id === post.creatorId && (
                      <div className="creation-info__button-container">
                        <button
                          onClick={async () =>
                            await router.push(`${EDIT_POST}/${post.id}`)
                          }
                        >
                          수정
                        </button>
                        <button onClick={() => handleDeletePost(post.id)}>
                          삭제
                        </button>
                      </div>
                    )}
                  </CreationInfo>
                  <ContentText>{post.text}</ContentText>
                </ContentPanel>
                <CommentForm
                  onSubmit={handleSubmitComment}
                  onChange={handleCommentChange}
                >
                  <CommentCount>댓글 {post.comments.length}개</CommentCount>
                  <TextArea
                    name="commentText"
                    minRows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    styles={commentTextAreaStyles}
                  />
                  {hasCommentError && (
                    <CommentError>댓글이 비어있습니다.</CommentError>
                  )}
                  <Button styles={buttonStyles} type="submit">
                    작성
                  </Button>
                </CommentForm>
                <Comments>
                  {post.comments &&
                    post.comments.map((comment) => (
                      <div className="comment" key={comment.id}>
                        <div className="comment__top">
                          <p className="comment__top-left">
                            {comment.creator.username}{' '}
                            <span className="comment__middot">&middot; </span>
                            <span className="comment__created-date">
                              <span className="desktop">
                                {getLocalDate(comment.createdAt)}
                              </span>
                              <span className="mobile">
                                {getLocalDate(comment.createdAt, 'dot')}
                              </span>
                            </span>
                          </p>
                          <div className="comment__top-right">
                            {currentUserData?.currentUser?.id ===
                              comment.creatorId && (
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
                                    await deleteComment({ id: comment.id });
                                  }}
                                >
                                  삭제
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {updatedCommentId === comment.id ? (
                          <UpdatedCommentForm
                            onSubmit={(e) => handleUpdateComment(e, comment.id)}
                          >
                            <TextArea
                              name="comment"
                              minRows={1}
                              value={updatedCommentText}
                              onChange={(e) =>
                                setUpdatedCommentText(e.target.value)
                              }
                              styles={css`
                                font-size: 0.875rem;
                              `}
                            />
                            <button type="submit">확인</button>
                          </UpdatedCommentForm>
                        ) : (
                          <p className="comment__text">{comment.text}</p>
                        )}
                      </div>
                    ))}
                </Comments>
              </RightPanel>
            </MainPanel>
          </Container>
        </Layout>
      )}
      {!fetchingPost && !post && (
        <Layout>
          <Confirmation text="게시물이 존재하지 않습니다." />
        </Layout>
      )}
    </>
  );
};

PostDetail.getInitialProps = ({ query }) => {
  return {
    id: query.id as string,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: true })(
  PostDetail as any
);

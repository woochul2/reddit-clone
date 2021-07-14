import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ReactLoading from 'react-loading';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import OneLineNotice from '../../components/OneLineNotice';
import PostComment from '../../components/PostComment';
import PostContent from '../../components/PostContent';
import PostTopPanel from '../../components/PostTopPanel';
import TextArea from '../../components/TextArea';
import VoteIcon from '../../components/VoteIcon';
import { PAGES } from '../../constants';
import { useCurrentUserQuery, usePostQuery, useWriteCommentMutation } from '../../generated/graphql';
import * as Styled from '../../page-styles/post-detail';
import withApollo from '../../utils/withApollo';

function PostDetail() {
  const headerRef = useRef<HTMLElement>(null);

  const router = useRouter();
  const postId = parseInt(router.query.id as string) || -1;

  const { data: postData, loading: loadingPost } = usePostQuery({ variables: { id: postId } });
  const { data: currentUserData, loading: loadingCurrentUser } = useCurrentUserQuery();
  const [writeComment, { loading: loadingWriteComment }] = useWriteCommentMutation();

  const [topPanelOffset, setTopPanelOffest] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [hasCommentError, setHasCommentError] = useState(false);
  const [editedCommentId, setEditedCommentId] = useState(-1);

  const post = postData?.post;
  const currentUserId = currentUserData?.currentUser?.id;

  const handleClickBackground = async () => {
    await router.push(PAGES.HOME);
  };

  useEffect(() => {
    if (loadingPost) return;
    if (!headerRef.current) return;

    const headerRect = headerRef.current.getBoundingClientRect();
    setTopPanelOffest(headerRect.height);
  }, [loadingPost]);

  const getMinHeight = (): string => {
    if (typeof window === 'undefined') {
      return '0px';
    }
    return `${window.innerHeight - topPanelOffset}px`;
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

    if (!post) return;

    await writeComment({
      variables: { input: { postId: post.id, text: commentText } },
      update: (cache) => {
        cache.evict({ id: 'Post:' + postId });
      },
    });
    setCommentText('');
    setEditedCommentId(-1);
  };

  const handleCommentChange = () => {
    if (hasCommentError) setHasCommentError(false);
  };

  let Post;
  if (!post) {
    Post = (
      <Layout>
        <OneLineNotice text="게시물이 존재하지 않습니다." />
      </Layout>
    );
  } else if (!loadingCurrentUser) {
    Post = (
      <Layout headerRef={headerRef} variant="modal" title={post.title} onClickBackground={handleClickBackground}>
        <Styled.Container onClick={(event) => event.stopPropagation()} style={{ minHeight: getMinHeight() }}>
          <PostTopPanel post={post} topPanelOffset={topPanelOffset} />
          <Styled.MainPanel>
            <Styled.LeftPanel>
              <VoteIcon id={post.id} voteStatus={post.voteStatus} />
              <Styled.VoteCount>{post.voteCount}</Styled.VoteCount>
              <VoteIcon direction="down" id={post.id} voteStatus={post.voteStatus} />
            </Styled.LeftPanel>
            <Styled.RightPanel>
              <PostContent post={post} currentUserId={currentUserId} />
              <Styled.CommentForm onSubmit={handleSubmitComment} onChange={handleCommentChange}>
                <Styled.CommentCount>댓글 {post.comments.length}개</Styled.CommentCount>
                <TextArea
                  name="comment"
                  minRows={4}
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                  style={{ margin: '0.625rem 0 0.375rem' }}
                />
                {hasCommentError && <Styled.CommentError>댓글이 비어있습니다.</Styled.CommentError>}
                <div style={{ alignSelf: 'flex-end' }}>
                  <Button variant="small" type="submit" disabled={loadingWriteComment}>
                    작성
                  </Button>
                </div>
              </Styled.CommentForm>
              {post.comments.map((comment) => (
                <PostComment
                  key={comment.id}
                  comment={comment}
                  postId={postId}
                  currentUserId={currentUserId}
                  editedCommentId={editedCommentId}
                  setEditedCommentId={setEditedCommentId}
                />
              ))}
            </Styled.RightPanel>
          </Styled.MainPanel>
        </Styled.Container>
      </Layout>
    );
  }

  return (
    <>
      {loadingPost ? (
        <Layout title={post?.title}>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
            <ReactLoading type="spinningBubbles" width="1.5em" height="1.5em" color="var(--body-text-color)" />
          </div>
        </Layout>
      ) : (
        Post
      )}
    </>
  );
}

export default withApollo({ ssr: true })(PostDetail);

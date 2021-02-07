import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Confirmation from '../../components/Confirmation';
import Layout from '../../components/Layout';
import TextArea from '../../components/TextArea';
import Tooltip from '../../components/Tooltip';
import VoteIcon from '../../components/VoteIcon';
import { HOME } from '../../constants';
import {
  useCurrentUserQuery,
  useDeletePostMutation,
  usePostQuery,
} from '../../generated/graphql';
import Close from '../../icons/Close';
import {
  buttonStyles,
  CloseIcon,
  CommentPanel,
  Container,
  ContentPanel,
  CreationInfo,
  DeleteButton,
  LeftPanel,
  MainPanel,
  RightPanel,
  SmallTitle,
  textAreaStyles,
  Title,
  TopPanel,
  TopPanelInside,
  VoteCounts,
} from '../../page-styles/post-detail';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { getLocalDate } from '../../utils/getLocalDate';
import { isSameDate } from '../../utils/isSameDate';

const PostDetail: NextPage<{ id: string }> = ({ id }) => {
  const [{ data: postData, fetching: fetchingPost }] = usePostQuery({
    variables: { id: parseInt(id) },
  });
  const post = postData?.post;
  const router = useRouter();
  const [date, setDate] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
  });
  const [topPanelOffset, setTopPanelOffest] = useState('0px');
  const [comment, setComment] = useState('');
  const [
    { data: currentUserData, fetching: fetchingCurrentUser },
  ] = useCurrentUserQuery();
  const [, deletePost] = useDeletePostMutation();

  useEffect(() => {
    if (!fetchingPost && post?.createdAt) {
      const [year, month, day, hour, minute] = getLocalDate(post?.createdAt);
      setDate({ year, month, day, hour, minute });
    }

    const header = document.querySelector('header');
    if (header) {
      const headerRect = header.getBoundingClientRect();
      setTopPanelOffest(`${headerRect.height}px`);
    }
  }, [post]);

  const handleClickBackground = async () => {
    await router.push(HOME);
  };

  const handleDelete = async (id: number) => {
    await deletePost({ id });
    await router.push(HOME);
  };

  return (
    <>
      {!fetchingPost && post && (
        <Layout variant="modal" onClickBackground={handleClickBackground}>
          <Container onClick={(event) => event.stopPropagation()}>
            <TopPanel offset={topPanelOffset}>
              <TopPanelInside>
                <VoteIcon
                  color="var(--top-panel-text-color)"
                  backgroundColor="var(--post-top-panel-hover-background-color)"
                  id={post.id}
                  voteStatus={post.voteStatus}
                />
                <VoteCounts>{post.voteCounts}</VoteCounts>
                <VoteIcon
                  variant="down"
                  color="var(--top-panel-text-color)"
                  backgroundColor="var(--post-top-panel-hover-background-color)"
                  id={post.id}
                  voteStatus={post.voteStatus}
                />
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
                    <p>{post.creator.username}</p>
                    <p>
                      {date.year}년 {date.month}월 {date.day}일
                      {isSameDate(post.createdAt) && (
                        <>
                          {' '}
                          {date.hour}:{date.minute}
                        </>
                      )}
                    </p>
                    {!fetchingCurrentUser &&
                      currentUserData?.currentUser?.id === post.creatorId && (
                        <DeleteButton onClick={() => handleDelete(post.id)}>
                          삭제
                        </DeleteButton>
                      )}
                  </CreationInfo>
                  <p>{post.text}</p>
                </ContentPanel>
                <CommentPanel>
                  <p>댓글 0개</p>
                  <TextArea
                    name="comment"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    styles={textAreaStyles}
                  />
                  <Button styles={buttonStyles}>작성</Button>
                </CommentPanel>
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

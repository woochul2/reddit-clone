import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { PAGES } from '../../constants';
import { useCurrentUserQuery, useVoteMutation } from '../../generated/graphql';
import ArrowUpFilled from '../../icons/ArrowUpFilled';
import ArrowUpOutlined from '../../icons/ArrowUpOutlined';
import * as Styled from './styles/VoteIcon';

interface Props {
  id: number;
  voteStatus?: number | null;
  variant?: 'up' | 'down';
  color?: string;
  backgroundColor?: string;
  styles?: FlattenSimpleInterpolation;
}

export default function Icon({ id, voteStatus, variant = 'up', color, backgroundColor, styles }: Props) {
  const [vote, { loading: loadingVote }] = useVoteMutation();
  const { data: currentUserData, loading: loadingCurrentUser } = useCurrentUserQuery();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (variant === 'up') {
      setValue(1);
    } else if (variant === 'down') {
      setValue(-1);
    }
  }, []);

  const handleVote = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: number) => {
    event.stopPropagation();
    if (!currentUserData?.currentUser) {
      await router.push(PAGES.LOGIN);
      return;
    }
    await vote({ variables: { value, postId: id } });
  };

  return (
    <>
      {!loadingCurrentUser && (
        <Styled.Container
          variant={variant}
          color={color}
          backgroundColor={backgroundColor}
          onClick={(event) => handleVote(event, value)}
          hasClicked={voteStatus === value}
          disabled={loadingVote}
          styles={styles}
        >
          <ArrowUpOutlined className="original" />
          <ArrowUpFilled className="hovered" />
        </Styled.Container>
      )}
    </>
  );
}

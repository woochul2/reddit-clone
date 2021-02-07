import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { LOGIN } from '../../constants';
import { useCurrentUserQuery, useVoteMutation } from '../../generated/graphql';
import ArrowUpFilled from '../../icons/ArrowUpFilled';
import ArrowUpOutlined from '../../icons/ArrowUpOutlined';
import { Container } from './vote-icon';

interface Props {
  id: number;
  voteStatus?: number | null;
  variant?: 'up' | 'down';
  color?: string;
  backgroundColor?: string;
  styles?: FlattenSimpleInterpolation;
}

export default function Icon({
  id,
  voteStatus,
  variant = 'up',
  color,
  backgroundColor,
  styles,
}: Props) {
  const [, vote] = useVoteMutation();
  const [
    { data: currentUserData, fetching: fetchingCurrentUser },
  ] = useCurrentUserQuery();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (variant === 'up') {
      setValue(1);
    } else if (variant === 'down') {
      setValue(-1);
    }
  }, []);

  const handleVote = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: number
  ) => {
    event.stopPropagation();
    if (!currentUserData?.currentUser) {
      await router.push(LOGIN);
      return;
    }
    await vote({ postId: id, value });
  };

  return (
    <>
      {!fetchingCurrentUser && (
        <Container
          variant={variant}
          color={color}
          backgroundColor={backgroundColor}
          onClick={(event) => handleVote(event, value)}
          hasClicked={voteStatus === value}
          styles={styles}
        >
          <ArrowUpOutlined className="original" />
          <ArrowUpFilled className="hovered" />
        </Container>
      )}
    </>
  );
}

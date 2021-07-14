import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { PAGES } from '../../constants';
import { useCurrentUserQuery, useVoteMutation } from '../../generated/graphql';
import ArrowUpFilled from '../../icons/ArrowUpFilled';
import ArrowUpOutlined from '../../icons/ArrowUpOutlined';
import * as Styled from './styles/VoteIcon';

interface Props {
  variant?: 'default' | 'topPanel';
  direction?: 'up' | 'down';
  id: number;
  voteStatus?: number | null;
}

export default function Icon({ variant = 'default', direction = 'up', id, voteStatus }: Props) {
  const { data: currentUserData, loading: loadingCurrentUser } = useCurrentUserQuery();
  const [vote, { loading: loadingVote }] = useVoteMutation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (direction === 'up') {
      setValue(1);
    } else if (direction === 'down') {
      setValue(-1);
    }
  }, []);

  const handleVote = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (!currentUserData?.currentUser) {
      await router.push(PAGES.LOGIN);
      return;
    }

    await vote({ variables: { value, postId: id } });
  };

  const getVoteIconStyles = (): React.CSSProperties => {
    if (voteStatus === value) {
      return {
        color: 'var(--post-clicked-icon-color)',
      };
    }
    return {};
  };

  const getIconStyles = (state: 'default' | 'clicked'): React.CSSProperties => {
    const result: React.CSSProperties = {};
    if (state === 'default') {
      result.visibility = `${voteStatus === value ? 'hidden' : 'visible'}`;
    } else if (state === 'clicked') {
      result.visibility = `${voteStatus === value ? 'visible' : 'hidden'}`;
    }

    if (direction === 'down') {
      result.transform = 'translate(-50%, -50%) rotate(180deg)';
    }
    return result;
  };

  return (
    <>
      {!loadingCurrentUser && (
        <Styled.Container variant={variant} onClick={handleVote} disabled={loadingVote} style={getVoteIconStyles()}>
          <ArrowUpOutlined style={getIconStyles('default')} />
          <ArrowUpFilled style={getIconStyles('clicked')} />
        </Styled.Container>
      )}
    </>
  );
}

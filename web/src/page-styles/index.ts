import styled from 'styled-components';

export const Post = styled.div`
  word-break: break-all;
  width: 31.25rem;
  border: 0.1rem solid var(--post-border-color);
  border-radius: 0.25rem;
  margin: 0.75rem auto;
  padding: 0.5rem;
  background-color: var(--post-background-color);
`;

export const PostTitle = styled.h2`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.5rem;
`;

export const PostSnippet = styled.h3`
  font-weight: normal;
`;

export const PostInfo = styled.div`
  display: flex;
  margin: 0.5rem 0.125rem 0;
`;

export const PostCreator = styled.p``;

export const PostCreatedTime = styled.p`
  margin: 0 0.75rem;
`;

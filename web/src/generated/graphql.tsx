import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  posts: Array<Post>;
  post?: Maybe<Post>;
  users: Array<User>;
  currentUser?: Maybe<User>;
  userId?: Maybe<Scalars['Float']>;
  votings: Array<Vote>;
  voting?: Maybe<Vote>;
};


export type QueryPostsArgs = {
  variant: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryUserIdArgs = {
  token: Scalars['String'];
};


export type QueryVotingArgs = {
  postId: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
  voteCounts: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  creatorId: Scalars['Float'];
  creator: User;
  textSnippet: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type Vote = {
  __typename?: 'Vote';
  value: Scalars['Float'];
  userId: Scalars['Float'];
  postId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  vote?: Maybe<Post>;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type ErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type PostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'text' | 'textSnippet' | 'voteCounts' | 'voteStatus' | 'creatorId'>
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'createdAt' | 'updatedAt' | 'email' | 'username'>
);

export type UserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & UserResponseFragment
  ) }
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename?: 'Post' }
    & PostFragment
  )> }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & UserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & UserResponseFragment
  ) }
);

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & { vote?: Maybe<(
    { __typename?: 'Post' }
    & PostFragment
  )> }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & { creator: (
      { __typename?: 'User' }
      & UserFragment
    ) }
    & PostFragment
  )> }
);

export type PostsQueryVariables = Exact<{
  variant: Scalars['String'];
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & { creator: (
      { __typename?: 'User' }
      & UserFragment
    ) }
    & PostFragment
  )> }
);

export type UserIdQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type UserIdQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'userId'>
);

export const PostFragmentDoc = gql`
    fragment Post on Post {
  id
  createdAt
  updatedAt
  title
  text
  textSnippet
  voteCounts
  voteStatus
  creatorId
}
    `;
export const ErrorFragmentDoc = gql`
    fragment Error on FieldError {
  field
  message
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  createdAt
  updatedAt
  email
  username
}
    `;
export const UserResponseFragmentDoc = gql`
    fragment UserResponse on UserResponse {
  errors {
    ...Error
  }
  user {
    ...User
  }
}
    ${ErrorFragmentDoc}
${UserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: Int!) {
  vote(value: $value, postId: $postId) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useCurrentUserQuery(options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    ...Post
    creator {
      ...User
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}`;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($variant: String!) {
  posts(variant: $variant) {
    ...Post
    creator {
      ...User
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const UserIdDocument = gql`
    query UserId($token: String!) {
  userId(token: $token)
}
    `;

export function useUserIdQuery(options: Omit<Urql.UseQueryArgs<UserIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserIdQuery>({ query: UserIdDocument, ...options });
};
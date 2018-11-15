import gql from 'graphql-tag';

export const ADD_POST = gql`
  mutation AddPost($authorId: ID!, $title: String!) {
    addPost(authorId: $authorId, title: $title) {
      id
      title
      author {
        id
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
      title
    }
  }
`;

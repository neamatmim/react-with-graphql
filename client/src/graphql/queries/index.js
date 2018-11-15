import gql from 'graphql-tag';

export const GET_POSTS = gql`
  query getPost {
    posts {
      id
      title
      author {
        id
        firstName
        lastName
      }
    }
  }
`;

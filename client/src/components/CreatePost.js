import React, { Suspense } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

const ADD_POST = gql`
  mutation AddPost($authorId: Int!, $title: String!) {
    addPost(authorId: $authorId, title: $title) {
      id
    }
  }
`;

const CreatePost = () => {
  const handleSubmit = useMutation(ADD_POST, {
    variables: {
      authorId: 3,
      title: 'Hello Mim',
    },
    refetchQueries: gql`
      query {
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
    `,
  }); // Need to redirect functionality

  return (
    <Suspense fallback={<div>Loading</div>}>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label>Author ID</label>
        <input type="text" />
        <label>Post Title</label>
        <input type="text" />
        <button type="submit">Add Post</button>
      </form>
    </Suspense>
  );
};

export default CreatePost;

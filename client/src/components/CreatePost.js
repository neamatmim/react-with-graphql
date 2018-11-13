import React, { Suspense, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

const ADD_POST = gql`
  mutation AddPost($authorId: ID!, $title: String!) {
    addPost(authorId: $authorId, title: $title) {
      id
    }
  }
`;

const CreatePost = () => {
  const [formData, setFormData] = useState({ authorId: undefined, title: '' });

  const handleAddMutation = useMutation(ADD_POST, {
    variables: formData,
    refetchQueries: [
      {
        query: gql`
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
      },
    ],
  });

  const handleFormSubmit = event => {
    event.preventDefault();
    handleAddMutation();
  };

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Suspense fallback={<div>Loading</div>}>
      <form onSubmit={handleFormSubmit}>
        <label>Author ID</label>
        <input type="text" name="authorId" onChange={handleChange} />
        <label>Post Title</label>
        <input type="text" name="title" onChange={handleChange} />
        <button type="submit">Add Post</button>
      </form>
    </Suspense>
  );
};

export default CreatePost;

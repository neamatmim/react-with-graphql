import React, { Suspense, useState } from 'react';
import { useMutation } from 'react-apollo-hooks';

import { ADD_POST } from '../graphql/mutations';
import { GET_POSTS } from '../graphql/queries';

const CreatePost = () => {
  const [formData, setFormData] = useState({ authorId: undefined, title: '' });

  const handleAddMutation = useMutation(ADD_POST, {
    variables: formData,
    update: (cache, { data: { addPost } }) => {
      var { posts } = cache.readQuery({ query: GET_POSTS });
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: posts.concat([addPost]) },
      });
    },
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

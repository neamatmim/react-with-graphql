import React from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import CreatePost from './components/CreatePost';

import { GET_POSTS } from './graphql/queries';
import { DELETE_POST } from './graphql/mutations';

// const App = () => (
// <Query query={GET_APP}>
//   {({ loading, error, data }) => {
//     if (loading) return "Loading...";
//     if (error) return `Error! ${error.message}`;

//     return (
//       <div>
//         {data.posts.length
//           ? data.posts.map(post => (
//               <div key={post.id}>
//                 <div>{post.id}</div>
//                 <div>{post.title}</div>
//               </div>
//             ))
//           : null}
//       </div>
//     );
//   }}
// </Query>
// );

const App = () => {
  const { data, error } = useQuery(GET_POSTS);
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <CreatePost />
      <ul>
        {data.posts.map(post => {
          const handleDeletePost = useMutation(DELETE_POST, {
            variables: { postId: post.id },
            refetchQueries: [
              {
                query: GET_POSTS,
              },
            ],
          });
          return (
            <li key={post.id}>
              {post.title}
              <button onClick={handleDeletePost}>&times;</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default App;

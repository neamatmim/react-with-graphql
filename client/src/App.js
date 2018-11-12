import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import CreatePost from './components/CreatePost';

const GET_APP = gql`
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
`;
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

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
  const { data, error } = useQuery(GET_APP);
  if (error) return `Error! ${error.message}`;
  // console.log(useQuery(GET_APP));
  return (
    <div>
      <CreatePost />
      <ul>
        {data.posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default App;

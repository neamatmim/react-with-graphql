import { GraphQLServer, PubSub } from 'graphql-yoga';
import { find, filter } from 'lodash';

const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];
const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL' },
  { id: 2, authorId: 2, title: 'GraphQL Rocks' },
  { id: 3, authorId: 2, title: 'Advanced GraphQL' },
  { id: 4, authorId: 3, title: 'Launchpad is Cool' },
];

const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post]
  }
  type Post {
    id: Int!
    title: String
    author: Author
  }

  type Counter {
    count: Int!
    countStr: String
  }

  type Query {
    posts: [Post]
    author(id: Int!): Author
    authors: [Author]
  }
  type Mutation {
    addPost(authorId: Int!, title: String!): Post
  }
  type Subscription {
    counter: Counter!
  }
`;

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, args) => find(authors, { id: args.id }),
    authors: () => authors,
  },
  Author: {
    posts: author => filter(posts, { authorId: author.id }),
  },
  Post: {
    author: post => find(authors, { id: post.authorId }),
  },
  Counter: {
    countStr: counter => `Current count: ${counter.count}`,
  },
  Mutation: {
    addPost: (_, args) => {
      const post = {
        id: posts.length + 1,
        authorId: args.authorId,
        title: args.title,
      };
      posts.push(post);

      return post;
    },
  },
  Subscription: {
    counter: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = Math.random()
          .toString(36)
          .substring(2, 15); // random channel name
        let count = 0;
        setInterval(
          () => pubsub.publish(channel, { counter: { count: count++ } }),
          2000
        );
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

const pubsub = new PubSub();

const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

const options = {
  port: 4000,
  endpoint: '/',
  playground: '/playground',
};

server.start(options, ({ port }) => console.log(`Served ${port}`));

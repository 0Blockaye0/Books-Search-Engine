const express = require("express");
const path = require("path");
// const routes = require('./routes');
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require('./utils/auth');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schema");
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await server.start();
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where we can go to test our GQL API
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
}

startServer();

// // create a new Apollo server and pass in our schema data
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// // integrate our Apollo server with the Express application as middleware
// server.applyMiddleware({ app });

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }
// // app.use(routes);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//     // log where we can go to test our GQL API
//     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//   });
// });

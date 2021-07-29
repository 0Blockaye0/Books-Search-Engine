import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookcount
        savedBooks {
          authors
          bookId
          image
          link
          title
          description
        }
      }
    }
  }
`;

// export const SAVE_BOOK = gql`
//   mutation saveBook($id: id, $authors: [String], $description: String, $title: String, $image: String, $link: String) {
//     saveBook(bookId: $id, authors: $authors, description: $description, title: $title, image: $image, linnk: $link) {
//       bookId
//       authors
//       description
//       title
//       image
//       link
//     }
//   }
// `;

export const SAVE_BOOK = gql`
  mutation saveBook($input: savedBook!) {
    saveBook (input: $input) {
        _id
        username
        email
        bookCount
        savedBooks {
            # _id
            bookId
            authors
            image
            link
            title
            description
      }
    }
  }
`;

// export const REMOVE_BOOK = gql`
//   mutaion removeBook($id: bookId) {
//     removeBook(bookId: $id)
    
// //   }
// // `;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId:$bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            # _id
            bookId
            authors
            image
            link
            title
            description
      }
    }
  }
`;

// export const ADD_THOUGHT = gql`
//   mutation addThought($thoughtText: String!) {
//     addThought(thoughtText: $thoughtText) {
//       _id
//       thoughtText
//       createdAt
//       username
//       reactionCount
//       reactions {
//         _id
//       }
//     }
//   }
// `;

// export const ADD_REACTION = gql`
//   mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
//     addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
//       _id
//       reactionCount
//       reactions {
//         _id
//         reactionBody
//         createdAt
//         username
//       }
//     }
//   }
// `;

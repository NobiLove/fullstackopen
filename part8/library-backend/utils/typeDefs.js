const { gql } = require('apollo-server')

const typeDefs = gql`
  type Book {
    title: String!
    published: String!
    author: Author!
    id: ID!
    genres: [String!] 
  }
  
  type Author {
    name: String!
    id: ID!
    born: Int 
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    booksCount: Int!
    authorsCount: Int!
    allBooks(name: String, genres: String): [Book!]!
    allAuthors: [Author!]!
    findBookByTitle(title: String!): Book
    findAuthorByName(name: String!): Author
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!] 
    ): Book,
    editAuthor(
      name: String!
      born: Int!
    ): Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  
  type Subscription {
    bookAdded: Book!
  }  
`

module.exports = {
  typeDefs,
}
import { gql } from '@apollo/client';

export const allBooks = gql`
  query AllBooks($name: String, $genres: String) {
    allBooks(name: $name, genres: $genres) {
      genres
      id
      published
      title
      author {
        bookCount
        born
        id
        name
      }
    }
  }
`
export const allAuthors = gql`
  query {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`
export const editAuthor = gql`
  mutation ($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      bookCount
      born
      id
      name
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const create_Book = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int, $genres: [String!]) {
    addBook(
      title: $title, 
      author: $author,
      published: $published,
      genres: $genres
    )
    {
      genres
      id
      published
      title
      author {
        bookCount
        born
        id
        name
      }
    }
  }
`
export const me = gql`
  query Me {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription BookAdded {
    bookAdded {
      title
      published
      id
      genres
      author {
        bookCount
        born
        id
        name
      }
    }
  }
`
export const allBooksRecommended = gql`
  query AllBooks($name: String, $genres: String) {
    allBooks(name: $name, genres: $genres) {
      genres
      id
      published
      title
      author {
        bookCount
        born
        id
        name
      }
    }
    me {
      username
      favoriteGenre
      id
    }
  }
`
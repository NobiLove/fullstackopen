const { UserInputError } = require('apollo-server')
const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')
const { SECRET } = require('./config')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')
const JWT_SECRET = SECRET

const resolvers = {
  Query: {
    booksCount: async () => await Book.collection.countDocuments(),
    authorsCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({ name: args.name })
      let opts = {}
      if (args.name) { opts = { ...opts, author: author.id } }
      if (args.genres) { opts = { ...opts, genres: args.genres } }
      return await Book.find(opts).populate("author")
    },
    allAuthors: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      return await Author.find({})
    },
    findAuthorByName: async (root, args, context) => await Author.findOne({ name: args.name }),
    findBookByTitle: async (root, args, context) => await Book.findOne({ title: args.title }).populate("author"),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    id: (root) => root.id,
    name: (root) => root.name,
    born: (root) => root.born,
    bookCount: async (root) => {
      return await Book.find({ author: root.id }).count()
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const authorInDb = await Author.findOne({ name: args.author })
      const libro = { ...args }

      if (!authorInDb) {
        const newAuthor = new Author({ name: args.author, born: 0 })
        const createdAuthor = await newAuthor.save()
        libro.author = createdAuthor.id
      } else {
        libro.author = authorInDb.id
      }

      const book = new Book({ ...libro })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      const returnedBook = book.populate("author")
      pubsub.publish('BOOK_ADDED', { bookAdded: returnedBook })
      return returnedBook
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.born
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args, context) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args, context) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secred') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
        favoriteGenre: user.favoriteGenre
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = {
  resolvers
}
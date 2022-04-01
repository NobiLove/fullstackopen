const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment
    .find()
  response.json(comments)

})

commentsRouter.get('/:id', async (request, response) => {
  const comment = await Comment.findById(request.params.id)
  if (comment) {
    response.json(comment)
  } else {
    response.status(404).end()
  }
})

module.exports = commentsRouter
import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { updateBlogAction, addCommentAction } from '../reducers/blogReducer'
import { notificationAction } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const BlogDetails = () => {
  const [content, setComment] = useState('')
  const blogs = useSelector(({ blogs }) => { return blogs })
  const match = useParams('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.id) : null
  const dispatch = useDispatch()

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(updateBlogAction(blog.id, updatedBlog))
      dispatch(notificationAction(`blog ${updatedBlog.title} has a new like`, 3))
    } catch (exception) {
      dispatch(notificationAction(`update error`, 3))
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    const obj = { content }
    try {
      dispatch(addCommentAction(blog.id, obj))
      dispatch(notificationAction(`a new comment ${content} added`, 3))
      setComment('')
    } catch (exception) {
      dispatch(notificationAction('create error', 3))
    }
  }

  return (
    <div>
      <h2>Details</h2>
      <h3>{blog.title}</h3>
      <Link to={`${blog.url}`}>{blog.url}</Link><br></br>
      Likes {blog.likes} <Button size='sm' onClick={handleLike}>Like</Button>
      <p>Added by {blog.author}</p>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <div>
          <input type="text" value={content} name="Comment" onChange={({ target }) => setComment(target.value)} />
          <button type="submit">Add comment</button>
        </div>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>
            <p>{comment.content}</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default BlogDetails
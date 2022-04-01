import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlogAction, updateBlogAction } from '../reducers/blogReducer'
import { notificationAction } from '../reducers/notificationReducer'
import { Link } from "react-router-dom"
import { Button, Col, Container, Row } from 'react-bootstrap'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()

  const user = useSelector(({ user }) => {
    return user
  })

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(updateBlogAction(blog.id, updatedBlog))
      dispatch(notificationAction(`blog ${updatedBlog.title} has a new like`, 3))
    } catch (exception) {
      dispatch(notificationAction(`update error`, 3))
    }
  }

  const handleButtonDelete = async () => {
    try {
      if (window.confirm('You want to delete?')) {
        dispatch(deleteBlogAction(blog.id))
        dispatch(notificationAction(`blog has deleted`, 3))
      }
    } catch (exception) {
      dispatch(notificationAction(`blog no deleted`, 3))
    }
  }

  return (
    <div>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <Togglable buttonLabel1='View' buttonLabel2='Hide'>
          <Container>
            <Row>
              <Col>
                <p>Author: {blog.author}</p>
              </Col>
              <Col>
                <p>URL: {blog.url}</p>
              </Col>
              <Col>
                <p>Likes: {blog.likes}</p>
              </Col>
            </Row>
          </Container>
          <Button variant="success" size='sm' onClick={handleLike}>Like</Button>{' '}
          {user.username === blog.user.username ? <Button size='sm' variant="danger" onClick={handleButtonDelete}>Delete</Button> : ''}{' '}
        </Togglable>
      </div>
    </div>
  )
}

export default Blog
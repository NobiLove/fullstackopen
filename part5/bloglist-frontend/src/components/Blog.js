import Togglable from './Togglable'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const updatedBlog = { ...props.blog, likes: props.blog.likes + 1 }
    props.handleUpdate(props.blog.id, updatedBlog)
  }

  const handleButtonDelete = async () => {
    props.handleDelete(props.blog.id)
  }

  return (
    <div style={blogStyle}>
      <div>
        <p>Title: {props.blog.title}</p>
        <Togglable buttonLabel1='View' buttonLabel2='Hide'>
          <p>Author: {props.blog.author}</p>
          <p>URL: {props.blog.url}</p>
          <p>Likes: {props.blog.likes}</p>
          <button onClick={handleLike}>Like</button>
          {props.username === props.blog.user.username ? <button onClick={handleButtonDelete}>Delete</button> : ''}
        </Togglable>
      </div>
    </div>
  )
}

export default Blog
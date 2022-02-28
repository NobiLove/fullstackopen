import React, { useState, useRef, useEffect } from 'react'
import BlogList from './components/BlogList'
import FormBlog from './components/FormBlog'
import FormLogin from './components/FormLogin'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title, author, url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(blog))
      blogFormRef.current.toggleVisibility()
      setErrorMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('create error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUpdate = async (id, updatedBlog) => {
    try {
      const blog = await blogService.update(
        id, updatedBlog
      )
      setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)))
      setErrorMessage(`blog ${blog.title} has a new like`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('update error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (id) => {
    try {
      if (window.confirm('You want to delete?')) {
        await blogService.remove(
          id
        )
        let newBlogs = blogs.filter((item) => item.id != id)
        setBlogs(newBlogs)
        setErrorMessage(`blog has deleted`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setErrorMessage('delete error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      {errorMessage}
      {user === null ?
        <FormLogin handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} /> :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={logout}>logout</button>
          <h2>Add Blog</h2>
          <Togglable buttonLabel1='New Blog' buttonLabel2='Cancel' ref={blogFormRef}>
            <FormBlog handleCreate={handleCreate} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
          </Togglable>
          <h2>Blog List</h2>
          <BlogList blogs={blogs} handleUpdate={handleUpdate} handleDelete={handleDelete} username={user.username} />
        </div>
      }
    </div>
  )
}

export default App

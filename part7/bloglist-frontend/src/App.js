import React, { useEffect } from 'react'
import userService from './services/user'
import { setUserAction } from './reducers/userReducer'
import BlogList from './components/BlogList'
import FormLogin from './components/FormLogin'
import UsersList from './components/UsersList'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from './reducers/userReducer'
import { Routes, Route, Link, Navigate } from "react-router-dom"
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import { Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => {
    return user
  })

  useEffect(() => {
    const localStorageSearch = async () => {
      const localStorageUser = await userService.getUser()
      if (localStorageUser) {
        await dispatch(setUserAction(localStorageUser))
      }
    }
    localStorageSearch()
  }, [])

  const logout = () => {
    dispatch(logoutAction())
  }

  const padding = {
    padding: 5
  }

  return (
    <div className='container'>
      <div>
        <div>
          <Link style={padding} to="/blogs">Blogs</Link>
          <Link style={padding} to="/users">Users</Link>
          {user
            ? <em>{ } logged in <Button size='sm' variant="dark" onClick={logout}>Logout</Button></em>
            : <Link style={padding} to="/login">Login </Link>
          }
        </div>
        <Notification />
        <br></br>
        <Routes>
          <Route path="/blogs" element={user ? <BlogList /> : <Navigate to="/login" />} />
          <Route path="/users" element={user ? <UsersList /> : <Navigate to="/login" />} />
          <Route path="/users/:id" element={user ? <UserDetails /> : <Navigate to="/login" />} />
          <Route path="/blogs/:id" element={user ? <BlogDetails /> : <Navigate to="/login" />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/" element={<FormLogin />} />
        </Routes>
        <div>
          <br />
          <em>Blog app, Department of Computer Science 2020</em>
        </div>
      </div>
    </div>
  )
}

export default App

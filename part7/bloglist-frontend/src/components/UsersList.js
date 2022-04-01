import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { initializeUsers } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const UsersList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const users = useSelector(({ users }) => { return users })

  return (
    <Table striped>
      <thead>
        <tr>
          <th><h2>Author</h2></th>
          <th><h2>Blogs Created</h2></th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>
              <p>{user.blogs.length}</p>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default UsersList
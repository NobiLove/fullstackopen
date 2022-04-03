import React from 'react'
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

const UserDetails = () => {
  const users = useSelector(({ users }) => { return users })
  const match = useParams('/users/:id')
  const user = match ? users.find(user => user.id === match.id) : null

  if (user.blogs.length === 0) {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added Blogs</h3>
        <p>No blogs added</p>
      </div>
    )
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ListGroup as="ol" numbered>
        {user.blogs.map(blog =>
          <ListGroup.Item as="li">
            {blog.title}
          </ListGroup.Item>
        )}
      </ListGroup>
    </div >
  )
}

export default UserDetails
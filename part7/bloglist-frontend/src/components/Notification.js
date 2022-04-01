import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification !== "") {
    return (
      <Alert variant="success">
        <Alert.Heading>{notification}</Alert.Heading>
      </Alert>
    )
  }
  else {
    return null
  }
}

export default Notification
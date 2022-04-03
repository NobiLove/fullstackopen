import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })

  if (notification.alertText === '') {
    return null
  }
  return (
    <Alert variant={notification.alertType}>
      <Alert.Heading>{notification.alertText}</Alert.Heading>
    </Alert>
  )
}

export default Notification
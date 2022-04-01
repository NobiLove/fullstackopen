import React from 'react'

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification !== '') {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  else {
    return null
  }
}

export default Notification
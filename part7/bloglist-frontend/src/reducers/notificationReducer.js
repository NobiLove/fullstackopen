const reducer = (state = { alertText: '' }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return state = action.data
    default:
      return state
  }
}

export const notificationAction = (data, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: data
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { alertText: '' }
      })
    }, time * 1000)
  }
}

export default reducer
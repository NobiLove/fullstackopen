import loginService from '../services/login'
import userService from '../services/user'
import { notificationAction } from '../reducers/notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'SET_USER':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const setUserAction = (data) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: data,
    })
  }
}

export const loginAction = (data) => {
  return async dispatch => {
    try {
      const user = await loginService.login(data)
      if (user) {
        userService.setUser(user)
        dispatch({
          type: 'LOGIN',
          data: user,
        })
      }
    } catch (error) {
      dispatch(notificationAction(`wrong credentials`, 3))
    }
  }
}

export const logoutAction = () => {
  userService.clearUser()
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default reducer
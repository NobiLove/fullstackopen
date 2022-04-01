import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { loginAction } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { notificationAction } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const FormLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await dispatch(loginAction({
                username, password,
            }))
            setUsername('')
            setPassword('')
            navigate('/blogs')
        } catch (exception) {
            dispatch(notificationAction(`Wrong credentials`, 3))
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    Username:
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password:
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

//FormLogin.propTypes = { username: PropTypes.string.isRequired, password: PropTypes.string.isRequired }

export default FormLogin
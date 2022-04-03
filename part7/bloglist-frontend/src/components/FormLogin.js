import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { loginAction } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

const FormLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(loginAction({
            username, password,
        }))
        setUsername('')
        setPassword('')
        navigate('/blogs')
    }

    return (
        <div>
            <Form onSubmit={handleLogin}>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    name="Username"
                                    onChange={({ target }) => setUsername(target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    name="Password"
                                    onChange={({ target }) => setPassword(target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" size='sm' type="submit">Login</Button>
                </Container>
            </Form>
        </div >
    )
}

//FormLogin.propTypes = { username: PropTypes.string.isRequired, password: PropTypes.string.isRequired }

export default FormLogin
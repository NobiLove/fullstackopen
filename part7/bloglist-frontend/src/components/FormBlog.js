import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addBlogAction } from '../reducers/blogReducer'
import { notificationAction } from '../reducers/notificationReducer'

const FormBlog = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const handleCreate = async (event) => {
        event.preventDefault()
        try {
            dispatch(addBlogAction({
                title, author, url
            }))
            dispatch(notificationAction(`a new blog ${title} by ${author} added`, 3))
            setTitle('')
            setAuthor('')
            setUrl('')
            //props.ref.current.toggleVisibility()
        } catch (exception) {
            dispatch(notificationAction('create error', 3))
        }
    }

    return (
        <div>
            <Form onSubmit={handleCreate}>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Title" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="" controlId="">
                                <Form.Label>Author</Form.Label>
                                <Form.Control type="text" placeholder="Author" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>URL</Form.Label>
                                <Form.Control type="text" placeholder="URL" value={url} name="URL" onChange={({ target }) => setUrl(target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
                <Button variant="primary" size='sm' type="submit">Add</Button>
            </Form>
        </div>
    )
}

export default FormBlog
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from '../components/Togglable'
import FormBlog from '../components/FormBlog'
import React, { useRef, useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'
import { Table } from 'react-bootstrap'

const BlogList = () => {
    const reference = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    const blogs = useSelector(({ blogs }) => {
        return blogs
    })

    return (
        <div>
            <h3>Add Blog</h3>
            <Togglable buttonLabel1='New Blog' buttonLabel2='Cancel' ref={reference}>
                <FormBlog togglableRef={reference} />
            </Togglable>
            <h3>Blog List</h3>
            <Table striped>
                <tbody>
                    {blogs.sort((a, b) => {
                        return b.likes - a.likes;
                    }).map(blog =>
                        <tr key={blog.id}>
                            <td>
                                <Blog blog={blog} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default BlogList
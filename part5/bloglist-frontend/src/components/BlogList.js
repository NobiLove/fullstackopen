import Blog from './Blog'

const BlogList = (props) => {
    return (
        <div>
            {props.blogs.sort((a, b) => {
                return b.likes - a.likes;
            }).map(blog =>
                <div key={blog.id}>
                    <Blog blog={blog} handleUpdate={props.handleUpdate} handleDelete={props.handleDelete} username={props.username} />
                </div>
            )}
        </div>
    )
}

export default BlogList
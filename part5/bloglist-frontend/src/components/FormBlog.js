import React from 'react'

const FormBlog = (props) => {
    return (
        <div>
            <form onSubmit={props.handleCreate}>
                <div>
                    title
                    <input
                        type="text"
                        value={props.title}
                        name="Title"
                        onChange={({ target }) => props.setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        type="text"
                        value={props.author}
                        name="Author"
                        onChange={({ target }) => props.setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        type="text"
                        value={props.url}
                        name="URL"
                        onChange={({ target }) => props.setUrl(target.value)}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default FormBlog
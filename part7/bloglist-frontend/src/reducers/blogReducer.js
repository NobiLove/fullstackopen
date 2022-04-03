import blogsService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'INIT_BLOGS':
      return action.data
    case 'DELETE_BLOG':
      return state.filter((item) => item.id != action.data)
    case 'UPDATE_BLOG':
      return state.map((b) => (b.id === action.data.id ? action.data : b))
    case 'ADD_COMMENT':
      return state.map((b) => (b.id === action.blogId ? { ...b, comments: b.comments.concat(action.data) } : b))
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlogAction = (data) => {
  return async dispatch => {
    const newBlog = await blogsService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlogAction = (data) => {
  return async dispatch => {
    await blogsService.remove(
      data
    )
    dispatch({
      type: 'DELETE_BLOG',
      data: data
    })
  }
}

export const updateBlogAction = (id, data) => {
  return async dispatch => {
    const blog = await blogsService.update(
      id, data
    )
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog
    })
  }
}

export const addCommentAction = (id, data) => {
  return async dispatch => {
    const comment = await blogsService.createComment(
      id, data
    )
    dispatch({
      type: 'ADD_COMMENT',
      data: { content: comment.content, id: comment.id },
      blogId: comment.blog.id
    })
  }
}

export default reducer
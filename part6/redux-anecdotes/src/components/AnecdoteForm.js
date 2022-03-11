import { useDispatch } from 'react-redux'
import { addAnecdoteAction } from '../reducers/anecdoteReducer'
import { notificationAction } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(addAnecdoteAction(content))
        dispatch(notificationAction(`Anecdote: ${content} added`, 3))
    }

    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
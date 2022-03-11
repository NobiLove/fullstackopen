import { useDispatch } from 'react-redux'
import { voteAnecdoteAction } from '../reducers/anecdoteReducer'
import { notificationAction } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const voteAnecdote = async () => {
        dispatch(voteAnecdoteAction(anecdote))
        dispatch(notificationAction(`Anecdote: ${anecdote.content} voted!`, 3))
    }

    return (
        <div>
            <div>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes} <button onClick={() => voteAnecdote(anecdote.id)}>Vote</button>
                </div>
            </div>
        </div>
    )
}

export default Anecdote
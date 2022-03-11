import { useSelector } from 'react-redux'
import Anecdote from '../components/Anecdote'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter === "") {
            return anecdotes
        }
        return anecdotes.filter(a => a.content.toLowerCase().search(filter.toLowerCase()) !== -1);
    })

    return (
        <div>
            {anecdotes.sort((a, b) => {
                return b.votes - a.votes;
            }).map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} />
            )}
        </div>
    )
}

export default AnecdoteList
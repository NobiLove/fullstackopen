import { useState } from 'react'
import { useMutation } from '@apollo/client';
import { create_Book, allBooks, allAuthors } from '../graphql/queries'

const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(create_Book, {
    refetchQueries: [{ query: allBooks }, { query: allAuthors }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createBook({ variables: { title, author, published: parseInt(published, 10), genres } })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={submit}>
        <div>
          Title:<input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author:<input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Published:<input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">Add Genre</button>
        </div>
        <div>Genres: {genres.join(' ')}</div>
        <button type="submit">Create Book</button>
      </form>
    </div>
  )
}

export default NewBook

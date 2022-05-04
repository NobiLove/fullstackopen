import { useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { allBooks } from '../graphql/queries';

const Books = ({ show, setError }) => {
  const [loadData, { loading, data }] = useLazyQuery(allBooks, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    loadData()
  }, []) // eslint-disable-line

  if (!show) {
    return null
  }
  if (loading) {
    return <div>Loading...</div>
  }
  if (!data) {
    return null
  }

  return (
    <div>
      <h2>Books</h2>
      <div>
        <button onClick={() => loadData({ variables: { genres: "refactoring" } })}>Refactoring</button>
        <button onClick={() => loadData({ variables: { genres: "agile" } })}>Agile</button>
        <button onClick={() => loadData({ variables: { genres: "patterns" } })}>Patterns</button>
        <button onClick={() => loadData({ variables: { genres: "design" } })}>Design</button>
        <button onClick={() => loadData({ variables: { genres: "crime" } })}>Crime</button>
        <button onClick={() => loadData({ variables: { genres: "classic" } })}>Classic</button>
        <button onClick={() => loadData({})}>All Genres</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}

export default Books

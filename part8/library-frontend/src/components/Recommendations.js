import { useQuery, useLazyQuery } from '@apollo/client';
import React from 'react'
import { allBooksRecommended, me } from '../graphql/queries';

const Recommendations = ({ show, setError }) => {
  const user = useQuery(me)
  const [loadData, { loading, data }] = useLazyQuery(allBooksRecommended, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  if (!show) {
    return null
  }
  if (loading) {
    return <div>Loading...</div>
  }
  if (!data) {
    return (
      <>
        <div>Press button to load recommendations</div>
        <button className="blue-button" type="button" onClick={() => loadData({ variables: { genres: user.data.me.favoriteGenre } })}>Load</button>
      </>
    )
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <h3>Favorite Genre: {data.me.favoriteGenre}</h3>
      <button className="blue-button" type="button" onClick={() => loadData({ variables: { genres: user.data.me.favoriteGenre } })}>Reload</button>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {data.allBooks.filter(b => {
            return b.genres.some(c => c === data.me.favoriteGenre)
          }).map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations

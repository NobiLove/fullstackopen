import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = (props) => {
  return <>
    <h1>{props.title}</h1>
    <p>{props.anecdotes[props.selected]}</p>
    <p>has {props.votos[props.selected]} votes</p>
  </>
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votos, setVotos] = useState(new Uint8Array(6))
  const [mostVoted, setMostVoted] = useState(0)
  const [mostVotedVal, setMostVotedVal] = useState(0)

  function handleSelected() {
    let numero = Math.floor(Math.random() * 6)
    setSelected(numero)
  }

  function handleVote() {
    const copy = [...votos]
    copy[selected] += 1
    setVotos(copy)
    handleMostVoted(copy)
  }

  function handleMostVoted(copy) {
    copy.forEach(function (value, index) {
      if (value > mostVotedVal) {
        setMostVotedVal(value)
        setMostVoted(index)
      }
    });
  }

  return (
    <div>
      <Anecdote title={'Anecdote of the day'} anecdotes={anecdotes} selected={selected} votos={votos} />
      <button onClick={handleSelected}>next anecdote</button>
      <button onClick={handleVote}>Vote</button>
      <Anecdote title={'Anecdote with most votes'} anecdotes={anecdotes} selected={mostVoted} votos={votos} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


// increment the value in position 2 by one
//copy[2] += 1

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
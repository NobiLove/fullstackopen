import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.number}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0)
    return <p>No feedback given</p>
  else
    return (
      <>
        <table>
          <tbody>
            <Statistic text="good" number={props.good} />
            <Statistic text="neutral" number={props.neutral} />
            <Statistic text="bad" number={props.bad} />
            <Statistic text="total" number={props.total} />
            <Statistic text="average" number={props.average} />
            <Statistic text="positive" number={props.positive + '%'} />
          </tbody>
        </table>
      </>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100

  function handleGood() {
    setGood(good + 1)
  }

  function handleNeutral() {
    setNeutral(neutral + 1)
  }

  function handleBad() {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>
          give feedback
        </h1>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
      </div>
      <div>
        <h1>
          statistics
        </h1>
        <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
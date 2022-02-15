import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const Filter = (props) => {
  return (
    <div>
      filter shown with:
      <input value={props.filter} onChange={props.handleFilter}></input>
    </div>
  )
}

const FormAddPerson = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name:
          <input value={props.newName} onChange={props.handleName}></input>
        </div>
        <div>
          number:
          <input value={props.newNumber} onChange={props.handleNumber}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

function List(props) {
  if (props.filter === "")
    return <div>{props.persons.map(person =>
      <p key={person.id}> {person.name} {person.number} <button value={person.id} onClick={props.handleDelete}>delete</button></p>
    )
    }</div>
  else {
    return <div>{props.filteredPersons.map(person =>
      <p key={person.id}> {person.name} {person.number}</p>
    )
    }</div>
  }
}

const Notification = (props) => {
  if (props.message === null) {
    return null
  } else {
    if (props.message.type === 'success') {
      const notificationStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 32
      }
      return (
        <div style={notificationStyle}>
          {props.message.text}
        </div>
      )
    } else {
      if (props.message.type === 'error') {
        const notificationStyle = {
          color: 'red',
          fontStyle: 'italic',
          fontSize: 32
        }
        return (
          <div style={notificationStyle}>
            {props.message.text}
          </div>
        )
      }
      else {
        return null
      }
    }
  }
}


export default function App() {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [message, setMessage] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setfilteredPersons] = useState([])

  function addPerson(e) {
    e.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const found = persons.find(p => p.name.toUpperCase() === newName.toUpperCase())

    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(found.id, personObject)
          .then(res => {
            let newPersons = persons.filter((item) => item.id != found.id);
            setPersons(newPersons.concat(res))
            cleanAll()
            setMessage(
              {
                text: `Person '${res.name}' was updated`,
                type: 'success'
              }
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            setMessage(
              {
                text: error.response.data.error,
                type: 'error'
              }
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
      }
    } else {
      personsService
        .create(personObject)
        .then(res => {
          setPersons(persons.concat(res))
          cleanAll()
          setMessage(
            {
              text: `Person '${res.name}' was created`,
              type: 'success'
            }
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setMessage(
            {
              text: error.response.data.error,
              type: 'error'
            }
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  function cleanAll() {
    setNewName('')
    setNumber('')
    setFilter('')
  }

  function handleDelete(e) {
    let id = e.target.value

    if (window.confirm('You want to delete?')) {
      personsService
        .erase(id)
        .then(res => {
          let newPersons = persons.filter((item) => item.id != id);
          setPersons(newPersons)
          setMessage(
            {
              text: `Person was deleted`,
              type: 'error'
            }
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  function handleFilter(e) {
    setFilter(e.target.value)
    const result = persons.filter(p => p.name.toUpperCase().includes(e.target.value.toUpperCase()));
    setfilteredPersons(result)
  }

  function handleName(e) {
    setNewName(e.target.value)
  }

  function handleNumber(e) {
    setNumber(e.target.value)
  }

  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <FormAddPerson addPerson={addPerson} handleName={handleName} handleNumber={handleNumber} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <List filter={filter} persons={persons} filteredPersons={filteredPersons} handleDelete={handleDelete}></List>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

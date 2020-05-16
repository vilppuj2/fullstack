import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setMessage(`Replaced number for ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== person.id))
            setErrorMessage(`Information of ${person.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const remove = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <Filter value={filter} onChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson}
        newName={newName} nameChange={handleNameChange}
        newNumber={newNumber} numberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} remove={remove} />
    </div>
  )

}

export default App
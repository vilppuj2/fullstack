import React from 'react'


const Persons = ({ persons, filter, remove }) => {
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  
  return (
    <div>
      {personsToShow.map(person =>
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => remove(person.id)}>delete</button>
        </p>
      )}
    </div>
  )
}

export default Persons
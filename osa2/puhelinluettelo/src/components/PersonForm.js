import React from 'react'


const PersonForm = ({ addPerson, newName, nameChange, newNumber, numberChange }) => (
  <form onSubmit={addPerson}>
    <div>name: <input value={newName} onChange={nameChange} /></div>
    <div>number: <input value={newNumber} onChange={numberChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
)

export default PersonForm
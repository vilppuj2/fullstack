import React from 'react'
import Country from './Country'
import Result from './Result'


const Countries = ({ filtered, setFilter }) => {
  const results = filtered.length

  if (results === 0) {
    return (
      <div>No matches, specify another filter</div>
    )
  }

  if (results === 1) {
    return (
      <Result country={filtered[0]} />
    )
  }

  if (results > 10) {
    return (
      <div>Too many matches, speficy another filter</div>
    )
  }

  return (
    <div>
      {filtered.map((country, i) =>
        <Country key={i} country={country} setFilter={setFilter} />
      )}
    </div>
  )
}

export default Countries
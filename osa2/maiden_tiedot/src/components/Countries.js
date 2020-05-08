import React from 'react'
import Country from './Country'
import Result from './Result'
import Weather from './Weather'


const Countries = ({ filtered, setFilter, weather }) => {
  const results = filtered.length

  if (results === 0) {
    return (
      <div>No matches, specify another filter</div>
    )
  }

  if (results === 1) {
    return (
      <div>
        <Result country={filtered[0]} />
        <Weather weather={weather} />
      </div>
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
import React from 'react'


const Country = ({ country, setFilter }) => {

  const handleClick = () => setFilter(country.name.toLowerCase())

  return (
    <div>
      {country.name} <button onClick={handleClick}>show</button>
    </div>
  )
}

export default Country
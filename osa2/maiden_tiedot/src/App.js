import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  useEffect(() => {
    if (filteredCountries.length === 1 && (weather === null || weather.location.name !== filteredCountries[0].capital)) {
      const params = {
        access_key: api_key,
        query: filteredCountries[0].capital
      }
      axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data)
      })
    }
  })

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Countries filtered={filteredCountries} setFilter={setFilter} weather={weather} />
    </div>
  )
}

export default App
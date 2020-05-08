import React from 'react'


const Weather = ({ weather }) => {
  if (weather === null) {
    return null
  }

  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      
      <p>
        <b>temperature: </b>
        {weather.current.temperature} Celsius
      </p>

      <img
        src={weather.current.weather_icons[0]}
        alt='weather_icon'
        width={75} height={75}
      />

      <p>
        <b>wind: </b>
        {weather.current.wind_speed} mph direction {weather.current.wind_dir}
      </p>
    </div>
  )
}

export default Weather
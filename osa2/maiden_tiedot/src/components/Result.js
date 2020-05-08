import React from 'react'


const Result = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>

    <h2>Spoken languages</h2>
    <ul>
      {country.languages.map((language, i) =>
        <li key={i}>{language.name}</li>
      )}
    </ul>

    <img src={country.flag} alt='flag' width={150} height={100}/>
  </div>
)

export default Result
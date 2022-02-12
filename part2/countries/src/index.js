import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function CountriesList(props) {
  return <ul>{props.filteredCountries.map(c =>
    <li key={c.name}>{c.name} <button value={c.name} onClick={props.handleShow}>show</button></li>
  )
  }</ul>
}

function Weather(props) {
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios.get('http://api.weatherstack.com/current?access_key=d67c77c03211b0aa75ba8491f5d4ff27&query=' + props.countryName)
      .then(res => {
        setWeather(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  if (weather === '') {
    return null
  }
  return <>
    <h2>
      Weather in {props.countryName}
    </h2>
    <p>temperature {weather.current.temperature} celsius</p>
    <img alt='' src={weather.current.weather_icons[0]}></img>
    <p>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
  </>

}

function Country(props) {
  return <div>
    <h1>{props.country.name}</h1>
    <p>capital {props.country.capital}</p>
    <p>population {props.country.population}</p>
    <h2>languages</h2>
    <ul>
      {props.country.languages.map(leng =>
        <li key={leng.name}> {leng.name}</li>
      )
      }
    </ul>
    <img alt='' src={props.country.flags.png}></img>
    <Weather countryName={props.country.name} />
  </div>
}

function List(props) {
  if (props.filteredCountries.length === 1) {
    const country = props.filteredCountries[0]
    return <Country country={country} />
  }
  else if (props.filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else {
    return <CountriesList filteredCountries={props.filteredCountries} handleShow={props.handleShow} />
  }
}

export default function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setfilteredCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  function handleShow(e) {
    setFilter(e.target.value)
    const result = countries.filter(c => c.name.toUpperCase().includes(e.target.value.toUpperCase()));
    setfilteredCountries(result)
  }

  function handleChangue(e) {
    setFilter(e.target.value)
    const result = countries.filter(c => c.name.toUpperCase().includes(e.target.value.toUpperCase()));
    setfilteredCountries(result)
  }

  return (
    <div>
      find countries
      <input value={filter} onChange={handleChangue}></input>
      <List value={filter} filteredCountries={filteredCountries} handleShow={handleShow} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

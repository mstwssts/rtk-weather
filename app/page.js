'use client' 

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCityForecast, clearError } from "./store/slices/weatherSlice"
import ChartsRow from "./components/ChartsRow"


export default function Home() {
  const [cityName, setCityName] = useState("")
  const dispatch = useDispatch()
  const weather = useSelector(state => state.weather)

  function handleSubmit(e){
    e.preventDefault()
    if(!cityName.trim()) return 
  dispatch(clearError())
  dispatch(fetchCityForecast(cityName.trim())
  )
  }

  return (
  <main>
    <h1>Weather Charts</h1>
    <form onSubmit={handleSubmit}>
      <input
      value={cityName}
      onChange={e => setCityName(e.target.value)}
      placeholder="City"
      />

      <button disabled={weather.status === 'loading'}>
        {weather.status === 'loading' ? 'Loading...' : 'Search'}
      </button>
    </form>


    {weather.status === 'idle' && <p>Type a city and search.</p>}
    {weather.status === 'failed' && <p style={{ color: 'red' }}>{weather.error}</p>}
    {weather.status === 'succeeded' && (
      <div>
      <h2>{weather.city}</h2>
      <ChartsRow
        temps={weather.series.temps}
        pressures={weather.series.pressures}
        humidities={weather.series.humidities}
      />
      </div>
      
    )}
  </main>
  )
}

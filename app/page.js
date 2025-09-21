'use client';

import { useDispatch, useSelector } from 'react-redux';
import { fetchForecastByCity, clearError } from './store/slices/weatherSlice';
import ChartsRow from './components/ChartsRow';
import SearchBar from './components/SearchBar';

export default function Home() {
  const dispatch = useDispatch();
  const weather = useSelector(state => state.weather);

 
  function handleSearch(cleanCity) {
    dispatch(clearError());                 
    dispatch(fetchForecastByCity(cleanCity)); 
  }
  return (
    <main>
      <h1>Weather Charts</h1>

      <SearchBar
        disabled={weather?.status === 'loading'}
        onSearch={handleSearch}
        placeholder="City or City,CC (e.g., Paris,FR)"
      />

      {weather?.status === 'idle' && <p>Type a city and search.</p>}
      {weather?.status === 'failed' && <p style={{ color: 'red' }}>{weather.error}</p>}
      {weather?.status === 'succeeded' && (
        <>
          <h2>{weather.city}</h2>
          <ChartsRow
            temps={weather.series.temps}
            pressures={weather.series.pressures}
            humidities={weather.series.humidities}
          />
        </>
      )}
    </main>
  );
  
}
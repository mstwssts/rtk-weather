

import axios from "axios";

export async function fetchForecast(city){
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  //axios lets me pass params as an object
  const res = await axios.get('https://api.openweathermap.org/data/2.5/forecast',{params:{ q: city, units:'imperial', appid: apiKey }
  })
  //returns json as (.data)
  return res.data
}

//now time to pick what I need from the API 

export function forecastData (raw){
  return {
    city: `${raw?.city?.name ?? ''}${raw?.city?.country ? `, ${raw.city.country}` : ''}`,
    temps: raw?.list?.map(i => i.main.temp) ?? [],
    pressures: raw?.list?.map(i => i.main.pressure) ?? [],
    humidities: raw?.list?.map(i => i.main.humidity) ?? []
  }
}
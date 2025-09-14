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
    city:
    temps:
    pressure:
    humidities: 
  }
}
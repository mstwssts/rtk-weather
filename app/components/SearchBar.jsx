'use client'

import { useState } from "react"

export default function SearchBar ({disabled=false, onSearch,placeholder="type a city"}){
  const [cityName,changeCityName] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    const cleaned = cityName.trim()
    if(!cleaned) return
    onSearch(cleaned)
  }
  return(
    <form onSubmit={handleSubmit}>
      <input
      value={cityName}
      onChange={(e)=> changeCityName(e.target.value)}
      placeholder={placeholder}
      />
      <button disabled={disabled || !cityName.trim()}>
        { disabled ? 'Loading...' : 'Search' }
      </button>
    </form>  
  )
}
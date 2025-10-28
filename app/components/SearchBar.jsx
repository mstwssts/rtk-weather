'use client'

import { useState } from "react"

export default function SearchBar ({disabled=false, onSearch,placeholder="type a city"}){
  const [state,changeState] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    const cleaned = cityName.trim()
    if(!cleaned) return
    onSearch(cleaned)
  }
  return(
    <form onSubmit={handleSubmit}>
      <input
      value={state}
      onChange={(e)=> changeState(e.target.value)}
      placeholder={placeholder}
      />
      <button disabled={disabled || state.trim()}>
        { disabled ? 'Loading...' : 'Search' }
      </button>
    </form>  
  )
}
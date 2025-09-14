'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  status: 'idle',  //idle -> loading - success or fail
  error:null,
  city: null, 
  series: {
    temps: [],
    pressures: [],
    humidities: [],
  }
}

// A slice has name, initial state, and reducers

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
    }
  }
})

//export actions made from reducer
export const {clearError} = weatherSlice.actions
//export the reducer so the store can use it 
export default weatherSlice.reducer
'use client'

import { configureStore } from "@reduxjs/toolkit"
import { weatherReducer } from './slices/weatherSlice'

//added reducer which connects it to the store
export const store = configureStore({
  reducer: {
    weather: weatherReducer
  },
})
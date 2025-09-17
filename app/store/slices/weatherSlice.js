'use client'

import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import { fetchForecast, forecastData } from "@/app/lib/openWeather"

// createAsyncThunk handles the action for side effects  

export const fetchCityForecast = createAsyncThunk(
  async (city, { rejectedWithValue } ) => {
    try {
      const raw = await fetchForecast ( city )
      return forecastData( raw )
    }
    catch ( err ){
      const apiMsg = err?.response?.data?.message
      if ( apiMsg ) return rejectedWithValue( apiMsg ) 
        return rejectedWithValue( 'Make Believe City, Try Again')
    }
  }
)

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

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityForecast.pending, (state) => {
        state.status = 'loading';
        state.error = null; 
      })

      .addCase(fetchCityForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.city = action.payload.city;
        state.series.temps = action.payload.temps;
        state.series.pressures = action.payload.pressures;
        state.series.humidities = action.payload.humidities;
      })

      .addCase(fetchForecastByCity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error';
      });
  }
})

//export actions made from reducer
export const {clearError} = weatherSlice.actions
//export the reducer so the store can use it 
export default weatherSlice.reducer
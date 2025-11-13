'use client'

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { fetchForecast, forecastData } from "@/app/lib/openWeather"

// createAsyncThunk handles the action for side effects  
export const fetchForecastByCity = createAsyncThunk(
  'weather/fetchForecastByCity',  
  async (city, { rejectWithValue } ) => {
    try {
      const raw = await fetchForecast ( city )
      return forecastData(raw)
    }

    catch ( err ){
      const apiMsg = err?.response?.data?.message
      if ( apiMsg ) return rejectWithValue( apiMsg ) 
        return rejectWithValue( 'Make Believe City, Try Again')
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
      .addCase(fetchForecastByCity.pending, (state) => {
        state.status = 'loading';
        state.error = null; 
      })

      .addCase(fetchForecastByCity.fulfilled, (state, action) => {
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
export const weatherReducer = weatherSlice.reducer

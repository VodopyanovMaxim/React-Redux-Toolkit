import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from '../../api'

const initialState = {
  weather: [],
  isFetching: false,
  error: null,
};

export const getWeatherThunk = createAsyncThunk(
  "weather/getWeather",
  async (payload, thunkAPI) => {
    try {
      const { data } = await API.getWeather();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const weatherSlice = createSlice({
  initialState,
  name: "weather",
  extraReducers: (builder) => {
    builder.addCase(getWeatherThunk.pending, (state, action) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getWeatherThunk.fulfilled, (state, { payload }) => {
      state.weather = payload;
      state.isFetching = false;
      state.error = null;
    });
    builder.addCase(getWeatherThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer, actions } = weatherSlice;
export const {} = actions;
export default reducer;

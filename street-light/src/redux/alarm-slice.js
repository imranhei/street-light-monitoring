import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  alarms: [],
  count: 0,
  previous: null,
  next: null,
  isLoading: false,
};

export const fetchAlarms = createAsyncThunk("alarm/fetchAlarms", async (page) => {
  if(page) {
    const response = await fetch("https://backend.trafficiot.com/api/alarms?page=" + page);
    return response.json();
  } else {
    const response = await fetch("https://backend.trafficiot.com/api/alarms");
    return response.json();
  }
});

export const alarmSlice = createSlice({
  name: "alarm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlarms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAlarms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.alarms = action?.payload?.results;
        state.count = action?.payload?.count;
        state.previous = action?.payload?.previous;
        state.next = action?.payload?.next;
      })
      .addCase(fetchAlarms.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default alarmSlice.reducer;

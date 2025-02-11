import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  count: 0,
  next: null,
  prev: null,
  isLoading: false,
  device_names: [],
  isDeviceNameLoading: false,
};

export const fetchData = createAsyncThunk(
  "milesight/fetchData",
  async (
    { page, device_name, start_time, end_time, start_speed, end_speed, direction },
    { rejectWithValue }
  ) => {
    try {
      const params = {
        page,
        ...(device_name && { device_name }), // Add device_name if it exists
        ...(start_time && { start_time }), // Add start_time if it exists
        ...(end_time && { end_time }), // Add end_time if it exists
        ...(start_speed && { start_speed }), // Add start_speed if it exists
        ...(end_speed && { end_speed }), // Add end_speed if it exists
        ...(direction && { direction }), // Use `direction` key directly
      };

      const response = await axios.get(
        "https://milesight.trafficiot.com/api/store-event-data",
        { params }
      );

      // Ensure the response has data
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      // Return a rejected action with a value for better error handling
      return rejectWithValue(
        error.response?.data || "Something went wrong while fetching data."
      );
    }
  }
);

export const fetchDeviceName = createAsyncThunk(
  "milesight/fetchDeviceName",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://milesight.trafficiot.com/api/device-names"
      );

      // Ensure the response has data
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching device names:", error);

      // Return a rejected action with a value for better error handling
      return rejectWithValue(
        error.response?.data ||
          "Something went wrong while fetching device names."
      );
    }
  }
);

const milesightSlice = createSlice({
  name: "milesight",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action?.payload?.results;
        state.count = action?.payload?.count;
        state.next = action?.payload?.next;
        state.prev = action?.payload?.previous;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchDeviceName.pending, (state) => {
        state.isDeviceNameLoading = true;
      })
      .addCase(fetchDeviceName.fulfilled, (state, action) => {
        state.isDeviceNameLoading = false;
        state.device_names = action?.payload.device_names;
      })
      .addCase(fetchDeviceName.rejected, (state) => {
        state.isDeviceNameLoading = false;
      });
  },
});

export default milesightSlice.reducer;

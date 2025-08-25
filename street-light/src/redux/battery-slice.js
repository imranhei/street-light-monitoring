import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  devices: [],
  isLoading: false,
};

export const fetchBattery = createAsyncThunk(
  "battery/fetchBattery",
  async ({ devices }) => {
    const query = devices.map((d) => `devices[]=${encodeURIComponent(d)}`).join("&");
    const response = await fetch(
      `https://milesight.trafficiot.com/api/graphics/chart?${query}`
    );
    return response.json();
  }
);

export const fetchDeviceList = createAsyncThunk(
  "battery/fetchDeviceList",
  async () => {
    const response = await fetch(
      "https://milesight.trafficiot.com/api/graphics?device=true"
    );
    return response.json();
  }
);

export const batterySlice = createSlice({
  name: "battery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBattery.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBattery.fulfilled, (state, action) => {
      state.data = action.payload.series[0];
      state.isLoading = false;
    });
    builder.addCase(fetchBattery.rejected, (state) => {
      state.isLoading = false;
    })
    builder.addCase(fetchDeviceList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDeviceList.fulfilled, (state, action) => {
      state.devices = action.payload.result;
      state.isLoading = false;
    });
    builder.addCase(fetchDeviceList.rejected, (state) => {
      state.isLoading = false;
    })
  },
});

export default batterySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  devices: [],
  isLoading: false,
};

export const fetchBattery = createAsyncThunk(
  "battery/fetchBattery",
  async () => {
    const response = await fetch(
      "https://milesight.trafficiot.com/api/graphics/chart"
    );
    return response.json();
  }
);

export const fetchDeviceList = createAsyncThunk(
  "battery/fetchDeviceList",
  async () => {
    const response = await fetch(
      "https://milesight.trafficiot.com/api/device-names"
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
      state.data = action.payload;
      state.isLoading = false;
      console.log(action.payload);
    });
    builder.addCase(fetchBattery.rejected, (state) => {
      state.isLoading = false;
    })
    builder.addCase(fetchDeviceList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDeviceList.fulfilled, (state, action) => {
      state.devices = action.payload;
      state.isLoading = false;
      console.log(action.payload);
    });
    builder.addCase(fetchDeviceList.rejected, (state) => {
      state.isLoading = false;
    })
  },
});

export default batterySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TokenService from "../secureStore/refreshToken";

// const initialState = {
//   data: [],
//   isLoading: false,
//   current_page: 1,
//   per_page: 10,
//   total: 0,
//   last_page: 1,
// };

const initialState = {
  data: [],
  devices: [],
  isLoading: false,
  isChartLoading: false,
};

export const fetchTemperature = createAsyncThunk(
  "temperature/fetchTemperature",
  async () => {
    const token = TokenService.getToken();
    const response = await fetch(
      `https://backend.trafficiot.com/api/home-temp`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  }
);

export const deleteTemperature = createAsyncThunk(
  "temperature/deleteTemperature",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = TokenService.getToken();
      const response = await fetch(
        `https://backend.trafficiot.com/api/home-temp/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchTemperatureChart = createAsyncThunk(
  "temperature/fetchTemperatureChart",
  async ({ devices, from, to, group_by }) => {
    const deviceQuery = devices.map((d) => `device_name=${encodeURIComponent(d)}`).join("&");
    const fullQuery = `${deviceQuery}&from=${from}&to=${to}&group_by=${group_by}`;
    const response = await fetch(
      `https://backend.trafficiot.com/api/home-temp/chart?${fullQuery}`
    );
    return response.json();
  }
);

export const fetchDeviceList = createAsyncThunk(
  "temperature/fetchDeviceList",
  async () => {
    const response = await fetch(
      "https://backend.trafficiot.com/api/home-temp/chart?device_name=true"
    );
    return response.json();
  }
);

const temperatureSlice = createSlice({
  name: "temperature",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemperature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTemperature.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.current_page = action.payload.current_page;
        state.per_page = action.payload.per_page;
        state.total = action.payload.total;
        state.last_page = action.payload.last_page;
      })
      .addCase(fetchTemperature.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchTemperatureChart.pending, (state) => {
        state.isChartLoading = true;
      })
      .addCase(fetchTemperatureChart.fulfilled, (state, action) => {
        state.data = action.payload.series[0];
        state.isChartLoading = false;
      })
      .addCase(fetchTemperatureChart.rejected, (state) => {
        state.isChartLoading = false;
      })
      .addCase(fetchDeviceList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeviceList.fulfilled, (state, action) => {
        state.devices = action.payload.devices;
        state.isLoading = false;
      })
      .addCase(fetchDeviceList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default temperatureSlice.reducer;

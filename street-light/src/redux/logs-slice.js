import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TokenService from "../secureStore/refreshToken";

const initialState = {
  data: [],
  isLoading: false,
  current_page: 1,
  per_page: 10,
  total: 0,
  last_page: 1,
};

export const fetchLogs = createAsyncThunk("logs/fetchLogs", async () => {
  const token = TokenService.getToken();
  const response = await fetch(
    `https://backend.trafficiot.com/api/auth/logfiles`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
});

export const DownloadLogFile = createAsyncThunk(
  "logs/DownloadLogFile",
  async (id) => {
    const token = TokenService.getToken();
    const response = await fetch(
      `https://backend.trafficiot.com/api/auth/logfiles/download/${id}`,
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

export const deleteLog = createAsyncThunk(
  "logs/deleteLog",
  async (payload, { rejectWithValue }) => {
    try {
      const token = TokenService.getToken();
      const response = await fetch(
        `https://backend.trafficiot.com/api/auth/logfiles/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.current_page = action.payload.current_page;
      state.per_page = action.payload.per_page;
      state.total = action.payload.total;
      state.last_page = action.payload.last_page;
    });
    builder.addCase(fetchLogs.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(DownloadLogFile.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(DownloadLogFile.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteLog.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteLog.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default logsSlice.reducer;

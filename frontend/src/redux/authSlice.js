import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../axiosClient";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/register", formData);
      console.log("reponse");

      console.log(response);
      return response.data;
    } catch (error) {
      // Note: error.response?.data is a robust way to access specific error information from an Axios response.
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/login", formData);
      return response.data;
    } catch (error) {
      // Note: error.response?.data is a robust way to access specific error information from an Axios response.
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/user/checkAuth");
      console.log(response);

      return response.data;
    } catch (error) {
      // Note: error.response?.data is a robust way to access specific error information from an Axios response.
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = !!action.payload.result;
        console.log(action.payload.result);
        state.user = action.payload.result;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload?.message || "something went wrong!";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login fulfilled:", action.payload);
        state.isLoading = false;
        state.isAuthenticated = !!action.payload.result;
        state.user = action.payload.result;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload?.message || "something went wrong!";
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = !!action.payload.result;
        state.user = action.payload.result;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload?.message || "something went wrong!";
      });
  },
});

export default authSlice.reducer;

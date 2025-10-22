import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../axiosClient";
import { toast } from "sonner";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/register", formData);
      console.log("reponse");
      console.log(response);

      if (response.data.success) toast.success(`${response.data.message}`);
      // toast("Congratulations!!", {
      //   description: `${response.data.message}`,
      // });

      if (!response.data.success) toast.error(`${response.data.message}`);
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
      if (response.data.success) toast.success(`${response.data.message}`);
      // toast("Congratulations!!", {
      //   description: `${response.data.message}`,
      // });

      if (!response.data.success) toast.error(`${response.data.message}`);
      return response.data;
      // return response.data;
    } catch (error) {
      // Note: error.response?.data is a robust way to access specific error information from an Axios response.
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/logout");
      console.log('hello ji')
      console.log(response.data)
      if (response.data.success) toast.success(`${response.data.message}`);
      if (!response.data.success) toast.warning(`${response.data.message}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const Adminlogin = createAsyncThunk(
  "auth/admin/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/admin/login", formData);
      if (response.data.success) toast.success(`${response.data.message}`);
      // toast("Congratulations!!", {
      //   description: `${response.data.message}`,
      // });

      if (!response.data.success) toast.error(`${response.data.message}`);
      console.log(response.data)
      return response.data;
      // return response.data;
    } catch (error) {
      // Note: error.response?.data is a robust way to access specific error information from an Axios response.
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete("/user/deleteProfile");
      console.log(response);
      if(response.data.success)
        toast.success(`${response.data.message}`)

      if(!response.data.success)
        toast.error(`${response.data.message}`)
      
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
    role: null,
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
        state.role = action.payload.result.role;
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
        state.role = action.payload.result?.role;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload?.message || "something went wrong!";
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log("Logged Out fulfilled:", action.payload);
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.role = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
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
      })
      .addCase(Adminlogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Adminlogin.fulfilled, (state, action) => {
        console.log("Admin Login fulfilled:", action.payload);
        state.isLoading = false;
        state.isAuthenticated = !!action.payload.result;
        state.user = action.payload.result;
        state.role = action.payload.result?.role;
        state.error = null;
      })
      .addCase(Adminlogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload?.message || "something went wrong!";
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = !action.payload.success;
        state.user = null;
        state.role = null;
        state.error = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "something went wrong!";
      });
  },
});

export default authSlice.reducer;

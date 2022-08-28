import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formvalue, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.signIn(formvalue);
      toast.success("Login Success");
      navigate("/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formvalue, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.signUp(formvalue);
      toast.success("Register Success");
      navigate("/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "auth/register",
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.googleSignUp(data);
      toast.success("Login Success");
      navigate("/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    looding: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.looding = true;
    },
    [login.fulfilled]: (state, action) => {
      state.looding = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      (state.looding = false), (state.error = action.payload.message);
    },

    // Register
    [register.pending]: (state, action) => {
      state.looding = true;
    },
    [register.fulfilled]: (state, action) => {
      state.looding = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      (state.looding = false), (state.error = action.payload.message);
    },

    // Google signIn
    [googleSignIn.pending]: (state, action) => {
      state.looding = true;
    },
    [googleSignIn.fulfilled]: (state, action) => {
      state.looding = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [googleSignIn.rejected]: (state, action) => {
      (state.looding = false), (state.error = action.payload.message);
    },
  },
});
export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;

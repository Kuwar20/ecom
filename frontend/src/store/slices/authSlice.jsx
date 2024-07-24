import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.error) {
        return rejectWithValue(data.error);
      }
      const token = data.token;
      const decodedToken = jwtDecode(token);
      localStorage.setItem("token", token);
      localStorage.setItem("email", decodedToken.email);
      localStorage.setItem("role", decodedToken.role);
      localStorage.setItem("id", decodedToken._id);
      console.log(decodedToken);
      toast.success("Logged in successfully!");
      // this is action payload in react redux
      return { ...data, email: decodedToken.email, role: decodedToken.role, id: decodedToken._id };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  // this is state in react redux
  initialState: {
    user: null,
    email: localStorage.getItem('email') || null,
    role: localStorage.getItem('role') || null,
    id: localStorage.getItem('id') || null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.id = null;
      state.email = null;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.email = jwtDecode(action.payload.token).email;
        state.role = jwtDecode(action.payload.token).role;
        state.id = jwtDecode(action.payload.token)._id;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        return rejectWithValue(data.error);
      }
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      toast.success("User updated successfully!");
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.error) {
        return rejectWithValue(data.error);
      }
      toast.success("User deleted successfully!");
      // Clear local storage and dispatch logout
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      dispatch(logout());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
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

      toast.success("Registered successfully!");
      console.log(data.user);
      localStorage.setItem("id", data.user.id);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("role", data.user.role);
      // return data;
      return { ...data, email: data.user.email, role: data.user.role, id: data.user.id };
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
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.role = action.payload.role;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.email = null;
        state.role = null;
        state.id = null;
        state.token = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.id = action.payload.id;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

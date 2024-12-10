import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isConnected: false,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isConnected = true;
    },
    logout: (state) => {
      state.token = null;
      state.isConnected = false;
    },
  },
});

export const { login, logout } = authSlice.actions; // Exportation des actions
export default authSlice.reducer;

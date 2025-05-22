import { createSlice } from "@reduxjs/toolkit";

const savedMember = localStorage.getItem("member");
const parsed = savedMember ? JSON.parse(savedMember) : null;

const initialState = {
  isLoggedIn: !!parsed,
  member: parsed
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.member = action.payload;
      localStorage.setItem("member", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.member = null;
      localStorage.removeItem("member");
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

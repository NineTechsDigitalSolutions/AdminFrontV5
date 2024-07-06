import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo");
const initialState = {
  userInfo : userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null
  }


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action) => {
        if (action.payload === null) {
          localStorage.removeItem("Bearer");
          localStorage.removeItem("userInfo");
          state.userInfo = null;

        } else {
          if (action.payload.token) localStorage.setItem("Bearer", action.payload.token);

          localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));

          state.userInfo = action.payload.userInfo;
        }
      },
      logout: (state) => {
          state.userInfo = null;
          localStorage.clear();
        },
    },
  });
  
  export const { setUser, logout } = authSlice.actions;
  export default authSlice.reducer;
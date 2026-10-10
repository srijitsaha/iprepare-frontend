import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "registerDetails",

  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  },

  reducers: {
    setRegisterFormDetails: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const { setRegisterFormDetails } = counterSlice.actions;

export default counterSlice.reducer;



export const store = configureStore({
  reducer: {
    registerDetails: counterSlice.reducer,
  },
});
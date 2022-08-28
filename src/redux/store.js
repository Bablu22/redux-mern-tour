import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./features/authSlice";
import tourReducers from "./features/tourSlice";
import modalReducers from "./features/modalSlice"

const store = configureStore({
  reducer: {
    auth: authReducers,
    tour: tourReducers,
    modal: modalReducers
  },
});

export default store;

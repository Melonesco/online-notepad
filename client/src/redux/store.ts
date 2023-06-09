import { configureStore } from "@reduxjs/toolkit";
import { groupReducer } from "./group/slice";
import authSlice from "./auth/slice";
import { userReducer } from "./user/slice";

export const store = configureStore({
  reducer: {
    groups: groupReducer,
    auth: authSlice,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

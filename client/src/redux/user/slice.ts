import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../utils/types";
import { IUsersData } from "./types";
import { fetchDeleteUser, fetchUsers } from "./asyncActions";

const initialState: IUsersData = {
  data: [],
  status: "loading",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.data = [];
        state.status = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.data = action.payload;
          state.status = "loaded";
        }
      )
      .addCase(fetchUsers.rejected, (state) => {
        state.data = [];
        state.status = "loading";
      })
      .addCase(fetchDeleteUser.pending, (state) => {
        state.data = [];
        state.status = "loading";
      })
      .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        const userId = action.payload;
        state.data = state.data.filter((user) => user?._id !== userId);
      })
      .addCase(fetchDeleteUser.rejected, (state) => {
        state.data = [];
        state.status = "loading";
      });
  },
});

export const userReducer = userSlice.reducer;

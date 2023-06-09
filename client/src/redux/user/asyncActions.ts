import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../utils/types";
import instance from "../../axios";

export const fetchUsers = createAsyncThunk<IUser[]>(
  "users/fetchUsers",
  async () => {
    const { data } = await instance.get("/users");
    return data;
  }
);

export const fetchDeleteUser = createAsyncThunk(
  "users/fetchDeleteUser",
  async (userId: string) => {
    await instance.delete(`/users/${userId}`);
    return userId;
  }
);

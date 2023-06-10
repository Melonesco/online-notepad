import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRegisterForm, IUser } from "../../utils/types";
import instance from "../../axios";
import { IAuthMe } from "../auth/types";

export const fetchUsers = createAsyncThunk<IUser[]>(
  "users/fetchUsers",
  async () => {
    const { data } = await instance.get("/users");
    return data;
  }
);

export const fetchRegisterUser = createAsyncThunk<IAuthMe, IRegisterForm>(
  "users/fetchRegister",
  async (params) => {
    const { data } = await instance.post("/users/register", params);
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

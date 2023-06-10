import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthMe } from "./types";
import { ILoginForm } from "../../utils/types";
import instance from "../../axios";

export const fetchAuth = createAsyncThunk<IAuthMe, ILoginForm>(
  "auth/fetchAuth",
  async (params) => {
    const { data } = await instance.post("/auth/login", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk<IAuthMe>(
  "auth/fetchAuthMe",
  async () => {
    const { data } = await instance.get("/auth/me");
    return data;
  }
);

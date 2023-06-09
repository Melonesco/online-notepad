import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISubjectStorage } from "../../utils/types";
import instance from "../../axios";

export const fetchGroups = createAsyncThunk<ISubjectStorage>(
  "groups/fetchGroups",
  async () => {
    const { data } = await instance.get("/group");
    return data;
  }
);

export const fetchDeleteGroup = createAsyncThunk(
  "groups/fetchDeleteGroup",
  async (groupId: string) => {
    await instance.delete(`/group/${groupId}`);
    return groupId;
  }
);

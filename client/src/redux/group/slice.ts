import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import instance from "../../axios";
import { IGroup, ISubject, ISubjectStorage } from "../../utils/types";
import { AddGroupPayload, IGroupItems } from "./types";
import { fetchDeleteGroup, fetchGroups } from "./asyncActions";

const initialState: IGroupItems = {
  items: [],
  status: "loading",
};

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state: IGroupItems, action: AddGroupPayload) => {
      const generateObjects = (num: number) => {
        const objects = [];

        for (let i = 1; i <= num; i++) {
          objects.push({
            labPosition: i,
            labMark: 0,
            labMaxMark: 25,
            labStatus: true,
            labPassed: false,
          });
        }

        return objects;
      };

      const newSubjects = action.payload.subjects.map((subject: ISubject) => {
        return {
          ...subject,
          countByLab: generateObjects(subject.countByLab),
        };
      });

      const data = {
        nameGroup: action.payload.nameGroup,
        subjects: newSubjects,
      };

      instance
        .post("/group", data)
        .then((res) => console.log("OK", res))
        .catch((err) => console.log(err));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state: IGroupItems) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(
        fetchGroups.fulfilled,
        (state: IGroupItems, action: PayloadAction<ISubjectStorage>) => {
          state.items = action.payload;
          state.status = "loaded";
        }
      )
      .addCase(fetchGroups.rejected, (state: IGroupItems) => {
        state.items = [];
        state.status = "error";
      })
      .addCase(fetchDeleteGroup.pending, (state) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchDeleteGroup.fulfilled, (state, action) => {
        const groupId = action.payload;
        state.items = state.items.filter(
          (group: IGroup) => group?._id !== groupId
        );
      })
      .addCase(fetchDeleteGroup.rejected, (state) => {
        state.items = [];
        state.status = "loading";
      });
  },
});

export const { addGroup } = groupSlice.actions;

export const groupReducer = groupSlice.reducer;

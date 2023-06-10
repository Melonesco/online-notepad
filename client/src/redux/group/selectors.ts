import { RootState } from "../store";

export const groupsSelector = (state: RootState) => state.groups.items;

import { IGroup, ISubject, ISubjectStorage } from "../../utils/types";
import { PayloadAction } from "@reduxjs/toolkit";

export interface IGroupItems {
  items: any; //ISubjectStorage | []
  status: string;
}

export interface IGroupPayload {
  nameGroup: string;
  subjects: ISubject[] | [];
}

export type AddGroupPayload = PayloadAction<IGroupPayload>;

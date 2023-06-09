export interface ILoginForm {
  email: string;
  password: string;
}

export type FormData = {
  fullName: string;
  email: string;
  password: string;
  nameGroup?: string;
};

export interface IRegisterForm extends FormData {
  group: IGroup;
}

export interface ISubjectStorage {
  id: number;
  nameSubject: string;
  countByLab: number;
  RGR: IBonusProject;
  CourseWork: IBonusProject;
  Presentation: IBonusProject;
  Exam: IBonusProject;
  credits: number;
  score_subj: number;
  max_score_subj: number;
}

export interface ILab {
  _id: string;
  labPosition: number;
  labMark: number;
  labMaxMark: number;
  labStatus: boolean;
  labPassed?: boolean;
}

export interface ISubject {
  RGR: IBonusProject;
  CourseWork: IBonusProject;
  Presentation: IBonusProject;
  Exam: IBonusProject;
  _id?: string;
  nameSubject: string;
  credits: number;
  countByLab: any;
  score_subj: number;
  max_score_subj: number;
}

export interface IBonusProject {
  status: boolean;
  mark: number;
  maxMark: number;
  passed: boolean;
  _id?: string;
}

export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  passwordHash: string;
  group: {
    _id: string;
    nameGroup: string;
    subjects: ISubject[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface IGroup {
  _id: string;
  nameGroup: string;
  subjects: ISubject[];
  users: IUser[];
}

export interface IItem {
  _id: string;
  nameGroup: string;
  subjects: ISubject;
}

export interface IMarks {
  _id: string;
  bonusProject: string;
  lab: {
    _id: string;
    labPosition: number;
    labMark: number;
    labMaxMark: number;
    labStatus: boolean;
    labPassed: boolean;
  };
  passed?: boolean;
  user: string;
  labMark: number;
}

export interface ITableProps {
  obj: ISubject;
  labs: IMarks[];
  handleOpenModal: (
    currentLab: ILab | null,
    currentProject: IBonusProject | null,
    obj: ISubject
  ) => void;
}

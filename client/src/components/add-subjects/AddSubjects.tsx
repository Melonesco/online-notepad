import React from "react";
import Subject from "../subject";
import { ISubjectStorage } from "../../utils/types";
import * as S from "./styles";

interface IAddSubjects {
  count: number;
  subjects: ISubjectStorage[];
  setSubjects: React.Dispatch<React.SetStateAction<ISubjectStorage[]>>;
}

const AddSubjects = ({ count, subjects, setSubjects }: IAddSubjects) => {
  return (
    <S.Container>
      {[...Array(count)].map((_, index: number) => (
        <Subject
          key={index}
          index={index}
          subjects={subjects}
          setSubjects={setSubjects}
        />
      ))}
    </S.Container>
  );
};

export default AddSubjects;

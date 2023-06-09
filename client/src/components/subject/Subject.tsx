import React from "react";
import MinusIcon from "../../assets/images/icons8-subtract-30.png";
import PlusIcon from "../../assets/images/icons8-plus-math-30.png";
import { ISubjectStorage } from "../../utils/types";
import * as S from "./styles";

interface ISubject {
  index: number;
  subjects: ISubjectStorage[];
  setSubjects: React.Dispatch<React.SetStateAction<ISubjectStorage[]>>;
}

const Subject = ({ index, subjects, setSubjects }: ISubject) => {
  const newSubjects = [...subjects];

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    newSubjects[index] = {
      ...newSubjects[index],
      nameSubject: event.target.value,
    };
    setSubjects(newSubjects);
  };

  const handlePointsChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const score = +event.target.value;
    let newScoreValue = 1;

    if (score > 100) {
      newScoreValue = 100;
    } else if (score >= 1) {
      newScoreValue = score;
    }

    newSubjects[index] = {
      ...newSubjects[index],
      max_score_subj: newScoreValue,
    };
    setSubjects(newSubjects);
  };

  const decrementCountByLab = (index: number) => {
    newSubjects[index].countByLab -= 1;
    setSubjects(newSubjects);
  };

  const incrementCountByLab = (index: number) => {
    newSubjects[index].countByLab += 1;
    setSubjects(newSubjects);
  };

  const handleRGBChange = (index: number) => {
    newSubjects[index] = {
      ...newSubjects[index],
      RGR: {
        status: !subjects[index].RGR.status,
        mark: 0,
        maxMark: 20,
        passed: false,
      },
    };
    setSubjects(newSubjects);
  };

  const handlePresentationChange = (index: number) => {
    newSubjects[index] = {
      ...newSubjects[index],
      Presentation: {
        status: !subjects[index].Presentation.status,
        mark: 0,
        maxMark: 20,
        passed: false,
      },
    };
    setSubjects(newSubjects);
  };

  const handleCourseWorkChange = (index: number) => {
    newSubjects[index] = {
      ...newSubjects[index],
      CourseWork: {
        status: !subjects[index].CourseWork.status,
        mark: 0,
        maxMark: 20,
        passed: false,
      },
    };
    setSubjects(newSubjects);
  };

  const handleExamChange = (index: number) => {
    const updatedSubjects = [...subjects];
    const currentStatus = updatedSubjects[index].Exam.status;

    updatedSubjects[index] = {
      ...updatedSubjects[index],
      Exam: {
        ...updatedSubjects[index].Exam,
        status: !currentStatus,
      },
    };

    setSubjects(updatedSubjects);
  };

  const handleCreditsChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const credits = +event.target.value;
    let validatedCredits = 1;

    if (credits > 10) {
      validatedCredits = 10;
    } else if (credits >= 1) {
      validatedCredits = credits;
    }

    newSubjects[index] = {
      ...newSubjects[index],
      credits: validatedCredits,
    };
    setSubjects(newSubjects);
  };

  return (
    <S.Blocks>
      <S.Block>
        <S.Field>
          <S.Numbers>{index + 1}</S.Numbers>
          <S.Input
            type="text"
            value={subjects[index].nameSubject}
            placeholder="Назва предмету"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(index, event)
            }
          />
        </S.Field>
        <S.Field>
          <S.ButtonPlusAndMinus
            disabled={subjects[index].countByLab === 0}
            onClick={() => decrementCountByLab(index)}
          >
            <S.IconsMinusAndPlus src={MinusIcon} alt="icon" />
          </S.ButtonPlusAndMinus>
          <S.Labs>
            Кількість лаб:{" "}
            <S.CountByLabs>{subjects[index].countByLab}</S.CountByLabs>
          </S.Labs>
          <S.ButtonPlusAndMinus
            disabled={subjects[index].countByLab >= 10}
            onClick={() => incrementCountByLab(index)}
          >
            <S.IconsMinusAndPlus src={PlusIcon} alt="icon" />
          </S.ButtonPlusAndMinus>
        </S.Field>
        <S.Field>
          <S.Info>Кількість балів</S.Info>
          <S.InputPoint
            min={0}
            max={100}
            value={subjects[index].max_score_subj}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handlePointsChange(index, event)
            }
            type="number"
          />
        </S.Field>
      </S.Block>
      <S.Block>
        <S.BonusTasks>
          <S.Info>РГР</S.Info>
          <S.ButtonClick
            onClick={() => handleRGBChange(index)}
            backgroundColor={
              subjects[index].RGR.status ? "#ffffff" : "burlywood"
            }
          >
            Так
          </S.ButtonClick>
        </S.BonusTasks>
        <S.BonusTasks>
          <S.Info>Презентація</S.Info>
          <S.ButtonClick
            onClick={() => handlePresentationChange(index)}
            backgroundColor={
              subjects[index].Presentation.status ? "#ffffff" : "burlywood"
            }
          >
            Так
          </S.ButtonClick>
        </S.BonusTasks>
        <S.BonusTasks>
          <S.Info>Курсова робота</S.Info>
          <S.ButtonClick
            onClick={() => handleCourseWorkChange(index)}
            backgroundColor={
              subjects[index].CourseWork.status ? "#ffffff" : "burlywood"
            }
          >
            Так
          </S.ButtonClick>
        </S.BonusTasks>
        <S.BonusTasks>
          <S.Info>Екзамен</S.Info>
          <S.ButtonClick
            onClick={() => handleExamChange(index)}
            backgroundColor={
              subjects[index].Exam.status ? "#ffffff" : "burlywood"
            }
          >
            Так
          </S.ButtonClick>
        </S.BonusTasks>
      </S.Block>
      {subjects[index].Exam.status ? (
        <S.Field>
          <S.Info>Кількість кредитів</S.Info>
          <S.InputPoint
            min={0}
            max={100}
            value={subjects[index].credits}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleCreditsChange(index, event)
            }
            type="number"
          />
        </S.Field>
      ) : null}
    </S.Blocks>
  );
};

export default Subject;

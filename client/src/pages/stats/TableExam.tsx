import React from "react";
import { IBonusProject, ILab, IMarks, ISubject } from "../../utils/types";
import * as S from "./styles";
import { Table } from "./styles";

interface ITableExam {
  data: any;
  labs: IMarks[];
  getBonusMark: (project: any, labs: IMarks[]) => any;
  handleOpenModal: (
    currentLab: ILab | null,
    currentProject: IBonusProject | null,
    obj: ISubject
  ) => void;
}

const TableExam = ({
  data,
  labs,
  getBonusMark,
  handleOpenModal,
}: ITableExam) => {
  return (
    <Table>
      <thead>
        <S.Tr>
          <S.Th>Екзамен</S.Th>
          <S.Th>Бал</S.Th>
          <S.Th>Кредити</S.Th>
          <S.Th>Кінцевий бал</S.Th>
        </S.Tr>
      </thead>
      <tbody>
        {data
          ? data.group.subjects
              .filter((obj: ISubject) => obj.Exam && obj.Exam.status)
              .map((obj: ISubject) => {
                const countExamMarks = labs.filter(
                  (l: IMarks) => l?.bonusProject === obj?.Exam._id
                );

                const percentMark = countExamMarks.reduce(
                  (accum: number, total: IMarks) =>
                    accum + total.labMark * obj.credits,
                  0
                );

                const Exam = getBonusMark(obj.Exam, labs);

                return (
                  <S.Tr key={obj._id}>
                    <S.Td>{obj.nameSubject}</S.Td>
                    {obj.Exam?.status ? (
                      <S.Td
                        onClick={() => handleOpenModal(null, obj.Exam, obj)}
                        backgroundColor={Exam.backgroundColor}
                      >
                        <S.ButtonOpen
                          disabled={Exam.content > 0}
                          cursor={Exam.cursor}
                        >
                          {Exam.content}
                        </S.ButtonOpen>
                      </S.Td>
                    ) : (
                      <S.Td backgroundColor={Exam.status}>-</S.Td>
                    )}
                    <S.Td>{obj.credits}</S.Td>
                    <S.Td>{percentMark}</S.Td>
                  </S.Tr>
                );
              })
          : null}
      </tbody>
    </Table>
  );
};

export default TableExam;

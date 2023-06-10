import React from "react";
import {
  GetBonusMarkFunction,
  ILab,
  IMarks,
  IOpenModalFunction,
  ISubject,
} from "../../utils/types";
import * as S from "./styles";
import TableLabs from "./TableLabs";
import TableRGR from "./TableRGR";
import TablePresentation from "./TablePresentation";

interface ITableBody {
  data: any;
  labs: IMarks[];
  handleOpenModal: IOpenModalFunction;
  getBonusMark: GetBonusMarkFunction;
}

const TableBody = ({
  data,
  labs,
  handleOpenModal,
  getBonusMark,
}: ITableBody) => {
  return (
    <tbody>
      {data
        ? data.group.subjects.map((obj: ISubject) => {
            const countLabMarks = labs
              ? labs
                  .filter(
                    (l: IMarks) =>
                      l.bonusProject === obj.RGR._id ||
                      l.bonusProject === obj.Presentation._id
                  )
                  .reduce((acc: number, l: IMarks) => acc + l.labMark, 0)
              : 0;

            const countBonusMarks = labs
              .filter((lab: IMarks) =>
                obj.countByLab.map((ob: ILab) => ob._id).includes(lab.lab?._id)
              )
              .reduce((acc: number, l: IMarks) => acc + l.labMark, 0);

            const totalMarks = countBonusMarks + countLabMarks;

            const percentMarks = obj.max_score_subj
              ? ((totalMarks / obj.max_score_subj) * 100).toFixed(0)
              : 0;

            return (
              <S.Tr key={obj._id}>
                <S.Td>{obj.nameSubject}</S.Td>
                <TableLabs
                  obj={obj}
                  labs={labs}
                  handleOpenModal={handleOpenModal}
                />
                <TableRGR
                  obj={obj}
                  getBonusMark={getBonusMark}
                  labs={labs}
                  handleOpenModal={handleOpenModal}
                />
                <TablePresentation
                  obj={obj}
                  getBonusMark={getBonusMark}
                  labs={labs}
                  handleOpenModal={handleOpenModal}
                />
                <S.Td>{totalMarks}</S.Td>
                <S.Td>{obj.max_score_subj}</S.Td>
                <S.Td>{percentMarks}%</S.Td>
              </S.Tr>
            );
          })
        : null}
    </tbody>
  );
};

export default TableBody;

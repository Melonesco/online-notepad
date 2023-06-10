import React from "react";
import { ILab, IMarks, ITableProps } from "../../utils/types";
import * as S from "./styles";

const TableLabs = ({ obj, labs, handleOpenModal }: ITableProps) => {
  return (
    <>
      {obj.countByLab.map((lab: ILab) => {
        const foundLab = labs.find((l: IMarks) => l.lab?._id === lab._id);
        const labMark = foundLab ? foundLab.labMark : lab.labMark;
        const labBackgroundColor = foundLab?.passed ? "#90EE90" : "#f2f2f2";
        const labCursor = !foundLab?.passed ? "pointer" : "default";
        const labContent = foundLab?.passed ? labMark : "-";
        return (
          <S.Td
            key={lab._id}
            onClick={() => handleOpenModal(lab, null, obj)}
            backgroundColor={labBackgroundColor}
          >
            <S.ButtonOpen cursor={labCursor} disabled={labMark > 0}>
              {labContent}
            </S.ButtonOpen>
          </S.Td>
        );
      })}
      {[...Array(10 - obj.countByLab.length)].map((_, i: number) => (
        <S.Td backgroundColor="gray" key={i}>
          <S.ButtonOpen>-</S.ButtonOpen>
        </S.Td>
      ))}
    </>
  );
};

export default TableLabs;

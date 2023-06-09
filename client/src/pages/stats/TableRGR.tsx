import React from "react";
import * as S from "./styles";
import {
  IBonusProject,
  ILab,
  IMarks,
  ISubject,
  ITableProps,
} from "../../utils/types";

interface ITablePresentation extends ITableProps {
  getBonusMark: (project: any, labs: IMarks[]) => any;
}

const TableRGR = ({
  obj,
  getBonusMark,
  labs,
  handleOpenModal,
}: ITablePresentation) => {
  const RGR = getBonusMark(obj.RGR, labs);

  return (
    <>
      {obj.RGR?.status ? (
        <S.Td
          onClick={() => handleOpenModal(null, obj.RGR, obj)}
          backgroundColor={RGR.backgroundColor}
        >
          <S.ButtonOpen disabled={RGR.content > 0} cursor={RGR.cursor}>
            {RGR.content}
          </S.ButtonOpen>
        </S.Td>
      ) : (
        <S.Td backgroundColor={RGR.status}>-</S.Td>
      )}
    </>
  );
};

export default TableRGR;

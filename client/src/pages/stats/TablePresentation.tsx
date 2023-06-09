import React from "react";
import * as S from "./styles";
import { IMarks, ITableProps } from "../../utils/types";

interface ITablePresentation extends ITableProps {
  getBonusMark: (project: any, labs: IMarks[]) => any;
}

const TablePresentation = ({
  obj,
  getBonusMark,
  labs,
  handleOpenModal,
}: ITablePresentation) => {
  const Presentation = getBonusMark(obj.Presentation, labs);

  return (
    <>
      {obj.Presentation?.status ? (
        <S.Td
          onClick={() => handleOpenModal(null, obj.Presentation, obj)}
          backgroundColor={Presentation.backgroundColor}
        >
          <S.ButtonOpen
            disabled={Presentation.content > 0}
            cursor={Presentation.cursor}
          >
            {Presentation.content}
          </S.ButtonOpen>
        </S.Td>
      ) : (
        <S.Td backgroundColor={Presentation.status}>-</S.Td>
      )}
    </>
  );
};

export default TablePresentation;

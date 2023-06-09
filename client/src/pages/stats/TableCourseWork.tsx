import React from "react";
import { IBonusProject, ILab, IMarks, ISubject } from "../../utils/types";
import * as S from "./styles";
import { Table } from "./styles";

interface ITableCourseWork {
  data: any;
  labs: IMarks[];
  getBonusMark: (project: any, labs: IMarks[]) => any;
  handleOpenModal: (
    currentLab: ILab | null,
    currentProject: IBonusProject | null,
    obj: ISubject
  ) => void;
}

const TableCourseWork = ({
  data,
  labs,
  getBonusMark,
  handleOpenModal,
}: ITableCourseWork) => {
  return (
    <Table>
      <thead>
        <S.Tr>
          <S.Th>Курсова робота</S.Th>
          <S.Th>Бал</S.Th>
          <S.Th>Максимальний бал</S.Th>
        </S.Tr>
      </thead>
      <tbody>
        {data
          ? data.group.subjects
              .filter(
                (obj: ISubject) => obj.CourseWork && obj.CourseWork.status
              )
              .map((obj: ISubject) => {
                const CourseWork = getBonusMark(obj.CourseWork, labs);

                return (
                  <S.Tr key={obj._id}>
                    <S.Td>{obj.nameSubject}</S.Td>
                    {obj.CourseWork?.status ? (
                      <S.Td
                        onClick={() =>
                          handleOpenModal(null, obj.CourseWork, obj)
                        }
                        backgroundColor={CourseWork.backgroundColor}
                      >
                        <S.ButtonOpen
                          disabled={CourseWork.content > 0}
                          cursor={CourseWork.cursor}
                        >
                          {CourseWork.content}
                        </S.ButtonOpen>
                      </S.Td>
                    ) : (
                      <S.Td backgroundColor={CourseWork.status}>-</S.Td>
                    )}
                    <S.Td>{obj.CourseWork.maxMark}</S.Td>
                  </S.Tr>
                );
              })
          : null}
      </tbody>
    </Table>
  );
};

export default TableCourseWork;

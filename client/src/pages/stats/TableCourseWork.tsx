import React, { useEffect, useState } from "react";
import {
  GetBonusMarkFunction,
  IMarks,
  IOpenModalFunction,
  ISubject,
} from "../../utils/types";
import * as S from "./styles";
import { Table } from "./styles";

interface ITableCourseWork {
  data: any;
  labs: IMarks[];
  getBonusMark: GetBonusMarkFunction;
  handleOpenModal: IOpenModalFunction;
  setTotalCoursesWorkCount: any;
  totalCoursesWorkCount: any;
}

const TableCourseWork = ({
  data,
  labs,
  getBonusMark,
  handleOpenModal,
  setTotalCoursesWorkCount,
  totalCoursesWorkCount,
}: ITableCourseWork) => {
  useEffect(() => {
    if (data) {
      const updatedTotalCoursesWorkCount = data.group.subjects
        .filter((obj: ISubject) => obj.CourseWork && obj.CourseWork.status)
        .map((obj: ISubject) => {
          const countCourseWorkMarks = labs.filter(
            (l: IMarks) => l?.bonusProject === obj?.CourseWork._id
          );

          const percentMark = countCourseWorkMarks.reduce(
            (accum: number, total: IMarks) =>
              accum + total.labMark * obj.CourseWorkCredits,
            0
          );

          return percentMark;
        });

      setTotalCoursesWorkCount(updatedTotalCoursesWorkCount);
    }
  }, [data, labs]);

  return (
    <Table>
      <thead>
        <S.Tr>
          <S.Th>Курсова робота</S.Th>
          <S.Th>Бал</S.Th>
          <S.Th>Кредити</S.Th>
          <S.Th>Кінцевий бал</S.Th>
        </S.Tr>
      </thead>
      <tbody>
        {data
          ? data.group.subjects
              .filter(
                (obj: ISubject) => obj.CourseWork && obj.CourseWork.status
              )
              .map((obj: ISubject, index: number) => {
                const CourseWork = getBonusMark(obj.CourseWork, labs);
                const backgroundColor = CourseWork.status
                  ? CourseWork.backgroundColor
                  : undefined;

                return (
                  <S.Tr key={obj._id}>
                    <S.Td>{obj.nameSubject}</S.Td>
                    {obj.CourseWork?.status ? (
                      <S.Td
                        onClick={() =>
                          handleOpenModal(null, obj.CourseWork, obj)
                        }
                        backgroundColor={backgroundColor}
                      >
                        <S.ButtonOpen
                          disabled={CourseWork.content > 0}
                          cursor={CourseWork.cursor}
                        >
                          {CourseWork.content}
                        </S.ButtonOpen>
                      </S.Td>
                    ) : (
                      <S.Td backgroundColor={backgroundColor}>-</S.Td>
                    )}
                    <S.Td>{obj.CourseWorkCredits}</S.Td>
                    <S.Td>{totalCoursesWorkCount[index] || "-"}</S.Td>
                  </S.Tr>
                );
              })
          : null}
      </tbody>
    </Table>
  );
};

export default TableCourseWork;

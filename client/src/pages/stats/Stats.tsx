import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Modal from "./Modal";
import instance from "../../axios";
import { IBonusProject, ILab, IMarks, ISubject } from "../../utils/types";
import { usersSelector } from "../../redux/user/selectors";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { fetchUsers } from "../../redux/user/asyncActions";
import TableExam from "./TableExam";
import TablePresentation from "./TablePresentation";
import TableRGR from "./TableRGR";
import TableLabs from "./TableLabs";
import TableCourseWork from "./TableCourseWork";
import * as S from "./styles";
import { selectIsAuth } from "../../redux/auth/selectors";

const Stats = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const userData = useSelector((state: any) => state.auth.data);
  const users = useSelector(usersSelector);

  const [labInfo, setLabInfo] = useState<object | null>(null);
  const [labScore, setLabScore] = useState(0);
  const [labs, setLabs] = useState<IMarks[]>([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const data = users?.find((obj: ILab) => obj._id === userData?._id);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handleOpenModal = useCallback(
    (
      currentLab: ILab | null,
      currentProject: IBonusProject | null,
      obj: ISubject
    ) => {
      setShowModal(true);
      setLabInfo({
        userId: userData?._id,
        subjectId: obj._id,
        labId: currentLab ? currentLab._id : null,
        bonusProjectId: currentProject ? currentProject._id : null,
      });
    },
    [userData]
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleUpdate = () => {
    const data = {
      ...labInfo,
      labMark: +labScore,
      passed: true,
    };

    instance
      .patch("/users/update", data)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    window.location.reload();
  };

  useEffect(() => {
    instance.get("/users/labs").then((res) => setLabs(res.data));
  }, [users]);

  const getBonusMark = (project: IBonusProject, labs: IMarks[]) => {
    const foundBonusMark = labs.find(
      (l: IMarks) => l.bonusProject === project._id
    );

    const bonusMark = foundBonusMark ? foundBonusMark.labMark : project.mark;
    const bonusMarkBackgroundColor = foundBonusMark?.passed
      ? "#90EE90"
      : "#f2f2f2";
    const bonusMarkCursor = foundBonusMark?.passed ? "pointer" : "default";
    const bonusMarkContent = foundBonusMark?.passed ? bonusMark : "-";
    return {
      backgroundColor: bonusMarkBackgroundColor,
      cursor: bonusMarkCursor,
      content: bonusMarkContent,
      status: project?.status || "gray",
    };
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <S.Page>
      <S.Container>
        <S.Title>Веб-застосунок</S.Title>
        <S.Table>
          <thead>
            <S.Tr>
              <S.Th>Предмет / Викладач</S.Th>
              {[...Array(10)].map((_, index: number) => (
                <S.Th key={index}>Лаба {index + 1}</S.Th>
              ))}
              <S.Th>РГР</S.Th>
              <S.Th>Презентація</S.Th>
              <S.Th>Бал</S.Th>
              <S.Th>Максимальний бал</S.Th>
              <S.Th>Відсоток</S.Th>
            </S.Tr>
          </thead>
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
                      obj.countByLab
                        .map((ob: ILab) => ob._id)
                        .includes(lab.lab?._id)
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
        </S.Table>
        <TableCourseWork
          data={data}
          labs={labs}
          getBonusMark={getBonusMark}
          handleOpenModal={handleOpenModal}
        />
        <TableExam
          data={data}
          labs={labs}
          getBonusMark={getBonusMark}
          handleOpenModal={handleOpenModal}
        />
        {showModal && (
          <Modal
            labScore={labScore}
            setLabScore={setLabScore}
            handleUpdate={handleUpdate}
            modalRef={modalRef}
            handleCloseModal={handleCloseModal}
          />
        )}
      </S.Container>
    </S.Page>
  );
};

export default Stats;

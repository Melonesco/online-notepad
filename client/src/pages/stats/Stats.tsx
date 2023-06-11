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
import TableCourseWork from "./TableCourseWork";
import { selectIsAuth } from "../../redux/auth/selectors";
import { fetchAuthMe } from "../../redux/auth/asyncActions";
import * as S from "./styles";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Stats = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const userData = useSelector((state: RootState) => state.auth.data);
  const users = useSelector(usersSelector);

  const [labInfo, setLabInfo] = useState<object | null>(null);
  const [labScore, setLabScore] = useState(0);
  const [labs, setLabs] = useState<IMarks[]>([]);
  const [generalCount, setGeneralCount] = useState(0);

  useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchUsers());
  }, [dispatch]);

  const data = users.find((obj: ILab) => obj._id === userData?._id);

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

  const handleCloseModal = useCallback(() => setShowModal(false), []);

  const handleUpdate = useCallback(() => {
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
  }, [labInfo, labScore]);

  useEffect(() => {
    instance.get("/users/labs").then((res) => setLabs(res.data));
  }, [users]);

  //console.log("1", totalExamCredits);
  //console.log("2", totalCoursesWorkCredits);

  // const [totalCoursesWorkCount, setTotalCoursesWorkCount] = useState([]);

  const [totalCoursesWorkCount, setTotalCoursesWorkCount] = useState<number[]>(
    []
  );
  const [totalExamCount, setTotalExamCount] = useState<number[]>([]);

  useEffect(() => {
    const totalCounts = [...totalCoursesWorkCount, ...totalExamCount].reduce(
      (accum: number, total: number) => accum + total,
      0
    );

    const totalExamCredits = data?.group.subjects
      .map((credit: ISubject) =>
        credit.ExamCredits > 0 ? credit.ExamCredits : null
      )
      .reduce((accum: number, total: number) => accum + total, 0);

    const totalCoursesWorkCredits = data?.group.subjects
      .map((credit: ISubject) =>
        credit.CourseWorkCredits > 0 ? credit.CourseWorkCredits : null
      )
      .reduce((accum: number, total: number) => accum + total, 0);

    const averageCount =
      totalCounts / (totalExamCredits + totalCoursesWorkCredits) || 0;

    setGeneralCount(parseFloat(averageCount.toFixed(2)));
  }, [labs]);

  const getBonusMark = (project: IBonusProject, labs: IMarks[]) => {
    const foundBonusMark = labs.find(
      (l: IMarks) => l.bonusProject === project._id
    );

    const bonusMark = foundBonusMark ? foundBonusMark.labMark : project.mark;
    const bonusMarkBackgroundColor = foundBonusMark?.passed
      ? "#90EE90"
      : "#f2f2f2";
    const bonusMarkCursor = !foundBonusMark?.passed ? "pointer" : "default";
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
          <TableHeader />
          <TableBody
            data={data}
            labs={labs}
            handleOpenModal={handleOpenModal}
            getBonusMark={getBonusMark}
          />
        </S.Table>
        <TableCourseWork
          data={data}
          labs={labs}
          getBonusMark={getBonusMark}
          handleOpenModal={handleOpenModal}
          setTotalCoursesWorkCount={setTotalCoursesWorkCount}
          totalCoursesWorkCount={totalCoursesWorkCount}
        />
        <TableExam
          data={data}
          labs={labs}
          getBonusMark={getBonusMark}
          handleOpenModal={handleOpenModal}
          setTotalExamCount={setTotalExamCount}
          totalExamCount={totalExamCount}
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
        <S.GeneralPoint>Загальний бал: {generalCount}</S.GeneralPoint>
      </S.Container>
    </S.Page>
  );
};

export default Stats;

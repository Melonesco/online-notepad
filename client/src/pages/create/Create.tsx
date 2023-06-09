import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGroup } from "../../redux/group/slice";
import AddSubjects from "../../components/add-subjects";
import Loader from "../../components/loader";
import SubtractIcon from "../../assets/images/icons8-subtract-30.png";
import PlusIcon from "../../assets/images/icons8-plus-math-30.png";
import { subjectsStorage } from "../../Storage/Storage";
import { Navigate, useNavigate } from "react-router-dom";
import { ISubject, ISubjectStorage } from "../../utils/types";
import { IGroupPayload } from "../../redux/group/types";
import * as S from "./styles";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);
  const [nameGroup, setNameGroup] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [subjects, setSubjects] = useState<ISubjectStorage[]>(subjectsStorage);

  const onSubmit = (): void => {
    const data: IGroupPayload = {
      nameGroup,
      subjects: subjects.filter((obj: ISubject) => obj.nameSubject),
    };

    if (nameGroup.length > 2 && data.subjects.length > 0) {
      setNameGroup("");
      setCount(0);
      setSubjects(subjectsStorage);
      setIsLoading(true);
      dispatch(addGroup(data));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else if (nameGroup.length < 2) {
      alert("Введіть назву групи");
    } else {
      alert("Добавте предмети");
    }
  };

  const onClickLogout = () => {
    if (window.confirm("Ви впевнені, що хочете вийти з системи?")) {
      navigate("/login");
      window.localStorage.removeItem("adminPassword");
    }
  };

  if (!window.localStorage.getItem("adminPassword")) {
    return <Navigate to="/" />;
  }

  return (
    <S.Page>
      <S.ButtonLogOut onClick={onClickLogout}>Вийти з адміна</S.ButtonLogOut>
      <S.Container>
        <S.Title>Панель Адміна</S.Title>
        <S.Block>
          <S.InputForGroup
            type="text"
            maxLength={30}
            value={nameGroup}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNameGroup(e.target.value)
            }
            placeholder="Назва групи"
          />
          <S.ButtonSubmit onClick={onSubmit} type="submit">
            Створити
          </S.ButtonSubmit>
        </S.Block>
        <S.Block>
          <S.Subjects>
            Кількість предметів: <S.Count>{count}</S.Count>
          </S.Subjects>
          <S.ButtonClick
            cursor={count === 0 ? "not-allowed" : "pointer"}
            backgroundColor={count === 0 ? "rgba(255, 0, 0, 0.8)" : "#ffffff"}
            color={count === 0 ? "#ffffff" : "#000000"}
            onClick={() => count !== 0 && setCount(count - 1)}
          >
            <S.Icons src={SubtractIcon} alt="icon" />
          </S.ButtonClick>
          <S.ButtonClick
            cursor={count >= 10 ? "not-allowed" : "pointer"}
            backgroundColor={count >= 10 ? "rgba(255, 0, 0, 0.8)" : "#ffffff"}
            color={count >= 10 ? "#ffffff" : "#000000"}
            onClick={() => count < 10 && setCount(count + 1)}
          >
            <S.Icons src={PlusIcon} alt="icon" />
          </S.ButtonClick>
        </S.Block>
        <AddSubjects
          count={count}
          subjects={subjects}
          setSubjects={setSubjects}
        />
        <S.Links to="/add-students">Додаткова інформація</S.Links>
      </S.Container>
      {isLoading && <Loader />}
    </S.Page>
  );
};

export default Create;

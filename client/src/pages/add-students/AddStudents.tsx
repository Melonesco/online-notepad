import React, { useState } from "react";
import Groups from "../../components/groups";
import Register from "../../components/register";
import SectionInformation from "../../components/section-information";
import { Navigate, useNavigate } from "react-router-dom";
import * as S from "./styles";

const AddStudents = () => {
  const [getNameGroup, setGetGroup] = useState<string>("");
  const navigate = useNavigate();

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
        <S.Title>Меню Адміна</S.Title>
        <S.Blocks>
          <S.Block>
            <Register getNameGroup={getNameGroup} setGetGroup={setGetGroup} />
            <Groups setGetGroup={setGetGroup} />
          </S.Block>
          <SectionInformation />
        </S.Blocks>
        <S.Links to="/create">Створити групу</S.Links>
      </S.Container>
    </S.Page>
  );
};

export default AddStudents;

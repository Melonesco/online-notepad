import React, { useState } from "react";
import Groups from "../../components/groups";
import Register from "../../components/register";
import SectionInformation from "../../components/section-information";
import { Navigate } from "react-router-dom";
import * as S from "./styles";
import { token } from "../../utils/token";

const AddStudents = () => {
  const [getNameGroup, setGetGroup] = useState<string>("");

  if (
    token !==
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgzNDI3MDk3MjU5NmE4ZGY2NzdjY2QiLCJpYXQiOjE2ODYzMjQ2MDAsImV4cCI6MTY5NjY5MjYwMH0.9kZfWLxNWBnQ1yWXy1xOuL1q8CG6t8xIAW1c9JkT5vk"
  ) {
    return <Navigate to="/" />;
  }

  return (
    <S.Page>
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

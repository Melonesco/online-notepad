import React, { useEffect } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { IGroup } from "../../utils/types";
import { groupsSelector } from "../../redux/group/selectors";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { fetchGroups } from "../../redux/group/asyncActions";

interface IGroups {
  setGetGroup: React.Dispatch<React.SetStateAction<string>>;
}

const Groups = ({ setGetGroup }: IGroups) => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const groups = useSelector(groupsSelector);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <S.Container>
      <S.Title>Виберіть групу</S.Title>
      <S.Blocks>
        {groups.length > 0 ? (
          groups.map((group: IGroup) => (
            <S.Block
              key={group._id}
              onClick={() => setGetGroup(group.nameGroup)}
            >
              <S.NameGroup>{group.nameGroup}</S.NameGroup>
              <S.Info>
                Кількість предметів: <S.Count>{group.subjects.length}</S.Count>
              </S.Info>
            </S.Block>
          ))
        ) : (
          <S.Empty to="/create">Пусто =(</S.Empty>
        )}
      </S.Blocks>
    </S.Container>
  );
};

export default Groups;

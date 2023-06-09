import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal";
import { IGroup, IItem, IUser } from "../../utils/types";
import { groupsSelector } from "../../redux/group/selectors";
import { usersSelector } from "../../redux/user/selectors";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { fetchUsers } from "../../redux/user/asyncActions";

const SectionInformation = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const groups = useSelector(groupsSelector);
  const users = useSelector(usersSelector);
  const [data, setData] = useState<IGroup[]>([]);
  const [dataInModal, setDataInModal] = useState<IGroup | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (groups && users) {
      const items = groups.map(({ _id, nameGroup, subjects }: IItem) => ({
        _id,
        nameGroup,
        subjects,
        users: users.filter(
          (user: IUser) => user.group.nameGroup === nameGroup
        ),
      }));

      setData(items);
    }
  }, [groups, users]);

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleButtonClick = (obj: IGroup) => {
    setShowModal(true);
    setDataInModal(obj);
  };

  const handleModalOverlayClick = () => {
    setShowModal(false);
  };

  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <S.Section>
      <S.Title>Інформація про групи</S.Title>
      <S.Blocks>
        {data.length > 0 ? (
          data.map((obj: IGroup) => (
            <S.Block onClick={() => handleButtonClick(obj)} key={obj._id}>
              <S.NameGroup>{obj.nameGroup}</S.NameGroup>
              <S.Info>
                <S.CountBySubjects>
                  Кількість предметів: <S.Span>{obj.subjects.length}</S.Span>
                </S.CountBySubjects>
                <S.CountByUsers>
                  Кількість студентів: <S.Span>{obj.users.length}</S.Span>
                </S.CountByUsers>
              </S.Info>
            </S.Block>
          ))
        ) : (
          <S.Empty>Пусто =(</S.Empty>
        )}
      </S.Blocks>
      {showModal && (
        <Modal
          handleModalOverlayClick={handleModalOverlayClick}
          handleModalContentClick={handleModalContentClick}
          data={dataInModal}
          setData={setDataInModal}
        />
      )}
    </S.Section>
  );
};

export default SectionInformation;

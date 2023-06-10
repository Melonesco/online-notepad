import React from "react";
import * as S from "./styles";
import { IGroup, ISubject, IUser } from "../../utils/types";
import { useDispatch } from "react-redux";
import { fetchDeleteUser } from "../../redux/user/asyncActions";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { fetchDeleteGroup } from "../../redux/group/asyncActions";

interface IModal {
  handleModalOverlayClick: React.MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  >;
  handleModalContentClick: React.MouseEventHandler<HTMLDivElement>;
  data: IGroup | null;
  setData: any;
}

const Modal: React.FC<IModal> = ({
  handleModalOverlayClick,
  handleModalContentClick,
  data,
  setData,
}) => {
  const subjects = data?.subjects ?? [];
  const users = data?.users ?? [];
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  const handleRemoveGroup = (data: any) => {
    setData(null);
    if (data) {
      dispatch(fetchDeleteGroup(data));
    }
  };

  const handleRemoveUser = (id: string) => {
    const updatedUsers = data?.users.filter((user: IUser) => user._id !== id);
    const updatedData = {
      ...data,
      users: updatedUsers,
    };

    setData(updatedData);
    dispatch(fetchDeleteUser(id));
  };

  return (
    <S.ModalOverlay onClick={handleModalOverlayClick}>
      <S.ModalContent onClick={handleModalContentClick}>
        <S.Title>
          Група: {data?.nameGroup}{" "}
          <S.ButtonDeleteGroup onClick={() => handleRemoveGroup(data?._id)}>
            Видалити групу
          </S.ButtonDeleteGroup>
        </S.Title>
        <S.ButtonClose onClick={handleModalOverlayClick}>X</S.ButtonClose>
        <S.Blocks>
          <S.BLock>
            <h2>Список предметів:</h2>
            {subjects.map((subject: ISubject, index: number) => (
              <S.List key={index}>
                <S.Info>
                  <S.Numbers>{index + 1}</S.Numbers> {subject.nameSubject}
                </S.Info>
              </S.List>
            ))}
          </S.BLock>
          <S.BLock>
            <h2>Список студентів:</h2>
            {users.length > 0 ? (
              users.map((user: IUser, index: number) => (
                <S.List key={index}>
                  <S.Info>
                    <S.Numbers>{index + 1}.</S.Numbers> {user.fullName}
                  </S.Info>
                  <S.ButtonDelete onClick={() => handleRemoveUser(user._id)}>
                    Видалити
                  </S.ButtonDelete>
                </S.List>
              ))
            ) : (
              <S.Empty>Студентів не додано =(</S.Empty>
            )}
          </S.BLock>
        </S.Blocks>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default Modal;

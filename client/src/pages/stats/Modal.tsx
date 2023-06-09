import React from "react";
import * as S from "./styles";

interface IModal {
  labScore: number;
  setLabScore: React.Dispatch<React.SetStateAction<number>>;
  modalRef: React.RefObject<HTMLDivElement>;
  handleCloseModal: () => void;
  handleUpdate: () => void;
}

const Modal = ({
  modalRef,
  handleCloseModal,
  handleUpdate,
  labScore,
  setLabScore,
}: IModal) => {
  return (
    <S.Modal ref={modalRef}>
      <S.ModalTitle>Інфо</S.ModalTitle>
      <S.ButtonClose onClick={handleCloseModal}>X</S.ButtonClose>
      <S.BlockField>
        <S.InputInModal
          type="number"
          value={labScore}
          onChange={(e: any) => setLabScore(e.target.value)}
        />
        <S.ButtonApply onClick={handleUpdate}>Застосувати</S.ButtonApply>
      </S.BlockField>
    </S.Modal>
  );
};

export default Modal;

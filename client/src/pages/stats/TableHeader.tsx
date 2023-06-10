import React from "react";
import * as S from "./styles";

const TableHeader = () => {
  return (
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
  );
};

export default TableHeader;

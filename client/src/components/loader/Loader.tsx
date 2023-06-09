import React from "react";
import * as S from "./styles";

const Loader = () => {
  return (
    <S.Block>
      <S.Center>
        <S.Loader>
          Loading
          <span></span>
        </S.Loader>
      </S.Center>
    </S.Block>
  );
};

export default Loader;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "../../assets/images/logout.png";
import * as S from "./styles";
import { logout } from "../../redux/auth/slice";
import { RootState } from "../../redux/store";

const Header = () => {
  const userData = useSelector((state: RootState) => state.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = () => {
    if (window.confirm("Ви впевнені, що хочете вийти з системи?")) {
      dispatch(logout());
      navigate("/login");
      window.localStorage.removeItem("token");
    }
  };

  return (
    userData && (
      <S.Header>
        <S.Name>{userData.fullName}</S.Name>
        <S.Icon onClick={onClickLogout} src={LogoutIcon} alt="icon" />
      </S.Header>
    )
  );
};

export default Header;

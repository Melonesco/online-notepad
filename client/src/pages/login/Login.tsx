import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Photo from "../../assets/images/95116-abstract-dark-black-minimalism-minimalist-hd-4k.jpg";
import { selectIsAuth } from "../../redux/auth/selectors";
import { ILoginForm } from "../../utils/types";
import { AnyAction, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { IAuthMe } from "../../redux/auth/types";
import { fetchAuth } from "../../redux/auth/asyncActions";
import AdminIcon from "../../assets/images/administrator.png";
import CloseIcon from "../../assets/images/close.png";
import * as S from "./styles";
import { token } from "../../utils/token";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: ILoginForm) => {
    const data = (await dispatch(fetchAuth(values))) as PayloadAction<IAuthMe>;

    if (!data.payload) {
      return alert("Не вийшло зареєструватися");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (window.localStorage.getItem("token") && isAuth) {
    return <Navigate to="/stats" />;
  }

  const handleAdminLogin = () => {
    if (adminPassword === "orest") {
      window.localStorage.setItem("adminPassword", adminPassword);
      setAdminPassword("");
      navigate("/create");
    } else {
      alert("Невірний пароль");
    }
  };

  return (
    <S.Login>
      <S.ButtonAdminIcon onClick={openModal} src={AdminIcon} alt="icon" />
      {isModalOpen && (
        <S.ModalContent>
          <S.ModalImgClose src={CloseIcon} onClick={closeModal} alt="icon" />
          <S.ModalInput
            type="password"
            maxLength={20}
            placeholder="Пароль"
            value={adminPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAdminPassword(e.target.value)
            }
          />
          <S.ModalButton onClick={handleAdminLogin}>
            Увійти в адміна
          </S.ModalButton>
        </S.ModalContent>
      )}
      <S.Block onClick={closeModal}>
        <S.Title>Login</S.Title>
        <S.Image src={Photo} alt="img" />
        <S.Text>Це є вхід для студентів</S.Text>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Label>
            <S.Input
              placeholder="Пошта"
              type="email"
              {...register("email", { required: "Введіть свою пошту" })}
            />
            {errors?.email && (
              <S.Errors>{errors?.email.message || "Error!"}</S.Errors>
            )}
          </S.Label>
          <S.Label>
            <S.Input
              placeholder="Пароль"
              type="password"
              {...register("password", { required: "Введіть свій пароль" })}
            />
            {errors?.password && (
              <S.Errors>{errors?.password.message || "Error!"}</S.Errors>
            )}
          </S.Label>
          <S.Button type="submit">Enter</S.Button>
        </S.Form>
      </S.Block>
    </S.Login>
  );
};

export default Login;

import React from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Photo from "../../assets/images/95116-abstract-dark-black-minimalism-minimalist-hd-4k.jpg";
import { selectIsAuth } from "../../redux/auth/selectors";
import { ILoginForm } from "../../utils/types";
import { AnyAction, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { IAuthMe } from "../../redux/auth/types";
import { fetchAuth } from "../../redux/auth/asyncActions";
import * as S from "./styles";
import { token } from "../../utils/token";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

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

  if (
    token ===
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgzNDI3MDk3MjU5NmE4ZGY2NzdjY2QiLCJpYXQiOjE2ODYzMjQ2MDAsImV4cCI6MTY5NjY5MjYwMH0.9kZfWLxNWBnQ1yWXy1xOuL1q8CG6t8xIAW1c9JkT5vk"
  ) {
    return <Navigate to="/create" />;
  }

  if (token && isAuth) {
    return <Navigate to="/stats" />;
  }

  return (
    <S.Login>
      <S.Block>
        <S.Title>Login</S.Title>
        <S.Image src={Photo} alt="img" />
        <S.Text>Це є вхід для студентів</S.Text>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Label>
            <S.Input
              placeholder="Email"
              type="email"
              {...register("email", { required: "Введіть свою пошту" })}
            />
            {errors?.email && (
              <S.Errors>{errors?.email.message || "Error!"}</S.Errors>
            )}
          </S.Label>
          <S.Label>
            <S.Input
              placeholder="Password"
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

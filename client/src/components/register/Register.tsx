import React, { useEffect } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FormData, IGroup, IRegisterForm } from "../../utils/types";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { fetchRegisterUser } from "../../redux/user/asyncActions";

interface IRegister {
  getNameGroup: string;
  setGetGroup: React.Dispatch<React.SetStateAction<string>>;
}

const Register = ({ getNameGroup, setGetGroup }: IRegister) => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const groups = useSelector((state: RootState) => state.groups.items);

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      nameGroup: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("nameGroup", getNameGroup);
  }, [getNameGroup, setValue]);

  const onSubmit = (values: FormData) => {
    const group = groups.find(
      (obj: IGroup) => obj.nameGroup === values.nameGroup
    );

    delete values.nameGroup;

    const data: IRegisterForm = {
      ...values,
      group: group,
    };

    setGetGroup("");
    dispatch(fetchRegisterUser(data));
    reset();
    window.location.reload();
  };

  return (
    <S.Container>
      <S.LoginBox>
        <S.LoginTitle>Зареєструвати студента</S.LoginTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.UserBox>
            <S.Input
              type="email"
              placeholder={errors.email ? errors.email.message : "Пошта"}
              color={errors.email ? "darkred" : "gray"}
              {...register("email", {
                required: "Введіть пошту",
              })}
            />
            <S.Label>Пошта</S.Label>
          </S.UserBox>
          <S.UserBox>
            <S.Input
              type="text"
              placeholder={
                errors.fullName ? errors.fullName.message : "Повне ім'я"
              }
              color={errors.fullName ? "darkred" : "gray"}
              {...register("fullName", { required: "Введіть повне ім'я" })}
            />
            <S.Label>Повне ім'я</S.Label>
          </S.UserBox>
          <S.UserBox>
            <S.Input
              type="password"
              placeholder={errors.password ? errors.password.message : "Пароль"}
              color={errors.password ? "darkred" : "gray"}
              {...register("password", { required: "Введіть пароль" })}
            />
            <S.Label>Password</S.Label>
          </S.UserBox>
          <S.UserBox>
            <S.Input
              type="text"
              value={getNameGroup}
              {...register("nameGroup", { required: "Введіть назву групи" })}
              disabled={!getNameGroup}
            />
            <S.Label>Виберіть групу</S.Label>
          </S.UserBox>
          <S.Button type="submit">
            <S.Span></S.Span>
            <S.Span></S.Span>
            <S.Span></S.Span>
            <S.Span></S.Span>
            Добавити
          </S.Button>
        </form>
      </S.LoginBox>
    </S.Container>
  );
};

export default Register;

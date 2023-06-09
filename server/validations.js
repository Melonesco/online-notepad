import { body } from "express-validator";

export const loginValidation = [
  body("email", "Помилка").isEmail(),
  body("password").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Помилка").isEmail(),
  body("password").isLength({ min: 5 }),
  body("fullName", "Помилка в іменні").isLength({ min: 3 }),
  body("avatarUrl").optional().isURL(),
  body("nameGroup", "Напишіть назву групи").isLength({ min: 3 }).isString(),
  body("subjects", "Виберіть предмети").isArray().isLength({ min: 1 }),
];

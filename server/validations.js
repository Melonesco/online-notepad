import { body } from "express-validator";

export const loginValidation = [
  body("email", "Помилка").isEmail(),
  body("password").isLength({ min: 4 }),
];

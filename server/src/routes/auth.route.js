import express from "express";
import {checkAuth, handleValidationErrors} from "../../utils/index.js";
import * as UserController from "../controllers/UserController.js";
import {loginValidation, registerValidation} from "../../validations.js";

const router = express.Router({ mergeParams: true });

router.post(
    "/auth/login",
    loginValidation,
    handleValidationErrors,
    UserController.login
);

router.post(
    "/auth/register",
    registerValidation,
    handleValidationErrors,
    UserController.register
);
router.get("/auth/me", checkAuth, UserController.getMe);

export default router;

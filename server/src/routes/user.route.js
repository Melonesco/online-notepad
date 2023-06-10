import express from "express";
import { checkAuth, handleValidationErrors } from "../../utils/index.js";
import * as UserController from "../controllers/UserController.js";

const router = express.Router({ mergeParams: true });

router.get("/users", UserController.getAllUsers);
router.patch(
  "/users/update",
  checkAuth,
  handleValidationErrors,
  UserController.updateSubjectLabMark
);

router.post("/users/register", handleValidationErrors, UserController.register);
router.delete("/users/:id", handleValidationErrors, UserController.deleteUser);

router.get(
  "/users/labs",
  checkAuth,
  handleValidationErrors,
  UserController.getGroupWithSubjectsAndLabs
);

export default router;

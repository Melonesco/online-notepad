import express from "express";
import * as PostController from "../controllers/GroupController.js";
import {checkAuth, handleValidationErrors} from "../../utils/index.js";

const router = express.Router({ mergeParams: true });

router.get("/group", PostController.getAllGroups);
router.get("/group/subjects", PostController.getAllSubjects);
router.get("/group/:id", PostController.getOneGroup);
router.post(
    "/group",
    checkAuth,
    handleValidationErrors,
    PostController.createGroup
);
router.delete("/group/:id", checkAuth, PostController.remove);

export default router;

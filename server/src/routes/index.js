import express from "express";
import groupRoute from "./group.route.js";
import userRoute from "./user.route.js";
import authRoute from "./auth.route.js";

const router = express.Router();

router.use("/", groupRoute);
router.use("/", userRoute);
router.use("/", authRoute);

export default router;

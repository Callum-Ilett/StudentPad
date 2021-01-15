import { Router } from "express";
import authMiddleware from "../middleware/checkAuth.js";
const { checkAuthenticated } = authMiddleware;

import User from "../models/user.js";
import Review from "../models/review.js";
import Message from "../models/message.js";

import authRouter from "./authRoutes.js";
import userRouter from "./userRoutes.js";
import propertyRouter from "./propertyRoutes.js";
import messagesRouter from "./messagesRoutes.js";

const router = Router();

router.use("/authentication", authRouter);
router.use("/user", userRouter);
router.use("/property", propertyRouter);
router.use("/messages", messagesRouter);

export default router;

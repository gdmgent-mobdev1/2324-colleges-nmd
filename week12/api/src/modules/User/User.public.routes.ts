import { Router } from "express";
import { authLocal } from "../../middleware/auth/authMiddleware";
import { login } from "./User.controller";

const router = Router();
router.post("/login", authLocal, login);

export default router;

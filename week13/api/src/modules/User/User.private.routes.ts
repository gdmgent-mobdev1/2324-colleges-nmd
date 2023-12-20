import { Router } from "express";
import { getCurrentUser, getDashboard } from "./User.controller";

const router = Router();
router.get("/users/current", getCurrentUser);
router.get("/users/current/dashboard", getDashboard);

export default router;

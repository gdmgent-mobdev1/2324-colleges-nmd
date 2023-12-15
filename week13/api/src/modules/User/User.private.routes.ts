import { Router } from "express";
import { getCurrentUser } from "./User.controller";

const router = Router();
router.get("/users/current", getCurrentUser);

export default router;

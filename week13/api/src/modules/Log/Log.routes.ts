import { Router } from "express";
import { createLog, deleteLog, getLogDetail, getLogs, updateLog } from "./Log.controller";

const router: Router = Router();

router.get("/logs", getLogs);
router.get("/logs/:id", getLogDetail);
router.post("/logs", createLog);
router.patch("/logs/:id", updateLog);
router.delete("/logs/:id", deleteLog);

export default router;

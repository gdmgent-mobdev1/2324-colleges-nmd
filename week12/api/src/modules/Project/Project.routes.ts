import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectDetail,
  getProjects,
  updateProject,
} from "./Project.controller";

const router: Router = Router();

router.get("/projects", getProjects);
router.get("/projects/:id", getProjectDetail);
router.post("/projects", createProject);
router.patch("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

export default router;

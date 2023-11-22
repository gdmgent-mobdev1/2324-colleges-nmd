import express from "express";
import { createClient, getClients } from "./Client.controller";

const router = express.Router();

router.get("/clients", getClients);
router.post("/clients", createClient);

export default router;

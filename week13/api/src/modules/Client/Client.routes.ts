import { Router } from "express";
import { createClient, deleteClient, getClientById, getClients, updateClient } from "./Client.controller";

const router = Router();

router.get("/clients", getClients);
router.get("/clients/:id", getClientById);
router.post("/clients", createClient);
router.patch("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

export default router;

import { Request, Response } from "express";
import Client from "./Client.model";

const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createClient = async (req: Request, res: Response) => {
  try {
    const client = new Client(req.body);
    const result = await client.save();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getClients, createClient };

import { NextFunction, Request, Response } from "express";
import Client from "./Client.model";
import NotFoundError from "../../middleware/error/NotFoundError";

const getClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    next(err);
  }
};

const getClientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      throw new NotFoundError("Client not found");
    }
    res.json(client);
  } catch (err) {
    next(err);
  }
};

const createClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = new Client(req.body);
    const result = await client.save();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const updateClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!client) {
      throw new NotFoundError("Client not found");
    }
    res.json(client);
  } catch (err) {
    next(err);
  }
};

const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      throw new NotFoundError("Client not found");
    }
    res.json({});
  } catch (err) {
    next(err);
  }
};

export { getClients, createClient, getClientById, updateClient, deleteClient };

import { NextFunction, Request, Response } from "express";
import Client from "./Client.model";
import NotFoundError from "../../middleware/error/NotFoundError";
import { AuthRequest } from "../../middleware/auth/authMiddleware";

const getClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const clients = await Client.find({
      ownerId: user._id,
    }).sort({ name: 1 });
    res.json(clients);
  } catch (err) {
    next(err);
  }
};

const getClientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const client = await Client.findOne({
      _id: id,
      ownerId: user._id,
    });
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
    const { user } = req as AuthRequest;
    const client = new Client({ ...req.body, ownerId: user._id });
    const result = await client.save();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const updateClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const client = await Client.findOneAndUpdate(
      {
        _id: id,
        ownerId: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
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
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const client = await Client.findOneAndDelete({
      _id: id,
      ownerId: user._id,
    });
    if (!client) {
      throw new NotFoundError("Client not found");
    }
    res.json({});
  } catch (err) {
    next(err);
  }
};

export { getClients, createClient, getClientById, updateClient, deleteClient };

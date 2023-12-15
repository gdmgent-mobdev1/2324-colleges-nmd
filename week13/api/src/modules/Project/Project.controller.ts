import { NextFunction, Response, Request } from "express";
import NotFoundError from "../../middleware/error/NotFoundError";
import { AuthRequest } from "../../middleware/auth/authMiddleware";
import ProjectModel from "./Project.model";
import ClientModel from "../Client/Client.model";

const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const projects = await ProjectModel.find({
      ownerId: user._id,
    })
      .sort({ name: 1 })
      .lean()
      .populate("client", ["name", "_id"]);

    res.json(projects);
  } catch (e) {
    next(e);
  }
};

const getProjectDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const project = await ProjectModel.findOne({
      _id: id,
      ownerId: user._id,
    })
      .lean()
      .populate("client");

    if (!project) {
      throw new NotFoundError("Project not found");
    }
    res.json(project);
  } catch (e) {
    next(e);
  }
};

const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;

    const client = await ClientModel.findOne({
      _id: req.body.clientId,
      ownerId: user._id,
    });

    if (!client) {
      throw new NotFoundError("Client not found");
    }

    const project = new ProjectModel({
      ...req.body,
      ownerId: user._id,
    });
    const result = await project.save();

    res.json(result);
  } catch (e) {
    next(e);
  }
};

const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;

    // make sure client exists AND that the client belongs to the user
    if (req.body.clientId) {
      const client = await ClientModel.findOne({
        _id: req.body.clientId,
        ownerId: user._id,
      });

      if (!client) {
        throw new NotFoundError("Client not found");
      }
    }

    // { new: true } om ge-update versie terug te krijgen
    const project = await ProjectModel.findOneAndUpdate(
      {
        _id: id,
        ownerId: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      throw new NotFoundError("Project not found");
    }
    res.json(project);
  } catch (e) {
    next(e);
  }
};

const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const project = await ProjectModel.findOneAndDelete({
      _id: id,
      ownerId: user._id,
    });
    if (!project) {
      throw new NotFoundError("Project not found");
    }
    res.json({});
  } catch (e) {
    next(e);
  }
};

export { getProjects, getProjectDetail, createProject, updateProject, deleteProject };

import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth/authMiddleware";
import ProjectModel from "../Project/Project.model";
import ClientModel from "../Client/Client.model";
import LogModel from "../Log/Log.model";

const login = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as AuthRequest;

  res.json({
    token: user.generateToken(),
  });
};

const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as AuthRequest;
  res.json(user);
};

const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;

    // how many projects?
    const projects = await ProjectModel.countDocuments({ ownerId: user._id });
    // how many clients?
    const clients = await ClientModel.countDocuments({ ownerId: user._id });
    // sum of all durations of this user?
    const duration = await LogModel.aggregate([
      {
        $match: {
          ownerId: user._id,
        },
      },
      {
        $group: {
          _id: null,
          totalDuration: { $sum: "$duration" },
        },
      },
    ]).exec();

    res.json({
      projects,
      clients,
      duration: duration[0]?.totalDuration || 0,
    });
  } catch (e) {
    next(e);
  }
};

export { login, getCurrentUser, getDashboard };

import { API } from "@core/network/api";
import { DashboardData, User } from "./User.types";

export const getCurrentUser = () => {
  return API.get<User>("/users/current");
};

export const getDashboardData = () => {
  return API.get<DashboardData>("/users/current/dashboard");
};

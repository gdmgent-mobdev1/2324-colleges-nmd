import { API } from "@core/network/api";
import { Auth, User } from "./Auth.types";

type LoginBody = {
  email: string;
  password: string;
};

export const login = (body: LoginBody) => {
  return API.post<Auth>("/login", body);
};

export const getCurrentUser = () => {
  return API.get<User>("/users/current");
};

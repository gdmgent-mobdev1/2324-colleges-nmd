import { API } from "@core/network/api";
import { Auth } from "./Auth.types";

type LoginBody = {
  email: string;
  password: string;
};

export const login = (body: LoginBody) => {
  return API.post<Auth>("/login", body);
};

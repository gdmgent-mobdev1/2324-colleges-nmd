import { API } from "@core/network/api";
import { Client } from "./Client.types";

const getClients = () => {
  return API.get<Client[]>("/clients");
};

const getClientById = (id: string) => {
  return API.get<Client>(`/clients/${id}`);
};

export { getClients, getClientById };

import { API } from "@core/network/api";
import { Client, ClientBody } from "./Client.types";

const getClients = () => {
  return API.get<Client[]>("/clients");
};

const getClientById = (id: string) => {
  return API.get<Client>(`/clients/${id}`);
};

const createClient = (client: ClientBody) => {
  return API.post<Client>("/clients", client);
};

const updateClient = (id: string, client: ClientBody) => {
  return API.patch<Client>(`/clients/${id}`, client);
};

export { getClients, getClientById, createClient, updateClient };

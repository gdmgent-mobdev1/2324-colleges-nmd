import { Log, LogBody } from "./Log.types";
import { API } from "@core/network/api";
import qs from "query-string";

type Query = {
  projectId?: string;
  clientId?: string;
  date?: string;
};

const getLogs = (query: Query = {}) => {
  return API.get<Log[]>(`/logs?${qs.stringify(query)}`);
};

const createLog = (client: LogBody) => {
  return API.post<Log>("/logs", client);
};

const updateLog = (id: string, client: LogBody) => {
  return API.patch<Log>(`/logs/${id}`, client);
};

export { getLogs, createLog, updateLog };

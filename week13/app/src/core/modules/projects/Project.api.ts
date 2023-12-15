import { Project, ProjectBody } from "./Project.types";
import { API } from "@core/network/api";

const getProjects = () => {
  return API.get<Project[]>("/projects");
};

const getProjectById = (id: string) => {
  return API.get<Project>(`/projects/${id}`);
};

const createProject = (client: ProjectBody) => {
  return API.post<Project>("/projects", client);
};

const updateProject = (id: string, client: ProjectBody) => {
  return API.patch<Project>(`/projects/${id}`, client);
};

export { getProjects, getProjectById, createProject, updateProject };

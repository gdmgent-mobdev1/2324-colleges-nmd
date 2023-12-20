export type User = {
  _id: string;
  email: string;
  password: string;
  name: string;
};

export type DashboardData = {
  duration: number;
  projects: number;
  clients: number;
};

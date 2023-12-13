import "./style/reset.css";
import "./style/main.css";

import { router } from "@core/router";

import "@components/app/App";

const routes = [
  {
    path: "/",
    component: "my-app",
    children: [
      {
        path: "/",
        component: "auth-container",
        action: async () => {
          await import("@components/auth/AuthContainer");
        },
        children: [
          {
            path: "/",
            component: "app-home",
            action: async () => {
              await import("@components/pages/home/Home");
            },
          },
          {
            path: "clients",
            component: "client-overview",
            action: async () => {
              await import("@components/pages/clients/ClientOverview");
            },
          },
          {
            path: "clients/create",
            component: "client-create",
            action: async () => {
              await import("@components/pages/clients/ClientCreate");
            },
          },
          {
            path: "clients/:id",
            component: "client-detail-container",
            action: async () => {
              await import("@components/pages/clients/ClientDetailContainer");
            },
            children: [
              {
                path: "/",
                component: "client-detail",
                action: async () => {
                  await import("@components/pages/clients/ClientDetail");
                },
              },
              {
                path: "/edit",
                component: "client-edit",
                action: async () => {
                  await import("@components/pages/clients/ClientEdit");
                },
              },
            ],
          },
          {
            path: "projects",
            component: "project-overview",
            action: async () => {
              await import("@components/pages/projects/ProjectOverview");
            },
          },
          {
            path: "projects/create",
            component: "project-create",
            action: async () => {
              await import("@components/pages/projects/ProjectCreate");
            },
          },
          {
            path: "projects/:id",
            component: "project-detail-container",
            action: async () => {
              await import("@components/pages/projects/ProjectDetailContainer");
            },
            children: [
              {
                path: "/",
                component: "project-detail",
                action: async () => {
                  await import("@components/pages/projects/ProjectDetail");
                },
              },
              {
                path: "/edit",
                component: "project-edit",
                action: async () => {
                  await import("@components/pages/projects/ProjectEdit");
                },
              },
            ],
          },
        ],
      },
      {
        path: "login",
        component: "login-page",
        action: async () => {
          await import("@components/auth/Login");
        },
      },
    ],
  },
];

router.setRoutes(routes);

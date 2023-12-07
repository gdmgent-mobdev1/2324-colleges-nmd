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
            path: "clients/:id",
            component: "client-detail",
            action: async () => {
              await import("@components/pages/clients/ClientDetail");
            },
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

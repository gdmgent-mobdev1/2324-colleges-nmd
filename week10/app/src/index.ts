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
        path: "clients",
        component: "client-overview",
        action: async () => {
          await import("@components/clients/ClientOverview");
        },
      },
      {
        path: "clients/:id",
        component: "client-detail",
        action: async () => {
          await import("@components/clients/ClientDetail");
        },
      },
    ],
  },
];

router.setRoutes(routes);

import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { payableRoutes } from "../modules/payable/payable.routes";

export const routes = Router();

const allRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/payable",
    route: payableRoutes,
  },
];

allRoutes.forEach(({ path, route }) => routes.use(path, route));

import { Express } from "express";

import SphereRoutes from "./Sphere.routes";

const prefix = "/api/v1";

export function getRoutes(app: Express) {
  app.get(prefix, (req, res) => {
    res.status(200).send({
      success: true,
      message: "Welcome to API!",
      version: "1.0.0",
    });
  });

  app.use(prefix, SphereRoutes);
}

import { Router } from "express";
import { CompilersController } from "../controllers/SphereController/CompilersController";
import { SubmissionsController } from "../controllers/SphereController/SubmissionsController";

const routes = Router();

routes.get("/sphere/compilers", async (req, res) => {
  const compilersController = new CompilersController();

  const { body, statusCode } = await compilersController.handle();

  res.status(statusCode).send(body);
});

routes.post("/sphere/submissions", async (req, res) => {
  const sphereController = new SubmissionsController();

  const { body, statusCode } = await sphereController.post({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

routes.get("/sphere/submissions/:ids", async (req, res) => {
  const sphereController = new SubmissionsController();

  const { body, statusCode } = await sphereController.get({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default routes;

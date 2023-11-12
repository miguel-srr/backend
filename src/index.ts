import express from "express";
import morgan from "morgan";
import cors from "cors";

import { config } from "dotenv";

import { getRoutes } from "./routes/index.routes";

const main = async () => {
  config();

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.json({ type: "application/vnd.api+json" }));

  app.use(morgan("dev"));
  app.use(
    cors({
      allowedHeaders: ["authorization", "Content-Type"],
      exposedHeaders: ["authorization"],
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
    })
  );

  getRoutes(app);

  const port = process.env.PORT || 8089;

  app.listen(port, () => console.log(`==> Listening on port ${port}!`));
};

main();

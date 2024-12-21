import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

import { router } from "./routes/index.js";
import initializeDatabase from "./db/initdb.js";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

initializeDatabase()
  .then(() => {
    console.log("Base de datos inicializada correctamente.");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(router);
app.listen(PORT, () => console.log(`Api its up port ${PORT}`));

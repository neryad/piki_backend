import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

import { router } from "./routes/index.js";
import initializeDatabase from "./db/initdb.js";

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
// Middleware para manejar rutas no existentes
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "../public/404.html"));
});
app.use(router);
app.listen(PORT, () => console.log(`Api its up port ${PORT}`));

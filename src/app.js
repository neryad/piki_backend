import express from "express";
import cors from "cors";
import "dotenv/config";

import { router } from "./routes/index.js";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(router);
app.listen(PORT, () => console.log("Api its up port"));

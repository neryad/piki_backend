import express from "express";
import router from "./app/routes/index.js";
import testRoutes from "./app/routes/testRoute.js";
import logger from "./middleware/logger.js";
const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(testRoutes);
app.use("/api", router);
// Logger middleware
app.use(logger);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

import express from "express";
import testRoute from "./testRoute.js";

const router = express.Router();

router.use("/testRoute", testRoute);

// Ruta de error 404
router.get("*", (req, res) => {
  res.status(404).send({ error: "Not found" });
});

export default router;

import express from "express";
const router = express.Router();
import { getTest } from "../controllers/test_controller.js";

router.get("/test", (req, res) => {
  console.log("ewrwewewe");

  res.send({ message: "¡Hola, mundo testenado las rutas!" });
});

//router.get("/test", getTest);

export default router;

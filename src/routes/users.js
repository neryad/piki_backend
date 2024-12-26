import { Router } from "express";
import { createUser } from "../controllers/users/user.js";
const router = Router();

router.get("/", (req, res) => {
  return res.send("USers");
});
router.post("/", createUser);

export { router };

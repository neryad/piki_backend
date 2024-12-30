import { Router } from "express";

import { login } from "../controllers/auth/auth.js";

const router = Router();

router.post("/login", login);

export { router };

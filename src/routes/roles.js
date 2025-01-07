import { Router } from "express";
import {
  createRole,
  getRoles,
  deleteRole,
} from "../controllers/roles/roles.js";
import { verifyToken } from "../helpers/middleware.js";
const router = Router();

// Crear un rol
router.post("/", verifyToken, createRole);

// Obtener todos los roles
router.get("/", verifyToken, getRoles);

// Eliminar un rol por ID
router.delete("/:id", verifyToken, deleteRole);

export { router };

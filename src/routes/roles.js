import { Router } from "express";
import {
  createRole,
  getRoles,
  deleteRole,
} from "../controllers/roles/roles.js";

const router = Router();

// Crear un rol
router.post("/", createRole);

// Obtener todos los roles
router.get("/", getRoles);

// Eliminar un rol por ID
router.delete("/:id", deleteRole);

export { router };

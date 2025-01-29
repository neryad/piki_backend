import { Router } from "express";
import {
  createRole,
  getRoles,
  deleteRole,
} from "../controllers/roles/roles.js";
import { verifyToken } from "../helpers/middleware.js";
const router = Router();

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       500:
 *         description: Error al crear el rol
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles
 *       500:
 *         description: Error al obtener los roles
 */

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Eliminar rol por ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       500:
 *         description: Error al eliminar el rol
 */

router.post("/", verifyToken, createRole);
router.get("/", verifyToken, getRoles);
router.delete("/:id", verifyToken, deleteRole);

export { router };

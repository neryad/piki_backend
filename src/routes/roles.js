import { Router } from "express";
import {
  createRole,
  getRoles,
  deleteRole,
  updateRole,
  getRoleById,
} from "../controllers/roles/roles.js";
import { verifyToken } from "../helpers/middleware.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestión de roles de usuarios
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     description: |
 *       Este endpoint permite crear un nuevo rol en la base de datos.
 *       El campo `name` es obligatorio y debe ser único.
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
 *                 description: Nombre del rol.
 *                 example: Administrador
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Rol creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rol creado exitosamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Administrador
 *       400:
 *         description: |
 *           Error de validación.
 *           - Si el campo `name` no está presente.
 *           - Si el nombre del rol ya existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El nombre del rol es obligatorio
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al crear el rol en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al crear el rol
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener todos los roles
 *     description: |
 *       Este endpoint retorna una lista de todos los roles registrados en la base de datos.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Administrador
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al obtener los roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener los roles
 */

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Eliminar rol por ID
 *     description: |
 *       Este endpoint permite eliminar un rol de la base de datos utilizando su ID.
 *       **Nota:** Si el rol está asignado a algún usuario, no se podrá eliminar.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del rol.
 *         example: 1
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rol eliminado exitosamente
 *       404:
 *         description: |
 *           Rol no encontrado.
 *           - Si no existe un rol con el ID proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Rol no encontrado
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al eliminar el rol.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al eliminar el rol
 */

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Actualizar rol por ID
 *     description: |
 *       Este endpoint permite actualizar un rol de la base de datos utilizando su ID.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del rol.
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del rol.
 *                 example: Administrador
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rol actualizado exitosamente
 *       404:
 *         description: |
 *           Rol no encontrado.
 *           - Si no existe un rol con el ID proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Rol no encontrado
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al actualizar el rol.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al actualizar el rol
 */

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtener rol por ID
 *     description: |
 *       Este endpoint retorna un rol registrado en la base de datos utilizando su ID.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del rol.
 *         example: 1
 *     responses:
 *       200:
 *         description: Rol encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Administrador
 *       404:
 *         description: |
 *           Rol no encontrado.
 *           - Si no existe un rol con el ID proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Rol no encontrado
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al obtener el rol.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener el rol
 */

router.post("/", verifyToken, createRole);
router.get("/", verifyToken, getRoles);
router.get("/:id", verifyToken, getRoleById);
router.delete("/:id", verifyToken, deleteRole);
router.put("/:id", verifyToken, updateRole);

export { router };

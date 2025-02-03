import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
} from "../controllers/users/user.js";

import { verifyToken } from "../helpers/middleware.js";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: |
 *       Este endpoint permite crear un nuevo usuario en la base de datos.
 *       Todos los campos son obligatorios.
 *     tags: [Users]
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
 *                 description: Nombre del usuario.
 *                 example: Juan
 *               lastName:
 *                 type: string
 *                 description: Apellido del usuario.
 *                 example: Pérez
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del usuario.
 *                 example: "+123456789"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario (debe ser único).
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario (se almacenará cifrada).
 *                 example: "Password123!"
 *               role_id:
 *                 type: integer
 *                 description: ID del rol asignado al usuario.
 *                 example: 1
 *             required:
 *               - name
 *               - lastName
 *               - phone
 *               - email
 *               - password
 *               - role_id
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario creado exitosamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Juan
 *                     email:
 *                       type: string
 *                       example: juan@example.com
 *       400:
 *         description: |
 *           Error de validación. Todos los campos son obligatorios.
 *           - Si falta algún campo obligatorio.
 *           - Si el formato del correo electrónico no es válido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Todos los campos son obligatorios
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al crear el usuario en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al crear el usuario
 */

/**
 * @swagger
 * /users/userByEmail:
 *   post:
 *     summary: Obtener usuario por email
 *     description: |
 *       Este endpoint permite buscar un usuario por su correo electrónico.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario.
 *                 example: juan@example.com
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Usuario encontrado.
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
 *                   example: Juan
 *                 lastName:
 *                   type: string
 *                   example: Pérez
 *                 email:
 *                   type: string
 *                   example: juan@example.com
 *       404:
 *         description: |
 *           Usuario no encontrado.
 *           - Si no existe un usuario con el correo electrónico proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al buscar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener el usuario
 */

/**
 * @swagger
 * /users/allUsers:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: |
 *       Este endpoint retorna una lista de todos los usuarios registrados en la base de datos.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios.
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
 *                     example: Juan
 *                   lastName:
 *                     type: string
 *                     example: Pérez
 *                   email:
 *                     type: string
 *                     example: juan@example.com
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al obtener los usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener los usuarios
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     description: |
 *       Este endpoint permite buscar un usuario por su ID.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario.
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario encontrado.
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
 *                   example: Juan
 *                 lastName:
 *                   type: string
 *                   example: Pérez
 *                 email:
 *                   type: string
 *                   example: juan@example.com
 *       404:
 *         description: |
 *           Usuario no encontrado.
 *           - Si no existe un usuario con el ID proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al buscar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener el usuario
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar usuario por ID
 *     description: |
 *       Este endpoint permite actualizar los datos de un usuario existente utilizando su ID.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario.
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
 *                 description: Nuevo nombre del usuario.
 *                 example: Juan
 *               lastName:
 *                 type: string
 *                 description: Nuevo apellido del usuario.
 *                 example: Pérez
 *               phone:
 *                 type: string
 *                 description: Nuevo número de teléfono del usuario.
 *                 example: "+123456789"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Nuevo correo electrónico del usuario.
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Nueva contraseña del usuario.
 *                 example: "NewPassword123!"
 *               role_id:
 *                 type: integer
 *                 description: Nuevo ID del rol asignado al usuario.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario actualizado exitosamente
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al actualizar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al actualizar el usuario
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID
 *     description: |
 *       Este endpoint permite eliminar un usuario de la base de datos utilizando su ID.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario.
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado exitosamente
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al eliminar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al eliminar el usuario
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.post("/", verifyToken, createUser);
router.post("/userByEmail", verifyToken, getUserByEmail);
router.get("/allUsers", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export { router };

import { Router } from "express";

import { login, refreshToken } from "../controllers/auth/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión en la aplicación
 *     description: |
 *       Este endpoint permite a los usuarios autenticarse en la aplicación.
 *       Se requiere un correo electrónico y una contraseña válidos.
 *     tags: [Auth]
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
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario.
 *                 example: "Password123!"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loggedUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del usuario autenticado.
 *                       example: "12345"
 *                     email:
 *                       type: string
 *                       description: Correo electrónico del usuario autenticado.
 *                       example: usuario@example.com
 *                     token:
 *                       type: string
 *                       description: Token de autenticación JWT.
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: |
 *           Error de validación.
 *           - Si el correo electrónico o la contraseña no son válidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Contraseña / Usuario no válido
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error durante el proceso de autenticación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al hacer login
 */

router.post("/login", login);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refrescar el token de autenticación
 *     description: |
 *       Este endpoint permite refrescar el token de autenticación JWT.
 *       Se debe proporcionar un token válido en el encabezado de autorización.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refrescado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Nuevo token de autenticación JWT.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: |
 *           Token inválido o expirado.
 *           - Si el token proporcionado no es válido o ha expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token inválido
 *       403:
 *         description: |
 *           Token no proporcionado.
 *           - Si no se proporciona un token en el encabezado de autorización.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token no proporcionado
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error durante el proceso de refresco del token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al refrescar el token
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
router.post("/refresh-token", refreshToken);

export { router };

import { Router } from "express";

import { login, refreshToken } from "../controllers/auth/auth.js";

const router = Router();


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión en la aplicación
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
 *                 description: El correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
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
 *                     email:
 *                       type: string
 *                     token:
 *                       type: string
 *       400:
 *         description: Contraseña / Usuario no válido
 *       500:
 *         description: Error al hacer login
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresca el token de autenticación
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refrescado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       403:
 *         description: Token no proporcionado
 *       401:
 *         description: Token inválido
 */
router.post('/refresh-token', refreshToken);

export { router };

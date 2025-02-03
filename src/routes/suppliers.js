import { Router } from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSuppliers,
  getSupplierByEmail,
} from "../controllers/suppliers/suppliers.js";

import { verifyToken } from "../helpers/middleware.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Gestión de suplidores
 */

/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Crear un nuevo suplidor
 *     tags: [Suppliers]
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
 *                 description: Nombre del suplidor.
 *               lastName:
 *                 type: string
 *                 description: Apellido del suplidor.
 *               phone:
 *                 type: string
 *                 description: Teléfono del suplidor.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del suplidor.
 *             required:
 *               - name
 *               - lastName
 *               - phone
 *               - email
 *     responses:
 *       201:
 *         description: Suplidor creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Suplidor creado exitosamente
 *       400:
 *         description: Faltan campos obligatorios.
 *       500:
 *         description: Error al crear el suplidor.
 */

/**
 * @swagger
 * /suppliers/userByEmail:
 *   post:
 *     summary: Obtener un suplidor por su correo electrónico
 *     tags: [Suppliers]
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
 *                 description: Correo electrónico del suplidor.
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Suplidor encontrado.
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
 *                 phone:
 *                   type: string
 *                   example: 123456789
 *                 email:
 *                   type: string
 *                   example: juan@example.com
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-01T12:00:00Z
 *       404:
 *         description: Suplidor no encontrado.
 *       500:
 *         description: Error al obtener el suplidor.
 */

/**
 * @swagger
 * /suppliers/allUsers:
 *   get:
 *     summary: Obtener todos los suplidores
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de suplidores.
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
 *                   phone:
 *                     type: string
 *                     example: 123456789
 *                   email:
 *                     type: string
 *                     example: juan@example.com
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-10-01T12:00:00Z
 *       500:
 *         description: Error al obtener los suplidores.
 */

/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Obtener un suplidor por su ID
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del suplidor.
 *     responses:
 *       200:
 *         description: Suplidor encontrado.
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
 *                 phone:
 *                   type: string
 *                   example: 123456789
 *                 email:
 *                   type: string
 *                   example: juan@example.com
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-01T12:00:00Z
 *       404:
 *         description: Suplidor no encontrado.
 *       500:
 *         description: Error al obtener el suplidor.
 *   put:
 *     summary: Actualizar un suplidor
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del suplidor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del suplidor.
 *               lastName:
 *                 type: string
 *                 description: Nuevo apellido del suplidor.
 *               phone:
 *                 type: string
 *                 description: Nuevo teléfono del suplidor.
 *               email:
 *                 type: string
 *                 description: Nuevo correo electrónico del suplidor.
 *     responses:
 *       200:
 *         description: Suplidor actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Suplidor actualizado exitosamente
 *       500:
 *         description: Error al actualizar el suplidor.
 *   delete:
 *     summary: Eliminar un suplidor
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del suplidor.
 *     responses:
 *       200:
 *         description: Suplidor eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Suplidor eliminado exitosamente
 *       500:
 *         description: Error al eliminar el suplidor.
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

router.post("/", verifyToken, createSupplier);
router.post("/userByEmail", verifyToken, getSupplierByEmail);
router.get("/allUsers", verifyToken, getAllSuppliers);
router.get("/:id", verifyToken, getSupplierById);
router.put("/:id", verifyToken, updateSupplier);
router.delete("/:id", verifyToken, deleteSuppliers);

export { router };

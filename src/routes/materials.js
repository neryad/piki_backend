import { Router } from "express";

import {
  createMaterials,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
} from "../controllers/materials/materials.js";
import { verifyToken } from "../helpers/middleware.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Materials
 *   description: Gestión de materiales
 */

/**
 * @swagger
 * /materials:
 *   post:
 *     summary: Crear un nuevo material
 *     description: |
 *       Este endpoint permite crear un nuevo material en la base de datos.
 *       Todos los campos son obligatorios.
 *     tags: [Materials]
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
 *                 description: Nombre del material.
 *                 example: Tornillos
 *               description:
 *                 type: string
 *                 description: Descripción del material.
 *                 example: Tornillos de acero inoxidable
 *               isAvailable:
 *                 type: boolean
 *                 description: Indica si el material está disponible.
 *                 example: true
 *               cost:
 *                 type: number
 *                 description: Costo total del material.
 *                 example: 100.50
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de adquisición del material.
 *                 example: "2023-10-01"
 *               supplier_id:
 *                 type: integer
 *                 description: ID del proveedor asociado al material.
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 description: Cantidad total del material.
 *                 example: 100
 *               quantityByUnit:
 *                 type: integer
 *                 description: Cantidad por unidad del material.
 *                 example: 10
 *               costByUnit:
 *                 type: number
 *                 description: Costo por unidad del material.
 *                 example: 10.05
 *             required:
 *               - name
 *               - description
 *               - isAvailable
 *               - cost
 *               - date
 *               - supplier_id
 *               - quantity
 *               - quantityByUnit
 *               - costByUnit
 *     responses:
 *       201:
 *         description: Material creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Material creado exitosamente
 *       400:
 *         description: |
 *           Error de validación.
 *           - Si falta algún campo obligatorio.
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
 *           - Si ocurre un error al crear el material.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al crear el material
 */

/**
 * @swagger
 * /materials:
 *   get:
 *     summary: Obtener todos los materiales
 *     description: |
 *       Este endpoint retorna una lista de todos los materiales registrados en la base de datos.
 *     tags: [Materials]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de materiales.
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
 *                     example: Tornillos
 *                   description:
 *                     type: string
 *                     example: Tornillos de acero inoxidable
 *                   isAvailable:
 *                     type: boolean
 *                     example: true
 *                   cost:
 *                     type: number
 *                     example: 100.50
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2023-10-01"
 *                   supplier_id:
 *                     type: integer
 *                     example: 1
 *                   quantity:
 *                     type: integer
 *                     example: 100
 *                   quantityByUnit:
 *                     type: integer
 *                     example: 10
 *                   costByUnit:
 *                     type: number
 *                     example: 10.05
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-01T12:00:00Z"
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al obtener los materiales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener los materiales
 */

/**
 * @swagger
 * /materials/{id}:
 *   get:
 *     summary: Obtener un material por ID
 *     description: |
 *       Este endpoint permite buscar un material por su ID.
 *     tags: [Materials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del material.
 *         example: 1
 *     responses:
 *       200:
 *         description: Material encontrado.
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
 *                   example: Tornillos
 *                 description:
 *                   type: string
 *                   example: Tornillos de acero inoxidable
 *                 isAvailable:
 *                   type: boolean
 *                   example: true
 *                 cost:
 *                   type: number
 *                   example: 100.50
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2023-10-01"
 *                 supplier_id:
 *                   type: integer
 *                   example: 1
 *                 quantity:
 *                   type: integer
 *                   example: 100
 *                 quantityByUnit:
 *                   type: integer
 *                   example: 10
 *                 costByUnit:
 *                   type: number
 *                   example: 10.05
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T12:00:00Z"
 *       404:
 *         description: |
 *           Material no encontrado.
 *           - Si no existe un material con el ID proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Material no encontrado
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al obtener el material.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener el material
 */

/**
 * @swagger
 * /materials/{id}:
 *   put:
 *     summary: Actualizar un material por ID
 *     description: |
 *       Este endpoint permite actualizar los datos de un material existente utilizando su ID.
 *     tags: [Materials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del material.
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
 *                 description: Nuevo nombre del material.
 *                 example: Tornillos actualizados
 *               description:
 *                 type: string
 *                 description: Nueva descripción del material.
 *                 example: Tornillos de acero inoxidable de alta calidad
 *               isAvailable:
 *                 type: boolean
 *                 description: Nueva disponibilidad del material.
 *                 example: false
 *               cost:
 *                 type: number
 *                 description: Nuevo costo total del material.
 *                 example: 150.75
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Nueva fecha de adquisición del material.
 *                 example: "2023-10-05"
 *               supplier_id:
 *                 type: integer
 *                 description: Nuevo ID del proveedor asociado al material.
 *                 example: 2
 *               quantity:
 *                 type: integer
 *                 description: Nueva cantidad total del material.
 *                 example: 200
 *               quantityByUnit:
 *                 type: integer
 *                 description: Nueva cantidad por unidad del material.
 *                 example: 20
 *               costByUnit:
 *                 type: number
 *                 description: Nuevo costo por unidad del material.
 *                 example: 15.07
 *     responses:
 *       200:
 *         description: Material actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Material actualizado exitosamente
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al actualizar el material.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al actualizar el material
 */

/**
 * @swagger
 * /materials/{id}:
 *   delete:
 *     summary: Eliminar un material por ID
 *     description: |
 *       Este endpoint permite eliminar un material de la base de datos utilizando su ID.
 *     tags: [Materials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del material.
 *         example: 1
 *     responses:
 *       200:
 *         description: Material eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Material eliminado exitosamente
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al eliminar el material.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al eliminar el material
 */

router.post("/", verifyToken, createMaterials);
router.get("/", verifyToken, getAllMaterials);
router.get("/:id", verifyToken, getMaterialById);
router.put("/:id", verifyToken, updateMaterial);
router.delete("/:id", verifyToken, deleteMaterial);

export { router };

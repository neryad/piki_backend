import { Router } from "express";
import { verifyToken } from "../helpers/middleware.js";
const router = Router();
import {
  createMaterialProduct,
  updateMaterialProduct,
  deleteMaterialProduct,
  getAllMaterialsProducts,
  getMaterialProductById,
  getAllMaterialsProductRelation,
} from "../controllers/products_material/productsMaterials.js";

/**
 * @swagger
 * /productsMaterials:
 *   post:
 *     summary: Crear un nuevo material de producto
 *     description: |
 *       Este endpoint permite crear un nuevo material de producto.
 *     tags: [ProductsMaterials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: ID del producto asociado.
 *                 example: 1
 *               material_id:
 *                 type: integer
 *                 description: ID del material asociado.
 *                 example: 2
 *               quantityUsed:
 *                 type: number
 *                 description: Cantidad de material utilizado.
 *                 example: 5.5
 *     responses:
 *       201:
 *         description: Material de producto creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Material de producto creado exitosamente
 *       400:
 *         description: |
 *           Error de validación.
 *           - Si faltan campos obligatorios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Faltan datos obligatorios
 *       500:
 *         description: Error interno del servidor al crear el material de producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al crear el material de producto
 */

/**
 * @swagger
 * /productsMaterials/{id}:
 *   put:
 *     summary: Actualizar un material de producto
 *     description: Actualiza un material de producto existente basado en su ID.
 *     tags: [ProductsMaterials]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del material de producto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: ID del producto asociado.
 *                 example: 1
 *               material_id:
 *                 type: integer
 *                 description: ID del material asociado.
 *                 example: 2
 *               quantityUsed:
 *                 type: number
 *                 description: Cantidad de material utilizado.
 *                 example: 7.0
 *     responses:
 *       200:
 *         description: Material de producto actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Material de producto actualizado exitosamente
 *       500:
 *         description: Error interno del servidor al actualizar el material de producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al actualizar el material de producto
 */

/**
 * @swagger
 * /productsMaterials/{id}:
 *   delete:
 *     summary: Eliminar un material de producto
 *     description: Elimina un material de producto basado en su ID.
 *     tags: [ProductsMaterials]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del material de producto.
 *     responses:
 *       200:
 *         description: Material de producto eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Material de producto eliminado exitosamente
 *       500:
 *         description: Error interno del servidor al eliminar el material de producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al eliminar el material de producto
 */

/**
 * @swagger
 * /productsMaterials:
 *   get:
 *     summary: Obtener todos los materiales de productos
 *     description: Retorna una lista de todos los materiales de productos.
 *     tags: [ProductsMaterials]
 *     responses:
 *       200:
 *         description: Lista de materiales de productos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductMaterial'
 *       500:
 *         description: Error interno del servidor al obtener los materiales de productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener los materiales de productos
 */

/**
 * @swagger
 * /productsMaterials/relation:
 *   get:
 *     summary: Obtener todos los materiales de productos
 *     description con relación: Retorna una lista de todos los materiales de productos.
 *     tags: [ProductsMaterials]
 *     responses:
 *       200:
 *         description: Lista de materiales de productos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductMaterial'
 *       500:
 *         description: Error interno del servidor al obtener los materiales de productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener los materiales de productos
 */

/**
 * @swagger
 * /productsMaterials/{id}:
 *   get:
 *     summary: Obtener un material de producto por ID
 *     description: Retorna un material de producto específico basado en su ID.
 *     tags: [ProductsMaterials]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del material de producto.
 *     responses:
 *       200:
 *         description: Material de producto obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductMaterial'
 *       404:
 *         description: Material de producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Material de producto no encontrado
 *       500:
 *         description: Error interno del servidor al obtener el material de producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener el material de producto
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductMaterial:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del material de producto.
 *         product_id:
 *           type: integer
 *           description: ID del producto asociado.
 *         material_id:
 *           type: integer
 *           description: ID del material asociado.
 *         quantityUsed:
 *           type: number
 *           description: Cantidad de material utilizado.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del material de producto.
 */

router.post("/", verifyToken, createMaterialProduct);
router.put("/:id", verifyToken, updateMaterialProduct);
router.delete("/:id", verifyToken, deleteMaterialProduct);
router.get("/", verifyToken, getAllMaterialsProducts);
router.get("/relation", verifyToken, getAllMaterialsProductRelation);
router.get("/:id", verifyToken, getMaterialProductById);

export { router };

import { Router } from "express";
import { upload } from "../helpers/uploadMiddleware.js";
import { verifyToken } from "../helpers/middleware.js";

import {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProducts,
} from "../controllers/products/products.js";
const router = Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: |
 *       Este endpoint permite crear un nuevo producto subiendo una imagen.
 *       La imagen se almacena en Cloudinary y se guarda la URL en la base de datos.
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto.
 *                 example: "Producto Ejemplo"
 *               description:
 *                 type: string
 *                 description: Descripción del producto.
 *                 example: "Descripción del producto"
 *               price:
 *                 type: number
 *                 description: Precio del producto.
 *                 example: 19.99
 *               stock:
 *                 type: integer
 *                 description: Cantidad en stock del producto.
 *                 example: 100
 *               isAvailable:
 *                 type: boolean
 *                 description: Indica si el producto está disponible.
 *                 example: true
 *               offerPrice:
 *                 type: number
 *                 description: Precio de oferta del producto.
 *                 example: 15.99
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del producto.
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto creado exitosamente
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
 *                   example: Todos los campos son obligatorios
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al subir la imagen a Cloudinary.
 *           - Si ocurre un error al guardar el producto en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al crear el producto
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Retorna una lista de todos los productos disponibles.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error interno del servidor al obtener los productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener los productos
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Retorna un producto específico basado en su ID.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto.
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Producto no encontrado
 *       500:
 *         description: Error interno del servidor al obtener el producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener el producto
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     description: Actualiza un producto existente basado en su ID.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto.
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto.
 *               description:
 *                 type: string
 *                 description: Descripción del producto.
 *               price:
 *                 type: number
 *                 description: Precio del producto.
 *               stock:
 *                 type: integer
 *                 description: Cantidad en stock del producto.
 *               isAvailable:
 *                 type: boolean
 *                 description: Indica si el producto está disponible.
 *               offerPrice:
 *                 type: number
 *                 description: Precio de oferta del producto.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del producto.
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Producto no encontrado
 *       500:
 *         description: Error interno del servidor al actualizar el producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al actualizar el producto
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto basado en su ID.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto.
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Producto no encontrado
 *       500:
 *         description: Error interno del servidor al eliminar el producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al eliminar el producto
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del producto.
 *         name:
 *           type: string
 *           description: Nombre del producto.
 *         description:
 *           type: string
 *           description: Descripción del producto.
 *         price:
 *           type: number
 *           description: Precio del producto.
 *         stock:
 *           type: integer
 *           description: Cantidad en stock del producto.
 *         isAvailable:
 *           type: boolean
 *           description: Indica si el producto está disponible.
 *         offerPrice:
 *           type: number
 *           description: Precio de oferta del producto.
 *         imageUrl:
 *           type: string
 *           description: URL de la imagen del producto.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del producto.
 */

router.post("/", verifyToken, upload.single("image"), createProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.put("/:id", verifyToken, upload.single("image"), updateProduct);
router.get("/:id", getProduct);
router.get("/", getProducts);

export { router };

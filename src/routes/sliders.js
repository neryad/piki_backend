import { Router } from "express";
import { upload } from "../helpers/uploadMiddleware.js";
import {
  createSlider,
  deleteSlider,
  updateSlider,
  getSliders,
  getSliderById,
} from "../controllers/sliders/slider.js";
import { verifyToken } from "../helpers/middleware.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sliders
 *   description: Gestión de sliders (imágenes deslizantes)
 */

/**
 * @swagger
 * /sliders:
 *   post:
 *     summary: Crear un nuevo slider
 *     description: |
 *       Este endpoint permite crear un nuevo slider subiendo una imagen.
 *       La imagen se almacena en Cloudinary y se guarda la URL en la base de datos.
 *     tags: [Sliders]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen para el slider.
 *               link:
 *                 type: string
 *                 description: Enlace asociado al slider.
 *                 example: https://example.com
 *               isActive:
 *                 type: boolean
 *                 description: Indica si el slider está activo.
 *                 example: true
 *     responses:
 *       201:
 *         description: Slider creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Slider creado exitosamente
 *       400:
 *         description: |
 *           Error de validación.
 *           - Si no se proporciona una imagen o un enlace.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Faltan datos obligatorios
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al subir la imagen a Cloudinary.
 *           - Si ocurre un error al guardar el slider en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al crear el slider
 */
router.post("/", verifyToken, upload.single("image"), createSlider);

/**
 * @swagger
 * /sliders/{id}:
 *   delete:
 *     summary: Eliminar slider por ID
 *     description: |
 *       Este endpoint permite eliminar un slider de la base de datos utilizando su ID.
 *     tags: [Sliders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del slider.
 *         example: 1
 *     responses:
 *       200:
 *         description: slider eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: slider eliminado exitosamente
 *       404:
 *         description: |
 *           slider no encontrado.
 *           - Si no existe un slider con el ID proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: slider no encontrado
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al eliminar el slider.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al eliminar el slider
 */
router.delete("/:id", verifyToken, deleteSlider);

/**
 * @swagger
 * /sliders/{id}:
 *   put:
 *     summary: Actualizar un slider existente
 *     description: |
 *       Este endpoint permite actualizar un slider existente.
 *       Puedes subir una nueva imagen, actualizar el enlace o cambiar el estado activo/inactivo del slider.
 *       La nueva imagen se almacena en Cloudinary y se actualiza la URL en la base de datos.
 *     tags: [Sliders]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del slider que se desea actualizar.
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Nueva imagen para el slider (opcional).
 *               link:
 *                 type: string
 *                 description: Nuevo enlace asociado al slider (opcional).
 *                 example: https://nuevo-enlace.com
 *               isActive:
 *                 type: boolean
 *                 description: Nuevo estado activo/inactivo del slider (opcional).
 *                 example: false
 *     responses:
 *       200:
 *         description: Slider actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Slider actualizado exitosamente
 *                 slider:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     imageUrl:
 *                       type: string
 *                       example: https://res.cloudinary.com/tu_cloud_name/image/upload/v123456789/sliders/nueva-imagen.jpg
 *                     link:
 *                       type: string
 *                       example: https://nuevo-enlace.com
 *                     isActive:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: |
 *           Error de validación.
 *           - Si no se proporciona al menos un campo para actualizar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Debes proporcionar al menos un campo para actualizar
 *       404:
 *         description: |
 *           Slider no encontrado.
 *           - Si no existe un slider con el ID proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Slider no encontrado
 *       500:
 *         description: |
 *           Error interno del servidor.
 *           - Si ocurre un error al subir la nueva imagen a Cloudinary.
 *           - Si ocurre un error al actualizar el slider en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al actualizar el slider
 */

router.put("/:id", verifyToken, upload.single("image"), updateSlider);

/**
 * @swagger
 * /sliders:
 *   get:
 *     summary: Obtener todos los sliders activos
 *     tags: [Sliders]
 *     responses:
 *       200:
 *         description: Lista de sliders activos obtenida con éxito.
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
 *                   imageUrl:
 *                     type: string
 *                     example: "https://res.cloudinary.com/demo/image/upload/v123456789/slider.jpg"
 *                   link:
 *                     type: string
 *                     example: "https://ejemplo.com"
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Error al obtener los sliders.
 */

router.get("/", verifyToken, getSliders);

/**
 * @swagger
 * /sliders/{id}:
 *   get:
 *     summary: Obtener un slider por su ID
 *     tags: [Sliders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del slider a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Slider obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 imageUrl:
 *                   type: string
 *                   example: "https://res.cloudinary.com/demo/image/upload/v123456789/slider.jpg"
 *                 link:
 *                   type: string
 *                   example: "https://ejemplo.com"
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Slider no encontrado.
 *       500:
 *         description: Error al obtener el slider.
 */

router.get("/:id", verifyToken, getSliderById);

export { router };

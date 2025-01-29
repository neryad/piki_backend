import { Router } from "express";
import { readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PATH_ROUTER = __dirname;

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de error
 *         code:
 *           type: integer
 *           description: Código de error HTTP
 */

/**
 * The cleanFileName function removes the file extension from a given file name.
 * @param fileName - The `cleanFileName` function takes a `fileName` as a parameter and removes the
 * file extension from it.
 * @returns The cleanFileName function returns the file name without the file extension.
 */
const cleanFileName = (fileName) => {
  const file = fileName.split(".").shift();
  return file;
};

/* This code snippet is reading the contents of a directory specified by `PATH_ROUTER` using
`readdirSync`, then filtering the filenames based on a condition. For each filename that meets the
condition (where the clean name is not "index"), it dynamically imports a module and adds its router
to the main router. */
readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanName = cleanFileName(filename);

  if (cleanName !== "index") {
    import(`./${cleanName}.js`).then((moduleRoute) => {
      router.use(`/${cleanName}`, moduleRoute.router);
    });
  }
});

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentación",
      version: "1.0.0",
      description: "Documentación de la API usando Swagger",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [`${__dirname}/*.js`], // Asegúrate de que los archivos de rutas tengan comentarios JSDoc
};


// Generar documentación Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Agregar Swagger a las rutas
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


export { router };

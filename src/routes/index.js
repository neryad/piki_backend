import { Router } from "express";
import { readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Crear equivalentes de __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PATH_ROUTER = __dirname; // Ahora usamos el equivalente

const router = Router();

const cleanFileName = (fileName) => {
  const file = fileName.split(".").shift();
  return file;
};

// Leer archivos en el directorio
readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanName = cleanFileName(filename);

  if (cleanName !== "index") {
    import(`./${cleanName}.js`).then((moduleRoute) => {
      router.use(`/${cleanName}`, moduleRoute.router);
    });
  }
});

export { router };

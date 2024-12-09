import { Router } from "express";
import { readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PATH_ROUTER = __dirname;

const router = Router();

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

export { router };

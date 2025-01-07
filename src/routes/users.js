import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
} from "../controllers/users/user.js";

import { verifyToken } from "../helpers/middleware.js";
const router = Router();

// router.get("/", (req, res) => {
//   return res.send("USers");
// });
router.post("/", verifyToken, createUser);
router.post("/userByEmail", verifyToken, getUserByEmail);
router.get("/allUsers", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUser); // Ruta con parámetro para actualizar un usuario
router.delete("/:id", verifyToken, deleteUser); //

export { router };

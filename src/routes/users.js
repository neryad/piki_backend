import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users/user.js";
const router = Router();

router.get("/", (req, res) => {
  return res.send("USers");
});
router.post("/", createUser);
router.get("/allUsers", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser); // Ruta con parámetro para actualizar un usuario
router.delete("/:id", deleteUser); //

export { router };

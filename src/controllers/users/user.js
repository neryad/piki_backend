import { turso } from "../../db/db.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  let { name, lastName, phone, email, password, role_id, created_at } =
    req.body;

  if (!name || !lastName || !phone || !email || !password || !role_id) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  let currentDate = new Date();
  created_at = currentDate.toISOString().slice(0, 19).replace("T", " ");

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await turso.execute(
      "INSERT INTO users (name, lastName, phone, email, password, role_id, created_at) VALUES (?, ?, ?,?,?,?,?);",
      [name, lastName, phone, email, hashedPassword, role_id, created_at]
    );
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

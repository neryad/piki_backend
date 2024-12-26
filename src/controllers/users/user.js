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

export const getAllUsers = async (req, res) => {
  try {
    const response = await turso.execute("SELECT * FROM users;");

    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.params);
  console.log(req);
  try {
    const response = await turso.execute("SELECT * FROM users WHERE id = ?;", [
      id,
    ]);

    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, phone, email, password, role_id } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = password
      ? await bcrypt.hash(password, saltRounds)
      : undefined;

    const query = `
      UPDATE users
      SET name = ?, lastName = ?, phone = ?, email = ?, ${
        hashedPassword ? "password = ?, " : ""
      } role_id = ?
      WHERE id = ?;
    `;
    const params = [
      name,
      lastName,
      phone,
      email,
      hashedPassword,
      role_id,
      id,
    ].filter((param) => param !== undefined);

    await turso.execute(query, params);
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await turso.execute("DELETE FROM users WHERE id = ?;", [id]);
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

import { turso } from "../../db/db.js";

import { getAllRoles } from "./query/roles_query.js";

// Crear un nuevo rol
export const createRole = async (req, res) => {
  const { name } = req.body;

  try {
    await turso.execute("INSERT INTO roles (name) VALUES (?);", [name]);
    res.status(201).json({ message: "Rol creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el rol" });
  }
};

// Obtener todos los roles
export const getRoles = async (req, res) => {
  try {
    const rows = await turso.execute(getAllRoles);
    res.status(200).json(rows.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los roles" });
  }
};

// Eliminar un rol por ID
export const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    await turso.execute("DELETE FROM roles WHERE id = ?;", [id]);
    res.status(200).json({ message: "Rol eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el rol" });
  }
};

import { turso } from "../../db/db.js";

export const createMaterials = async (req, res) => {
  let {
    name,
    description,
    isAvailable,
    cost,
    date,
    supplier_id,
    quantity,
    quantityByUnit,
    costByUnit,
    created_at,
  } = req.body;

  if (
    !name ||
    !description ||
    !isAvailable ||
    !cost ||
    !date ||
    !supplier_id ||
    !quantity ||
    !quantityByUnit ||
    !costByUnit
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  let currentDate = new Date();
  created_at = currentDate.toISOString().slice(0, 19).replace("T", " ");

  try {
    await turso.execute(
      "INSERT INTO materials (name, description, isAvailable, cost, date, supplier_id, quantity, quantityByUnit, costByUnit, created_at) VALUES (?,?,?,?,?,?,?,?,?,?);",
      [
        name,
        description,
        isAvailable,
        cost,
        date,
        supplier_id,
        quantity,
        quantityByUnit,
        costByUnit,
        created_at,
      ]
    );
    res.status(201).json({ message: "Material creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el material" });
  }
};

export const getAllMaterials = async (req, res) => {
  try {
    const response = await turso.execute("SELECT * FROM materials;");
    const materials = response.rows;

    res.status(200).json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los materiales" });
  }
};

export const getMaterialById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.params);
  console.log(req);
  try {
    const response = await turso.execute(
      "SELECT * FROM materials WHERE id = ?;",
      [id]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Material no encontrado" });
    }
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el material" });
  }
};

export const updateMaterial = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    isAvailable,
    cost,
    date,
    supplier_id,
    quantity,
    quantityByUnit,
    costByUnit,
  } = req.body;

  try {
    await turso.execute(
      `UPDATE materials SET name = ?, description = ?, isAvailable = ?, cost = ?, date = ?, supplier_id = ?, quantity = ?, quantityByUnit = ?, costByUnit = ? WHERE id = ?;`,
      [
        name,
        description,
        isAvailable,
        cost,
        date,
        supplier_id,
        quantity,
        quantityByUnit,
        costByUnit,
        id,
      ]
    );
    res.status(200).json({ message: "Material actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el material" });
  }
};

export const deleteMaterial = async (req, res) => {
  const { id } = req.params;

  try {
    await turso.execute("DELETE FROM materials WHERE id = ?;", [id]);
    res.status(200).json({ message: "Material eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el material" });
  }
};

import { turso } from "../../db/db.js";

export const createSupplier = async (req, res) => {
  let { name, lastName, phone, email, created_at } = req.body;

  if (!name || !lastName || !phone || !email) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  let currentDate = new Date();
  created_at = currentDate.toISOString().slice(0, 19).replace("T", " ");

  try {
    await turso.execute(
      "INSERT INTO suppliers (name, lastName, phone, email, created_at) VALUES (?, ?, ?,?,?);",
      [name, lastName, phone, email, created_at]
    );
    res.status(201).json({ message: "Suplidor creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el suplidor" });
  }
};

export const getAllSuppliers = async (req, res) => {
  try {
    const response = await turso.execute("SELECT * FROM suppliers;");
    const suppliers = response.rows;

    res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los suplidores" });
  }
};

export const getSupplierById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.params);
  console.log(req);
  try {
    const response = await turso.execute(
      "SELECT * FROM suppliers WHERE id = ?;",
      [id]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Suplidor no encontrado" });
    }
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el suplidor" });
  }
};

export const getSupplierByEmail = async (email) => {
  // const { email } = req.body;
  // console.log(email);
  // console.log(req.params);
  // console.log(req);
  try {
    const response = await turso.execute(
      "SELECT * FROM suppliers WHERE email = ?;",
      [email]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Suplidor no encontrado" });
    }
    return response.rows[0];
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el suplidor" });
  }
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, phone, email } = req.body;

  try {
    const query = `
      UPDATE suppliers
      SET name = ?, lastName = ?, phone = ?, email = ?
      WHERE id = ?;
    `;
    const params = [name, lastName, phone, email, id].filter(
      (param) => param !== undefined
    );

    await turso.execute(query, params);
    res.status(200).json({ message: "Suplidor actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el suplidor" });
  }
};

export const deleteSuppliers = async (req, res) => {
  const { id } = req.params;
  try {
    await turso.execute("DELETE FROM suppliers WHERE id = ?;", [id]);
    res.status(200).json({ message: "Suplidor eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el suplidor" });
  }
};

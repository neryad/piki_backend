import { turso } from "../../db/db.js";

export const createMaterialProduct = async (req, res) => {
  let { product_id, material_id, quantityUsed, created_at } = req.body;

  if (!product_id || !material_id || !quantityUsed) {
    return res.status(400).json({ error: "Faltan datos obligatorios." });
  }

  let currentDate = new Date();
  created_at = currentDate.toISOString().slice(0, 19).replace("T", " ");

  try {
    await turso.execute(
      "INSERT INTO productsMaterials (product_id, material_id, quantityUsed, created_at) VALUES (?, ?, ?, ?);",
      [product_id, material_id, quantityUsed, created_at]
    );
    res
      .status(201)
      .json({ message: "Material de producto creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el material de producto" });
  }
};

export const deleteMaterialProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await turso.execute("DELETE FROM productsMaterials WHERE id = ?;", [id]);
    res
      .status(200)
      .json({ message: "Material de producto eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al eliminar el material de producto" });
  }
};

export const updateMaterialProduct = async (req, res) => {
  const { id } = req.params;
  let { product_id, material_id, quantityUsed } = req.body;

  try {
    await turso.execute(
      "UPDATE productsMaterials SET product_id = ?, material_id = ?, quantityUsed = ? WHERE id = ?;",
      [product_id, material_id, quantityUsed, id]
    );
    res
      .status(200)
      .json({ message: "Material de producto actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al actualizar el material de producto" });
  }
};

export const getAllMaterialsProducts = async (req, res) => {
  try {
    const response = await turso.execute("SELECT * FROM productsMaterials;");
    const materialsProducts = response.rows;
    res.status(200).json(materialsProducts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los materiales de productos" });
  }
};

export const getAllMaterialsProductRelation = async (req, res) => {
  try {
    const response = await turso.execute(
      " SELECT PM.id as id, M.name as materialName,M.id as materialId,P.name as productName,P.id as productId, PM.quantityUsed as quantityUsed FROM 'productsMaterials' as PM INNER JOIN 'materials' as M on PM.material_id =  M.id INNER JOIN 'products' as P on PM.product_id =  P.id  "
    );
    const materialsProducts = response.rows;
    res.status(200).json(materialsProducts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los materiales de productos" });
  }
};

export const getMaterialProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await turso.execute(
      "SELECT * FROM productsMaterials WHERE id = ?;",
      [id]
    );

    if (response.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Material de producto no encontrado" });
    }
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el material de producto" });
  }
};

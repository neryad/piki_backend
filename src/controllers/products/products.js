import { turso } from "../../db/db.js";
import { uploadImage, deleteImage } from "../../helpers/cloudinaryService.js";

export const createProduct = async (req, res) => {
  let {
    name,
    description,
    price,
    stock,
    isAvailable,
    offerPrice,
    imageUrl,
    created_at,
  } = req.body;

  if (!name || !description || !price || !stock || !isAvailable) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  isAvailable = true;
  let currentDate = new Date();
  created_at = currentDate.toISOString().slice(0, 19).replace("T", " ");

  if (req.file) {
    imageUrl = await uploadImage(req.file.buffer);
  }

  try {
    await turso.execute(
      "INSERT INTO products (name, description, price, stock, isAvailable, offerPrice, imageUrl, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
      [
        name,
        description,
        price,
        stock,
        isAvailable,
        offerPrice,
        imageUrl,
        created_at,
      ]
    );
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await turso.execute(
      "SELECT imageUrl FROM products WHERE id = ?;",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const imageUrl = rows[0].imageUrl;

    if (imageUrl) {
      await deleteImage(imageUrl); // Elimina la imagen de Cloudinary
    }

    await turso.execute("DELETE FROM products WHERE id = ?;", [id]);

    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  let { name, description, price, stock, isAvailable, offerPrice, imageUrl } =
    req.body;

  try {
    const { rows } = await turso.execute(
      "SELECT imageUrl FROM products WHERE id = ?;",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    let oldImageUrl = rows[0].imageUrl;

    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer);
      if (oldImageUrl) {
        await deleteImage(oldImageUrl);
      }
    }

    await turso.execute(
      "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, isAvailable = ?, offerPrice = ?, imageUrl = ? WHERE id = ?;",
      [
        name,
        description,
        price,
        stock,
        isAvailable,
        offerPrice,
        imageUrl || oldImageUrl,
        id,
      ]
    );

    res.status(200).json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { rows } = await turso.execute("SELECT * FROM products;");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await turso.execute(
      "SELECT * FROM products WHERE id = ?;",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

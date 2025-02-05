import { turso } from "../../db/db.js";
import { uploadImage, deleteImage } from "../../helpers/cloudinaryService.js";

export const createSlider = async (req, res) => {
  let { imageUrl, link, isActive } = req.body;

  if (!link) {
    return res.status(400).json({ error: "Faltan datos obligatorios." });
  }
  isActive = true;
  if (req.file) {
    imageUrl = await uploadImage(req.file.buffer);
  }

  try {
    await turso.execute(
      "INSERT INTO sliders (imageUrl, link, isActive) VALUES (?, ?, ?);",
      [imageUrl, link, isActive]
    );
    res.status(201).json({ message: "Slider creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el slider" });
  }
};

export const deleteSlider = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await turso.execute(
      "SELECT imageUrl FROM sliders WHERE id = ?;",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Slider no encontrado" });
    }

    const imageUrl = rows[0].imageUrl;

    if (imageUrl) {
      await deleteImage(imageUrl); // Elimina la imagen de Cloudinary
    }

    await turso.execute("DELETE FROM sliders WHERE id = ?;", [id]);

    res.status(200).json({ message: "Slider eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el slider" });
  }
};

export const updateSlider = async (req, res) => {
  const { id } = req.params;
  let { imageUrl, link, isActive } = req.body;

  try {
    const { rows } = await turso.execute(
      "SELECT imageUrl FROM sliders WHERE id = ?;",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Slider no encontrado" });
    }

    let oldImageUrl = rows[0].imageUrl;

    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer);
      if (oldImageUrl) {
        await deleteImage(oldImageUrl); // Borra la imagen anterior de Cloudinary
      }
    }

    await turso.execute(
      "UPDATE sliders SET imageUrl = ?, link = ?, isActive = ? WHERE id = ?;",
      [imageUrl || oldImageUrl, link, isActive, id]
    );

    res.status(200).json({ message: "Slider actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el slider" });
  }
};

export const getSliders = async (req, res) => {
  try {
    const { rows } = await turso.execute(
      "SELECT * FROM sliders WHERE isActive = 'true';"
    );
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los sliders" });
  }
};

export const getSliderById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await turso.execute(
      "SELECT * FROM sliders WHERE id = ?;",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Slider no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el slider" });
  }
};

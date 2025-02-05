import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Función para subir una imagen a Cloudinary
export const uploadImage = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "piki-photos",
        transformation: [
          {
            quality: "auto:good",
          },
          { fetch_format: "auto" },
        ],
      }, // Puedes cambiar la carpeta
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
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

export const deleteImage = async (imageUrl) => {
  console.log("imageUrl", imageUrl);
  try {
    const parts = imageUrl.split("/");
    const imageName = parts[parts.length - 1].split(".")[0]; // Extrae el nombre sin la extensión
    await cloudinary.uploader.destroy(`piki-photos/${imageName}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar la imagen de Cloudinary:", error);
    return false;
  }
};

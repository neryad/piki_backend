import { verifyJWT } from "../helpers/jwt.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = await verifyJWT(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Token inválido" });
  }
};

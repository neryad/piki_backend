import { verifyJWT } from "../helpers/jwt.js";

export const verifyToken = async (req, res, next) => {
  // const token = req.headers["authorization"];

  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res.status(403).json({ error: "Token no proporcionado" });
  }
  const token = authorizationHeader.split(" ")[1];
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

export const refreshToken = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = await verifyJWT(token);
    const newToken = await generateJWT(decoded);
    res.status(200).json({ token: newToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Token inválido" });
  }
};

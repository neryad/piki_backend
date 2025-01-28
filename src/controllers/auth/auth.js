import { turso } from "../../db/db.js";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../users/user.js";
import { generateJWT, verifyJWT } from "../../helpers/jwt.js";

export const login = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    // const user = await getUserByEmail(email);
    const response = await turso.execute(
      "SELECT * FROM users WHERE email = ?;",
      [email]
    );
    const user = response.rows[0];
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Contraseña / Usuario no valido" });
    }

    const token = await generateJWT(user.id, user.email);
    const loggedUser = { ...user, password: undefined, token };
    res.status(200).json({ loggedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al hacer login" });
  }
};

export const refreshToken = async (req, res) => {
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

    const newToken = await generateJWT(decoded.id, decoded.email);
    res.status(200).json({ token: newToken });
  } catch (error) {
    //  console.error(error, 'error');
    res.status(401).json({ error: "Token inválido", message: error });
  }
};

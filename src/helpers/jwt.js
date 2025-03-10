import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

const JWT_SECRET = process.env.SECRETORPRIVATEKEY;

export const generateJWT = (id, email) => {
  return new Promise((resolve, reject) => {
    const payload = { id, email };
    sign(payload, JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        console.log(token);
        resolve(token);
      }
    });
  });
};

export const verifyJWT = (token) => {
  console.log(token, "token");
  return new Promise((resolve, reject) => {
    verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

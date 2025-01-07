//import { jwt } from "jsonwebtoken";

import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

const JWT_SECRET = process.env.SECRETORPRIVATEKEY;

// export const generateJWT = (uid = "") => {
//   return new Promise((resolve, reject) => {
//     const payload = { uid };

//     jwt.sign(
//       payload,
//       process.env.SECRETORPRIVATEKEY,
//       {
//         expiresIn: "4h",
//       },
//       (err, token) => {
//         if (err) {
//           console.log(err);
//           reject("No se pudo generar el token");
//         } else {
//           resolve(token);
//         }
//       }
//     );
//   });
// };

export const generateJWT = (id, email) => {
  return new Promise((resolve, reject) => {
    const payload = { id, email };
    sign(payload, JWT_SECRET, { expiresIn: "1m" }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        console.log(token);
        resolve(token);
      }
    });
  });
};

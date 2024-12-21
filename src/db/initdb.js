import { turso } from "./db.js";

const initializeDatabase = async () => {
  try {
    // Verificar si la tabla `users` existe
    // const result = await turso.execute(`
    //   SELECT name FROM pikidbdev WHERE type='table' AND name='users';
    // `);

    // Crear la tabla `users` si no existe
    console.log('Tabla "users" no encontrada. Creando tabla...');
    await turso.execute(`
        CREATE TABLE IF NOT EXISTS roles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE
        );
      `);
    await turso.execute(`
        CREATE TABLE IF NOT EXISTS  users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          lastName TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
       role_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (role_id) REFERENCES roles(id) 
        );
      `);
    console.log('Tabla "users" creada exitosamente.');
  } catch (error) {
    console.error(
      "Error durante la inicialización de la base de datos:",
      error
    );
    throw error;
  }
};

export default initializeDatabase;

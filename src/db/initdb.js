import { turso } from "./db.js";

const initializeDatabase = async () => {
  try {
    console.log("Verificando y creando tablas si no existen...");

    const tables = [
      "roles",
      "users",
      "suppliers",
      "materials",
      "sliders",
      "products",
      "productsMaterials",
    ];
    for (const table of tables) {
      console.log(`Verificando la existencia de la tabla "${table}"...`);
      const result = await turso.execute(`
        SELECT name FROM sqlite_master WHERE type='table' AND name='${table}';
      `);
      if (result.rows.length === 0) {
        console.log(`Tabla "${table}" no encontrada. Creando tabla...`);
        if (table === "roles") {
          await turso.execute(`
            CREATE TABLE roles (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL UNIQUE
            );
          `);
        } else if (table === "users") {
          await turso.execute(`
            CREATE TABLE users (
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
        } else if (table === "suppliers") {
          await turso.execute(`
            CREATE TABLE suppliers (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              lastName TEXT NOT NULL,
              phone TEXT NOT NULL,
              email TEXT UNIQUE NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
          `);
        } else if (table === "materials") {
          await turso.execute(`
            CREATE TABLE materials (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              description TEXT NOT NULL,
              isAvailable boolean NOT NULL,
              cost REAL NOT NULL,
              date DATE NOT NULL,
              supplier_id INTEGER NOT NULL,
              quantity INTEGER NOT NULL,
              quantityByUnit INTEGER NOT NULL,
              costByUnit REAL NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
            );
          `);
        } else if (table === "products") {
          await turso.execute(`
            CREATE TABLE products (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              description TEXT NOT NULL,
              price REAL NOT NULL,
              stock INT NOT NULL,
               isAvailable boolean NOT NULL,
              offerPrice REAL,
              imageUrl TEXT NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
          `);
        } else if (table === "productsMaterials") {
          await turso.execute(`
            CREATE TABLE productsMaterials (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              product_id INTEGER NOT NULL,
              material_id INTEGER NOT NULL,
              quantityUsed INTEGER NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (material_id) REFERENCES materials(id),
              FOREIGN KEY (product_id) REFERENCES products(id)

            );
          `);
        } else if (table === "sliders") {
          await turso.execute(`
            CREATE TABLE sliders (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              imageUrl TEXT NOT NULL,
              link TEXT NOT NULL,
              isActive boolean NOT NULL
            );
          `);
        }
        console.log(`Tabla "${table}" creada exitosamente.`);
      } else {
        console.log(`Tabla "${table}" ya existe.`);
      }
    }
  } catch (error) {
    console.error(
      "Error durante la inicialización de la base de datos:",
      error.message
    );
    throw error;
  }
};

export default initializeDatabase;

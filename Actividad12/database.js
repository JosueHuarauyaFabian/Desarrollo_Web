import sqlite3 from 'sqlite3'; // Cambiar a sqlite3
import { open } from 'sqlite'; // Asegúrate de usar el módulo correcto

// Función para inicializar la base de datos
const initDatabase = async () => {
  const db = await open({
    filename: './database.db', // Ruta al archivo de la base de datos
    driver: sqlite3.Database, // El driver correcto de sqlite3
  });

  // Crear la tabla de usuarios si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT UNIQUE NOT NULL
    );
  `);

  console.log('Base de datos inicializada');
  return db;
};

export default initDatabase;

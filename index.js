// 🧩 Importar paquetes necesarios
import express from "express";
import pkg from "pg"; // 🧩 Importamos el paquete `pg` para conectarnos a PostgreSQL
import cors from "cors";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config({ path: "connect.env" });

////////////////////////////////// 1️⃣ EXPRESS - Configuración del Servidor //////////////////////////////////////////

// 📌 Creamos la instancia de Express
const app = express();

// 📌 Habilitamos CORS para permitir peticiones desde diferentes orígenes
app.use(cors());

// 📌 Definimos el puerto donde correrá el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

// 📌 Middleware para manejar solicitudes en formato JSON
app.use(express.json());

////////////////////////////////// 2️⃣ POSTGRESQL - Conexión con la Base de Datos //////////////////////////////////////////

// 📌 Configuración de conexión a PostgreSQL // NEON
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : false,
});

pool
  .connect()
  .then(() => console.log("✅ Conexión exitosa a PostgreSQL en Neon.tech"))
  .catch((err) =>
    console.error("❌ Error al conectar con la base de datos:", err)
  );

// 📌 Ruta para obtener productos desde la base de datos
app.get("/api/products", async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        nombre, 
        principio_activo,
        imagen_url,
        stock,
        precio::FLOAT AS precio  
      FROM productos;
    `;

    const result = await pool.query(query);

    console.log("📡 Datos obtenidos desde PostgreSQL:", result.rows); // 🔍 Verificar en la terminal

    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// 📌 Ruta para obtener productos por ID
app.get("/api/products/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "El ID debe ser un número" });
  }

  try {
    const result = await pool.query(
      `SELECT id, nombre, principio_activo, precio, imagen_url FROM productos WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    console.log("📡 Producto enviado a React:", result.rows[0]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error en la base de datos:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// 📌 Ruta para agregar un nuevo producto a la base de datos
app.post("/api/products", async (req, res) => {
  const { nombre, descripcion, precio, imagen_url, user_id } = req.body;

  if (!nombre || !descripcion || !precio || !imagen_url) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO productos (nombre, descripcion, precio, imagen_url, user_id) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, descripcion, precio, imagen_url, user_id]
    );

    console.log("📌 Producto agregado:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error al insertar producto:", error);
    res.status(500).json({ error: "Error al insertar el producto" });
  }
});

////////////////////////////// 3️⃣ RUTAS FINALES Y MANEJO DE ERRORES //////////////////////////////

// 📌 Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).send("❌ Página no encontrada");
});

// 📌 Middleware para manejo de errores globales (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

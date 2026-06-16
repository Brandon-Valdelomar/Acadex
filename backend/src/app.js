import "dotenv/config";
import express from "express";
import cors from "cors";
import tareasRoutes from "./routes/tareas.routes.js";
import reportesRoutes from "./routes/reportes.routes.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMiddleware)

// Rutas
app.use("/api/tareas",    tareasRoutes)
app.use("/api/reportes",  reportesRoutes)

// 404
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" })
})

// Inicio
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

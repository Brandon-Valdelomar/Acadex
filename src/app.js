import "dotenv/config";
import express from "express";
import tareasRoutes from "./routes/tareas.routes.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { homePage } from "./views/pages/home.page.js";
import { error404Page } from "./views/pages/error404.page.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globales
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// Rutas principales
app.get("/", (req, res) => {
  res.send(
    homePage(
      process.env.APP_NAME,
      process.env.APP_VERSION
    )
  );
});

app.use("/tareas", tareasRoutes);

// Manejo de error 404 (Ruta no encontrada)
app.use((req, res) => {
  res.status(404).send(error404Page());
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} ejecutándose en http://localhost:${PORT}`);
});
import express from "express"
import fs from "fs/promises"
import path from "path"

const app = express()
const PORT = 3000

// Ruta raíz - responde texto plano
app.get("/", (req, res) => {
  res.type("text/plain; charset=utf-8")
  res.send("Servidor activo")
})

// Ruta /info - responde un JSON
app.get("/info", (req, res) => {
  res.json({
    mensaje: "Información del servidor del Laboratorio 7",
    curso: "Sistemas y Tecnologías Web",
    tecnologia: "Node.js con Express"
  })
})

// Ruta /saludo - texto plano
app.get("/saludo", (req, res) => {
  res.type("text/plain; charset=utf-8")
  res.send("¡Hola! Soy un servidor HTTP construido con Express. Gracias por visitarme.")
})

// Ruta /api/status - JSON de estado
app.get("/api/status", (req, res) => {
  res.json({
    ok: true,
    status: "Servidor funcionando correctamente",
    puerto: PORT
  })
})

// Ruta /api/student - lee el archivo datos.json
app.get("/api/student", async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "datos.json")
    const texto = await fs.readFile(filePath, "utf-8")
    const datos = JSON.parse(texto)
    res.json(datos)
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "No se pudo leer el archivo datos.json",
      detalle: error.message
    })
  }
})

// Ruta no encontrada (404) - muestra la ruta intentada
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: "Ruta no encontrada",
    rutaIntentada: req.originalUrl
  })
})

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`)
})
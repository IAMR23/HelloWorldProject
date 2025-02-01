import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Permite solicitudes desde cualquier origen (útil para pruebas)
    methods: ["GET", "POST"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Conexión a MongoDB
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/invitation"; // Cambia esto por tu cadena de conexión
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
  });

// Definir un esquema y modelo para los datos
const datoSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  fecha: { type: Date, default: Date.now }, // Campo adicional para la fecha de creación
});

const Dato = mongoose.model("Dato", datoSchema);

// Ruta para guardar datos
app.post("/guardar", async (req, res) => {
  try {
    const { nombre, edad } = req.body;

    // Validar que se reciban los datos necesarios
    if (!nombre || !edad) {
      return res.status(400).json({ error: "Nombre y edad son obligatorios" });
    }

    // Crear un nuevo documento en la colección "Dato"
    const nuevoDato = new Dato({ nombre, edad });
    await nuevoDato.save(); // Guardar en la base de datos

    res.json({ mensaje: "Datos guardados correctamente.", dato: nuevoDato });
  } catch (error) {
    console.error("Error al guardar los datos:", error);
    res.status(500).json({ error: "Error al guardar los datos" });
  }
});

// Ruta para obtener todos los datos
app.get("/datos", async (req, res) => {
  try {
    const datos = await Dato.find(); // Obtener todos los documentos de la colección "Dato"
    res.json(datos);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
});

// Ruta de inicio
app.get("/", (req, res) => {
  res.json({ message: "Ready in Nodejs" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server Ready in the PORT: ${PORT}`);
});

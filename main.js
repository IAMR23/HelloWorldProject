import express from "express";
import cors from "cors";

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

// Ruta de inicio
app.get("/", (req, res) => {
  res.json({ message: "Ready in Nodejs" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server Ready in the PORT: ${PORT}`);
});

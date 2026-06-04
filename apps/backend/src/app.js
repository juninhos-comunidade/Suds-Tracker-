import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import usuariosRota from "./routes/usuariosRota.js";
import authRotas from "./routes/authRotas.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

//permite conexao entre front e backend com portas diferentes
app.use(cors());

//converte texto bruto do json em objetos javascript
app.use(express.json());

app.use("/api/usuarios", usuariosRota);
app.use("/api/usuarios", authRotas);

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor." });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});

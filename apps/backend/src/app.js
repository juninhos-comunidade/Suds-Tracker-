import express from "express";
import cors from "cors";

//iniciar backend
const app = express();
const PORT = 5000;

//permite conexao entre front e backend com portas diferentes
app.use(cors());

//converte texto bruto do json em objetos javascript
app.use(express.json());

//log do server rodando
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});

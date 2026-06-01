import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import usuariosRota from './routes/usuariosRota.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

//permite conexao entre front e backend com portas diferentes
app.use(cors());

//converte texto bruto do json em objetos javascript
app.use(express.json());

app.use('/api/usuarios', usuariosRota);

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).json({ error: 'Erro na requisição.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});

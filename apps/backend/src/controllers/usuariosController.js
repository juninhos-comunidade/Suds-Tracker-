import usuariosService from '../services/usuariosService.js';

async function cadastrarUsuario(req, res) {
  try {
    const {
      nome,
      email,
      senha,
      dataNascimento,
      registroProfissional,
      tipoUsuario,
    } = req.body;

    console.log(req.body);

    if (!nome || !email || !senha || !dataNascimento) {
      return res.status(400).json({
        error: 'Nome, Email, Senha e Data de Nascimento são obrigatórios.',
      });
    }
    if (tipoUsuario === 'PROFISSIONAL' && !registroProfissional) {
      return res.status(400).json({
        error: 'Profissionais precisam informar seu Registro Profissional.',
      });
    }

    const novoUsuario = await usuariosService.cadastrarUsuario({
      nome,
      email,
      senha,
      dataNascimento,
      registroProfissional,
      tipoUsuario,
    });

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      usuario: novoUsuario,
    });
  } catch (error) {
    console.error('Erro capturado no cadastro:', error);
    return res
      .status(400)
      .json({ error: error.message || 'Erro interno do servidor.' });
  }
}

//TODO
async function logarUsuario(req, res) {}

export default { cadastrarUsuario, logarUsuario };

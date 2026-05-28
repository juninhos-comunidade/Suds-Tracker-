import usuariosService from "../services/usuariosService.js";

async function cadastrarUsuario(req, res) {
  try {
    const { nome, email, senha, dataNascimento, registroProfissional, role } =
      req.body;
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: "Nome, Email e Senha são obrigatórios." });
    }
    if (role === "PROFISSIONAL" && !registroProfissional) {
      return res.status(400).json({
        error: "Profissionais precisam informar seu Registro Profissional.",
      });
    }

    const novoUsuario = await usuariosService.cadastrarUsuario({
      nome,
      email,
      senha,
      dataNascimento,
      registroProfissional,
      role,
    });

    return res.status(200).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: novoUsuario,
    });
  } catch (error) {
    return res.status(400).json({ error: error.mensagem });
  }
}

//TODO
async function logarUsuario(req, res) {}

export default { cadastrarUsuario, logarUsuario };

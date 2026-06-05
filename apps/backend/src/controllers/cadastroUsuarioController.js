import usuariosService from "../services/usuariosService.js";

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

    const novoUsuario = await usuariosService.cadastrarUsuario({
      nome,
      email,
      senha,
      dataNascimento,
      registroProfissional,
      tipoUsuario,
    });

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: novoUsuario,
    });
  } catch (error) {
    console.error("Erro capturado no cadastro:", error);
    return res
      .status(400)
      .json({ error: error.message || "Erro interno do servidor." });
  }
}

export default { cadastrarUsuario };

import { parseISO, isValid, isFuture } from "date-fns";
import UserRepository from "../repositories/userRepository.js";

async function cadastrarUsuario(dadosUsuario) {
  const { nome, email, senha, dataNascimento, registroProfissional, tipoUsuario } = dadosUsuario;

  // Usa await, pois vai realizar consulta no banco de dados e a operação deve ser async
  await validaUsuario(dadosUsuario);

  // TODO: Criptografar a senha (usando bcrypt, por exemplo) antes de salvar
  const senhaCriptografada = senha;

  const emailFormatado = email ? String(email).trim().toLowerCase() : "";

  const novoUsuario = await UserRepository.create({
    data: {
      nome,
      email: emailFormatado,
      senha: senhaCriptografada,
      dataNascimento: new Date(dataNascimento),
      registroProfissional,
      tipoUsuario,
    },
  });

  const { senha: _, ...usuarioSemSenha } = novoUsuario;
  return usuarioSemSenha;
}

async function validaUsuario(dadosUsuario) {
  const { nome, email, senha, dataNascimento, registroProfissional, tipoUsuario } = dadosUsuario;

  const emailPadrao = email ? String(email).trim().toLowerCase() : "";

  if (!nome || String(nome).trim() === "") {
    throw new Error("Nome é obrigatório.");
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailPadrao);

  if (!emailPadrao || !emailValido) {
    throw new Error("Email inválido. Siga o formato: suds@tracker.com");
  }

  const senhaValida =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha);

  if (!senha || !senhaValida) {
    throw new Error(
      "Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.",
    );
  }

  if (!dataNascimento) {
    throw new Error("Data de nascimento é obrigatória.");
  }

  const dataNascimentoObjDate = parseISO(dataNascimento);
  if (
    !isValid(dataNascimentoObjDate) ||
    isFuture(dataNascimentoObjDate)
  ) {
    throw new Error("Data de nascimento inválida.");
  }

if (tipoUsuario?.toUpperCase() === "PROFISSIONAL" && !registroProfissional) {
      throw new Error(
      "Profissionais precisam informar seu Registro Profissional.",
    );
  }

  const validaUsuarioExistente = await UserRepository.findByEmail(emailPadrao);

  if (validaUsuarioExistente) {
    throw new Error('Já existe um usuário cadastrado com esse Email.');
  }
}

export default { cadastrarUsuario };

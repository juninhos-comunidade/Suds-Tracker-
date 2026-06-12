import { parse, isValid, isFuture } from "date-fns";
import UserRepository from "../repositories/userRepository.js";

async function cadastrarUsuario(dadosUsuario) {
  const { nome, email, senha, dataNascimento, registroProfissional, tipoUsuario } = dadosUsuario;

  await validaUsuario(dadosUsuario);

  // TODO: Criptografar a senha (usando bcrypt, por exemplo) antes de salvar
  const senhaCriptografada = senha;

  const emailFormatado = email ? String(email).trim().toLowerCase() : "";

  const novoUsuario = await UserRepository.create({
    data: {
      nome,
      email: emailFormatado,
      senha: senhaCriptografada,
      dataNascimento: dataNascimentoObjDate,
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

   if (!dataNascimento) {
    throw new Error("Data de nascimento é obrigatória.");
  }

  const dataNascimentoObjDate = parse(dataNascimento, "dd/MM/yyyy", new Date());
  if (!isValid(dataNascimentoObjDate) || isFuture(dataNascimentoObjDate)) {
    throw new Error("Data de nascimento inválida.");
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailPadrao);

  if (!emailPadrao || !emailValido) {
    throw new Error("Email inválido");
  }

  const senhaValida =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha);

  if (!senha || !senhaValida) {
    throw new Error(
      "Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.",
    );
  }

  const tipoValido = ["paciente", "profissional"];
  const tipoPadronizado = tipoUsuario ? String(tipoUsuario).toLowerCase() : "";
  if(!tipoValido.includes(tipoPadronizado)) {
    throw new Error("Tipo de usuário inválido.") 
  }  

  if (tipoPadronizado === "profissional" && !registroProfissional) {
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

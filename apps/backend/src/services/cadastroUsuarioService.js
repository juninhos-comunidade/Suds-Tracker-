import { parseISO, isValid, isFuture } from "date-fns";

async function cadastrarUsuario(dadosUsuario) {
  const { nome, senha, dataNascimento, registroProfissional } = dadosUsuario;

  // Usa await, pois vai realizar consulta no banco de dados e a operação deve ser async
  await validaUsuario(dadosUsuario);

  // TODO: Criptografar a senha (usando bcrypt, por exemplo) antes de salvar
  const senhaCriptografada = senha;

  // Preparando para o Prisma (O Prisma usa prisma.MODELO.create e a chave 'data')
  const novoUsuario = await prisma.usuario.create({
    data: {
      nome,
      email,
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
  const { nome, senha, dataNascimento, registroProfissional } = dadosUsuario;


  const emailPadrao = dadosUsuario.email ? Strin(dadosUsuario.email).trim().toLowerCase() : "";

  if (!nome || String(nome).trim() === "") {
    throw new Error("Nome é obrigatório.");
  }

  const emailValido = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!email || !emailValido) {
    throw new Error("Email inválido ou não informado.");
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
    isFuture(dataNascimentoObjDate || dataNascimentoObjDate)
  ) {
    throw new Error("Data de nascimento inválida.");
  }

  if (tipoUsuario === "PROFISSIONAL" && !registroProfissional) {
    throw new Error(
      "Profissionais precisam informar seu Registro Profissional.",
    );
  }

  // Preparando para o Prisma (O Prisma usa findUnique) - Movido para dentro da função!
  /* 
  const validaUsuarioExistente = await prisma.usuario.findUnique({
    where: {
      email: email,
    },
  });

  if (validaUsuarioExistente) {
    throw new Error('Já existe um usuário cadastrado com esse Email.');
  }
  */
}

export default { cadastrarUsuario };

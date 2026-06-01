import { parseISO, isValid, isFuture } from 'date-fns';

async function cadastrarUsuario(dadosUsuario) {
  const {
    nome,
    email,
    senha,
    dataNascimento,
    registroProfissional,
    tipoUsuario,
  } = dadosUsuario;

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
  const { email, senha, dataNascimento } = dadosUsuario;

  if (!email) {
    throw new Error('Email é obrigatório.');
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValido) {
    throw new Error('Email inválido.');
  }

  if (!senha) {
    throw new Error('Senha é obrigatória.');
  }

  const senhaValida =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha);

  if (!senhaValida) {
    throw new Error('Senha inválida.');
  }

  if (!dataNascimento) {
    throw new Error('Data de nascimento é obrigatória.');
  }

  const dataNascimentoObjDate = parseISO(dataNascimento);

  if (!isValid(dataNascimentoObjDate)) {
    throw new Error('Data de nascimento inválida.');
  }

  if (isFuture(dataNascimentoObjDate)) {
    throw new Error('Data de nascimento não pode ser futura.');
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

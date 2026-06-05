'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import InputField from './components/InputField';
import MensagemErro from './components/MensagemErro';

export default function AuthPage() {
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState('paciente');
  const [abaPrincipal, setAbaPrincipal] = useState('cadastro');
  const [modoEscuro, setModoEscuro] = useState(false);

  // Estados do Cadastro
  const [nomeCadastro, setNomeCadastro] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [confirmarSenhaCadastro, setConfirmarSenhaCadastro] = useState('');
  const [registroProfissional, setRegistroProfissional] = useState('')

  // Estados do Login
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [erroLogin, setErroLogin] = useState('');
  const [esqueceuSenha, setEsqueceuSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  

  // Valida formato de e-mail com regex
  const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
  };

  // Valida força mínima da senha — retorna mensagem de erro ou null se válida
  const validarForcaSenha = (senha) => {
  if (senha.length < 8) return 'A senha deve ter pelo menos 8 caracteres.';
  if (!/[A-Z]/.test(senha)) return 'A senha deve conter pelo menos uma letra maiúscula.';
  if (!/[0-9]/.test(senha)) return 'A senha deve conter pelo menos um número.';
  return null;
  };
  
  // Erros individuais por campo — objeto centralizado
  const [erros, setErros] = useState({});
 
  // Mensagens gerais de feedback (topo do formulário)
  const [erroCadastro, setErroCadastro] = useState('');
  const [sucessoCadastro, setSucessoCadastro] = useState('');
  const [sucessoLogin, setSucessoLogin] = useState('');

  // Identificador de erro por campo
  const setErro = (campo, mensagem) =>
    setErros((prev) => ({ ...prev, [campo]: mensagem }));
 
  const limparErro = (campo) =>
    setErros((prev) => {
      const novo = { ...prev };
      delete novo[campo];
      return novo;
    });
 
  const limparTodosErros = () => {
    setErros({});
    setErroCadastro('');
    setErroLogin('');
    setSucessoCadastro('');
    setSucessoLogin('');
  };

  const handleEmailCadastroChange = (valor) => {
    setEmailCadastro(valor);
    if (valor && !validarEmail(valor)) {
      setErro('emailCadastro', 'Digite um e-mail válido.');
    } else {
      limparErro('emailCadastro');
    }
  };

  const handleSenhaCadastroChange = (valor) => {
    setSenhaCadastro(valor);
    const erroForca = validarForcaSenha(valor);
    if (valor && erroForca) {
      setErro('senhaCadastro', erroForca);
    } else {
      limparErro('senhaCadastro');
    }
    if (confirmarSenhaCadastro && valor !== confirmarSenhaCadastro) {
      setErro('confirmarSenha', 'As senhas não coincidem.');
    } else if (confirmarSenhaCadastro) {
      limparErro('confirmarSenha');
    }
  };

  const handleConfirmarSenhaChange = (valor) => {
    setConfirmarSenhaCadastro(valor);
    if (valor && valor !== senhaCadastro) {
      setErro('confirmarSenha', 'As senhas não coincidem.');
    } else {
      limparErro('confirmarSenha');
    }
  };

  const handleSubmitCadastro = async (e) => {
    e.preventDefault();
    limparTodosErros();

    let temErro = false;

    if (!nomeCadastro.trim()) {
      setErro('nome', 'O nome é obrigatório.');
      temErro = true;
    }
    if (!dataNascimento) {
      setErro('dataNascimento', 'A data de nascimento é obrigatória.');
      temErro = true;
    }
    if (!emailCadastro) {
      setErro('emailCadastro', 'O e-mail é obrigatório.');
      temErro = true;
    } else if (!validarEmail(emailCadastro)) {
      setErro('emailCadastro', 'Digite um e-mail válido.');
      temErro = true;
    }

    const erroForca = validarForcaSenha(senhaCadastro);
    if (!senhaCadastro) {
      setErro('senhaCadastro', 'A senha é obrigatória.');
      temErro = true;
    } else if (erroForca) {
      setErro('senhaCadastro', erroForca);
      temErro = true;
    }

    if (!confirmarSenhaCadastro) {
      setErro('confirmarSenha', 'Confirme sua senha.');
      temErro = true;
    } else if (senhaCadastro !== confirmarSenhaCadastro) {
      setErro('confirmarSenha', 'As senhas não coincidem.');
      temErro = true;
    }

    if (tipoUsuario === 'profissional' && !registroProfissional.trim()) {
      setErro('registroProfissional', 'Informe seu CRM/CRP/Registro Profissional.');
      temErro = true;
    }

    if (temErro) return;

    setCarregando(true);

    try {
      const response = await fetch('/api/usuarios/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nomeCadastro,
          dataNascimento,
          email: emailCadastro,
          senha: senhaCadastro,
          tipoUsuario,
          registroProfissional:
            tipoUsuario === 'profissional' ? registroProfissional : null,
        }),
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      setSucessoCadastro('Conta criada com sucesso! Redirecionando...');
      setTimeout(() => router.push('/home'), 1500);
    } catch (erro) {
      console.error('Erro ao cadastrar:', erro);
      setErroCadastro('Erro ao criar conta. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    limparTodosErros();

    let temErro = false;

    if (!emailLogin) {
      setErro('emailLogin', 'O e-mail é obrigatório.');
      temErro = true;
    } else if (!validarEmail(emailLogin)) {
      setErro('emailLogin', 'Digite um e-mail válido.');
      temErro = true;
    }

    if (!senhaLogin) {
      setErro('senhaLogin', 'A senha é obrigatória.');
      temErro = true;
    }

    if (temErro) return;

    setCarregando(true);

    try {
      // Simulando chamada à API (quando o backend estiver pronto)
      // const response = await fetch('/api/usuarios/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: emailLogin,
      //     senha: senhaLogin
      //   })
      // });

      // Aguarda um breve momento para feedback visual
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSucessoLogin('Login realizado! Redirecionando...');
      setTimeout(() => router.push('/home'), 1500);
   } catch (erro) {
      console.error('Erro ao fazer login:', erro);
      setErroLogin('Email ou senha incorretos. Tente novamente.');
    } finally {
      setCarregando(false);
    } 
  };

  return (
    <div className={styles.containerLogin}>
      {/* LADO ESQUERDO */}
      <div className={styles.ladoEsquerdo}>
        <div className={styles.conteudoSobreposto}>
          <h1 className={styles.titulo}>SUDS</h1>
          <p className={styles.slogan}>Explore o universo da sua mente.</p>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div
        className={`${styles.ladoDireito} ${modoEscuro ? styles.dark : styles.light}`}
      >
        <div className={styles.caixaFormulario}>
          {/* BOTÃO MODO ESCURO - TOGGLE */}
          <div
            className={`${styles.toggleSwitch} ${modoEscuro ? styles.switchDark : styles.switchLight}`}
          >
            <input
              type="checkbox"
              className={styles.toggleInput}
              checked={modoEscuro}
              onChange={() => setModoEscuro(!modoEscuro)}
              id="modoToggle"
            />
            <label htmlFor="modoToggle" className={styles.toggleLabel}>
              <span className={styles.toggleThumb}>
                {modoEscuro ? (
                  <Image
                    src="/lua.png"
                    alt="Modo Escuro"
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    src="/sol.png"
                    alt="Modo Claro"
                    width={35}
                    height={35}
                  />
                )}
              </span>
            </label>
          </div>

          {/* ABAS */}
          <div
            className={`${styles.abas} ${modoEscuro ? styles.dark : styles.light}`}
          >
            <button
              className={`${styles.abaBtn} ${abaPrincipal === 'cadastro' ? styles.abaAtiva : ''}`}
              onClick={() => {setAbaPrincipal('cadastro'); limparTodosErros()}}
            >
              Cadastre-se
            </button>
            <button
              className={`${styles.abaBtn} ${abaPrincipal === 'login' ? styles.abaAtiva : ''}`}
              onClick={() => {setAbaPrincipal('login'); limparTodosErros()}}
            >
              Login
            </button>
          </div>

          {/* ABA CADASTRO */}
          {abaPrincipal === 'cadastro' && (
            <div className={styles.conteudoAba}>
              <h2>Cadastre-se</h2>

              <div className={styles.seletorUsuario}>
                <button
                  className={`${styles.botaoUsuario} ${tipoUsuario === 'paciente' ? styles.ativo : ''}`}
                  onClick={() => setTipoUsuario('paciente')}
                >
                  Paciente
                </button>
                <button
                  className={`${styles.botaoUsuario} ${tipoUsuario === 'profissional' ? styles.ativo : ''}`}
                  onClick={() => setTipoUsuario('profissional')}
                >
                  Profissional
                </button>
              </div>

              <form
                className={`${styles.formularioVidro} ${modoEscuro ? styles.dark : styles.light}`}
                onSubmit={handleSubmitCadastro}
              >
                <MensagemErro mensagem={erroCadastro} tipo="erro" modoEscuro={modoEscuro} />
                <MensagemErro mensagem={sucessoCadastro} tipo="sucesso" modoEscuro={modoEscuro} />

                 <InputField
                    label="Nome"
                    id="nomeCadastro"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={nomeCadastro}
                    onChange={(e) => { setNomeCadastro(e.target.value); if (e.target.value.trim()) limparErro('nome'); }}
                    erro={erros.nome}
                    modoEscuro={modoEscuro}
                  />

                  <InputField
                    label="Data de Nascimento"
                    id="dataNascimento"
                    type="date"
                    value={dataNascimento}
                    onChange={(e) => { setDataNascimento(e.target.value); if (e.target.value) limparErro('dataNascimento'); }}
                    erro={erros.dataNascimento}
                    modoEscuro={modoEscuro}
                  />

                  <InputField
                    label="E-mail"
                    id="emailCadastro"
                    type="email"
                    placeholder="suds@exemplo.com"
                    value={emailCadastro}
                    onChange={(e) => handleEmailCadastroChange(e.target.value)}
                    erro={erros.emailCadastro}
                    modoEscuro={modoEscuro}
                  />

                  <InputField
                    label="Senha"
                    id="senhaCadastro"
                    type="password"
                    placeholder="Mín. 8 caracteres, 1 maiúscula e 1 número"
                    value={senhaCadastro}
                    onChange={(e) => handleSenhaCadastroChange(e.target.value)}
                    erro={erros.senhaCadastro}
                    modoEscuro={modoEscuro}
                  />

                  <InputField
                    label="Confirmar Senha"
                    id="confirmarSenhaCadastro"
                    type="password"
                    placeholder="Repita sua senha"
                    value={confirmarSenhaCadastro}
                    onChange={(e) => handleConfirmarSenhaChange(e.target.value)}
                    erro={erros.confirmarSenha}
                    modoEscuro={modoEscuro}
                  />

                  {tipoUsuario === 'profissional' && (
                    <InputField
                      label="CRM / CRP / Registro Profissional"
                      id="registroProfissional"
                      type="text"
                      placeholder="Seu número de registro"
                      value={registroProfissional}
                      onChange={(e) => { setRegistroProfissional(e.target.value); if (e.target.value.trim()) limparErro('registroProfissional'); }}
                      erro={erros.registroProfissional}
                      modoEscuro={modoEscuro}
                    />
                  )}

                <button
                  type="submit"
                  className={styles.botaoEnviar}
                  disabled={carregando}
                >
                  {carregando ? 'Criando conta...' : 'Criar Conta'}
                </button>
              </form>
            </div>
          )}

          {/* ABA LOGIN */}
          {abaPrincipal === 'login' && (
            <div className={styles.conteudoAba}>
              <h2>Entrar</h2>

              <form
                className={`${styles.formularioVidro} ${modoEscuro ? styles.dark : styles.light}`}
                onSubmit={handleSubmitLogin}
              >
                <MensagemErro mensagem={erroLogin} tipo="erro" modoEscuro={modoEscuro} />
                <MensagemErro mensagem={sucessoLogin} tipo="sucesso" modoEscuro={modoEscuro} />

                <InputField
                  label="E-mail"
                  id="emailLogin"
                  type="email"
                  placeholder="suds@exemplo.com"
                  value={emailLogin}
                  onChange={(e) => { setEmailLogin(e.target.value); limparErro('emailLogin'); }}
                  erro={erros.emailLogin}
                  modoEscuro={modoEscuro}
                />

                <InputField
                  label="Senha"
                  id="senhaLogin"
                  type="password"
                  placeholder="Sua senha"
                  value={senhaLogin}
                  onChange={(e) => { setSenhaLogin(e.target.value); limparErro('senhaLogin'); }}
                  erro={erros.senhaLogin}
                  modoEscuro={modoEscuro}
                />

                <div className={styles.grupoCheckbox}>
                  <input
                    type="checkbox"
                    id="esqueceuSenha"
                    checked={esqueceuSenha}
                    onChange={() => setEsqueceuSenha(!esqueceuSenha)}
                    className={`${styles.checkboxEsqueceu} ${esqueceuSenha ? styles.marcado : ''}`}
                  />
                  <label
                    htmlFor="esqueceuSenha"
                    className={styles.labelCheckbox}
                  >
                    Esqueceu a senha?
                  </label>
                </div>

                <button
                  type="submit"
                  className={styles.botaoEnviar}
                  disabled={carregando}
                >
                  {carregando ? 'Entrando...' : 'Entrar'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

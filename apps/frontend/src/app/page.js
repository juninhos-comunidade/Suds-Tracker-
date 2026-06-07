'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';

export default function HomePage() {
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState('paciente');
  const [abaPrincipal, setAbaPrincipal] = useState('cadastro');
  const [modoEscuro, setModoEscuro] = useState(true);
  
  // Estados do Cadastro
  const [nomeCadastro, setNomeCadastro] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [confirmarSenhaCadastro, setConfirmarSenhaCadastro] = useState('');
  const [registroProfissional, setRegistroProfissional] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  
  // Estados do Login
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [esqueceuSenha, setEsqueceuSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erroLogin, setErroLogin] = useState('');

  const validarSenhas = (senha, confirmar) => {
    if (confirmar && senha !== confirmar) {
      setErroSenha('As senhas não coincidem. Tente novamente.');
      return false;
    } else {
      setErroSenha('');
      return true;
    }
  };

  const handleConfirmarSenha = (valor) => {
    setConfirmarSenhaCadastro(valor);
    validarSenhas(senhaCadastro, valor);
  };

  const handleSubmitCadastro = async (e) => {
    e.preventDefault();
    
   
    if (!nomeCadastro || !dataNascimento || !emailCadastro || !senhaCadastro || !confirmarSenhaCadastro) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    
    if (!validarSenhas(senhaCadastro, confirmarSenhaCadastro)) {
      return;
    }

    const tipoValido = ['paciente', 'profissional'];
    if (!tipoValido.includes(tipoUsuario)) {
      alert('Tipo de usuário inválido.');
      return;
    }

    if (tipoUsuario === 'profissional' && !registroProfissional) {
      alert('Por favor, informar seu CRM/CRP/Registro Profissional.');
      return;
    }

    setCarregando(true);

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
      const response = await fetch(`${API_URL}/usuarios/cadastro`, {
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

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || data.error);
      }

      alert('Cadastro realizado com sucesso! Redirecionando...');
      router.push('/home');

    } catch (erro) {
      console.error('Erro ao cadastrar:', erro);
      alert(erro.message)
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!emailLogin || !senhaLogin) {
      setErroLogin('Por favor, preencha email e senha.');
      return;
    }

    setCarregando(true);
    setErroLogin('');

    try {
      // Simulando chamada à API (quando o backend estiver pronto)
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: emailLogin,
      //     senha: senhaLogin
      //   })
      // });

      // Por enquanto, simulamos sucesso
      console.log('Login enviado:', {
        email: emailLogin,
      });

      // Aguarda um breve momento para feedback visual
      await new Promise(resolve => setTimeout(resolve, 500));

      alert('Login realizado com sucesso! Redirecionando...');
      
      // Redireciona para home (será criada depois)
      router.push('/home');

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
      <div className={`${styles.ladoDireito} ${modoEscuro ? styles.dark : styles.light}`}>
        
        <div className={styles.caixaFormulario}>
          
          {/* BOTÃO MODO ESCURO - TOGGLE */}
          <div className={`${styles.toggleSwitch} ${modoEscuro ? styles.switchDark : styles.switchLight}`}>
            <input 
              type="checkbox" 
              className={styles.toggleInput}
              checked={modoEscuro}
              onChange={() => setModoEscuro(!modoEscuro)}
              id="modoToggle"
            />
            <label htmlFor="modoToggle" className={styles.toggleLabel}>
              <span className={styles.toggleThumb}>
                {modoEscuro ? ( <Image src= "/lua.png" alt="Modo Escuro" width={30} height={30} />
          ) : (
            <Image src= "/sol.png" alt="Modo Claro" width={35} height={35} />
          )}
              </span>
            </label>
          </div>

          {/* ABAS */}
          <div className={`${styles.abas} ${modoEscuro ? styles.dark : styles.light}`}>
            <button 
              className={`${styles.abaBtn} ${abaPrincipal === 'cadastro' ? styles.abaAtiva : ''}`}
              onClick={() => setAbaPrincipal('cadastro')}
            >
              Cadastre-se
            </button>
            <button 
              className={`${styles.abaBtn} ${abaPrincipal === 'login' ? styles.abaAtiva : ''}`}
              onClick={() => setAbaPrincipal('login')}
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
                <div className={styles.grupoInput}>
                  <label>Nome</label>
                  <input 
                    type="text" 
                    placeholder="Digite seu nome completo"
                    value={nomeCadastro}
                    onChange={(e) => setNomeCadastro(e.target.value)}
                    required 
                  />
                </div>

                <div className={styles.grupoInput}>
                  <label>Data de Nascimento</label>
                  <input 
                    type="date" 
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    required 
                  />
                </div>

                <div className={styles.grupoInput}>
                  <label>E-mail</label>
                  <input 
                    type="email" 
                    placeholder="suds@exemplo.com"
                    value={emailCadastro}
                    onChange={(e) => setEmailCadastro(e.target.value)}
                    required 
                  />
                </div>

                <div className={styles.grupoInput}>
                  <label>Senha</label>
                  <input 
                    type="password" 
                    placeholder="Crie uma senha segura"
                    value={senhaCadastro}
                    onChange={(e) => setSenhaCadastro(e.target.value)}
                    required 
                  />
                </div>

                <div className={styles.grupoInput}>
                  <label>Confirmar Senha</label>
                  <input 
                    type="password" 
                    placeholder="Repita sua senha"
                    value={confirmarSenhaCadastro}
                    onChange={(e) => handleConfirmarSenha(e.target.value)}
                    required 
                  />
                </div>

                {erroSenha && (
                  <div className={styles.mensagemErro}>
                    ⚠️ {erroSenha}
                  </div>
                )}

                {tipoUsuario === 'profissional' && (
                  <div className={styles.grupoInput}>
                    <label>CRM / CRP / Registro Profissional</label>
                    <input 
                      type="text" 
                      placeholder="Seu número de registro"
                      value={registroProfissional}
                      onChange={(e) => setRegistroProfissional(e.target.value)}
                      required 
                    />
                  </div>
                )}

                <button 
                  type="submit" 
                  className={styles.botaoEnviar}
                  disabled={carregando || (erroSenha !== '' && confirmarSenhaCadastro !== '')}
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
                {erroLogin && (
                  <div className={styles.mensagemErro}>
                    ⚠️ {erroLogin}
                  </div>
                )}

                <div className={styles.grupoInput}>
                  <label>E-mail</label>
                  <input 
                    type="email" 
                    placeholder="suds@exemplo.com"
                    value={emailLogin}
                    onChange={(e) => setEmailLogin(e.target.value)}
                    required 
                  />
                </div>
                <div className={styles.grupoInput}>
                  <label>Senha</label>
                  <input 
                    type="password" 
                    placeholder="Sua senha"
                    value={senhaLogin}
                    onChange={(e) => setSenhaLogin(e.target.value)}
                    required 
                  />
                </div>

                <div className={styles.grupoCheckbox}>
                  <input 
                    type="checkbox" 
                    id="esqueceuSenha"
                    checked={esqueceuSenha}
                    onChange={() => setEsqueceuSenha(!esqueceuSenha)}
                    className={`${styles.checkboxEsqueceu} ${esqueceuSenha ? styles.marcado : ''}`}
                  />
                  <label htmlFor="esqueceuSenha" className={styles.labelCheckbox}>
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
'use client';
import { useUser } from '@/app/context/UserContext';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';
import styles from './settings.module.css';

export default function SettingsPage() {
  // Pegamos as funções de atualização e logout que já existem no seu UserContext!
  const { user, role, updateRole, logout, loading } = useUser();

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Função de front-end para simular a exclusão de dados
  const handleLimparDados = () => {
    const confirmar = confirm(
      "Tem certeza que deseja limpar seus dados locais? Isso resetará o app para o estado inicial."
    );
    
    if (confirmar) {
      // Executa o logout que limpa o LocalStorage do usuário e do modal
      logout();
      alert("Todos os dados locais foram limpos com sucesso!");
      window.location.href = '/'; // Redireciona para a home limpinha
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <Sidebar />
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h1 className={styles.pageTitle}>⚙️ Configurações</h1>
          <p className={styles.pageSubtitle}>Gerencie suas preferências locais do aplicativo</p>
        </div>

        <div className={styles.settingsSections}>
          
          {/* SEÇÃO 1: Identidade de Testes */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>👤 Perfil de Testes</h2>
            
            <div className={styles.settingItem}>
              <div className={styles.settingLabel}>
                <label>Usuário Atual</label>
                <input
                  type="text"
                  value={user?.nome || 'Visitante'}
                  disabled
                  className={styles.input}
                />
              </div>
            </div>

            {/* SUPER UTIL: Altera o papel usando o seu context atual */}
            <div className={styles.settingItem}>
              <div className={styles.settingLabel}>
                <h3>Alternar Visão do Sistema</h3>
                <p>Mude o tipo de conta para testar os diferentes fluxos do app</p>
              </div>
              <select 
                className={styles.select}
                value={role}
                onChange={(e) => updateRole(e.target.value)}
              >
                <option value="patient">Paciente</option>
                <option value="professional">Profissional / Psicólogo</option>
              </select>
            </div>
          </section>

          {/* SEÇÃO 2: Limpeza e Reset (Totalmente Front-end) */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>🔒 Dados Locais</h2>

            <div className={styles.settingItem}>
              <div className={styles.settingLabel}>
                <h3>Resetar Aplicativo</h3>
                <p>
                  Apaga as preferências salvas neste navegador (como o aviso do modal de introdução e dados do visitante).
                </p>
              </div>
              <button 
                className={styles.btnDanger}
                onClick={handleLimparDados}
              >
                Limpar Todos os Dados
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
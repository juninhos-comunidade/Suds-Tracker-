'use client';
import { useUser } from '@/app/context/UserContext';
import styles from './Sidebar.module.css';

export default function Sidebar({ currentTab = 'home', onTabChange = () => {} }) {
  // CORRIGIDO: agora é 'tipoUsuario' em vez de 'role'
  const { user, tipoUsuario } = useUser();

  // Renderizar avatar com iniciais
  const getInitials = () => {
    if (!user || !user.nome) return 'U';
    return user.nome
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userEmail = user?.email || 'usuario@suds.com';
  const userName = user?.nome || 'Usuário';

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        {/* Logo */}
        <div className={styles.logo}>SUDS</div>

        {/* Perfil do Usuário */}
        <div className={styles.profileSection}>
          <div className={styles.avatar}>{getInitials()}</div>
          <h3 className={styles.userName}>{userName}</h3>
          <p className={styles.userEmail}>{userEmail}</p>
        </div>

        {/* Menu de Navegação */}
        <nav className={styles.navMenu}>
          <ul>
            <li>
              <button 
                className={`${styles.navLink} ${currentTab === 'home' ? styles.active : ''}`}
                onClick={() => onTabChange('home')}
              >
                Home
              </button>
            </li>
            
            {/* CORRIGIDO: Agora valida como 'paciente' */}
            {tipoUsuario === 'paciente' && (
              <li>
                <button 
                  className={`${styles.navLink} ${currentTab === 'estatisticas' ? styles.active : ''}`}
                  onClick={() => onTabChange('estatisticas')}
                >
                  Estatísticas
                </button>
              </li>
            )}

            {/* CORRIGIDO: Agora valida como 'profissional' */}
            {tipoUsuario === 'profissional' && (
              <li>
                <button 
                  className={`${styles.navLink} ${currentTab === 'home' ? styles.active : ''}`}
                  onClick={() => onTabChange('home')}
                >
                  Dashboard
                </button>
              </li>
            )}

            <li>
              <button 
                className={`${styles.navLink} ${currentTab === 'sobre' ? styles.active : ''}`}
                onClick={() => onTabChange('sobre')}
              >
                Sobre SUDS
              </button>
            </li>
          </ul>
        </nav>

       { /* Configurações */}
        <div className={styles.actionButtons}>
          <button 
            className={`${styles.navLink} ${currentTab === 'settings' ? styles.active : ''}`}
            onClick={() => onTabChange('settings')}
          >
            Configurações
          </button>
        </div>
      </div>
    </aside>
  );
}
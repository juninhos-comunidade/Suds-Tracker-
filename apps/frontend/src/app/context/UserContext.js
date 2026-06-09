'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState('paciente'); // 'paciente' | 'profissional'
  const [loading, setLoading] = useState(true);
  const [showSudsModal, setShowSudsModal] = useState(false);

  // Carregar dados do usuário ao iniciar o app
  useEffect(() => {
    const loadUserData = () => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('suds_current_user');
        const storedTipoUsuario = localStorage.getItem('suds_tipo_usuario');
        const dontShowModal = localStorage.getItem('suds_modal_dont_show');

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setTipoUsuario(storedTipoUsuario || parsedUser.tipoUsuario || 'paciente');
        } else {
          // Se não houver ninguém logado, define um visitante temporário para testes
          const guestUser = { id: 'guest', nome: 'Visitante', tipoUsuario: 'paciente' };
          setUser(guestUser);
          setTipoUsuario('paciente');
        }

        if (!dontShowModal) {
          setShowSudsModal(true);
        }
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('suds_current_user', JSON.stringify(userData));
    if (userData.tipoUsuario) {
      setTipoUsuario(userData.tipoUsuario);
      localStorage.setItem('suds_tipo_usuario', userData.tipoUsuario);
    }
  };

  const updateTipoUsuario = (newTipoUsuario) => {
    setTipoUsuario(newTipoUsuario);
    localStorage.setItem('suds_tipo_usuario', newTipoUsuario);
    
    if (user) {
      const updatedUser = { ...user, tipoUsuario: newTipoUsuario };
      setUser(updatedUser);
      localStorage.setItem('suds_current_user', JSON.stringify(updatedUser));
    }
  };

 
const fecharOModal = () => {
  setShowSudsModal(false); 
  
};

  const logout = () => {
    setUser(null);
    setTipoUsuario('paciente');
    setShowSudsModal(true);
    localStorage.removeItem('suds_current_user'); // diz pro navegador esquecer o nome do usuário
    localStorage.removeItem('suds_tipo_usuario'); // diz pro navegador esquecer se era paciente/profissional
    localStorage.removeItem('suds_modal_dont_show'); // Faz o modal de introdução voltar a aparecer no próximo login
    localStorage.removeItem('suds_auth_token'); // Joga fora a chave de acesso do usuário (mesmo que seja só um token de teste por enquanto)
  };

  return (
    <UserContext.Provider
      value={{
        user,
        tipoUsuario,
        loading,
        showSudsModal,
        updateUser,
        updateTipoUsuario,
        fecharOModal,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de UserProvider');
  }
  return context;
}
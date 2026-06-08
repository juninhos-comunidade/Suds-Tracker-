'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('patient'); // 'patient' | 'professional'
  const [loading, setLoading] = useState(true);
  const [showSudsModal, setShowSudsModal] = useState(false);

  // Carregar dados do usuário ao iniciar o app
  useEffect(() => {
    const loadUserData = () => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('suds_current_user');
        const storedRole = localStorage.getItem('suds_role');
        const dontShowModal = localStorage.getItem('suds_modal_dont_show');

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setRole(storedRole || parsedUser.role || 'patient');
        } else {
          // Se não houver ninguém logado, define um visitante temporário para testes
          const guestUser = { id: 'guest', nome: 'Visitante', role: 'patient' };
          setUser(guestUser);
          setRole('patient');
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
    if (userData.role) {
      setRole(userData.role);
      localStorage.setItem('suds_role', userData.role);
    }
  };

  const updateRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('suds_role', newRole);
    
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem('suds_current_user', JSON.stringify(updatedUser));
    }
  };

  const fecharOModal = () => {
    setShowSudsModal(false);
    localStorage.setItem('suds_modal_dont_show', 'true');
  };

  const logout = () => {
    setUser(null);
    setRole('patient');
    setShowSudsModal(true);
    localStorage.removeItem('suds_current_user'); // Só diz pro navegador esquecer o nome do usuário
    localStorage.removeItem('suds_role'); // Só diz pro navegador esquecer se era paciente/psicólogo
    localStorage.removeItem('suds_modal_dont_show'); // Faz o modal de introdução voltar a aparecer no próximo login
    localStorage.removeItem('suds_auth_token'); // Joga fora a chave de acesso do usuário (mesmo que seja só um token de teste por enquanto)
  };

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        loading,
        showSudsModal,
        updateUser,
        updateRole,
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
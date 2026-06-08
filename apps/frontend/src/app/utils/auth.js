/**
 * SERVIÇO DE AUTENTICAÇÃO E API
 * Gerencia a sessão local e prepara os caminhos para o Back-end.
 */


/**
 * Salva o token de autenticação no navegador do usuário.
 */
export function saveToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('suds_auth_token', token);
  }
}

/**
 * Recupera o token salvo para validar se a sessão está ativa.
 */
export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('suds_auth_token');
  }
  return null;
}

/**
 * Remove o token e os dados locais ao desconectar.
 */
export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('suds_auth_token');
    localStorage.removeItem('suds_current_user');
  }
}

/**
 * Verifica de forma rápida se o usuário possui um token válido.
 */
export function isAuthenticated() {
  return !!getToken();
}



// O Back-end vai substituir o conteúdo abaixo por um 'fetch(/api/login)'
export async function loginUser(email, password) {
 // Simulação de resposta de sucesso temporária
  return { 
    token: 'token_temporario_de_teste', 
    user: { id: 'visitante_id', nome: 'Visitante', email, role: 'patient' } 
  };
}

export async function createUser(userData) {
  // O Back-end vai receber userData e salvar no banco de dados real
  return { 
    id: 'novo_id_do_banco', 
    ...userData 
  };
}



export async function saveSudsRecord(recordData) { return recordData; }
export async function getSudsRecords() { return []; }
export async function getUserStatistics() { return {}; }
/**
 * (API BLUEPRINT)
  * Este arquivo é um guia de referência para o formato dos dados que o Back-end deve enviar e receber.
 */

// Modelo do que o Back-end deve retornar no endpoint de listagem de registros (Ex: GET /api/suds)
export const MOCK_SUDS_RECORDS = [
  {
    id: 'record_001',
    data: '2026-06-01',
    valor: 65,
    emocao: 'ansiedade',
    observacoes: 'Dia de grande estresse no trabalho',
    criadoEm: '2026-06-01T10:30:00',
  },
  {
    id: 'record_002',
    data: '2026-06-02',
    valor: 55,
    emocao: 'preocupação',
    observacoes: 'Melhor após conversa com amigo',
    criadoEm: '2026-06-02T15:45:00',
  },
  {
    id: 'record_003',
    data: '2026-06-03',
    valor: 40,
    emocao: 'calma',
    observacoes: 'Dia tranquilo, consegui relaxar',
    criadoEm: '2026-06-03T20:00:00',
  },
];

// Modelo do que o Back-end deve retornar no endpoint de estatísticas (Ex: GET /api/suds/stats)
export const MOCK_STATISTICS = {
  mediaGeral: 53.3,
  emocaoMaisFrequente: 'ansiedade',
  registrosTotal: 42,
  diasConsecutivos: 15,
  melhoriaPercentual: 12.5,
  tendencia: 'ascendente',
  evolucaoMensal: [
    { mes: 'Janeiro', media: 72 },
    { mes: 'Fevereiro', media: 68 },
    { mes: 'Março', media: 61 },
    { mes: 'Abril', media: 57 },
    { mes: 'Maio', media: 54 },
    { mes: 'Junho', media: 53 },
  ],
  emocoes: {
    ansiedade: 18,
    preocupação: 12,
    calma: 8,
    felicidade: 4,
  },
};

// Mantido estático apenas para evitar erros de importação caso alguma tela chame
export function getMockUserByRole(role) {
  return { id: 'test_id', nome: 'Usuário de Teste', role: role || 'patient' };
}
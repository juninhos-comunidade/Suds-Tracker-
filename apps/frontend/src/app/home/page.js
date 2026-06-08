'use client';
import { useState } from 'react';
import { useUser, UserProvider } from '@/app/context/UserContext';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';
import SudsModal from '@/app/components/SudsModal';
import styles from './home.module.css';
import { MOCK_STATISTICS } from '@/app/utils/mockData';

export default function HomePage() {
  return (
    <UserProvider>
      <HomeContent />
    </UserProvider>
  );
}

function HomeContent() {
  // Ajustado destructuring para pegar tipoUsuario e updateTipoUsuario
  const { user, tipoUsuario, updateTipoUsuario, logout, loading, showSudsModal, fecharOModal } = useUser();
  const [currentTab, setCurrentTab] = useState('home');

  // ESTADO AUXILIAR: Controla quando o usuário força a abertura clicando no botão manual
  const [forcedModalOpen, setForcedModalOpen] = useState(false);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando...</p>
      </div>
    );
  }

  const handleLimparDados = () => {
    const confirmar = confirm("Deseja limpar as preferências locais deste navegador?");
    if (confirmar) {
      logout();
      alert("Dados limpos! O app foi reiniciado.");
      window.location.reload();
    }
  };

  // LÓGICA DO MODAL: Abre automaticamente se o context mandar OU se o usuário clicar manualmente no botão "Saber mais"
  const deveExibirOModal = (showSudsModal || forcedModalOpen) && tipoUsuario === 'paciente';

  const handleFecharModalGeral = () => {
    fecharOModal();            // Fecha a sessão automática do contexto
    setForcedModalOpen(false); // Desativa o gatilho do clique manual
  };

  return (
    <div className={styles.homeContainer}>
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Controlado centralizadamente e pelo estado manual */}
      {deveExibirOModal && (
        <SudsModal 
          onClose={handleFecharModalGeral} 
          onSaibaMais={() => {
            handleFecharModalGeral();
            setCurrentTab('sobre'); 
          }}
        />
      )}

      <Header />

      <main className={styles.mainContent} style={{ display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
        
        <div style={{ flex: 1 }}>
          {/* ABA: HOME */}
          {currentTab === 'home' && (
            <>
              <div className={styles.contentHeader}>
                <h1 className={styles.pageTitle}>
                  {tipoUsuario === 'paciente' ? 'Diário SUDS' : 'Painel de Controle Clínico'}
                </h1>
                <p className={styles.pageSubtitle}>
                  {tipoUsuario === 'paciente'
                    ? 'Registre suas emoções e acompanhe sua evolução'
                    : 'Monitore o nível de perturbação subjetiva de seus pacientes vinculados'}
                </p>
              </div>

              <div className={styles.dashboardTopRow}>
                {/* BANNER INFORMATIVO */}
                <section className={styles.bannerInformativo}>
                  <div className={styles.bannerConteudoTexto}>
                    <span className={styles.bannerEtiqueta}>Informativo</span>
                    <h2>{tipoUsuario === 'paciente' ? 'O que é a escala SUDS?' : 'Central de Monitoramento'}</h2>
                    <p>
                      {tipoUsuario === 'paciente'
                        ? 'A Unidade Subjetiva de Perturbação (SUDS) mede sua ansiedade ou desconforto de 0 a 100. Use o diário regularmente para identificar seus padrões emocionais.'
                        : 'Abaixo estão consolidados os dados coletados pelos diários de seus pacientes em tempo real. Utilize as métricas para pautar suas próximas sessões clínicas.'}
                    </p>
                    {tipoUsuario === 'paciente' && (
                      <button 
                        className={styles.bannerBotao} 
                        onClick={() => setForcedModalOpen(true)} // CORRIGIDO: Ativa o modal manualmente sem dar reload!
                      >
                        Saber mais sobre o método →
                      </button>
                    )}
                  </div>
                  <div className={styles.bannerIconeMental}>🧠</div>
                </section>

                {/* CARD DE RESUMO SEMANAL */}
                <div className={styles.companionCard}>
                  <span className={styles.companionTag}>Resumo Semanal</span>
                  <h3>{tipoUsuario === 'paciente' ? 'Sua Evolução' : 'Atividade da Clínica'}</h3>
                  <p>
                    {tipoUsuario === 'paciente'
                      ? 'Você manteve uma excelente constância de registros nos últimos dias. Continue mapeando!'
                      : 'Há novos registros críticos de nível SUDS acima de 70 que requerem atenção no seu painel.'}
                  </p>
                  <button 
                    className={styles.companionBtn}
                    onClick={() => setCurrentTab('estatisticas')}
                  >
                    {tipoUsuario === 'paciente' ? 'Ver estatísticas →' : 'Ver análises clínicas →'}
                  </button>
                </div>
              </div>

              {/* ÁREA DE AÇÃO PRINCIPAL */}
              <section className={styles.contentArea}>
                <div className={styles.placeholderCard}>
                  <div className={styles.placeholderIcon}>
                    {tipoUsuario === 'paciente' ? '📝' : '👥'}
                  </div>
                  <h2>{tipoUsuario === 'paciente' ? 'Pronto para começar?' : 'Gestão de Pacientes'}</h2>
                  <p>
                    {tipoUsuario === 'paciente'
                      ? 'Adicione um novo registro e mapeie como está seu nível de estresse ou calmaria agora.'
                      : 'Visualize e gerencie a listagem completa de indivíduos sob sua supervisão psicológica.'}
                  </p>
                  <div className={styles.actionButtons}>
                    {tipoUsuario === 'paciente' ? (
                      <button className={styles.btnPrimary} onClick={() => alert('Formulário de nota SUDS (Em breve!)')}>
                        + Novo Registro SUDS
                      </button>
                    ) : (
                      <button className={styles.btnPrimary} onClick={() => alert('Vincular novo Paciente')}>
                        + Vincular Novo Paciente
                      </button>
                    )}
                  </div>
                </div>
              </section>

              {/* CARDS COMPLEMENTARES - GRID */}
              <section className={styles.cardsGrid}>
                <div className={styles.gridCard}>
                  <div className={styles.cardWidgetHeader}>
                    <h3>{tipoUsuario === 'paciente' ? 'Próximos Passos' : 'Agenda do Dia'}</h3>
                    <span className={styles.widgetBadge}>A fazer</span>
                  </div>
                  <p className={styles.widgetMainText}>
                    {tipoUsuario === 'paciente' ? 'Nenhum exercício pendente' : '3 Sessões Confirmadas'}
                  </p>
                  <span className={styles.widgetFooter}>
                    {tipoUsuario === 'paciente' ? 'Próxima consulta: Quinta-feira' : 'Próxima: Paciente de ID 001 às 14h'}
                  </span>
                </div>

                <div className={styles.gridCard}>
                  <div className={styles.cardWidgetHeader}>
                    <h3>{tipoUsuario === 'paciente' ? 'Último Registro' : 'Alertas Críticos'}</h3>
                    <span className={styles.widgetBadgeMuted}>Hoje</span>
                  </div>
                  <p className={styles.widgetMainText}>
                    {tipoUsuario === 'paciente' ? 'SUDS: 35' : 'Nenhum Alerta'}
                  </p>
                  <span className={styles.widgetFooterStatus}>
                    {tipoUsuario === 'paciente' ? 'Nível de incômodo: Leve' : 'Estabilidade geral na última semana'}
                  </span>
                </div>

                <div className={styles.gridCard}>
                  <div className={styles.cardWidgetHeader}>
                    <h3>Insights</h3>
                    <span className={styles.widgetBadgeLight}>Dica</span>
                  </div>
                  <p style={{ margin: 0 }} className={styles.widgetInsightText}>
                    {tipoUsuario === 'paciente'
                      ? '“Registrar o SUDS pela manhã ajuda a mapear gatilhos de ansiedade preventiva antes da rotina.”'
                      : '“Acompanhar a curva descendente do SUDS ajuda a comprovar a eficácia das abordagens cognitivo-comportamentais aplicadas.”'}
                  </p>
                </div>
              </section>

              {/* COLABORADORES DO PROJETO */}
              <section className={styles.collaboratorsSection}>
                <h2 className={styles.sectionTitle}>Colaboradores do Projeto</h2>
                <div className={styles.collaboratorsGrid}>
                  <div className={styles.collaboratorCard}><div className={styles.collaboratorAvatar}>👨‍⚕️</div><div className={styles.collaboratorInfo}><h4>João Guilherme</h4><p>back-end</p></div></div>
                  <div className={styles.collaboratorCard}><div className={styles.collaboratorAvatar}>💻</div><div className={styles.collaboratorInfo}><h4>Júlia Barbosa</h4><p>back-end/segurança</p></div></div>
                  <div className={styles.collaboratorCard}><div className={styles.collaboratorAvatar}>🎨</div><div className={styles.collaboratorInfo}><h4>Well</h4><p>back-end/API</p></div></div>
                  <div className={styles.collaboratorCard}><div className={styles.collaboratorAvatar}>👩‍⚕️</div><div className={styles.collaboratorInfo}><h4>Laryssa Ferreira</h4><p>UI-UX/Frontend</p></div></div>
                  <div className={styles.collaboratorCard}><div className={styles.collaboratorAvatar}>⚙️</div><div className={styles.collaboratorInfo}><h4>Yuri</h4><p>back-end</p></div></div>
                  <div className={styles.collaboratorCard}><div className={styles.collaboratorAvatar}>📋</div><div className={styles.collaboratorInfo}><h4>Levi Santos</h4><p>frontend</p></div></div>
                </div>
              </section>
            </>
          )}

          { /* ABA ESTATÍSTICAS */}
          {currentTab === 'estatisticas' && (
            <div className={styles.tabContent}>
              <h1 className={styles.pageTitle}>Estatísticas</h1>
              <p className={styles.pageSubtitle}>
                {tipoUsuario === 'paciente' ? 'Gráficos e evolução dos seus níveis de SUDS' : 'Visão geral consolidada da sua base de pacientes'}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div className={styles.gridCard} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
                  <span style={{ fontSize: '24px' }}>📊</span>
                  <div>
                    <h3 style={{ fontSize: '12px', color: '#8a828e', margin: 0, fontWeight: 500 }}>
                      {tipoUsuario === 'paciente' ? 'Média Geral' : 'Média da Clínica'}
                    </h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d2930', margin: '4px 0 0 0' }}>{MOCK_STATISTICS.mediaGeral}</p>
                  </div>
                </div>

                <div className={styles.gridCard} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
                  <span style={{ fontSize: '24px' }}>🔥</span>
                  <div>
                    <h3 style={{ fontSize: '12px', color: '#8a828e', margin: 0, fontWeight: 500 }}>
                      {tipoUsuario === 'paciente' ? 'Dias Seguidos' : 'Atendimentos Mês'}
                    </h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d2930', margin: '4px 0 0 0' }}>
                      {tipoUsuario === 'paciente' ? `${MOCK_STATISTICS.diasConsecutivos}d` : '28'}
                    </p>
                  </div>
                </div>

                <div className={styles.gridCard} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
                  <span style={{ fontSize: '24px' }}>🧠</span>
                  <div>
                    <h3 style={{ fontSize: '12px', color: '#8a828e', margin: 0, fontWeight: 500 }}>
                      {tipoUsuario === 'paciente' ? 'Mais Comum' : 'Gatilho Frequente'}
                    </h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d2930', margin: '4px 0 0 0', textTransform: 'capitalize' }}>{MOCK_STATISTICS.emocaoMaisFrequente}</p>
                  </div>
                </div>

                <div className={styles.gridCard} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
                  <span style={{ fontSize: '24px' }}>📝</span>
                  <div>
                    <h3 style={{ fontSize: '12px', color: '#8a828e', margin: 0, fontWeight: 500 }}>
                      {tipoUsuario === 'paciente' ? 'Total Registros' : 'Prontuários Ativos'}
                    </h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d2930', margin: '4px 0 0 0' }}>
                      {tipoUsuario === 'paciente' ? MOCK_STATISTICS.registrosTotal : '12 pacientes'}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.gridCard} style={{ textAlign: 'center', padding: '40px 20px', border: '2px dashed #eae6f0', background: 'none' }}>
                <p style={{ fontWeight: '600', color: '#615966', margin: '0 0 4px 0' }}>📈 Gráfico de Evolução de Sintomas</p>
                <p style={{ fontSize: '13px', color: '#8a828e', margin: 0, maxWidth: '450px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.4 }}>
                  Espaço preparado para renderização acessível. Quando o back-end injetar as rotas de histórico, utilizaremos o Recharts para plotar uma linha lilás estática com balões de texto descritivos.
                </p>
              </div>
            </div>
          )}

          {/* ABA: SOBRE O SUDS */}
          {currentTab === 'sobre' && (
            <div className={styles.tabContent} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h1 className={styles.pageTitle}>Sobre o SUDS</h1>
                <p className={styles.pageSubtitle}>Entenda a aplicação prática da escala</p>
                
                <div className={styles.gridCard}>
                  <h3>Como avaliar seu nível:</h3>
                  <ul style={{ paddingLeft: '20px', marginTop: '10px', lineHeight: 1.8 }}>
                    <li><strong>0:</strong> Totalmente relaxado, paz absoluta.</li>
                    <li><strong>25:</strong> Desconforto leve, pequenos pensamentos de preocupação.</li>
                    <li><strong>50:</strong> Ansiedade moderada, desconfortável mas ainda sob controle.</li>
                    <li><strong>75:</strong> Perturbação severa, muito difícil de concentrar.</li>
                    <li><strong>100:</strong> O pior nível de ansiedade, pânico ou estresse traumático possível.</li>
                  </ul>
                </div>
              </div>

              <section className={styles.bannerInformativo} style={{ maxWidth: '100%' }}>
                <div className={styles.bannerConteudoTexto}>
                  <span className={styles.bannerEtiqueta}>Informativo</span>
                  <h2>Por que mapear diariamente?</h2>
                  <p>
                    Ao criar constância nas respostas livres do seu diário pessoal e cruzar com as notas de 0 a 100, nosso sistema gera um mapa preventivo. Isso ajuda você e seu profissional de saúde a detectar picos de estresse antes mesmo que eles se tornem uma crisis de ansiedade.
                  </p>
                </div>
                <div className={styles.bannerIconeMental}>💡</div>
              </section>
            </div>
          )}

          {/* CONFIGURAÇÕES */}
          {currentTab === 'settings' && (
            <div className={styles.tabContent}>
              <h1 className={styles.pageTitle}>Configurações do Sistema</h1>
              <p className={styles.pageSubtitle}>Gerencie suas preferências locais de desenvolvimento</p>
              
              <div className={styles.gridCard} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#615966' }}>Usuário de Sessão:</p>
                  <code style={{ background: '#f5f4f7', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>
                    {user?.nome || 'Visitante'} ({user?.email || 'usuario@suds.com'})
                  </code>
                </div>

                <div style={{ borderTop: '1px solid #eae6f0', paddingTop: '16px' }}>
                  <p style={{ margin: '0 0 6px 0', fontWeight: '500', color: '#615966' }}>Simular Visão do App:</p>
                  <select 
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #eae6f0', background: '#fff', cursor: 'pointer', fontSize: '14px' }}
                    value={tipoUsuario}
                    onChange={(e) => updateTipoUsuario(e.target.value)}
                  >
                    <option value="paciente">Visão: Paciente</option>
                    <option value="profissional">Visão: Profissional / Psicólogo</option>
                  </select>
                </div>

                <div style={{ borderTop: '1px solid #eae6f0', paddingTop: '16px' }}>
                  <button 
                    onClick={handleLimparDados}
                    style={{ background: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
                  >
                    Limpar Preferences do Navegador
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        { /* RODAPÉ */}
        <footer style={{
          marginTop: '40px',
          padding: '24px 0 8px 0',
          borderTop: '1px solid #eae6f0',
          display: 'flex',
          justifyContent: 'between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#8a828e' }}>
            &copy; 2026 SUDS App. Todos os direitos reservados.
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: '#b5aeb9', fontWeight: '500' }}>
            Designed & Built with 💜
          </p>
        </footer>

      </main>
    </div>
  );
}
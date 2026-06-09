'use client';
import { useState } from 'react';
import styles from './SudsModal.module.css';
import Image from 'next/image';

export default function SudsModal({ onClose, onSaibaMais }) {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAcaoFinal = (tipo) => {
    // 1. CORRIGIDO: Agora usa a chave certa 'suds_modal_dont_show'
    // E só salva SE o usuário marcou a caixinha 'Não mostrar essa apresentação ao entrar'
    if (typeof window !== 'undefined' && dontShowAgain) {
      localStorage.setItem('suds_modal_dont_show', 'true');
    }

    if (tipo === 'saiba_mais' && onSaibaMais) {
      onSaibaMais();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={() => handleAcaoFinal('fechar')}>
          ✕
        </button>

        <div className={styles.header}>
          <div className={styles.avatarContainer}>
            {!imageError ? (
              <Image 
                src="/lua.png"  /* TEMPORÁRIO */ 
                alt="Assistente SUDS" 
                width={75}            
                height={75}           
                className={styles.avatarImage} 
                onError={() => setImageError(true)}
              />
            ) : (
              <span className={styles.avatarEmoji}>👩‍⚕️✨</span>
            )}
          </div>
          <h2>Bem-vindo ao SUDS</h2>
          <p className={styles.subtitle}>Seu acompanhamento de saúde mental</p>
        </div>

        <div className={styles.body}>
          <section className={styles.section}>
            <h3>O que é SUDS?</h3>
            <p>
              SUDS (Escala Subjetiva de Unidades de Perturbação) é um método que ajuda você a medir 
              o seu nível de ansiedade ou sofrimento em uma escala de 0 a 100. 
              0 significa total calma, enquanto 100 representa o pior nível de ansiedade possível.
            </p>
          </section>

          <section className={styles.section}>
            <h3>Como funciona?</h3>
            <p>
              Você registra periodicamente como está se sentindo. Nosso sistema acompanha sua evolução 
              ao longo do tempo, identificando padrões e ajudando você e seu profissional a compreender 
              melhor sua jornada emocional.
            </p>
          </section>

          <section className={styles.section}>
            <h3>Como usar a plataforma</h3>
            <ul>
              <li>Acesse seu Diário SUDS para registrar suas emoções</li>
              <li>Visualize suas Estatísticas e tendências</li>
              <li>Explore mais sobre o método em Sobre SUDS</li>
              <li>Configure suas preferências conforme necessário</li>
            </ul>
          </section>
        </div>

        {/* Caixa de Seleção Estilizada */}
        <div className={styles.checkboxSection}>
          <label htmlFor="dontShowAgain" className={styles.checkboxLabel}>
            <input
              type="checkbox"
              id="dontShowAgain"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className={styles.checkbox}
            />
            <span>Não mostrar essa apresentação ao entrar</span>
          </label>
        </div>

        <div className={styles.footer}>
          <button className={styles.btnSecondary} onClick={() => handleAcaoFinal('fechar')}>
            Entendi
          </button>
          <button className={styles.btnPrimary} onClick={() => handleAcaoFinal('saiba_mais')}>
            Saiba mais
          </button>
        </div>
      </div>
    </div>
  );
}
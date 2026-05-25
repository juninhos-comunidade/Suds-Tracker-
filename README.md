<h1 align="center">🧠 SUDS Tracker</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Comunidade-Juninhos-7B2CBF?style=for-the-badge&logo=discord&logoColor=white" alt="Juninhos Community" />
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange?style=for-the-badge" alt="Status" />
</p>

---

## 📝 Sobre o Projeto

O **SUDS Tracker** é uma ferramenta digital voltada para a **regulação emocional e saúde mental**. A aplicação utiliza a Escala Subjetiva de Unidades de Sofrimento (SUDS) para ajudar os usuários a identificarem, monitorarem e lidarem com seus níveis de estresse e ansiedade. A ideia é proporcionar um espaço seguro e intuitivo para que as pessoas possam entender melhor seus sentimentos e adotar práticas de autocuidado. SUDS Tracker é um projeto idealizado e liderado por Laryssa Ferreira.

Este projeto está sendo construído de forma 100% colaborativa dentro do ecossistema da **Comunidade Juninhos**. Nascido de uma ideia para ajudar na área da saúde mental, nosso foco primordial é criar um ambiente de aprendizado acolhedor, onde desenvolvedores de todos os níveis — especialmente iniciantes — possam unir forças, aplicar conceitos modernos de engenharia de software e entregar uma solução com excelente usabilidade e impacto social real.

> 💡 **Nota do Squad:** Este README serve como um documento vivo. Ele será atualizado continuamente conforme novas funcionalidades forem integradas nas sprints de 30 dias.

---

## 🛠️ Stack Tecnológica

O projeto foi estruturado seguindo os conceitos de **modularização**, alta coesão e baixo acoplamento, visando facilitar a contribuição de todos:

- **Frontend: Laryssa & Levi**
- **Backend: Well, Yuri, João**
- **Banco de Dados: Júlia**
- **Infraestrutura (Husky, Commitlint & Deploy): João & Well**

---

## 📌 Funcionalidades Principais

Aqui está o mapeamento de recursos que estão sendo construídos ou planejados para a plataforma SUDS Tracker:

- [ ] 🔐 **Sistema de Autenticação:** Login e Cadastro unificados via abas dinâmicas (Tabs sem recarregamento), garantindo a privacidade do usuário.
- [ ] 📈 **Check-in Emocional:** Formulário simples e empático para o usuário registrar seu nível de estresse/desconforto na escala SUDS (0 a 10).
- [ ] 🧘 **Dicas de Regulação:** Sugestões práticas de exercícios de respiração e mindfulness com base no nível de estresse registrado.
- [ ] 📊 **Gráficos de Acompanhamento:** Painel visual para exibição de estatísticas e evolução do humor do usuário ao longo das semanas.
- [ ] 📓 **Diário de Reflexão:** Espaço livre para anotações contextuais sobre o que pode ter causado a alteração emocional.

---

## ⚙️ Como Executar o Projeto Localmente

### 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- **Ambiente de Execução / Linguagem:** Node.js (versão LTS recomendada) ...
- **Controle de Versão:** Git ...
- **Gerenciador de Pacotes:** NPM (já vem instalado junto com o Node.js) ...
  **Banco de Dados:** PostgreSQL ...

### 🚀 Passos para Instalação

1. Clone o repositório oficial dentro da organização Juninhos:

   ```bash
   git clone [(https://github.com/juninhos-comunidade/Suds-Tracker-.git)](https://github.com/juninhos-comunidade/Suds-Tracker-.git)
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd suds-tracker
   ```

3. Instale todas as dependências necessárias:
   Você precisa instalar as dependências separadamente para o Frontend e para o Backend:

   ```bash
   # Instalando dependências do Frontend
   cd frontend
   npm install

   # Voltando para a raiz e instalando dependências do Backend
   cd ../backend
   npm install

   ```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto seguindo o modelo do `.env.example`.

5. Inicie o servidor de desenvolvimento:

Terminal 1: Iniciando o Frontend (Next.js) -> Rodará em http://localhost:3000

```
cd frontend
npm run dev
```

Terminal 2: Iniciando o Backend (Express) -> Rodará em http://localhost:5000

```
cd backend
npm run dev
```

---

## 🌿 Diretrizes do Git Flow (Guia de Sobrevivência)

Para manter o código limpo e organizado para todo o time, seguimos rigorosamente estas regras de contribuição:

### 1. Nomenclatura de Branches

Sempre criar uma ramificação específica para a sua tarefa a partir da branch principal com base no card do nosso Board:

- `SUD-#`

```bash
git checkout -b SUD-#
```

### 2. Padrão de Commits

Os commits devem ser claros, em português e indicar a intenção da alteração:

- `feat: adiciona funcionalidade`
- `bugfix: corrige um bug/lógica`
- `fix: corrige um erro de código`
- `style: atualiza cores ou estilos`
- `refactor: refatora código sem adicionar feature ou corrigir bug (renomeia váriaveis, remove código morto)`

### 3. Revisão de Código (Pull Requests)

- Nunca faça o merge direto na branch principal.
- Abra um **Pull Request (PR)** e solicite a revisão de pelo menos um outro membro do squad antes de aplicar as alterações.

---

## 👥 Nosso Squad

Um projeto completo só ganha vida com uma equipe sintonizada. Conheça as mentes por trás do desenvolvimento da plataforma:

|                                        Avatar                                         | Membro      | Função / Especialidade       | GitHub        |
| :-----------------------------------------------------------------------------------: | :---------- | :--------------------------- | :------------ |
| <img src="https://github.com/LaryssaHtml.png" width="40" style="border-radius:50%"/>  | **Laryssa** | UI/UX + Front-end (HTML/CSS) | @LaryssaHtml  |
|   <img src="https://github.com/jonnguii.png" width="40" style="border-radius:50%"/>   | **João**    | Back-end                     | @jonnguii     |
|   <img src="https://github.com/keitsdev.png" width="40" style="border-radius:50%"/>   | **Yuri**    | Back-end                     | @keitsdev     |
| <img src="https://github.com/JuhCodeSpace.png" width="40" style="border-radius:50%"/> | **Júlia**   | Banco de dados + Segurança   | @JuhCodeSpace |
| <img src="https://github.com/wellpaper23.png" width="40" style="border-radius:50%"/>  | **Well**    | Back-end                     | @wellpaper23  |
| <img src="https://github.com/ilevisantos.png" width="40" style="border-radius:50%"/>  | **Levi**    | Front-end (HTML/CSS)         | @ilevisantos  |

---

## ⚖️ Licença

Este projeto é de uso exclusivo e educacional dos membros vinculados à **Juninhos Community**.

---

## 🤝 Apoio e Organização

Este projeto é desenvolvido e mantido pelos membros da **Juninhos Community**.
Se precisar de suporte técnico, mentoria de deploy ou dúvidas sobre infraestrutura, use os canais oficiais no Discord.

```

```

# Guia do Backend

> Este guia explica o funcionamento, sintaxes, tecnologias e estrutura do backend do Suds Tracker.

---

## Configuração de Variáveis de Ambiente (.env) e Banco de Dados

Para rodar o backend localmente com o banco de dados, siga estes passos:

1. Certifique-se de que o Docker está rodando e inicie os containers a partir da raiz do projeto:
   ```bash
   docker-compose up -d
   ```
2. Copie o arquivo `.env.example` da raiz do projeto para a pasta `apps/backend/`. Ele deve conter as variáveis do banco de dados, por exemplo:

   ```env
   PORT=5000
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_db_name
   DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"
   ```

3. Instale as dependências do projeto na pasta `apps/backend`:
   ```bash
   npm install
   ```
4. Sincronize o banco de dados e gere o Prisma Client:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
5. Inicie o servidor:
   ```bash
   npm run dev
   ```

> O arquivo `.env` não deve ser versionado no Git. Use sempre o `.env.example` como referência para o time.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Prisma (ORM)
- PostgreSQL
- Docker

## Estrutura Básica

- **controllers/**: Funções que recebem requisições e retornam respostas.
- **routes/**: Define os endpoints e associa aos controllers.
- **services/**: Implementa regras de negócio e validações.
- **repositories/**: Responsável pela comunicação direta com o banco de dados (usando o Prisma Client).
- **config/**: Configurações do sistema, como instâncias de conexão de banco de dados (`database.js`).
- **prisma/**: Contém o modelo estrutural das tabelas (`schema.prisma`).
- **app.js**: Ponto de entrada da aplicação.

## Async Function (Função Assincrona)

```js
async / await
assinatura: async function método(argumentos)
exemplo: async function cadastrarUsuario(req, res)
```

Como o back-end vai precisar se comunicar com o banco de dados (que demora alguns milissegundos), nós usamos async para avisar que essa função lida com tarefas assíncronas. O await é usado dentro da função para dizer ao JavaScript: "Espere essa ação terminar antes de ir para a próxima linha".

```js
req(Request / Requisição);
```

Representa o pacote de dados que está chegando do Next.js. É aqui que o código do backend encontra os dados enviados pelo frontend.

```js
res(Response / Resposta);
```

É o megafone que o Express usa para gritar de volta para o frontend, enviando o status e os dados resultantes.

---

**TODO:**

- Adicionar exemplos de controllers, services e middlewares.
- Explicar autenticação, validação e tratamento de erros.

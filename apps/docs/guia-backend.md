# Guia do Backend

> Este guia explica o funcionamento, sintaxes, tecnologias e estrutura do backend do Suds Tracker.

---

## Configuração de Variáveis de Ambiente (.env)

Para rodar o backend localmente, siga estes passos:

1. Copie o arquivo `.env.example` e renomeie para `.env` na pasta `apps/backend`.
2. Preencha os valores necessários no `.env`. Exemplo:

   ```
   PORT=5000

   # Pode colocar qualquer valor de porta entre 1 e 65535
   # Outras variáveis podem ser adicionadas conforme necessário
   ```

3. Instale as dependências do projeto:
   ```
   npm install
   ```
4. Inicie o servidor:
   ```
   npm run dev
   ```

> O arquivo `.env` não deve ser versionado no Git. Use sempre o `.env.example` como referência para o time.

## Tecnologias Utilizadas

- Node.js
- Express.js
- (Adicionar outras tecnologias conforme necessário)

## Estrutura Básica

- **controllers/**: Funções que recebem requisições e retornam respostas.
- **routes/**: Define os endpoints e associa aos controllers.
- **services/**: Implementa regras de negócio e acesso a dados.
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

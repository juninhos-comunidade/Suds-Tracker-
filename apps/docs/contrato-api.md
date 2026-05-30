# Contrato da API

> Este documento define as regras de comunicação entre o frontend e o backend do projeto Suds Tracker. Aqui você encontrará exemplos de requisições, respostas e orientações para integração.

## Legenda dos Endpoints

- **Request Body:** O corpo da requisicão (o conteúdo) onde tem os dados enviados pelo frontend para o backend (o que será cadastrado, atualizado ou consultado).
- **Response:** A resposta com os dados retornados pelo backend após processar a requisição (o que será buscado, atualizado ou devolvido).

**Padrão de documentação para cada endpoint:**

- **Nome:** Descrição breve da funcionalidade do endpoint (Exemplo: Cadastro de usuário)
- **Endpoint:** Caminho da rota (URL) (Exemplo: /api/usuarios/cadastro)
- **Método:** Verbo/Método HTTP utilizado (GET, POST, PUT, DELETE, etc.)
- **Request Body:** Exemplo do corpo da requisição (quando aplicável) (Exemplo: JSON)
- **Response:** Exemplo da resposta esperada

---

## Cadastro de Usuário

**Endpoint:** `/api/usuarios/cadastro`  
**Método:** `POST`

**Request Body:**

```json
{
  "nome": "Laryssa Ferreira",
  "email": "laryssa@sudstracker.com",
  "senha": "senhaSuperSegura123",
  "data_nascimento": "2004-11-09",
  "crm": "123456-SP",
  "role": "PACIENTE"
}
```

**Response:**

```json
{
  "id": 1,
  "nome": "Laryssa Ferreira",
  "email": "laryssa@sudstracker.com",
  "role": "PACIENTE"
}
```

---

## Login

**Endpoint:** `/api/usuarios/login`  
**Método:** `POST`

**Request Body:**

```json
{
  "email": "laryssa@sudstracker.com",
  "senha": "senhaSuperSegura123"
}
```

**Response:**

```json
{
  "token": "<jwt_token>",
  "usuario": {
    "id": 1,
    "nome": "Laryssa Ferreira",
    "role": "PACIENTE"
  }
}
```

---

## Próximo titulo

.....

---

## Próximo titulo

....

---

## Observações

- Adicionar aqui exemplos de outras rotas, parâmetros, erros comuns, etc.
- Detalhe as validações e mensagens de erro relevantes.

---

**TODO:**

- Documentar rotas de atualização, deleção, listagem, etc.
- Adicionar exemplos de erros e respostas para casos de falha.

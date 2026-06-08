# Guia de Arquitetura

> Este guia apresenta a estrutura de pastas e a arquitetura do projeto Suds Tracker, explicando o papel de cada diretório e arquivo principal.

---

## Estrutura de Pastas

TODO

```

```

---

## Backend

- **controllers/**: Lógica das requisições, manipula dados recebidos e envia respostas.
- **routes/**: Define as rotas/endpoints da API.
- **services/**: Regras de negócio, validações e orquestração de operações.
- **repositories/**: Camada de acesso a dados (Data Access Layer), integra-se com o ORM (Prisma) para consultar ou alterar o banco.
- **config/**: Configurações do projeto, como a inicialização do client do banco de dados.
- **prisma/**: Arquivos do ORM, incluindo o arquivo `schema.prisma` com os modelos de banco de dados.
- **app.js**: Inicialização do servidor e configuração principal.

## Frontend

- **app/**: Componentes principais da aplicação, páginas e layouts.
- **globals.css**: Estilos globais.
- **layout.js**: Define o layout base das páginas.
- **page.js**: Página principal ou inicial.

---

**TODO:**

- Detalhar fluxos de dados entre frontend e backend.
- Adicionar exemplos de uso e boas práticas.

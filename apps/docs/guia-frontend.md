# Guia do Frontend

> Este guia apresenta as principais sintaxes, tecnologias e arquivos de estilização e HTML do frontend do Suds Tracker.

---

## Configurações de Variaveis de Ambiente (.env.local)

Para rodar o frontend localmente, siga estes passos:

1. Copie o arquivo .env.example da raiz do projeto para a pasta apps/frontend/ e renomeie para .env.local. Ele deve conter as variáveis públicas necessárias para comunicação com o backend, por exemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

2. Instale as dependências do projeto na pasta apps/frontend:

```bash
   npm install
```

3. Inicie o servidor de desenvolvimento do Next.js:

```bash
   npm run dev
```

4. Acesse a aplicação no navegador:

```bash
  http://localhost:3000
```
## Tecnologias Utilizadas

- Next.js
- React
- CSS Modules / globals.css
- (Adicionar outras tecnologias conforme necessário)

## Estrutura Básica

- **app/**:
- **globals.css**:
- **layout.js**:
- **page.js**:

## Exemplo de Componente (React no Next.Js)

```jsx
assinatura:
export default funcion nome() {
  return ...
}
exemplo:
export default function Home() {
  return <h1>Bem-vindo ao Suds Tracker!</h1>;
}
```

O export default significa....
Depois temos uma funcao comum JS, que retorna um titulo h1.

---

**TODO:**

- Adicionar exemplos de navegação, consumo de API e estilização.
- Explicar organização de componentes e boas práticas.

# API Node + Neo4j

Um projeto **kickstarter** para criar uma API simples utilizando **Node.js** e **Neo4j**.  
Ideal para quem deseja começar rapidamente a trabalhar com **bancos de dados em grafos**.

---

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/) (v14+ recomendado)  
- [Neo4j Desktop (Community Edition)](https://neo4j.com/download/)

---

## ⚙️ Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/api-node-neo4j.git
   cd api-node-neo4j
````

2. Inicialize o projeto Node.js:

   ```bash
   npm init -y
   ```

3. Instale as dependências necessárias:

   ```bash
   npm install express neo4j-driver
   ```

---

## ▶️ Execução

Para iniciar a API, execute:

```bash
node index.js
```

A API será iniciada em `http://localhost:3000` (ou na porta definida no seu código).

---

## 📖 Estrutura do Projeto

```
api-node-neo4j/
│
├── index.js          # Ponto de entrada da aplicação
├── package.json      # Configurações e dependências do projeto
└── README.md         # Documentação
```

---

## 🌐 Conexão com o Neo4j

Edite o arquivo `index.js` para incluir as credenciais do seu banco Neo4j:

```js
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "sua_senha")
);

module.exports = driver;
```

---

## ✨ Próximos Passos

* Criar rotas REST para manipular nós e relacionamentos.
* Adicionar um `.env` para gerenciar variáveis sensíveis (ex.: senha do Neo4j).
* Configurar scripts no `package.json` para rodar a API com `npm start`.

---

## 📚 Referências

* [Documentação Neo4j Driver](https://neo4j.com/docs/javascript-manual/current/)
* [Express.js](https://expressjs.com/)

# 🚀 Node.js Clean Architecture & DDD API

Este é um projeto de estudos focado no desenvolvimento de uma API robusta utilizando Node.js e TypeScript. O principal objetivo deste repositório é demonstrar a aplicação prática de padrões avançados de Engenharia de Software, incluindo **Domain-Driven Design (DDD)**, **Clean Architecture** e princípios **SOLID**.

---

## 🧠 Arquitetura e Padrões Aplicados

A aplicação foi rigorosamente dividida em camadas para garantir baixo acoplamento e alta coesão, permitindo que as regras de negócio sejam totalmente independentes de frameworks externos (como Express) ou bancos de dados.

### 1. Camada de Domínio (`src/domain`)

- **Entidades Ricas:** A entidade `User` não é apenas um recipiente de dados (modelo anêmico). Ela encapsula e protege seu próprio estado através de comportamentos com semântica de negócio (ex: `changeName()`, `changeEmail()`), aplicando a **Linguagem Ubíqua**.
- **Inversão de Dependência:** O domínio define contratos (Interfaces, como `IUserRepository`) que as camadas externas devem obedecer.

### 2. Camada de Aplicação (`src/application`)

- **Use Cases:** Cada funcionalidade do sistema (`CreateUser`, `FindUserById`, etc.) foi isolada em uma classe específica seguindo o Princípio da Responsabilidade Única (SRP).
- **Data Transfer Objects (DTOs):** Utilizados rigorosamente para higienizar os dados que entram no sistema e blindar os dados que saem. A aplicação emprega _Output DTOs_ para garantir que dados sensíveis da Entidade (como senhas) jamais vazem para a API.

### 3. Camada de Infraestrutura (`src/infrastructure`)

- **Repository Pattern:** O `UserRepositoryInMemory` implementa a interface do domínio, mapeando o "formato de banco de dados" (`UserDatabaseRow`) e restaurando a Entidade limpa.
- **Delivery (Express):** Isolamento total de regras HTTP (Controllers e Rotas). O Express apenas entrega e recebe JSON.
- **Composition Root:** Injeção de dependências orquestrada no `index.ts` das rotas, garantindo que o acoplamento ocorra apenas na fronteira mais externa da aplicação.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** (Ambiente de Execução)
- **TypeScript** (Tipagem Estática)
  - Configurações modernas de TS: ESM (`"type": "module"`, `"module": "nodenext"`).
  - Otimização rigorosa com `"verbatimModuleSyntax": true` (`import type` / `export type`).
- **Express** (Roteamento / Web Framework)
- **TSX** (Execução direta do TypeScript no Node)

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos

- Node.js (v18+ recomendado)
- NPM, Yarn ou PNPM

### Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd NOME_DO_REPOSITORIO
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### Iniciando o Servidor

Para rodar a aplicação em ambiente de desenvolvimento:

```bash
npm start
```

_O servidor estará rodando em `http://localhost:3000`._

---

## 🔗 Endpoints (Usuários)

A API possui dados mockados em memória para facilitar testes iniciais.

- `GET /api/v1/users` - Lista todos os usuários.
- `GET /api/v1/users/:id` - Busca um usuário por ID (ex: ID `b2d2f7e0-f2c1-4b1a-8c4d-9a3c7b2e1f4a`).
- `POST /api/v1/users` - Cria um novo usuário (Requer: `name`, `email`, `password` no body).
- `PUT /api/v1/users/:id` - Atualiza dados do usuário (Requer: `name` ou `email`).

---

_Projeto desenvolvido como parte do aprofundamento em arquitetura de software (Inspirado no método FullCycle)._

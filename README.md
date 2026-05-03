# Task App — Frontend

Interface web para o **Task Manager**, um sistema de gerenciamento de tarefas com autenticação JWT e controle de acesso por roles. Consome a [Task API](https://github.com/johnpligeiro/task-api) desenvolvida em Java + Spring Boot.

## 🌐 Demo

Acesse:
**[https://task-api-frontend-vercel.vercel.app](https://task-api-frontend-vercel.vercel.app)**

> [!WARNING]
> **Tempo de inicialização — leia antes de testar**
>
> A API está hospedada no plano gratuito do [Render](https://render.com), que hiberna o servidor após **1 hora de inatividade**.
>
> Na primeira requisição após esse período, a aplicação pode levar **até 1 minuto para responder** enquanto o servidor é reiniciado. Isso é esperado e não indica erro.
>
> **Após a inicialização, a aplicação responde normalmente.**

---

## 🛠️ Tecnologias

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS_4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

| Biblioteca | Uso |
|---|---|
| React 19 | Interface de usuário |
| TypeScript 5 (strict) | Tipagem estática |
| Vite 6 | Bundler e dev server |
| React Router DOM v7 | Roteamento client-side |
| TanStack Query v5 | Gerenciamento de estado do servidor |
| Zustand v5 | Estado global de autenticação |
| Axios | Cliente HTTP com interceptors JWT |
| React Hook Form v7 | Gerenciamento de formulários |
| Zod v3 | Validação de schemas |
| TailwindCSS v4 | Estilização utility-first |
| react-hot-toast | Notificações toast |
| lucide-react | Ícones |

---

## ✅ Funcionalidades

- **Autenticação**
  - Login e registro de usuário
  - Persistência de sessão via `localStorage`
  - Logout com limpeza de estado
  - Redirecionamento automático por autenticação
  - Token JWT injetado automaticamente via interceptor do Axios
  - Redirecionamento para login em caso de token expirado (401)

- **Tarefas**
  - Listagem com skeleton de carregamento
  - Filtros por status e prioridade
  - Criar tarefa via modal
  - Editar tarefa com formulário pré-preenchido
  - Atualizar status diretamente no card
  - Deletar com confirmação
  - Destaque visual para tarefas vencidas

- **UX**
  - Toast em todas as operações (sucesso e erro)
  - Estados de loading e empty state
  - Layout responsivo (mobile e desktop)
  - Badges coloridos por status e prioridade

---

## 🏗️ Estrutura de pastas

```
src/
├── api/
│   ├── axios.ts          # Instância Axios + interceptors JWT
│   ├── auth.ts           # Chamadas de autenticação
│   ├── tasks.ts          # Chamadas de tarefas
│   └── users.ts          # Chamadas de usuários
├── types/
│   └── index.ts          # Interfaces TypeScript (espelham o contrato da API)
├── store/
│   └── authStore.ts      # Zustand — token + usuário autenticado
├── hooks/
│   ├── useAuth.ts        # Mutations de login, registro e logout
│   ├── useTasks.ts       # Queries e mutations de tarefas
│   └── useUsers.ts       # Queries de usuários
├── routes/
│   ├── ProtectedRoute.tsx # Redireciona para /login se não autenticado
│   └── PublicRoute.tsx    # Redireciona para /tasks se autenticado
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── TasksPage.tsx
│   └── NotFoundPage.tsx
├── components/
│   ├── layout/           # Navbar e Layout principal
│   ├── tasks/            # TaskCard, TaskList, TaskForm, TaskFilters
│   ├── auth/             # AuthCard
│   └── ui/               # Button, Input, Modal, Badge, Spinner, EmptyState
├── utils/
│   ├── cn.ts             # Utilitário de classnames (clsx + tailwind-merge)
│   └── date.ts           # Formatação de datas
├── App.tsx               # Rotas, QueryClient e providers
└── main.tsx              # Entry point
```

---

## 🚀 Rodando localmente

### Pré-requisitos

- Node.js 20+
- A [Task API](https://github.com/johnpligeiro/task-api-render) rodando em `http://localhost:8080`

### Instalação

```bash
# Clone o repositório
git clone https://github.com/johnpligeiro/task-api-frontend-vercel.git
cd task-api-frontend-vercel

# Instale as dependências
npm install

# Configure a variável de ambiente
cp .env.example .env
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz com:

```env
# Deixe em branco para usar o proxy local do Vite (aponta para localhost:8080)
VITE_API_URL=
```

Para apontar para a API em produção:

```env
VITE_API_URL=https://task-api-render.onrender.com/api/v1
```

### Executar

```bash
npm run dev
```

Acesse **http://localhost:5173**

---

## 🌍 Deploy

O frontend está deployado na **Vercel** com integração contínua via GitHub. Cada push na branch `main` dispara um novo deploy automaticamente.

O proxy do Vite (`vite.config.ts`) redireciona chamadas `/api` para `localhost:8080` em desenvolvimento. Em produção, a variável `VITE_API_URL` aponta diretamente para a API no Render.

---

## 🔗 Repositório do Backend

A API consumida por este frontend foi desenvolvida em **Java 25 + Spring Boot 4**:

**[github.com/johnpligeiro/task-api](https://github.com/johnpligeiro/task-api)**

Inclui documentação completa dos endpoints, instruções de setup e deploy.

---

## 📄 Licença

MIT

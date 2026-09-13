<div align="center">

# CBALOL 2.0

### Portal do Campeonato Bagres de League of Legends

Uma aplicação **Full-Stack** desenvolvida para gerenciamento, divulgação e acompanhamento de um campeonato amador de League of Legends.

![Status](https://img.shields.io/badge/Status-Em%20Produção-brightgreen)
![Version](https://img.shields.io/badge/Versão-2.0-blue)
![License](https://img.shields.io/badge/Licença-MIT-lightgrey)

**React • TypeScript • Node.js • Express • MongoDB**

[🌐 Acessar projeto](https://cbalol-2-0.vercel.app/)

</div>

---

## 🎮 Sobre o projeto

O **CBALOL 2.0** é uma plataforma criada para centralizar as informações e o gerenciamento de um campeonato amador de League of Legends.

A primeira versão do projeto era um site estático. Na versão 2.0, a aplicação foi **reconstruída do zero como uma plataforma Full-Stack**, adicionando backend próprio, banco de dados, autenticação, painel administrativo e gerenciamento dinâmico do conteúdo.

Visitantes podem acompanhar notícias, jogadores, equipes, partidas e destaques do campeonato. Usuários cadastrados também podem interagir com as notícias através de curtidas e comentários.

Administradores possuem acesso a ferramentas exclusivas para gerenciamento do conteúdo da plataforma.

> Este projeto foi desenvolvido como uma aplicação real de estudos, com foco no aprofundamento de conhecimentos em desenvolvimento Full-Stack, arquitetura de APIs REST, autenticação e integração entre frontend e backend.

---

## 📸 Preview

> Adicione aqui screenshots da Home, página de times, notícias e painel administrativo.

```text
Home
Times e jogadores
Notícias
Partidas
Painel administrativo
```

---

## ✨ Principais funcionalidades

### 👤 Usuários

* Cadastro e autenticação com JWT
* Senhas protegidas com bcrypt
* Upload de foto de perfil
* Edição de perfil
* Controle de permissões entre membros e administradores

### 📰 Notícias

* Criação e edição de notícias
* Editor de texto rico com TipTap
* Curtidas
* Comentários
* Edição e exclusão de comentários
* Notícias relacionadas
* Sanitização de conteúdo HTML

### 🏆 Times e jogadores

* Cadastro e gerenciamento de equipes
* Logo e banner personalizados
* Cadastro completo de jogadores
* Roles, títulos e histórico de equipes
* Busca e filtros
* Página individual de cada equipe

### ⚔️ Partidas

* Cadastro de confrontos
* Formatos MD1, MD3 e MD5
* Registro de placares
* Partidas pendentes e finalizadas
* Ordenação automática por data

### 🌟 MVP

* Destaque de jogadores
* Pontuação e descrição
* Período configurável
* Exibição automática do MVP vigente

### 🛡️ Administração

Administradores possuem acesso a funcionalidades exclusivas para gerenciamento de:

* Notícias
* Times
* Jogadores
* Partidas
* MVPs
* Conteúdo da plataforma

---

## 🛠️ Tecnologias

### Frontend

| Tecnologia      | Utilização                          |
| --------------- | ----------------------------------- |
| React 19        | Interface da aplicação              |
| TypeScript      | Tipagem estática                    |
| Vite            | Ambiente de desenvolvimento e build |
| Tailwind CSS    | Estilização e responsividade        |
| React Router v7 | Roteamento                          |
| TanStack Query  | Requisições e estado do servidor    |
| Axios           | Comunicação com a API               |
| React Hook Form | Gerenciamento de formulários        |
| Zod             | Validação                           |
| TipTap          | Editor de texto rico                |
| DOMPurify       | Sanitização de HTML                 |
| Swiper          | Sliders e carrosséis                |

### Backend

| Tecnologia | Utilização                       |
| ---------- | -------------------------------- |
| Node.js    | Runtime                          |
| Express.js | API REST                         |
| TypeScript | Tipagem estática                 |
| MongoDB    | Banco de dados                   |
| Mongoose   | Modelagem e acesso ao MongoDB    |
| JWT        | Autenticação                     |
| bcrypt     | Hash de senhas                   |
| Zod        | Validação de dados               |
| CORS       | Controle de acesso entre origens |
| Cloudinary | Armazenamento de imagens         |

### Infraestrutura

| Serviço       | Utilização     |
| ------------- | -------------- |
| Vercel        | Frontend       |
| Railway       | Backend        |
| MongoDB Atlas | Banco de dados |
| Cloudinary    | Imagens        |

---

## 🏗️ Arquitetura

O backend segue uma arquitetura em camadas, separando as responsabilidades da aplicação:

```text
backend/src/

├── routes/
├── controllers/
├── services/
├── models/
├── middlewares/
├── schemas/
└── db/
```

Fluxo simplificado de uma requisição:

```text
Client
   │
   ▼
Route
   │
   ▼
Middleware
   │
   ├── JWT Authentication
   ├── Authorization
   └── Zod Validation
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
MongoDB
```

O frontend também é organizado de forma modular:

```text
frontend/src/

├── pages/
├── components/
├── contexts/
├── hooks/
├── services/
├── types/
├── utils/
└── assets/
```

---

## 🔐 Segurança

A aplicação implementa diferentes mecanismos de segurança:

* Hash de senhas utilizando bcrypt
* Autenticação baseada em JWT
* Expiração de tokens
* Middlewares para proteção de rotas
* Controle de permissões administrativas
* Validação de dados com Zod
* Sanitização de HTML com DOMPurify
* Configuração de CORS

---

## 🚀 Executando localmente

### Pré-requisitos

Você precisará ter instalado:

* Node.js 18+
* npm
* MongoDB local ou MongoDB Atlas
* Conta no Cloudinary

### 1. Clone o projeto

```bash
git clone URL_DO_REPOSITORIO
cd CBALOL
```

### 2. Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env`:

```env
PORT=3000
MONGO_URI=sua_connection_string
JWT_SECRET=sua_chave_secreta
```

Execute:

```bash
npm run dev
```

### 3. Frontend

Em outro terminal:

```bash
cd frontend
npm install
```

Configure as variáveis necessárias no `.env`:

```env
VITE_CLOUDINARY_CLOUD_NAME=seu_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=seu_upload_preset
```

Execute:

```bash
npm run dev
```

A aplicação estará disponível no endereço informado pelo Vite.

---

## 📡 API

A API REST possui endpoints para gerenciamento dos principais recursos da plataforma:

```text
/auth
/user
/notice
/comment
/time
/jogador
/partida
/mvp
```

As operações administrativas são protegidas por autenticação JWT e verificação de permissões.

### Exemplo

```http
GET /time
GET /time/:id

POST /time/create
PUT /time/:id
DELETE /time/:id
```

As operações de criação, atualização e exclusão de equipes exigem permissão administrativa.

---

## 🌐 Deploy

A aplicação utiliza uma infraestrutura distribuída:

```text
Usuário
   │
   ▼
Vercel
Frontend React
   │
   │ HTTPS / REST API
   ▼
Railway
Node.js + Express
   │
   ▼
MongoDB Atlas

Cloudinary
   ▲
   │
Imagens
```

**Frontend:** Vercel
**Backend:** Railway
**Banco de dados:** MongoDB Atlas
**Imagens:** Cloudinary

---

## 🗺️ Roadmap

Funcionalidades planejadas para versões futuras:

* [ ] Integração com a API da Riot Games
* [ ] Estatísticas dos jogadores
* [ ] Tabela de classificação automática
* [ ] Login social com Discord
* [ ] Notificações em tempo real
* [ ] Automatização de dados do campeonato

---

## 💡 O que aprendi com o projeto

O desenvolvimento do CBALOL 2.0 envolveu diferentes conceitos utilizados em aplicações Full-Stack modernas, incluindo:

* Construção de APIs REST
* Arquitetura em camadas
* Autenticação e autorização com JWT
* Modelagem de dados com MongoDB e Mongoose
* Validação compartilhada com Zod
* Gerenciamento de estado assíncrono
* Upload e armazenamento de imagens
* Proteção de rotas administrativas
* Deploy separado de frontend e backend
* Integração entre diferentes serviços em nuvem
* Desenvolvimento de interfaces responsivas

---

## Autor

**Carlos Henrique — Solrack**

Desenvolvedor Full-Stack responsável pelo desenvolvimento do projeto CBALOL 2.0.

O projeto foi criado como parte dos meus estudos em desenvolvimento de software e também como uma aplicação real para gerenciamento do campeonato.

[LinkedIn](LINK_DO_LINKEDIN) • [GitHub](LINK_DO_GITHUB)

---

<div align="center">

Desenvolvido com 💙, ☕ e algumas partidas de League of Legends.

**CBALOL 2.0**

</div>

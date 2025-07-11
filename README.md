# Ready, Dice, Roll! 🎲

Uma API REST moderna para gerenciamento de RPGs de mesa, desenvolvida com NestJS e TypeScript.

## 📋 Sobre o Projeto

Ready, Dice, Roll! é uma aplicação backend que fornece APIs completas para gerenciamento de campanhas de RPG, personagens, sessões e muito mais. Ideal para mestres e jogadores que querem organizar suas aventuras de forma digital.

### ✨ Funcionalidades

- 🎯 **Gerenciamento de Campanhas**: Crie e gerencie campanhas com múltiplos jogadores
- 👥 **Sistema de Usuários**: Autenticação e autorização com JWT
- 🧙‍♂️ **Personagens**: CRUD completo para personagens com fichas personalizáveis
- 📅 **Sessões**: Agendamento e controle de sessões de jogo
- 🎲 **Sistema de Dados**: Rolagem de dados integrada com histórico
- 📝 **Anotações**: Sistema de notas para mestres e jogadores
- 🔐 **Segurança**: Autenticação JWT e controle de acesso baseado em roles

## 🚀 Tecnologias Utilizadas

- **Backend**: NestJS 11.x
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: TypeORM
- **Autenticação**: JWT (Passport.js)
- **Validação**: Class Validator
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest
- **Linting**: ESLint + Prettier

## 🛠️ Pré-requisitos

- Node.js 20.x ou superior
- npm ou yarn
- Docker e Docker Compose
- Git

## 📦 Instalação

1. **Clone o repositório**

  ```bash
  git clone https://github.com/s0lturn3/ready-dice-roll-api.git
  cd ready-dice-roll-api
  ```

2. **Instale as dependências**

  ```bash
  npm install
  # ou
  yarn install
  ```

3. **Configure as variáveis de ambiente**

  ```bash
  cp .env.example .env
  ```

  Edite o arquivo `.env` com suas configurações:

  ```env
  # Database
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=postgres
  DB_PASSWORD=sua_senha
  DB_DATABASE=ready_dice_roll

  # JWT
  JWT_SECRET=seu_jwt_secret_super_seguro
  JWT_EXPIRES_IN=7d

  # Application
  PORT=3000
  NODE_ENV=development
  ```

4. **Inicie o banco de dados com Docker**

  ```bash
  docker-compose up -d db
  ```

5. **Executar seeds (opcional)**

  ```bash
  npm run seed
  ```

## 🚀 Executando a Aplicação

### Desenvolvimento

```bash
# Inicia o banco de dados
docker-compose up -d db

# Inicia a aplicação
npm run start:dev

# Ou inicia tudo de uma vez
docker-compose up -d
```

### Produção

```bash
npm run build
npm run start:prod
```

### Usando Docker Compose (Recomendado)

```bash
# Inicia toda a stack (app + db)
docker-compose up -d

# Visualizar logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

A API estará disponível em `http://localhost:3000/api`

## 📚 Documentação da API

Após executar a aplicação, acesse:

- **Swagger UI**: `http://localhost:3000/api/docs`
- **Redoc**: `http://localhost:3000/api/redoc`

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Coverage
npm run test:cov

# Testes em modo watch
npm run test:watch
```

## 📊 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Inicia em modo desenvolvimento
npm run start:debug        # Inicia em modo debug

# Build
npm run build             # Build de produção
npm run start:prod        # Inicia versão de produção

# Docker
docker-compose up -d      # Inicia toda a stack
docker-compose up -d db   # Inicia apenas o banco
docker-compose down       # Para todos os serviços
docker-compose logs -f    # Visualiza logs

# Database
npm run migration:generate # Gera nova migration
npm run migration:run      # Executa migrations
npm run migration:revert   # Reverte última migration
npm run seed              # Executa seeds

# Qualidade de código
npm run lint              # ESLint
npm run lint:fix          # ESLint com correção automática
npm run format            # Prettier
```

## 🗂️ Estrutura do Projeto

```text
src/
├── auth/                 # Módulo de autenticação
├── users/                # Módulo de usuários
├── campaigns/            # Módulo de campanhas
├── characters/           # Módulo de personagens
├── sessions/             # Módulo de sessões
├── dice/                 # Módulo de sistema de dados
├── notes/                # Módulo de anotações
├── common/               # Utilitários e decorators
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── config/               # Configurações
├── database/             # Migrations e seeds
│   ├── migrations/
│   └── seeds/
└── main.ts              # Entrada da aplicação
```

## 🔐 Autenticação

A API utiliza JWT para autenticação. Para acessar endpoints protegidos:

1. **Login**

  ```bash
  POST /auth/login
  {
    "email": "usuario@email.com",
    "password": "senha123"
  }
  ```

2. **Use o token retornado no header**

  ```bash
  Authorization: Bearer seu_jwt_token_aqui
  ```

## 📋 Endpoints Principais

### Autenticação

- `POST /auth/login` - Login
- `POST /auth/register` - Registro
- `POST /auth/refresh` - Refresh token

### Usuários

- `GET /users/profile` - Perfil do usuário
- `PUT /users/profile` - Atualizar perfil

### Campanhas

- `GET /campaigns` - Listar campanhas
- `POST /campaigns` - Criar campanha
- `GET /campaigns/:id` - Detalhes da campanha
- `PUT /campaigns/:id` - Atualizar campanha
- `DELETE /campaigns/:id` - Deletar campanha

### Personagens

- `GET /characters` - Listar personagens
- `POST /characters` - Criar personagem
- `GET /characters/:id` - Detalhes do personagem
- `PUT /characters/:id` - Atualizar personagem
- `DELETE /characters/:id` - Deletar personagem

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feat/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feat/nova-feature`)
5. Abra um Pull Request para a branch `dev`

### 📝 Padrões de Commit

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

## 🐛 Reportando Bugs

Encontrou um bug? Abra uma [issue](https://github.com/s0lturn3/ready-dice-roll-api/issues) com:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Ambiente (OS, Node.js version, etc.)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎯 Roadmap

- [ ] Sistema de notificações em tempo real
- [ ] Integração com Discord
- [ ] Sistema de mapas interativos
- [ ] Suporte a múltiplos sistemas de RPG
- [ ] App mobile
- [ ] Modo offline

## 👥 Autores

- **Solturne** - *Desenvolvedor Principal* - [@s0lturne](https://github.com/s0lturn3)

## 🙏 Agradecimentos

- Comunidade NestJS
- Meu amigo que me inspirou a iniciar o projeto
- Jogadores de RPG que inspiraram este projeto
- Contribuidores do projeto

---

**Ready, Dice, Roll!** - Tornando suas aventuras de RPG mais organizadas e divertidas! 🎲✨

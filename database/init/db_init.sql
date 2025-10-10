-- COMANDOS PARA INICIALIZAÇÃO DO BANCO DE DADOS
-- 1. Tabelas base sem dependências
CREATE TABLE "Usuario" (
  "Id" uuid NOT NULL,
  "Username" TEXT NOT NULL UNIQUE,
  "Email" TEXT NOT NULL UNIQUE,
  "Senha" TEXT NOT NULL,
  "DtCriacao" DATE NOT NULL,
  "DtUltimoLogin" DATE,
  "GoogleId" TEXT,
  "GithubId" TEXT,
  "MicrosoftId" TEXT,
  "Imagem" BYTEA NULL,
  PRIMARY KEY ("Id")
);

CREATE TABLE "NivelPermissao" (
  "Id" SERIAL PRIMARY KEY,
  "Nivel" INTEGER NOT NULL,
  "Permissao" TEXT NOT NULL UNIQUE,
  "Descricao" TEXT
);

CREATE TABLE "Raca" (
  "Id" SERIAL PRIMARY KEY,
  "Nome" TEXT NOT NULL UNIQUE,
  "Descricao" TEXT
);

CREATE TABLE "Classe" (
  "Id" SERIAL PRIMARY KEY,
  "Nome" TEXT NOT NULL UNIQUE,
  "Descricao" TEXT
);

CREATE TABLE "TipoHabilidade" (
  "Id" SERIAL PRIMARY KEY,
  "Nivel" INTEGER NOT NULL,
  "Tipo" TEXT NOT NULL,
  "Descricao" TEXT
);

CREATE TABLE "Atributo" (
  "Id" SERIAL PRIMARY KEY,
  "Nome" TEXT NOT NULL UNIQUE,
  "Descricao" TEXT
);

CREATE TABLE "TipoItem" (
  "Id" SERIAL PRIMARY KEY,
  "Tipo" TEXT NOT NULL UNIQUE,
  "Descricao" TEXT
);

CREATE TABLE "TipoCriatura" (
  "Id" SERIAL PRIMARY KEY,
  "Tipo" TEXT NOT NULL UNIQUE,
  "Descricao" TEXT
);

CREATE TABLE "TipoDocumento" (
  "Id" SERIAL PRIMARY KEY,
  "Nome" TEXT NOT NULL UNIQUE,
  "Descricao" TEXT
);

-- 2. Tabelas que dependem apenas de Usuario
CREATE TABLE "Sistema" (
  "Id" SERIAL PRIMARY KEY,
  "Nome" TEXT NOT NULL UNIQUE,
  "Descricao" TEXT,
  "CriadoPor" uuid NOT NULL,
  "DtCriacao" DATE NOT NULL,
  "DtUltAtualizacao" DATE,
  FOREIGN KEY ("CriadoPor") REFERENCES "Usuario" ("Id")
);

-- 3. Tabela Campanha (depende de Usuario e Sistema)
CREATE TABLE "Campanha" (
  "Id" SERIAL PRIMARY KEY,
  "Nome" TEXT NOT NULL,
  "Descricao" TEXT,
  "CriadoPor" uuid NOT NULL,
  "DtCriacao" DATE NOT NULL,
  "DtUltAtualizacao" DATE,
  "Status" INTEGER NOT NULL DEFAULT 0,
  "SistemaId" INTEGER,
  CONSTRAINT "CampanhaCriadaPorUsuario" FOREIGN KEY ("CriadoPor") REFERENCES "Usuario" ("Id"),
  FOREIGN KEY ("SistemaId") REFERENCES "Sistema" ("Id")
);

-- 4. Tabelas que dependem de Campanha
CREATE TABLE "Personagem" (
  "Id" SERIAL PRIMARY KEY,
  "Nome" TEXT NOT NULL,
  "Historia" TEXT,
  "Nivel" INTEGER NOT NULL DEFAULT 0,
  "IsNpc" BOOLEAN NOT NULL DEFAULT true,
  "CriadoPor" uuid NOT NULL,
  "ControladoPor" uuid NOT NULL,
  "CampanhaId" INTEGER,
  FOREIGN KEY ("CampanhaId") REFERENCES "Campanha" ("Id"),
  FOREIGN KEY ("ControladoPor") REFERENCES "Usuario" ("Id"),
  FOREIGN KEY ("CriadoPor") REFERENCES "Usuario" ("Id")
);

CREATE TABLE "Item" (
  "Id" SERIAL PRIMARY KEY,
  "CampanhaId" INTEGER NOT NULL,
  "Nome" TEXT NOT NULL,
  "Descricao" TEXT NOT NULL,
  "TipoItemId" INTEGER,
  "Raridade" TEXT,
  "Valor" INTEGER,
  "Peso" DECIMAL,
  "DtCriacao" DATE NOT NULL,
  FOREIGN KEY ("CampanhaId") REFERENCES "Campanha" ("Id"),
  FOREIGN KEY ("TipoItemId") REFERENCES "TipoItem" ("Id")
);

CREATE TABLE "Habilidade" (
  "Id" SERIAL PRIMARY KEY,
  "CampanhaId" INTEGER NOT NULL,
  "Nome" TEXT NOT NULL,
  "DescricaoCurta" TEXT NOT NULL,
  "DescricaoCompleta" TEXT NOT NULL,
  "Tipo" INTEGER NOT NULL,
  "Icone" TEXT,
  "Nivel" INTEGER NOT NULL DEFAULT 0,
  "DataCriacao" TEXT NOT NULL,
  "ExclusivaClasseId" INTEGER,
  "ExclusivaRacaId" INTEGER,
  "CustoDesbloqueio" INTEGER NOT NULL DEFAULT 0,
  "GraphId" TEXT,
  "posX" INTEGER,
  "posY" INTEGER,
  FOREIGN KEY ("CampanhaId") REFERENCES "Campanha" ("Id"),
  FOREIGN KEY ("Tipo") REFERENCES "TipoHabilidade" ("Id"),
  FOREIGN KEY ("ExclusivaClasseId") REFERENCES "Classe" ("Id"),
  FOREIGN KEY ("ExclusivaRacaId") REFERENCES "Raca" ("Id")
);

CREATE TABLE "HabilidadeDependencia" (
  "Id" SERIAL PRIMARY KEY,
  "EdgeId" TEXT,
  "PrerequisitoId" INTEGER NOT NULL,
  "DependenteId" INTEGER NOT NULL,
  "TipoConexao" TEXT NOT NULL,

  UNIQUE ("PrerequisitoId", "DependenteId"),

  FOREIGN KEY ("PrerequisitoId") REFERENCES "Habilidade" ("Id"),
  FOREIGN KEY ("DependenteId") REFERENCES "Habilidade" ("Id")
);

CREATE TABLE "Quest" (
  "Id" SERIAL PRIMARY KEY,
  "CampanhaId" INTEGER NOT NULL,
  "Nome" TEXT NOT NULL,
  "Descricao" TEXT NOT NULL,
  "DtCriacao" DATE NOT NULL,
  "DtAtualizacao" DATE,
  "Status" INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY ("CampanhaId") REFERENCES "Campanha" ("Id")
);

CREATE TABLE "Bestiario" (
  "Id" SERIAL PRIMARY KEY,
  "CampanhaId" INTEGER,
  "Nome" TEXT NOT NULL,
  "Descricao" TEXT NOT NULL,
  "TipoCriaturaId" INTEGER,
  "Nivel" INTEGER,
  "DtCriacao" DATE NOT NULL,
  FOREIGN KEY ("CampanhaId") REFERENCES "Campanha" ("Id"),
  FOREIGN KEY ("TipoCriaturaId") REFERENCES "TipoCriatura" ("Id")
);

CREATE TABLE "Local" (
  "Id" SERIAL PRIMARY KEY,
  "CampanhaId" INTEGER NOT NULL,
  "Nome" TEXT NOT NULL,
  "Descricao" TEXT,
  "DtCriacao" DATE NOT NULL,
  FOREIGN KEY ("CampanhaId") REFERENCES "Campanha" ("Id")
);

CREATE TABLE "Registro" (
  "Id" SERIAL PRIMARY KEY,
  "Titulo" TEXT NOT NULL,
  "Conteudo" TEXT NOT NULL,
  "Autor" TEXT,
  "CampanhaId" INTEGER NOT NULL,
  "DtCriacao" DATE NOT NULL,
  "TipoDocumentoId" INTEGER NOT NULL,
  FOREIGN KEY ("CampanhaId") REFERENCES "Campanha" ("Id"),
  FOREIGN KEY ("TipoDocumentoId") REFERENCES "TipoDocumento" ("Id")
);

-- 5. Tabelas que dependem de Personagem
CREATE TABLE "DadosPersonagem" (
  "Id" SERIAL PRIMARY KEY,
  "PersonagemId" INTEGER NOT NULL,
  "HPMax" INTEGER NOT NULL,
  "HPAtual" INTEGER NOT NULL,
  "MPMax" INTEGER NOT NULL,
  "MPAtual" INTEGER NOT NULL,
  "XP" INTEGER NOT NULL DEFAULT 0,
  "Nivel" INTEGER NOT NULL DEFAULT 1,
  "RacaId" INTEGER,
  "ClasseId" INTEGER,
  FOREIGN KEY ("PersonagemId") REFERENCES "Personagem" ("Id"),
  FOREIGN KEY ("ClasseId") REFERENCES "Classe" ("Id"),
  FOREIGN KEY ("RacaId") REFERENCES "Raca" ("Id")
);

CREATE TABLE "HabilidadePersonagem" (
  "Id" SERIAL PRIMARY KEY,
  "PersonagemId" INTEGER NOT NULL,
  "HabilidadeId" INTEGER NOT NULL,
  "IsDesbloqueada" BOOLEAN DEFAULT false,
  "DtDesbloqueio" DATE,
  FOREIGN KEY ("HabilidadeId") REFERENCES "Habilidade" ("Id"),
  FOREIGN KEY ("PersonagemId") REFERENCES "Personagem" ("Id")
);

CREATE TABLE "AtributoPersonagem" (
  "Id" SERIAL PRIMARY KEY,
  "PersonagemId" INTEGER NOT NULL,
  "AtributoId" INTEGER NOT NULL,
  "Valor" INTEGER NOT NULL,
  FOREIGN KEY ("PersonagemId") REFERENCES "Personagem" ("Id"),
  FOREIGN KEY ("AtributoId") REFERENCES "Atributo" ("Id")
);

CREATE TABLE "InventarioPersonagem" (
  "Id" SERIAL PRIMARY KEY,
  "PersonagemId" INTEGER NOT NULL,
  "ItemId" INTEGER NOT NULL,
  "Quantidade" INTEGER NOT NULL DEFAULT 1,
  "DtAdicao" DATE NOT NULL,
  FOREIGN KEY ("PersonagemId") REFERENCES "Personagem" ("Id"),
  FOREIGN KEY ("ItemId") REFERENCES "Item" ("Id")
);

-- 6. Tabelas que dependem de múltiplas outras tabelas
CREATE TABLE "Participante" (
  "Id" TEXT NOT NULL,
  "UsuarioId" uuid NOT NULL,
  "CampanhaId" INTEGER NOT NULL,
  "PermissaoId" INTEGER NOT NULL,
  PRIMARY KEY ("Id"),
  FOREIGN KEY ("CampanhaId") REFERENCES "Campanha" ("Id"),
  FOREIGN KEY ("PermissaoId") REFERENCES "NivelPermissao" ("Id"),
  FOREIGN KEY ("UsuarioId") REFERENCES "Usuario" ("Id")
);

CREATE TABLE "ComentarioRegistro" (
  "Id" SERIAL PRIMARY KEY,
  "RegistroId" INTEGER NOT NULL,
  "UsuarioId" uuid NOT NULL,
  "Conteudo" TEXT NOT NULL,
  "DtCriacao" DATE NOT NULL,
  FOREIGN KEY ("RegistroId") REFERENCES "Registro" ("Id"),
  FOREIGN KEY ("UsuarioId") REFERENCES "Usuario" ("Id")
);

CREATE TABLE "VersaoRegistro" (
  "Id" SERIAL PRIMARY KEY,
  "RegistroId" INTEGER NOT NULL,
  "Versao" INTEGER NOT NULL,
  "ConteudoAntigo" TEXT NOT NULL,
  "DtModificacao" DATE NOT NULL,
  "ModificadoPor" uuid NOT NULL,
  FOREIGN KEY ("RegistroId") REFERENCES "Registro" ("Id"),
  FOREIGN KEY ("ModificadoPor") REFERENCES "Usuario" ("Id")
);

CREATE TABLE "RegistroRelacionado" (
  "Id" SERIAL PRIMARY KEY,
  "RegistroId" INTEGER NOT NULL,
  "ItemId" INTEGER,
  "PersonagemId" INTEGER,
  FOREIGN KEY ("RegistroId") REFERENCES "Registro" ("Id"),
  FOREIGN KEY ("ItemId") REFERENCES "Item" ("Id"),
  FOREIGN KEY ("PersonagemId") REFERENCES "Personagem" ("Id")
);

-- 7. Índices
CREATE INDEX "idx_habilidade_tipo" ON "Habilidade" ("Tipo" ASC);

-- For finding all prerequisites of a skill (most common query for unlock logic)
CREATE INDEX "idx_dependenteid" ON "HabilidadeDependencia" ("DependenteId");

-- For finding all skills unlocked by a skill (for visualization traversal)
CREATE INDEX "idx_prerequisitoid" ON "HabilidadeDependencia" ("PrerequisitoId");


-- 8. Inicialização de valores
-- Usuário de demonstração
INSERT INTO "Usuario" (
  "Id", "Username", "Email", "Senha", "DtCriacao", "DtUltimoLogin"
) VALUES (
  '11111111-1111-1111-1111-111111111111', -- UUID fixo
  'demo',
  'demo@email.com',
  'demo', -- trocar pelo hash real
  CURRENT_DATE,
  NULL
);

-- Campanha vinculada ao usuário demo
INSERT INTO "Campanha" (
  "Nome", "Descricao", "CriadoPor", "DtCriacao", "DtUltAtualizacao", "Status", "SistemaId"
) VALUES (
  'Demonstração',
  'Campanha de demonstração do sistema',
  '11111111-1111-1111-1111-111111111111',
  CURRENT_DATE,
  CURRENT_DATE,
  1,     -- status ativo
  NULL   -- sem sistema vinculado
);

-- Personagem de demonstração
INSERT INTO "Personagem" (
  "Nome", "Historia", "Nivel", "IsNpc", "CriadoPor", "ControladoPor", "CampanhaId"
) VALUES (
  'Demo',
  'Personagem de demonstração para testes na árvore de habilidades.',
  1,
  true,  -- É um NPC
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  (SELECT "Id" FROM "Campanha" WHERE "CriadoPor" = '11111111-1111-1111-1111-111111111111' LIMIT 1)
);
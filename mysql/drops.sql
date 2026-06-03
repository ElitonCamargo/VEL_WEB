-- Desativa verificação de FK temporariamente (opcional, mas útil)
SET FOREIGN_KEY_CHECKS = 0;

-- =========================
-- TABELAS DEPENDENTES (N:N)
-- =========================
DROP TABLE IF EXISTS veiculo_categorias;
DROP TABLE IF EXISTS perfil_endpoints;

-- =========================
-- TABELAS COM DEPENDÊNCIAS
-- =========================
DROP TABLE IF EXISTS veiculos;
DROP TABLE IF EXISTS usuarios;

-- =========================
-- TABELAS BASE
-- =========================
DROP TABLE IF EXISTS endpoints;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS fabricantes;
DROP TABLE IF EXISTS perfis;

-- Reativa verificação de FK
SET FOREIGN_KEY_CHECKS = 1;
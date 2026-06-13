
DROP DATABASE IF EXISTS vel_web_api_db;
CREATE DATABASE vel_web_api_db;
USE vel_web_api_db;

-- =========================
-- PADRÕES GERAIS
-- =========================
SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- =========================
-- PERFIS (RBAC)
-- =========================
CREATE TABLE perfis (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    codigo VARCHAR(50) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- =========================
-- PERMISSÕES (RBAC)
-- =========================
CREATE TABLE permissoes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    codigo VARCHAR(100) NOT NULL,
    recurso VARCHAR(20) NOT NULL,
    metodo VARCHAR(10) NOT NULL,
    rota VARCHAR(150) NOT NULL,

    descricao VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE (rota, metodo)
);

-- =========================
-- PERFIL x PERMISSÃO
-- =========================
CREATE TABLE perfil_permissoes (
    perfil_id INT UNSIGNED,
    permissao_id INT UNSIGNED,

    PRIMARY KEY (perfil_id, permissao_id),

    FOREIGN KEY (perfil_id)
        REFERENCES perfis(id)
        ON DELETE CASCADE,

    FOREIGN KEY (permissao_id)
        REFERENCES permissoes(id)
        ON DELETE CASCADE
);

-- =========================
-- USUÁRIOS
-- =========================
CREATE TABLE usuarios (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(150) NOT NULL,

    whatsapp VARCHAR(20),
    avatar VARCHAR(255),

    endereco JSON,

    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    email_verificado BOOLEAN NOT NULL DEFAULT FALSE,

    ultimo_login TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

CREATE INDEX idx_usuarios_email
    ON usuarios(email);

CREATE INDEX idx_usuarios_deleted
    ON usuarios(deleted_at);

-- =========================
-- USUÁRIO x PERFIL
-- =========================
CREATE TABLE usuario_perfis (
    usuario_id INT UNSIGNED,
    perfil_id INT UNSIGNED,

    PRIMARY KEY (usuario_id, perfil_id),

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,

    FOREIGN KEY (perfil_id)
        REFERENCES perfis(id)
        ON DELETE CASCADE
);

-- =========================
-- FABRICANTES
-- =========================
CREATE TABLE fabricantes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) UNIQUE,
    logo VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- =========================
-- CATEGORIAS
-- =========================
CREATE TABLE categorias (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) UNIQUE,
    icone VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- =========================
-- VEÍCULOS
-- =========================
CREATE TABLE veiculos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    fabricante_id INT UNSIGNED NOT NULL,
    usuario_id INT UNSIGNED NOT NULL,

    modelo VARCHAR(150) NOT NULL,

    ano SMALLINT UNSIGNED NOT NULL,
    ano_modelo SMALLINT UNSIGNED,

    cor VARCHAR(50),
    km INT UNSIGNED,

    combustivel ENUM(
        'gasolina',
        'etanol',
        'flex',
        'diesel',
        'eletrico',
        'hibrido'
    ),

    cambio ENUM(
        'manual',
        'automatico',
        'cvt',
        'automatizado'
    ),

    descricao TEXT,

    dados_tecnicos JSON,

    preco DECIMAL(12,2) UNSIGNED,

    visualizacoes INT UNSIGNED NOT NULL DEFAULT 0,

    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    vendido BOOLEAN NOT NULL DEFAULT FALSE,
    destaque BOOLEAN NOT NULL DEFAULT FALSE,

    coordenadas POINT NOT NULL SRID 4326,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    SPATIAL INDEX (coordenadas),

    FOREIGN KEY (fabricante_id)
        REFERENCES fabricantes(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_veiculos_deleted
    ON veiculos(deleted_at);

CREATE INDEX idx_veiculos_preco
    ON veiculos(preco);

CREATE INDEX idx_veiculos_modelo
    ON veiculos(modelo);

CREATE INDEX idx_veiculos_fabricante
    ON veiculos(fabricante_id);

CREATE INDEX idx_veiculos_usuario
    ON veiculos(usuario_id);

CREATE INDEX idx_veiculos_ano
    ON veiculos(ano);

CREATE INDEX idx_veiculos_ativo
    ON veiculos(ativo);

CREATE INDEX idx_veiculos_vendido
    ON veiculos(vendido);

-- =========================
-- VEÍCULO x CATEGORIA
-- =========================
CREATE TABLE veiculo_categorias (
    veiculo_id INT UNSIGNED,
    categoria_id INT UNSIGNED,

    PRIMARY KEY (veiculo_id, categoria_id),

    FOREIGN KEY (veiculo_id)
        REFERENCES veiculos(id)
        ON DELETE CASCADE,

    FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON DELETE CASCADE
);

-- =========================
-- FOTOS DOS VEÍCULOS
-- =========================
CREATE TABLE veiculo_fotos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    veiculo_id INT UNSIGNED NOT NULL,

    url VARCHAR(255) NOT NULL,

    ordem SMALLINT UNSIGNED DEFAULT 0,

    capa BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (veiculo_id)
        REFERENCES veiculos(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_veiculo_fotos_veiculo
    ON veiculo_fotos(veiculo_id);

-- =========================
-- FAVORITOS
-- =========================
CREATE TABLE favoritos (
    usuario_id INT UNSIGNED NOT NULL,
    veiculo_id INT UNSIGNED NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (usuario_id, veiculo_id),

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,

    FOREIGN KEY (veiculo_id)
        REFERENCES veiculos(id)
        ON DELETE CASCADE
);
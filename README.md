# Vel Web API

API RESTful desenvolvida para uma plataforma de divulgação e comercialização de veículos.

O projeto está sendo desenvolvido com foco em **arquitetura limpa**, **baixo acoplamento**, **escalabilidade** e **manutenibilidade**, adotando uma organização orientada ao domínio da aplicação e às boas práticas do ecossistema TypeScript.

---

## Objetivos

- Desenvolver uma API REST moderna utilizando TypeScript.
- Aplicar princípios de Domain-Driven Design (DDD) de forma pragmática.
- Utilizar Repository Pattern para isolar a camada de persistência.
- Utilizar Prisma ORM sem acoplá-lo às regras de negócio.
- Gerar automaticamente a documentação OpenAPI através dos Schemas do Zod.
- Facilitar testes automatizados e futuras evoluções do sistema.

---

# Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- MySQL
- Zod
- OpenAPI
- Swagger UI

---

# Arquitetura

O projeto foi organizado em camadas bem definidas, garantindo a separação de responsabilidades.

```text
Cliente
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
Repositories
    │
    ▼
Prisma ORM
    │
    ▼
MySQL
```

## Controllers

Responsáveis por:

- Receber requisições HTTP
- Validar entradas
- Chamar os Services
- Retornar respostas padronizadas

Nenhuma regra de negócio deve existir nesta camada.

---

## Services

Responsáveis por:

- Implementar regras de negócio
- Orquestrar casos de uso
- Coordenar o fluxo da aplicação

Os Services não acessam diretamente o banco de dados.

---

## Repositories

Responsáveis por:

- Persistência de dados
- Encapsular completamente o Prisma
- Executar consultas SQL complexas quando necessário

Toda comunicação com o banco ocorre exclusivamente através desta camada.

---

## Prisma ORM

Responsável pelo mapeamento objeto-relacional entre a aplicação e o MySQL.

O Prisma permanece isolado dentro da camada Repository, permitindo sua substituição futuramente caso necessário.

---

# Organização do Projeto

O sistema é organizado por funcionalidades (Feature-Based Architecture).

```text
modules/

auth/

usuarios/

perfis/

fabricantes/

categorias/

veiculos/

favoritos/
```

Cada módulo possui seus próprios:

- Controller
- Service
- Repository
- DTOs
- Schemas
- Rotas

---

# Documentação da API

A documentação é gerada automaticamente utilizando a seguinte cadeia:

```text
Zod
    │
    ▼
OpenAPI
    │
    ▼
Swagger UI
```

Os Schemas do Zod são a única fonte de verdade para validação e documentação.

---

# Banco de Dados

Banco de dados:

- MySQL 8

Persistência:

- Prisma ORM

Migrações:

- Prisma Migrate

---

# Princípios Arquiteturais

Este projeto segue os seguintes princípios:

- Baixo acoplamento
- Alta coesão
- Separação de responsabilidades
- Repository Pattern
- Arquitetura orientada ao domínio
- Feature-Based Architecture
- Controllers enxutos
- Services contendo as regras de negócio
- Prisma isolado na camada Repository
- Validação centralizada utilizando Zod
- Documentação automática via OpenAPI

---

# Testes

O projeto foi planejado para suportar testes automatizados desde o início.

Serão implementados:

- Testes Unitários
- Testes de Integração
- Testes End-to-End (E2E)

---

# Objetivos Futuros

Entre as funcionalidades planejadas estão:

- Autenticação JWT
- Controle de acesso (RBAC)
- Upload de imagens
- Busca geográfica por localização
- Integração com serviços de consulta veicular
- Consulta de valor FIPE
- Cache utilizando Redis
- Processamento assíncrono com filas
- Testes automatizados completos

---

# Licença

Projeto desenvolvido para fins de estudo, pesquisa e uso comercial pelo autor.

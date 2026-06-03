# Dados MySql
DB_USER=appuser
DB_PASS=123456
DB_NAME=vel_web_api_db

# Caminho para os arquivos SQL
DROPS=./mysql/drops.sql
INIT=./mysql/init.sql
SEED=./mysql/seed.sql


# Reseta a estrutura do banco de dados para
db-init:
	mysql -u $(DB_USER) -p$(DB_PASS) < $(INIT)

# Incluir dados iniciais ao banco ( dados iniciais)
db-seed:
	mysql -u $(DB_USER) -p$(DB_PASS) $(DB_NAME) < $(SEED)

# Iniciar em mode DEV
api-dev:
	cd api/ && npm run dev

# Fazer BUILD
api-build:
	cd api/ && npm run build

# Iniciar em mode de PRODUÇÃO
api-start:
	cd api/ && npm start


# Helps
help:
	@echo "Comandos disponíveis:"
	@echo "  db-init         - Reseta a estrutura do banco de dados"
	@echo "  db-seed         - Inclui dados iniciais ao banco"
	@echo "  api-dev         - Inicia a API em modo DEV"
	@echo "  api-build       - Faz o build da API"
	@echo "  api-start       - Inicia a API em modo PRODUÇÃO"
	@echo "  help            - Exibe esta ajuda"
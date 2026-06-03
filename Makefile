# Nome do container do MySQL no Docker
CONTAINER_NAME=vel_web_mysql
DB_USER=root
DB_PASS=root
DB_NAME=vel_web_db

# Caminho para os arquivos SQL
DROPS=./mysql/drops.sql
INIT=./mysql/init.sql
SEED=./mysql/seed.sql

# Apaga tudo existentes no banco de dados
db-drop:
	docker exec -i $(CONTAINER_NAME) mysql -u $(DB_USER) -p$(DB_PASS) $(DB_NAME) < $(DROPS)

# Reseta a estrutura do banco de dados
db-init:
	docker exec -i $(CONTAINER_NAME) mysql -u $(DB_USER) -p$(DB_PASS) $(DB_NAME) < $(INIT)

# Incluir dados iniciais ao banco ( dados iniciais)
db-seed:
	docker exec -i $(CONTAINER_NAME) mysql -u $(DB_USER) -p$(DB_PASS) $(DB_NAME) < $(SEED)

# Inicia os containers do Docker
docker-up:
	docker compose up -d

# Para os containers do Docker
docker-down:
	docker compose down

# Reinicia os containers do Docker
docker-restart:
	docker compose down
	docker compose up -d

# Verifica os logs dos containers
docker-logs:
	docker compose logs -f --tail=100

# Verificar contêineres em execução
docker-ps:
	docker ps

# Helps
help:
	@echo "Comandos disponíveis:"
	@echo "  db-drop         - Apaga tudo existente no banco de dados"
	@echo "  db-init         - Reseta a estrutura do banco de dados"
	@echo "  db-seed         - Inclui dados iniciais ao banco"
	@echo "  docker-up       - Inicia os containers do Docker"
	@echo "  docker-down     - Para os containers do Docker"
	@echo "  docker-restart  - Reinicia os containers do Docker"
	@echo "  docker-logs     - Verifica os logs dos containers"
	@echo "  docker-ps       - Verificar contêineres em execução"
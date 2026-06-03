# MySQL no GitHub Codespaces (guia completo)

Este documento explica como instalar, iniciar e configurar o MySQL em um ambiente GitHub Codespaces, com a finalidade de permitir que qualquer pessoa replique o processo.

## 1) Atualizar a lista de pacotes

```bash
sudo apt update
```

Função:
- Atualiza o índice de pacotes do Ubuntu/Debian para baixar versões recentes disponíveis nos repositórios.

## 2) Instalar o MySQL Server

```bash
sudo apt install mysql-server -y
```

Função:
- Instala o servidor MySQL e dependências.
- O parâmetro `-y` responde "sim" automaticamente para evitar prompts interativos.

## 3) Iniciar o serviço MySQL

```bash
sudo service mysql start
```

Função:
- Inicia o serviço do MySQL no ambiente.

## 4) Verificar a versão instalada

```bash
mysql --version
```

Função:
- Confirma que o cliente MySQL está instalado e mostra a versão disponível.

## 5) Acessar o MySQL como administrador do sistema

```bash
sudo mysql
```

Função:
- Abre o prompt SQL autenticando via usuário de sistema (sudo), normalmente como root do MySQL.

---

## 6) Definir senha do root e plugin de autenticação

No prompt do MySQL, execute:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;
```

Função:
- `ALTER USER ... IDENTIFIED WITH mysql_native_password BY 'root'`:
	- Define/atualiza a senha do usuário root para `root`.
	- Muda o método de autenticação para `mysql_native_password`, o que facilita compatibilidade com clientes e aplicações.
- `FLUSH PRIVILEGES`:
	- Recarrega permissões imediatamente.

## 7) Criar usuário de aplicação

No prompt do MySQL, execute:

```sql
CREATE USER 'appuser'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
```

Função:
- `CREATE USER ...`:
	- Cria o usuário `appuser` para conexões locais.
- `GRANT ALL PRIVILEGES ON *.* ...`:
	- Concede permissões totais em todos os bancos e tabelas.
- `FLUSH PRIVILEGES`:
	- Aplica as alterações de permissão imediatamente.

---

## 8) Ajustar permissões do socket (quando necessário)

```bash
sudo chmod 777 /var/run/mysqld/mysqld.sock
```

Função:
- Libera leitura e escrita para todos no arquivo de socket do MySQL.
- Pode resolver erros de permissão em ambientes de desenvolvimento.

```bash
sudo chmod 755 /var/run/mysqld
```

Função:
- Ajusta permissões da pasta onde o socket é criado.

Observação importante:
- `777` é permissivo e não recomendado para produção.
- Use isso apenas para desenvolvimento local quando realmente necessário.

---

## 9) Testar login com root (senha)

```bash
sudo mysql -u root -p
```

Função:
- Tenta autenticar com o usuário `root` pedindo senha interativamente.

## 10) Testar login com usuário de aplicação

```bash
sudo mysql -u appuser -p123456
```

Função:
- Testa conexão direta com o usuário `appuser` usando senha no comando.

Observação:
- Passar senha diretamente na linha de comando pode expor credenciais no histórico.
- Em uso real, prefira `-p` sem senha e digite quando solicitado.

---

## Fluxo resumido (ordem correta)

1. Atualizar pacotes.
2. Instalar MySQL Server.
3. Iniciar serviço.
4. Verificar versão.
5. Entrar no MySQL com `sudo mysql`.
6. Configurar root.
7. Criar usuário de aplicação e permissões.
8. Ajustar socket/pasta se houver erro de permissão.
9. Testar login com root.
10. Testar login com appuser.

## Comandos completos em sequência

```bash
sudo apt update
sudo apt install mysql-server -y
sudo service mysql start
mysql --version
sudo mysql
```

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;

CREATE USER 'appuser'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
```

```bash
sudo chmod 777 /var/run/mysqld/mysqld.sock
sudo chmod 755 /var/run/mysqld
sudo mysql -u root -p
sudo mysql -u appuser -p123456
```


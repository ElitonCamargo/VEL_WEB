FROM node:20

# Criar diretório da app
WORKDIR /usr/src/app

# Copiar package.json primeiro (melhor cache)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar restante dos arquivos
COPY . .

# Porta da API
EXPOSE 3000

# Rodar aplicação
CMD ["npm", "run", "dev"]
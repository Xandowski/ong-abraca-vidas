# Dockerfile para ambiente local Next.js + Node.js
FROM node:20-alpine AS base

WORKDIR /app

# Atualiza pacotes do sistema para corrigir CVEs
RUN apk update && apk upgrade --no-cache

# Instala dependências
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install --legacy-peer- deps

# Copia o restante do código
COPY . .

# Build da aplicação
RUN npm run build

# Exposição da porta padrão do Next.js
EXPOSE 3000

# Comando para rodar o ambiente local
CMD ["npm", "run", "dev"]

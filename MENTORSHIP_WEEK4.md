# Semana 4 — Docker: Containerização de Aplicações

Objetivo: entender o conceito de containerização, criar imagens Docker e gerenciar containers para aplicações web.

O que fazer
- Conceitos (curto):
  - Containerização: empacotar aplicação e dependências em um container isolado.
  - Dockerfile: arquivo de instruções para construir uma imagem.
  - Docker Compose: orquestrar múltiplos containers.
  - Volumes: persistir dados entre execuções de containers.
- Hands-on:
  - Criar Dockerfile para o backend (Node.js/TypeScript).
  - Construir imagem: `docker build -t backend-app .`
  - Executar container: `docker run -p 3000:3000 backend-app`
  - Usar Docker Compose para rodar backend e frontend juntos.
  - Exercício prático: adicionar volume para logs ou banco de dados.

Exemplo — Dockerfile básico para backend
```dockerfile
# filepath: backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

- Para frontend (Vite), usar multi-stage build para otimizar imagem.

Dicas de comando
- Construir imagem: `docker build -t myapp .`
- Listar imagens: `docker images`
- Executar container: `docker run -p 8080:80 myapp`
- Parar container: `docker stop <container_id>`
- Docker Compose: `docker-compose up -d`

Critérios de aceitação
- Você cria uma imagem Docker para o backend e a executa localmente.
- Usa Docker Compose para rodar a aplicação completa (backend + frontend).
- Explica benefícios da containerização para desenvolvimento e deploy.

## Docker Compose para aplicação completa
```yaml
# filepath: docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
```

- Rode `docker-compose up` para iniciar tudo.
FROM node:20-bookworm-slim

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
COPY services/auth-service/package.json ./services/auth-service/package.json
COPY services/posts-service/package.json ./services/posts-service/package.json
COPY services/shared/logger/package.json ./services/shared/logger/package.json
COPY services/shared/auth/package.json ./services/shared/auth/package.json

RUN npm ci

COPY services/shared/logger ./services/shared/logger
COPY services/shared/auth ./services/shared/auth
COPY services/auth-service ./services/auth-service

RUN chmod +x /app/services/auth-service/docker-entry-migrate.sh

WORKDIR /app/services/auth-service
RUN npx prisma generate


EXPOSE 3001
CMD ["sh", "/app/services/auth-service/docker-entry-migrate.sh"]

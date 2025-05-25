# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm build

# Production stage
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./
RUN npm install -g pnpm && pnpm install --prod

EXPOSE 3000
CMD ["pnpm", "start"]

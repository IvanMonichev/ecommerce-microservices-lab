FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY tsconfig.base.json ./
COPY packages/common/package.json packages/common/package.json
COPY packages/common/tsconfig.json packages/common/tsconfig.json
COPY packages/common/src packages/common/src
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/contracts/tsconfig.json packages/contracts/tsconfig.json
COPY packages/contracts/src packages/contracts/src
COPY packages/contracts/proto packages/contracts/proto
COPY services/orders/package.json services/orders/package.json
COPY services/orders/tsconfig.json services/orders/tsconfig.json
COPY services/orders/src services/orders/src

RUN npm ci
RUN npm run build --workspace=@services/orders
RUN npm prune --omit=dev

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/common/package.json ./packages/common/package.json
COPY --from=builder /app/packages/common/dist ./packages/common/dist
COPY --from=builder /app/packages/contracts/package.json ./packages/contracts/package.json
COPY --from=builder /app/packages/contracts/dist ./packages/contracts/dist
COPY --from=builder /app/packages/contracts/proto ./packages/contracts/proto
COPY --from=builder /app/services/orders/package.json ./services/orders/package.json
COPY --from=builder /app/services/orders/dist ./services/orders/dist

EXPOSE 3020

CMD ["node", "services/orders/dist/app.js"]


FROM node:22-alpine AS base


FROM base AS deps

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app


COPY package.json package-lock.json* ./


COPY prisma ./prisma


RUN npm install


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .


ENV NEXT_TELEMETRY_DISABLED 1


RUN npx prisma@6.19.1 generate


RUN npm run build

RUN npm install @react-email/render @react-email/components


FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Setup user dan group (Syntax Alpine)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

COPY --from=builder /app/prisma ./prisma
# Copy prisma client yang sudah di-generate
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# ---------------------------


COPY --from=builder /app/public ./public


RUN mkdir .next
RUN chown nextjs:nodejs .next


COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN chown nextjs:nodejs entrypoint.sh
USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"


ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "server.js"]
# ============================================
# 🐳 Next.js Multi-Stage Dockerfile
# ============================================
# Multi-stage build kullanarak küçük ve güvenli image oluşturuyoruz

# ============================================
# Stage 1: Dependencies (Bağımlılıklar)
# ============================================
FROM node:20-alpine AS deps

# Alpine için gerekli paketler
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Package dosyalarını kopyala
COPY package.json package-lock.json* ./

# Bağımlılıkları yükle
RUN npm ci

# ============================================
# Stage 2: Builder (Derleme)
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Bağımlılıkları kopyala
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetry'yi devre dışı bırak
ENV NEXT_TELEMETRY_DISABLED=1

# Uygulamayı derle
RUN npm run build

# ============================================
# Stage 3: Runner (Çalıştırma - Production)
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

# Production ortamı
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Güvenlik için non-root kullanıcı oluştur
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Gerekli dosyaları kopyala
COPY --from=builder /app/public ./public

# Standalone output için gerekli dosyalar
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Non-root kullanıcıya geç
USER nextjs

# Port ayarı
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Uygulamayı başlat
CMD ["node", "server.js"]

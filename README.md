# 🚀 Next.js CI/CD Örnek Projesi

[![CI/CD Pipeline](https://github.com/ahmetfatihtuluce/nextjs-cidcd/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/ahmetfatihtuluce/nextjs-cidcd/actions/workflows/ci-cd.yml)

Bu proje, **CI/CD (Continuous Integration / Continuous Deployment)** kavramlarını öğrenmek için oluşturulmuş bir örnek Next.js uygulamasıdır.

## 📚 İçindekiler

- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Docker ile Çalıştırma](#-docker-ile-çalıştırma)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Komutlar](#-komutlar)

## 🛠 Teknolojiler

| Teknoloji                                             | Açıklama             |
| ----------------------------------------------------- | -------------------- |
| [Next.js 16](https://nextjs.org/)                     | React Framework      |
| [TypeScript](https://www.typescriptlang.org/)         | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/)              | Utility-first CSS    |
| [Jest](https://jestjs.io/)                            | Test Framework       |
| [Testing Library](https://testing-library.com/)       | UI Test Utilities    |
| [ESLint](https://eslint.org/)                         | Linting              |
| [Prettier](https://prettier.io/)                      | Code Formatting      |
| [Docker](https://www.docker.com/)                     | Containerization     |
| [GitHub Actions](https://github.com/features/actions) | CI/CD                |

## 🚀 Kurulum

```bash
# Projeyi klonla
git clone https://github.com/ahmetfatihtuluce/nextjs-cidcd.git
cd nextjs-cidcd

# Bağımlılıkları yükle
npm install

# Environment dosyasını oluştur
cp .env.example .env.local
# .env.local dosyasını kendi ayarlarınıza göre düzenleyin

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda [http://localhost:4023](http://localhost:4023) adresini aç.

## 🌍 Environment Variables

Proje environment variables kullanır. `.env.example` dosyasını `.env.local` olarak kopyalayın:

```bash
cp .env.example .env.local
```

### Önemli Environment Variables:

| Variable | Açıklama | Default |
|----------|----------|---------|
| `NEXT_PUBLIC_APP_NAME` | Uygulama adı | "Next.js CI/CD Example" |
| `PORT` | Server portu | 4023 |
| `NEXT_PUBLIC_API_URL` | API base URL | http://localhost:4023 |
| `NEXT_PUBLIC_LOGIN_USERNAME` | Demo kullanıcı adı | test |
| `NEXT_PUBLIC_LOGIN_PASSWORD` | Demo şifresi | test123 |
| `NODE_ENV` | Ortam | development |

**Not:** `NEXT_PUBLIC_` prefix'li değişkenler client-side'da kullanılabilir.

## 🐳 Docker ile Çalıştırma

### Development (Geliştirme)

```bash
# Development container'ı başlat (hot-reload aktif)
docker-compose up dev
```

### Production

```bash
# Production container'ı başlat
docker-compose up prod

# Veya manuel olarak
docker build -t nextjs-cicd .
docker run -p 4023:3000 nextjs-cicd
```

## 🔄 CI/CD Pipeline

Bu proje, GitHub Actions ile otomatik CI/CD pipeline içerir:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    Lint     │ -> │    Test     │ -> │    Build    │ -> │   Docker    │
│  & Format   │    │  Coverage   │    │   Next.js   │    │    Image    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                          │
                          v
                   ┌─────────────┐
                   │  Security   │
                   │    Scan     │
                   └─────────────┘
```

### Pipeline Aşamaları

1. **🔍 Lint & Format**: ESLint ve Prettier kontrolü
2. **🧪 Test**: Jest testleri ve coverage raporu
3. **🏗️ Build**: Next.js production build
4. **🐳 Docker**: Docker image oluşturma
5. **🔒 Security**: npm audit güvenlik taraması

## 📋 Komutlar

| Komut                   | Açıklama                 |
| ----------------------- | ------------------------ |
| `npm run dev`           | Geliştirme sunucusu      |
| `npm run build`         | Production build         |
| `npm run start`         | Production sunucusu      |
| `npm run lint`          | ESLint kontrolü          |
| `npm run lint:fix`      | ESLint otomatik düzeltme |
| `npm run format`        | Prettier ile formatlama  |
| `npm run format:check`  | Format kontrolü          |
| `npm run test`          | Testleri çalıştır        |
| `npm run test:watch`    | Watch modunda test       |
| `npm run test:coverage` | Coverage raporu          |

## 📁 Proje Yapısı

```
nextjs-cicd/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions pipeline
├── src/
│   ├── app/                   # Next.js App Router
│   └── __tests__/             # Test dosyaları
├── Dockerfile                 # Production Dockerfile
├── Dockerfile.dev             # Development Dockerfile
├── docker-compose.yml         # Docker Compose yapılandırması
├── jest.config.ts             # Jest yapılandırması
├── next.config.ts             # Next.js yapılandırması
└── package.json
```

## 📖 Öğrenilen Kavramlar

- ✅ CI/CD nedir ve neden önemlidir
- ✅ GitHub Actions ile otomatik pipeline oluşturma
- ✅ Docker ile containerization
- ✅ Multi-stage Docker builds
- ✅ Otomatik test ve coverage
- ✅ Kod kalitesi araçları (ESLint, Prettier)
- ✅ Güvenlik taraması

## 📄 Lisans

MIT License

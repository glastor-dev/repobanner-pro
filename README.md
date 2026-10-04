<div align="center">
  <a href="https://github.com/glastor-dev/repobanner-pro">
    <img width="1200" alt="Banner" src="./assets/banner-1791108179649.svg" />
  </a>
  <br/>

  <h1>✨ RepoBanner Pro</h1>
  <p><strong>El ecosistema definitivo de ingeniería y diseño para la generación de banners automáticos.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Powered_by-GLASTOR_CORE-indigo?style=for-the-badge&logo=react" alt="Glastor Core" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind v4" />
    <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  </p>
</div>

---

## ⚡ Sobre el Proyecto

**RepoBanner Pro** es una potente aplicación web diseñada para desarrolladores que desean que sus repositorios de GitHub destaquen visualmente en segundos. Integra inteligencia artificial para analizar el contexto de tu repositorio y un motor gráfico avanzado en el navegador para exportar assets en PNG o fragmentos de código Markdown listos para pegar.

Todo el ecosistema está arquitecturado bajo **GLASTOR® CORE**, garantizando alta escalabilidad, seguridad en las peticiones y una experiencia de usuario estelar.

## 🚀 Características Principales

- 🎨 **Editor Visual Avanzado:** Modifica colores, fuentes, patrones de fondo (dots, grid), desenfoques y gradientes en tiempo real.
- 🤖 **Análisis Impulsado por IA:** Conectado a _Gemini 2.0 Flash_, el sistema analiza cualquier URL de GitHub para sugerir copies y descripciones perfectas.
- 🛡️ **Motor de Badges Dinámico:** Genera badges de estado, estadísticas en vivo y etiquetas tecnológicas (React, Vercel, Node, Python) impulsado por Shields.io.
- 💾 **Sincronización en la Nube:** Guarda tus diseños como "Presets" o compártelos mediante URLs encriptadas conectadas a una base de datos Serverless (PostgreSQL vía Neon).
- ⚙️ **Rate Limiting con Redis:** API blindada contra abusos mediante un limitador de memoria en la nube.
- 🚀 **Exportación Sin Fricción:** Descarga tu diseño finalizado como `.png` de alta resolución al instante.

## 🛠️ Stack Tecnológico

| Front-end        | Back-end           | Infraestructura       |
| ---------------- | ------------------ | --------------------- |
| React 19         | Express / Vite API | Vercel (Serverless)   |
| Tailwind CSS v4  | Prisma ORM         | Neon DB (PostgreSQL)  |
| Zustand (Estado) | Google GenAI SDK   | Redis (Rate Limiting) |
| Framer Motion    | Node.js            | Husky & Playwright    |

## 📦 Instalación Local

Asegúrate de tener Node.js 20+ instalado en tu equipo.

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/repobanner-pro.git
   cd repobanner-pro
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   Renombra `.env.example` a `.env` (o crea un `.env` nuevo) y agrega tus credenciales:

   ```env
   # Inteligencia Artificial
   GEMINI_API_KEY="tu-api-key-de-google-studio"

   # Base de Datos PostgreSQL (Neon)
   DATABASE_URL="postgresql://usuario:password@host/neondb"
   ```

4. **Sincronizar Prisma:**

   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Levantar el servidor:**
   ```bash
   npm run dev
   ```
   > 🌍 La aplicación estará disponible en `http://localhost:3000`

## ☁️ Despliegue en Vercel

RepoBanner Pro está 100% optimizado para un despliegue sin fricciones en Vercel:

1. Importa este proyecto en tu panel de Vercel.
2. En la sección **Environment Variables**, asegúrate de registrar `GEMINI_API_KEY` y tu `DATABASE_URL`.
3. Dale a **Deploy**. Vercel detectará automáticamente Vite y las rutas `/api` serán tratadas como _Serverless Functions_.

---

<div align="center">
  <p>Construido con dedicación tecnológica. <br> <strong>Powered by GLASTOR® CORE</strong></p>
</div>

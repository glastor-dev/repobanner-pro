
# Changelog

All relevant changes for **RepoBanner Pro** are documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and versioned according to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased]

## [1.0.0] - 2026-01-01

### Added

- Dynamic README banner generator (React + Vite + TypeScript)
- Preset gallery: save, import/export, and apply banner styles
- Badge system: dynamic repo badges (stars, license, workflow, etc.)
- Gemini AI integration for repo analysis and social copy generation
- Serverless API endpoints (Vercel Functions): `/api/analyze`, `/api/social`, `/api/logo`
- Drag & drop logo upload and live editor
- Rate limiting and in-memory cache for API endpoints
- Automated CI/CD: lint, format, test, coverage, deploy, preview (GitHub Actions)
- Community templates: issues, PRs, contributing, code of conduct
- License: GNU GPL v3.0

### Changed

- API key security: `GEMINI_API_KEY` is server-side only; all Gemini calls go through backend endpoints

### Security

- `GEMINI_API_KEY` is never exposed to the frontend (recommended for public deployments)

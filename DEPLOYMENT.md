# Deployment Guide

This project has two deployable apps:

- `server/`: Express API
- `client/`: Vite static frontend

## Backend Web Service

Use these settings on Render, Railway, Fly.io, or another Node host:

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Default port: set by the host through `PORT`

Backend environment variables:

```env
PORT=5000
CLIENT_ORIGIN=https://your-frontend-domain.com
OPENAI_API_KEY=your_openai_key_optional
OPENAI_MODEL=gpt-4o-mini
```

If `OPENAI_API_KEY` is empty, the API uses the local mock quiz generator.

## Frontend Static Site

Use these settings:

- Root directory: `client`
- Build command: `npm install && npm run build`
- Publish directory: `dist`

Frontend environment variables:

```env
VITE_API_URL=https://your-backend-domain.com
```

## Local Production Check

```bash
npm run install:all
npm run build
npm start
```

Then serve or preview the client:

```bash
npm run preview --prefix client
```

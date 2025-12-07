# Deployment Guide for Render

This project consists of two parts: a **Node.js Backend** and a **React Frontend**, now separated into `server` and `client` directories.

## 1. Backend Deployment (Web Service)

Create a new **Web Service** on Render connected to this repository.

*   **Name:** `ai-quiz-backend`
*   **Root Directory:** `ai-quiz-backend`
*   **Environment:** `Node`
*   **Build Command:** `npm install`
*   **Start Command:** `node index.js`

### Environment Variables (Backend)
Add these in the "Environment" tab:
*   `GEMINI_API_KEY`: Your Google Gemini API Key.
*   `FRONTEND_URL`: The URL of your deployed frontend (e.g., `https://ai-quiz-frontend.onrender.com`).

## 2. Frontend Deployment (Static Site)

Create a new **Static Site** on Render connected to this repository.

*   **Name:** `ai-quiz-frontend`
*   **Root Directory:** `client`
*   **Build Command:** `npm install && npm run build`
*   **Publish Directory:** `dist`

### Environment Variables (Frontend)
Add this in the "Environment" tab:
*   `VITE_API_URL`: The URL of your deployed backend (e.g., `https://ai-quiz-backend.onrender.com`).

## Important Code Check
Before deploying, ensure your frontend API calls use the environment variable.

Check where you define the API base URL (e.g., `src/config.js` or `src/api/axios.js`). It should look something like:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

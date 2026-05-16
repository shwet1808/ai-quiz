# AI Quiz App

A full-stack AI-powered quiz application with a React + Vite frontend and a Node.js + Express backend. Users can enter a name, generate quizzes by topic, take timed quizzes, save results, view leaderboard rankings, and inspect profile/history stats.

## Tech Stack

- Frontend: React 18, Vite 8, Tailwind CSS, Framer Motion, React Router, React Toastify, Lucide React
- Backend: Node.js, Express, CORS, Helmet, Multer, OpenAI SDK
- Storage: Local JSON file at `server/data/db.json`
- AI: OpenAI when `OPENAI_API_KEY` is configured, otherwise a local mock quiz generator

## Project Structure

```text
ai-quiz/
  client/
    src/
      components/
      context/
      data/
      hooks/
      pages/
      services/
      utils/
  server/
    src/
      controllers/
      middleware/
      routes/
      services/
      utils/
    data/
      db.json
```

## Environment Setup

Create `server/.env`:

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

`OPENAI_API_KEY` is optional. Without it, the server automatically uses the mock generator.

## Installation

From the project root:

```bash
npm install
npm run install:all
```

## Run Locally

Run frontend and backend together:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev --prefix server
npm run dev --prefix client
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Build

```bash
npm run build
```

## API Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/generate/topic`
- `POST /api/upload/pdf`
- `POST /api/upload/image`
- `POST /api/quizzes/submit`
- `GET /api/leaderboard`
- `GET /api/users/:username/profile`
- `GET /api/users/:username/history`

## Notes

- PDF/image uploads use the uploaded filename as the topic seed in the local mock path. Add document parsing or OCR later if you want content-aware uploads without OpenAI vision/file parsing.
- Audio files are optional. The app continues to work if files are absent from `client/public/audio/`.

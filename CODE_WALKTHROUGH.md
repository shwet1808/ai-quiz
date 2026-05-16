# AI Quiz Code Walkthrough

This document explains how the app works in developer terms, but with enough context that you can read the code without getting lost.

## Big Picture

The project has two apps:

- `client/`: the React + Vite frontend. This is what the user sees in the browser.
- `server/`: the Node.js + Express backend. This receives API requests, generates quizzes, stores attempts, and returns leaderboard/profile data.

The frontend never talks directly to OpenAI. It talks to your own Express server. The server decides whether to call OpenAI or use the local mock generator.

## Request Flow

When a user starts a quiz:

1. The user enters a name, topic, difficulty, and question count in `client/src/components/home/UserSetupForm.jsx`.
2. The form calls `generateQuizFromTopic()` from `client/src/services/apiService.js`.
3. `apiService.js` sends a `POST` request to:

   ```text
   /api/generate/topic
   ```

4. The Express route in `server/src/routes/quizRoutes.js` forwards that request to `generateTopicQuiz()` in `server/src/controllers/quizController.js`.
5. The controller calls `createQuiz()` in `server/src/services/quizService.js`.
6. `quizService.js` validates the input and calls `generateQuiz()` in `server/src/services/aiService.js`.
7. `aiService.js` either:
   - calls OpenAI if `OPENAI_API_KEY` exists, or
   - uses the built-in mock generator if no API key exists.
8. The generated quiz is saved to `server/data/db.json`.
9. The quiz is returned to the frontend and stored in React state by `QuizContext.jsx`.
10. The user is sent to `/quiz`.

## Important Frontend Files

### `client/src/services/apiService.js`

This is the frontend API layer. Instead of scattering `fetch()` calls across many components, the app keeps backend communication here.

Important functions:

- `loginUser(name)`: creates or logs in a user by name.
- `generateQuizFromTopic(topic, difficulty, questionCount, name)`: asks the backend to generate a quiz.
- `uploadPDF(file, difficulty, questionCount)`: sends a PDF to the backend.
- `uploadImage(file, difficulty, questionCount)`: sends an image to the backend.
- `submitQuiz(payload)`: saves quiz results.
- `getLeaderboard(filters)`: loads leaderboard entries.
- `getUserProfile(username)`: loads profile stats.

The base URL comes from:

```js
import.meta.env.VITE_API_URL
```

If that is not set, it defaults to:

```text
http://localhost:5000/api
```

### `client/src/context/QuizContext.jsx`

This is the shared quiz state for the frontend.

It stores:

- current user
- selected quiz config
- generated questions
- current question index
- selected answers
- score
- quiz started/completed state

Important functions:

- `loadQuizFromAPI()`: saves the generated quiz into frontend state.
- `submitAnswer()`: stores an answer and updates the score if correct.
- `skipQuestion()`: marks a question as skipped.
- `nextQuestion()`: moves to the next question or completes the quiz.
- `submitQuiz()`: sends final quiz results to the backend.
- `resetQuiz()`: clears the current quiz.

The user is also saved in `localStorage`, so the profile page still knows who the current user is after navigation.

### `client/src/components/home/UserSetupForm.jsx`

This is the form on the home page.

It handles:

- name input
- topic selection
- custom topic entry
- difficulty selection
- question count selection
- optional PDF/image upload
- loading state while quiz generation is happening
- error toast messages

For text/topic quizzes, it calls:

```js
generateQuizFromTopic(...)
```

For file quizzes, it calls either:

```js
uploadPDF(...)
uploadImage(...)
```

### `client/src/pages/Quiz.jsx`

This page runs the live quiz experience.

It handles:

- initial loading overlay
- countdown overlay
- 15-second timer per question
- auto-skip when time runs out
- navigation to results when the quiz ends

The actual question UI is rendered by:

```text
client/src/components/quiz/QuestionCard.jsx
```

### `client/src/pages/Result.jsx`

This page shows the final score and answer review.

Important detail: it also calls `submitQuiz()` from `QuizContext.jsx`, which saves the completed attempt to the backend.

That saved attempt is what later appears in:

- leaderboard
- profile stats
- quiz history

### `client/src/pages/Leaderboard.jsx`

This page calls:

```js
getLeaderboard(filters)
```

It displays real backend attempts. If the backend cannot be reached, it falls back to the old dummy leaderboard so the UI does not break during development.

### `client/src/pages/Profile.jsx`

This page calls:

```js
getUserProfile(user.name)
```

The backend calculates stats such as:

- total quizzes
- total score
- best score
- average score
- accuracy
- rank
- recent quizzes
- performance by topic
- achievements

## Important Backend Files

### `server/src/index.js`

This is the backend entry point.

It:

1. Loads environment variables.
2. Ensures the JSON database exists.
3. Starts the Express server.

### `server/src/app.js`

This creates the Express app.

It adds:

- `helmet()` for safer HTTP headers
- `cors()` so the React frontend can call the API
- `express.json()` so JSON request bodies work
- all `/api` routes
- centralized 404 and error handling

### `server/src/routes/index.js`

This combines all backend route groups:

```text
/api/auth
/api/generate
/api/upload
/api/quizzes
/api/users
/api/leaderboard
```

It also defines:

```text
GET /api/health
```

### `server/src/routes/authRoutes.js`

Defines:

```text
POST /api/auth/login
POST /api/auth/register
```

Both currently do the same thing because login is name-only. If the name does not exist, the backend creates a user. If it exists, the backend updates `lastLoginAt`.

### `server/src/routes/quizRoutes.js`

Defines:

```text
POST /api/generate/topic
POST /api/upload/pdf
POST /api/upload/image
POST /api/quizzes/submit
```

It uses `multer` for file uploads.

### `server/src/controllers/quizController.js`

Controllers are thin. Their job is to receive HTTP requests and call service functions.

For example:

```js
generateTopicQuiz -> createQuiz
generateFileQuiz -> createFileQuiz
submitQuiz -> recordQuizSubmission
```

### `server/src/services/quizService.js`

This contains quiz business logic.

It:

- validates name, difficulty, and question count
- creates users when needed
- calls the AI/mock quiz generator
- saves generated quizzes
- calculates submission score
- saves quiz attempts
- updates user total score

### `server/src/services/aiService.js`

This is where quiz generation happens.

The main function is:

```js
generateQuiz({ topic, difficulty, questionCount })
```

It checks:

```js
if (process.env.OPENAI_API_KEY) {
  // try OpenAI
}
```

If `OPENAI_API_KEY` exists, the server calls OpenAI and asks for JSON quiz questions.

If there is no key, or if OpenAI fails, the server runs:

```js
generateMockQuiz(...)
```

That means the app still works without AI. It generates realistic quiz-shaped questions locally.

### `server/src/services/storageService.js`

This is the JSON database layer.

It reads and writes:

```text
server/data/db.json
```

Main functions:

- `ensureDatabase()`: creates the file if it does not exist.
- `readDatabase()`: reads JSON from disk.
- `writeDatabase(data)`: writes JSON to disk.
- `updateDatabase(updater)`: reads, modifies, then writes the DB.

This keeps storage logic out of controllers and routes.

### `server/src/services/userService.js`

This handles user data.

Important functions:

- `findOrCreateUser(name)`: login/register by name.
- `getProfileForUser(name)`: builds user stats from saved attempts.
- `getHistoryForUser(name)`: returns all attempts for one user.

### `server/src/controllers/leaderboardController.js`

This reads saved attempts from the JSON DB, filters them, sorts by score, and returns leaderboard rows.

Supported query filters:

```text
topic
difficulty
timePeriod
```

Example:

```text
/api/leaderboard?topic=Coding&difficulty=Hard&timePeriod=week
```

## How Quiz Generation Works Without AI

If you do not connect OpenAI, quiz generation still works because of the mock generator in:

```text
server/src/services/aiService.js
```

The logic is:

```js
export const generateQuiz = async ({ topic, difficulty, questionCount }) => {
  if (process.env.OPENAI_API_KEY) {
    try {
      return await generateWithOpenAI(...)
    } catch {
      // fall back to mock generator
    }
  }

  return generateMockQuiz(...)
}
```

So there are two fallback cases:

1. No `OPENAI_API_KEY` in `server/.env`.
2. OpenAI is configured but fails for any reason.

The mock generator creates questions using:

- the topic name
- the difficulty level
- a list of concepts for known topics like Space, Coding, History, and Science
- generic concepts for custom topics

Each generated question still has the required shape:

```js
{
  id,
  topic,
  difficulty,
  question,
  options: ["A", "B", "C", "D"],
  correctAnswer: 0,
  explanation
}
```

That is why the frontend does not care whether the questions came from OpenAI or from the mock generator. The data format is the same.

## JSON Database Shape

The local database looks like this:

```json
{
  "users": [],
  "quizzes": [],
  "attempts": []
}
```

`users` stores names and score totals.

`quizzes` stores generated quizzes.

`attempts` stores completed quiz submissions. Leaderboard and profile stats are calculated from attempts.

## Environment Variables

Backend:

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

Frontend:

```env
VITE_API_URL=http://localhost:5000
```

## Run Commands

Install everything:

```bash
npm install
npm run install:all
```

Run both apps:

```bash
npm run dev
```

Run only backend:

```bash
npm run dev --prefix server
```

Run only frontend:

```bash
npm run dev --prefix client
```

Build frontend:

```bash
npm run build --prefix client
```

## What To Improve Later

- Add real authentication instead of name-only login.
- Replace JSON storage with MongoDB or PostgreSQL.
- Parse uploaded PDFs instead of only using the filename as the topic seed.
- Add OCR or image understanding for uploaded images.
- Store quiz duration and per-question timing.
- Add tests for services and API routes.

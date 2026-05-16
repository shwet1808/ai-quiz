import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';

// Express is the framework we use to build our web server. 
// Think of 'app' as the main program that listens for requests from the frontend.
const app = express();

// Helmet adds extra security headers to our server's responses to protect against common web attacks.
app.use(helmet());

// CORS (Cross-Origin Resource Sharing) allows our frontend (running on a different port like 5173)
// to talk to this backend server (running on port 5000) without the browser blocking it.
app.use(cors({
  origin: process.env.CLIENT_ORIGIN?.split(',') || ['http://localhost:5173'],
  credentials: true
}));

// This tells the server to understand data sent in JSON format (like when we submit forms or data).
// We limit it to 1mb so people can't crash the server by sending huge files.
app.use(express.json({ limit: '1mb' }));

// This tells the server to understand data sent via standard HTML forms.
app.use(express.urlencoded({ extended: true }));

// This is where we attach all our API routes (e.g., /api/quiz, /api/users).
// Whenever a request starts with '/api', it will look in the 'routes' folder.
app.use('/api', routes);

// If someone tries to visit a URL on our server that doesn't exist, we catch it here and return a 404 error.
app.use(notFoundHandler);

// This is our global error catcher. If anything goes wrong anywhere in the code, 
// it eventually comes here so we can send a proper error message back to the user instead of crashing.
app.use(errorHandler);

export default app;

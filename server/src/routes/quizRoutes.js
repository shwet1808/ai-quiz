import { Router } from 'express';
import multer from 'multer';
import {
  generateTopicQuiz,
  generateFileQuiz,
  submitQuiz
} from '../controllers/quizController.js';

// Think of a Router like a traffic cop. It looks at the URL the user is trying to visit
// (like /api/quiz/topic) and points them to the right function to handle it.
const router = Router();

// Multer is a helper tool that handles file uploads (like PDFs or images).
// Here we tell it to store uploaded files in memory temporarily and limit them to 10MB.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

// When someone sends a POST request to '/topic', run the 'generateTopicQuiz' function.
router.post('/topic', generateTopicQuiz);

// When someone sends a POST request to '/pdf' with a file, upload the file first, 
// then run the 'generateFileQuiz' function.
router.post('/pdf', upload.single('file'), generateFileQuiz);

// Similar to PDF, but for images.
router.post('/image', upload.single('file'), generateFileQuiz);

// When someone sends a POST request to '/submit' (after finishing a quiz), 
// run the 'submitQuiz' function to calculate their score.
router.post('/submit', submitQuiz);

export default router;

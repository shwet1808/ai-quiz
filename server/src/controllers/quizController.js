import { asyncHandler } from '../utils/asyncHandler.js';
import { createQuiz, createFileQuiz, recordQuizSubmission } from '../services/quizService.js';

// Controllers act as the middlemen between the Router (URLs) and the Services (business logic).
// They receive the request from the user, ask the Service to do the hard work, and then send the response back.

// This function is triggered when a user wants a new quiz based on a topic string.
// `asyncHandler` is a wrapper that automatically catches any errors so our server doesn't crash.
export const generateTopicQuiz = asyncHandler(async (req, res) => {
  // We pass the data the user sent (req.body) to the quizService to actually create the quiz.
  const quiz = await createQuiz(req.body);
  
  // Send the quiz back to the frontend with a 201 (Created) success status code.
  res.status(201).json({ success: true, quiz });
});

// This function is triggered when a user uploads a file to generate a quiz.
export const generateFileQuiz = asyncHandler(async (req, res) => {
  const quiz = await createFileQuiz({
    file: req.file, // The actual file the user uploaded
    difficulty: req.body.difficulty,
    questionCount: req.body.questionCount
  });
  res.status(201).json({ success: true, quiz });
});

// This function is triggered when a user finishes a quiz and submits their answers.
export const submitQuiz = asyncHandler(async (req, res) => {
  // We pass the user's answers to the quizService to calculate the score and save it to the database.
  const attempt = await recordQuizSubmission(req.body);
  res.status(201).json({ success: true, attempt });
});

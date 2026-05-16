import { generateQuiz } from './aiService.js';
import { findOrCreateUser } from './userService.js';
import { updateDatabase } from './storageService.js';
import { validateDifficulty, validateName, validateQuestionCount } from '../utils/validators.js';
import { randomUUID } from 'node:crypto';

// Services contain the core "business logic" of our app. This is where the actual work gets done.

/**
 * Creates a brand new quiz based on a topic.
 */
export const createQuiz = async ({ name, topic, difficulty, questionCount }) => {
  // If a username was provided, ensure they exist in our database before proceeding.
  if (name) {
    await findOrCreateUser(name);
  }

  // Make sure the topic isn't just empty spaces
  const cleanTopic = String(topic || '').trim();
  if (!cleanTopic) {
    const error = new Error('Topic is required');
    error.statusCode = 400; // 400 means "Bad Request" (the user messed up)
    throw error;
  }

  // Ensure the difficulty and question counts are valid (e.g. not 1 million questions)
  const cleanDifficulty = validateDifficulty(difficulty);
  const count = validateQuestionCount(questionCount || 10);
  
  // Call our aiService (which talks to Gemini) to actually generate the quiz content
  const quiz = await generateQuiz({ topic: cleanTopic, difficulty: cleanDifficulty, questionCount: count });

  // Save the newly generated quiz into our database so we can look it up later
  await updateDatabase(async (db) => {
    db.quizzes.push({
      id: quiz.id,
      topic: cleanTopic,
      difficulty: cleanDifficulty,
      questionCount: quiz.questions.length,
      questions: quiz.questions,
      createdAt: new Date().toISOString()
    });
    return db;
  });

  return quiz;
};

/**
 * Creates a quiz based on an uploaded file.
 */
export const createFileQuiz = async ({ file, difficulty, questionCount }) => {
  // If they didn't upload a file, throw an error
  if (!file) {
    const error = new Error('File is required');
    error.statusCode = 400;
    throw error;
  }

  // Right now, we just use the name of the file as the topic for the quiz.
  // In the future, this is where you could add code to actually read the text inside a PDF!
  const topic = readableTopicFromFile(file.originalname);
  
  // Now that we have a topic, we just reuse the standard createQuiz function
  return createQuiz({ topic, difficulty, questionCount });
};

/**
 * Handles saving the user's answers when they finish a quiz.
 */
export const recordQuizSubmission = async ({ name, topic, difficulty, questions, answers, durationSeconds = 0 }) => {
  const userName = validateName(name);
  const cleanDifficulty = validateDifficulty(difficulty);
  
  if (!Array.isArray(questions) || !Array.isArray(answers)) {
    const error = new Error('Questions and answers are required');
    error.statusCode = 400;
    throw error;
  }

  const totalQuestions = questions.length;
  
  // We calculate the score on the server instead of trusting the frontend. 
  // This prevents hackers from sending a fake 100% score to the server!
  const correctCount = questions.reduce((count, question, index) => {
    // If the answer they chose matches the correct answer, add 1 to the count
    return count + (answers[index] === question.correctAnswer ? 1 : 0);
  }, 0);
  
  const score = correctCount * 100; // Each correct answer is worth 100 points
  const percentage = totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : 0;
  
  // Create an object representing this attempt
  const attempt = {
    id: randomUUID(),
    userName,
    topic: String(topic || 'AI Generated').trim(),
    difficulty: cleanDifficulty,
    score,
    percentage,
    correctCount,
    totalQuestions,
    answers,
    durationSeconds: Number(durationSeconds) || 0,
    completedAt: new Date().toISOString()
  };

  // Save the attempt and update the user's total score in the database
  await updateDatabase(async (db) => {
    // Find the user, or create them if they don't exist
    const user = db.users.find((entry) => entry.name.toLowerCase() === userName.toLowerCase())
      || { id: randomUUID(), name: userName, avatar: '🎮', totalScore: 0, createdAt: new Date().toISOString() };
    
    if (!db.users.some((entry) => entry.id === user.id)) {
      db.users.push(user);
    }
    
    // Add the new score to their total score
    user.totalScore = (user.totalScore || 0) + score;
    
    // Give them a cooler avatar emoji based on how high their score is!
    user.avatar = score >= 900 ? '👑' : score >= 700 ? '🏆' : score >= 500 ? '⭐' : '🎮';
    
    db.attempts.push(attempt);
    return db;
  });

  return attempt;
};

// Helper function to turn a messy filename (like "My_Cool-Document.pdf") into a clean topic ("My Cool Document")
const readableTopicFromFile = (filename = 'Uploaded File') => {
  return filename
    .replace(/\.[^.]+$/, '') // Removes the file extension (like .pdf)
    .replace(/[-_]+/g, ' ')  // Replaces dashes and underscores with spaces
    .replace(/\s+/g, ' ')    // Replaces multiple spaces with a single space
    .trim() || 'Uploaded File';
};

import { GoogleGenAI, Type } from '@google/genai';
import { randomUUID } from 'node:crypto';

// These concepts help generate a "mock" quiz if the API key is not available
const conceptsByTopic = {
  Space: ['planetary orbits', 'stars', 'galaxies', 'missions', 'moons', 'black holes'],
  Coding: ['JavaScript', 'React', 'APIs', 'data structures', 'debugging', 'web architecture'],
  History: ['civilizations', 'revolutions', 'leaders', 'trade routes', 'wars', 'cultural change'],
  Science: ['biology', 'chemistry', 'physics', 'earth systems', 'scientific method', 'energy']
};

/**
 * Main function to generate a quiz.
 * It tries to use the Gemini API first. If no key is found or an error occurs,
 * it gracefully falls back to generating a "mock" (fake) quiz so the app doesn't crash.
 */
export const generateQuiz = async ({ topic, difficulty, questionCount }) => {
  // If the user provided a Gemini API key in their .env file, we use it!
  if (process.env.GEMINI_API_KEY) {
    try {
      return await generateWithGemini({ topic, difficulty, questionCount });
    } catch (error) {
      console.warn(`Gemini generation failed, using mock generator: ${error.message}`);
    }
  }

  // Fallback: If there's no API key or Gemini failed, use the mock generator
  return generateMockQuiz({ topic, difficulty, questionCount });
};

/**
 * Connects to Google's Gemini API to generate real quiz questions.
 */
const generateWithGemini = async ({ topic, difficulty, questionCount }) => {
  // Initialize the Gemini client using the key from the .env file
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  // Define exactly how we want Gemini to format its response. 
  // We want a JSON object containing an array of questions, each with specific fields.
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        description: "A list of multiple choice questions",
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING, description: "The quiz question text" },
            options: {
              type: Type.ARRAY,
              description: "Exactly 4 distinct options for the question",
              items: { type: Type.STRING },
            },
            correctAnswer: {
              type: Type.INTEGER,
              description: "The zero-based index (0, 1, 2, or 3) of the correct option",
            },
            explanation: {
              type: Type.STRING,
              description: "A brief explanation of why the answer is correct",
            },
          },
          required: ["question", "options", "correctAnswer", "explanation"],
        },
      },
    },
    required: ["questions"],
  };

  const prompt = `Create ${questionCount} ${difficulty} quiz questions about ${topic}. Each item needs question, exactly 4 options, correctAnswer as the zero-based index, and explanation.`;

  // Call the Gemini model
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      systemInstruction: 'You generate accurate multiple-choice quiz JSON. Return only valid JSON according to the schema.',
      temperature: 0.8,
    }
  });

  // Parse the JSON string returned by Gemini into a Javascript object
  const parsed = JSON.parse(response.text);
  
  // Normalize the data (add IDs) to match what the frontend expects
  return normalizeQuestions(parsed.questions, topic, difficulty, questionCount);
};

/**
 * Generates a fake quiz if the API key isn't working. 
 * This uses a hardcoded set of rules and words to create semi-random questions.
 */
export const generateMockQuiz = ({ topic, difficulty, questionCount }) => {
  const cleanTopic = String(topic || 'General Knowledge').trim();
  const concepts = conceptsByTopic[cleanTopic] || [
    'foundations',
    'key terminology',
    'real-world applications',
    'common misconceptions',
    'important examples',
    'practical reasoning'
  ];

  // Map over the requested number of questions and build them one by one
  const questions = Array.from({ length: questionCount }, (_, index) => {
    const concept = concepts[index % concepts.length];
    const optionData = buildOptions(cleanTopic, concept, index);

    return {
      id: randomUUID(),
      topic: cleanTopic,
      difficulty,
      question: buildQuestion(cleanTopic, concept, difficulty, index),
      options: optionData.options,
      correctAnswer: optionData.correctAnswer,
      explanation: `${optionData.options[optionData.correctAnswer]} is the strongest answer because it connects ${concept} with the core ideas used in ${cleanTopic}.`
    };
  });

  return { id: randomUUID(), topic: cleanTopic, difficulty, questions };
};

// Helper function to build a fake question string based on difficulty
const buildQuestion = (topic, concept, difficulty, index) => {
  const stems = {
    Easy: `Which statement best describes ${concept} in ${topic}?`,
    Medium: `In ${topic}, how should a learner reason about ${concept} when solving a practical problem?`,
    Hard: `A challenging ${topic} scenario depends on ${concept}. Which conclusion is most accurate?`
  };
  return `${stems[difficulty] || stems.Medium} (#${index + 1})`;
};

// Helper function to build fake options for the mock questions
const buildOptions = (topic, concept, index) => {
  const optionSets = [
    {
      correct: `${concept} is mainly about recognizing reliable patterns`,
      distractors: [
        `${concept} is unrelated to the rest of ${topic}`,
        `${concept} only matters in rare edge cases`,
        `${concept} means memorizing facts without context`
      ]
    },
    {
      correct: `Compare evidence, eliminate weak claims, then apply ${concept}`,
      distractors: [
        `Choose the longest answer because it is usually correct`,
        `Ignore constraints and focus only on speed`,
        `Treat every ${topic} problem as identical`
      ]
    },
    {
      correct: `It requires connecting definitions, constraints, and consequences`,
      distractors: [
        `It is solved by guessing from familiar words`,
        `It has no effect on real decisions`,
        `It always has the same answer regardless of context`
      ]
    }
  ];
  const selected = optionSets[index % optionSets.length];
  const correctAnswer = index % 4; // Ensure the correct answer moves around
  const options = [
    ...selected.distractors.slice(0, correctAnswer),
    selected.correct,
    ...selected.distractors.slice(correctAnswer)
  ];

  return { options, correctAnswer };
};

/**
 * Validates and formats the questions returned by the AI before sending them to the frontend.
 * Adds unique IDs to everything so React can render them properly.
 */
const normalizeQuestions = (questions, topic, difficulty, questionCount) => {
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('AI returned no questions');
  }

  return {
    id: randomUUID(), // A unique ID for the whole quiz
    topic,
    difficulty,
    questions: questions.slice(0, questionCount).map((question) => {
      // Ensure the AI gave us exactly 4 options
      if (!Array.isArray(question.options) || question.options.length !== 4) {
        throw new Error('AI returned an invalid options list');
      }
      return {
        id: randomUUID(), // A unique ID for this specific question
        topic,
        difficulty,
        question: String(question.question),
        options: question.options.map(String),
        correctAnswer: Number(question.correctAnswer),
        explanation: String(question.explanation || 'Review the correct answer and compare it with the other options.')
      };
    })
  };
};

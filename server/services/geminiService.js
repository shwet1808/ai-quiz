import { GoogleGenerativeAI } from '@google/generative-ai';
import { createQuizPrompt, createImageQuizPrompt } from '../prompts/quizPrompt.js';

class GeminiService {
    constructor(apiKey) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }

    /**
     * Generate quiz questions from text content
     * @param {string} text - Content to generate quiz from
     * @param {string} difficulty - Difficulty level (Easy, Medium, Hard)
     * @param {number} questionCount - Number of questions to generate
     * @returns {Promise<Object>} Quiz data with questions
     */
    async generateQuizFromText(text, difficulty = 'Medium', questionCount = 10) {
        try {
            const prompt = createQuizPrompt(text, difficulty, questionCount);

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            let responseText = response.text();

            // Clean up response - remove markdown code blocks if present
            responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            // Parse JSON response
            const quizData = JSON.parse(responseText);

            // Validate structure
            if (!quizData.questions || !Array.isArray(quizData.questions)) {
                throw new Error('Invalid quiz structure: missing questions array');
            }

            // Ensure all questions have required fields
            quizData.questions = quizData.questions.map((q, index) => ({
                id: q.id || index + 1,
                question: q.question || '',
                options: q.options || [],
                correctAnswer: q.correctAnswer ?? 0,
                explanation: q.explanation || '',
                difficulty: q.difficulty || difficulty,
                topic: q.topic || 'General',
                imageUrl: q.imageUrl || null
            }));

            return quizData;
        } catch (error) {
            console.error('Error generating quiz from text:', error);
            throw new Error(`Failed to generate quiz: ${error.message}`);
        }
    }

    /**
     * Analyze image and generate quiz questions
     * @param {Buffer} imageBuffer - Image file buffer
     * @param {string} mimeType - Image MIME type
     * @param {string} difficulty - Difficulty level
     * @param {number} questionCount - Number of questions
     * @returns {Promise<Object>} Quiz data with questions
     */
    async generateQuizFromImage(imageBuffer, mimeType, difficulty = 'Medium', questionCount = 10) {
        try {
            // First, analyze the image to get description
            const imagePart = {
                inlineData: {
                    data: imageBuffer.toString('base64'),
                    mimeType: mimeType
                }
            };

            const descriptionPrompt = 'Describe this image in detail. Include all visible elements, text, diagrams, concepts, and any educational content present. Be comprehensive and specific.';

            const descriptionResult = await this.model.generateContent([descriptionPrompt, imagePart]);
            const descriptionResponse = await descriptionResult.response;
            const imageDescription = descriptionResponse.text();

            // Now generate quiz based on the description
            const quizPrompt = createImageQuizPrompt(imageDescription, difficulty, questionCount);

            const quizResult = await this.model.generateContent(quizPrompt);
            const quizResponse = await quizResult.response;
            let responseText = quizResponse.text();

            // Clean up response
            responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            // Parse JSON response
            const quizData = JSON.parse(responseText);

            // Validate and normalize structure
            if (!quizData.questions || !Array.isArray(quizData.questions)) {
                throw new Error('Invalid quiz structure: missing questions array');
            }

            quizData.questions = quizData.questions.map((q, index) => ({
                id: q.id || index + 1,
                question: q.question || '',
                options: q.options || [],
                correctAnswer: q.correctAnswer ?? 0,
                explanation: q.explanation || '',
                difficulty: q.difficulty || difficulty,
                topic: q.topic || 'Visual Analysis',
                imageUrl: q.imageUrl || null
            }));

            return quizData;
        } catch (error) {
            console.error('Error generating quiz from image:', error);
            throw new Error(`Failed to generate quiz from image: ${error.message}`);
        }
    }

    /**
     * Test API connection
     * @returns {Promise<boolean>} Whether API is accessible
     */
    async testConnection() {
        try {
            const result = await this.model.generateContent('Say "API is working" if you can read this.');
            const response = await result.response;
            return response.text().includes('working');
        } catch (error) {
            console.error('API connection test failed:', error);
            return false;
        }
    }
}

export default GeminiService;

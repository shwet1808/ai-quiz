export function createQuizPrompt(content, difficulty, questionCount) {
    return `You are an expert quiz creator. Generate ${questionCount} multiple-choice quiz questions based on the following content.

Difficulty Level: ${difficulty}

Content to analyze:
${content.substring(0, 4000)} ${content.length > 4000 ? '...(truncated)' : ''}

IMPORTANT: Return ONLY a valid JSON object. Do not include any markdown formatting, code blocks, or explanatory text.

The JSON must follow this EXACT structure:
{
  "questions": [
    {
      "id": 1,
      "question": "Clear, specific question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Detailed explanation of why this answer is correct",
      "difficulty": "${difficulty}",
      "topic": "Auto-detected topic from content",
      "imageUrl": null
    }
  ]
}

Requirements:
1. Generate exactly ${questionCount} questions
2. Each question MUST have exactly 4 options
3. correctAnswer is the index (0-3) of the correct option in the options array
4. Make questions directly relevant to the provided content
5. Vary question types (factual, conceptual, analytical)
6. Provide clear, educational explanations
7. Auto-detect the most appropriate topic from the content
8. Ensure questions are appropriate for ${difficulty} difficulty level
9. Make sure the JSON is valid and parseable
10. Do not include any text outside the JSON object

Return ONLY the JSON object, nothing else.`;
}

export function createImageQuizPrompt(imageDescription, difficulty, questionCount) {
    return `You are an expert quiz creator. Based on this image description, generate ${questionCount} multiple-choice quiz questions.

Image Description:
${imageDescription}

Difficulty Level: ${difficulty}

IMPORTANT: Return ONLY a valid JSON object. Do not include any markdown formatting, code blocks, or explanatory text.

The JSON must follow this EXACT structure:
{
  "questions": [
    {
      "id": 1,
      "question": "Question about the image content?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explanation based on image content",
      "difficulty": "${difficulty}",
      "topic": "Topic derived from image",
      "imageUrl": null
    }
  ]
}

Requirements:
1. Generate exactly ${questionCount} questions
2. Each question MUST have exactly 4 options
3. correctAnswer is the index (0-3) of the correct option
4. Questions should be about what's visible or inferable from the image
5. Include questions about visual elements, context, and implications
6. Provide educational explanations
7. Ensure questions match ${difficulty} difficulty level
8. Return ONLY valid JSON, no additional text

Return ONLY the JSON object, nothing else.`;
}

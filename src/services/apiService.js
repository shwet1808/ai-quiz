const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Upload PDF file and generate quiz
 * @param {File} file - PDF file
 * @param {string} difficulty - Difficulty level
 * @param {number} questionCount - Number of questions
 * @returns {Promise<Object>} Quiz data
 */
export async function uploadPDF(file, difficulty, questionCount = 10) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('difficulty', difficulty);
    formData.append('questionCount', questionCount.toString());

    const response = await fetch(`${API_BASE_URL}/upload/pdf`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload PDF');
    }

    return response.json();
}

/**
 * Upload image file and generate quiz
 * @param {File} file - Image file
 * @param {string} difficulty - Difficulty level
 * @param {number} questionCount - Number of questions
 * @returns {Promise<Object>} Quiz data
 */
export async function uploadImage(file, difficulty, questionCount = 10) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('difficulty', difficulty);
    formData.append('questionCount', questionCount.toString());

    const response = await fetch(`${API_BASE_URL}/upload/image`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload image');
    }

    return response.json();
}

/**
 * Check backend health
 * @returns {Promise<Object>} Health status
 */
export async function checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
}

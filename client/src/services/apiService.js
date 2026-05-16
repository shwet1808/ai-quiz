// This file acts like a telephone between the frontend (React) and the backend (Express).
// It contains all the functions we use to send and receive data from our server.

// Get the backend URL from environment variables, or use localhost if running locally
const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

/**
 * Shared helper function to make API calls easier.
 * Instead of writing out "fetch" and handling errors every time, we just call this function.
 */
async function request(path, options = {}) {
    try {
        // Send the request to the backend
        const response = await fetch(`${API_BASE_URL}${path}`, {
            headers: {
                'Content-Type': 'application/json', // We usually send and receive JSON data
                ...(options.headers || {})
            },
            ...options
        });

        // Try to read the response as JSON
        const data = await response.json().catch(() => ({}));
        
        // If the server sent back an error (like a 404 or 500 status code), throw an error so our app knows something broke.
        if (!response.ok) {
            throw new Error(data.message || `Server error: ${response.status}`);
        }

        return data;
    } catch (error) {
        // If fetch itself fails (e.g. server is completely offline or network error)
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Cannot connect to the server. Please check your internet connection or ensure the server is running.');
        }
        throw error;
    }
}

// Tells the backend to create a new user or log them in.
export async function loginUser(name) {
    return request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ name })
    });
}

/**
 * Upload a PDF file to generate a quiz from it.
 * This is special because files can't be sent as simple JSON; they need to be sent as a "FormData" object.
 */
export async function uploadPDF(file, difficulty, questionCount = 10) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('difficulty', difficulty);
    formData.append('questionCount', questionCount.toString());

    // We use raw fetch here instead of our helper because FormData handles headers automatically
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
 * Upload an image file to generate a quiz from it.
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

// Just checks if the backend server is awake and responding
export async function checkHealth() {
    return request('/health');
}

/**
 * Tells the backend to ask Gemini for a new quiz based on a topic string.
 */
export async function generateQuizFromTopic(topic, difficulty, questionCount = 10, name = '') {
    return request('/generate/topic', {
        method: 'POST',
        body: JSON.stringify({ name, topic, difficulty, questionCount })
    });
}

// Submits the user's answers when they finish a quiz so the backend can calculate their score
export async function submitQuiz(payload) {
    return request('/quizzes/submit', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}

// Asks the backend for the top scores to show on the leaderboard
export async function getLeaderboard(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return request(`/leaderboard${query ? `?${query}` : ''}`);
}

// Gets stats for a specific user profile
export async function getUserProfile(username) {
    return request(`/users/${encodeURIComponent(username)}/profile`);
}

// Gets the list of past quizzes a user has taken
export async function getUserHistory(username) {
    return request(`/users/${encodeURIComponent(username)}/history`);
}

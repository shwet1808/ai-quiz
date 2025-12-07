// Helper functions for the quiz app

// Calculate score based on correct answers
export const calculateScore = (answers, questions) => {
    let correct = 0;
    answers.forEach((answer, index) => {
        if (answer === questions[index].correctAnswer) {
            correct++;
        }
    });
    return {
        correct,
        total: questions.length,
        percentage: Math.round((correct / questions.length) * 100),
        points: correct * 100 // 100 points per correct answer
    };
};

// Format time in MM:SS format
export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Calculate coins earned based on score and difficulty
export const calculateCoins = (score, difficulty) => {
    const baseCoins = score;
    const multiplier = {
        Easy: 1,
        Medium: 1.5,
        Hard: 2
    };
    return Math.round(baseCoins * (multiplier[difficulty] || 1));
};

// Get performance message based on score percentage
export const getPerformanceMessage = (percentage) => {
    if (percentage === 100) return "Perfect! You're a genius! 🌟";
    if (percentage >= 90) return "Excellent work! Outstanding! 🎉";
    if (percentage >= 80) return "Great job! Very impressive! 👏";
    if (percentage >= 70) return "Good effort! Keep it up! 💪";
    if (percentage >= 60) return "Not bad! Room for improvement! 📚";
    if (percentage >= 50) return "You can do better! Keep practicing! 🎯";
    return "Don't give up! Practice makes perfect! 💫";
};

// Get rank based on score
export const getRank = (score, leaderboard) => {
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);
    const rank = sortedLeaderboard.findIndex(entry => entry.score <= score) + 1;
    return rank || leaderboard.length + 1;
};

// Shuffle array (for randomizing questions/options)
export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Format date for leaderboard
export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
};

// Get avatar emoji based on score
export const getAvatarByScore = (score) => {
    if (score >= 900) return "👑";
    if (score >= 800) return "🏆";
    if (score >= 700) return "🥇";
    if (score >= 600) return "🥈";
    if (score >= 500) return "🥉";
    if (score >= 400) return "⭐";
    if (score >= 300) return "🌟";
    if (score >= 200) return "✨";
    if (score >= 100) return "💫";
    return "🎮";
};

// Validate email
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Generate unique ID
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

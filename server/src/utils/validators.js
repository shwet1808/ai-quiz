export const normalizeName = (name) => String(name || '').trim().replace(/\s+/g, ' ');

export const validateName = (name) => {
  const normalized = normalizeName(name);
  if (!normalized) {
    const error = new Error('Name is required');
    error.statusCode = 400;
    throw error;
  }
  if (normalized.length > 40) {
    const error = new Error('Name must be 40 characters or fewer');
    error.statusCode = 400;
    throw error;
  }
  return normalized;
};

export const validateDifficulty = (difficulty) => {
  const normalized = String(difficulty || '').trim();
  const allowed = ['Easy', 'Medium', 'Hard'];
  if (!allowed.includes(normalized)) {
    const error = new Error('Difficulty must be Easy, Medium, or Hard');
    error.statusCode = 400;
    throw error;
  }
  return normalized;
};

export const validateQuestionCount = (questionCount) => {
  const count = Number.parseInt(questionCount, 10);
  if (!Number.isInteger(count) || count < 1 || count > 25) {
    const error = new Error('Question count must be between 1 and 25');
    error.statusCode = 400;
    throw error;
  }
  return count;
};

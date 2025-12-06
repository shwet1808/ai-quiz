# AI Quiz Generator - Backend Server

Backend API server for AI Quiz Generator with Google Gemini API integration for processing PDFs and images to generate quiz questions.

## 🚀 Features

- **PDF Processing**: Extract text from PDF files and generate quiz questions
- **Image Analysis**: Analyze images and create contextual quiz questions
- **AI-Powered**: Uses Google Gemini 1.5 Flash for intelligent quiz generation
- **File Validation**: Automatic validation of file types and sizes
- **CORS Enabled**: Ready for frontend integration
- **Error Handling**: Comprehensive error handling and logging

## 📋 Prerequisites

- Node.js (v18 or higher)
- Google Gemini API Key

## 🛠️ Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - The `.env` file is already configured with your API key
   - Update `FRONTEND_URL` if needed

## 🎯 Usage

### Start the Server

```bash
npm start
```

The server will start on `http://localhost:3001`

### API Endpoints

#### Health Check
```
GET /api/health
```
Returns server status and Gemini API connection status.

#### Upload PDF
```
POST /api/upload/pdf
```
**Body (multipart/form-data)**:
- `file`: PDF file (max 10MB)
- `difficulty`: Easy | Medium | Hard
- `questionCount`: Number of questions (default: 10)

**Response**:
```json
{
  "success": true,
  "quiz": {
    "questions": [...]
  },
  "metadata": {
    "source": "pdf",
    "filename": "example.pdf",
    "generatedAt": "2025-12-06T...",
    "difficulty": "Medium",
    "questionCount": 10
  }
}
```

#### Upload Image
```
POST /api/upload/image
```
**Body (multipart/form-data)**:
- `file`: Image file (JPG, PNG, WebP - max 10MB)
- `difficulty`: Easy | Medium | Hard
- `questionCount`: Number of questions (default: 10)

**Response**: Same as PDF upload

## 📁 Project Structure

```
server/
├── index.js                 # Main Express server
├── services/
│   └── geminiService.js    # Gemini API integration
├── utils/
│   └── pdfProcessor.js     # PDF text extraction
├── prompts/
│   └── quizPrompt.js       # AI prompt templates
├── .env                     # Environment variables
└── package.json
```

## 🔧 Configuration

### Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key
- `PORT`: Server port (default: 3001)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:5173)

### File Limits

- PDF: 10MB maximum
- Images: 10MB maximum
- Supported formats: PDF, JPG, JPEG, PNG, WebP

## 🧪 Testing

Test the API using curl or Postman:

```bash
# Health check
curl http://localhost:3001/api/health

# Upload PDF
curl -X POST http://localhost:3001/api/upload/pdf \
  -F "file=@sample.pdf" \
  -F "difficulty=Medium" \
  -F "questionCount=10"
```

## 🐛 Troubleshooting

### Server won't start
- Check if port 3001 is available
- Verify Node.js version (v18+)
- Ensure all dependencies are installed

### API key errors
- Verify `GEMINI_API_KEY` in `.env`
- Check API key is valid and has quota

### File upload fails
- Check file size (must be < 10MB)
- Verify file format is supported
- Ensure sufficient disk space

## 📝 Notes

- Files are processed in memory and not stored permanently
- Quiz generation typically takes 5-15 seconds depending on content
- API calls to Gemini may incur costs based on usage

## 🔒 Security

- API key is stored in `.env` (never commit to version control)
- File validation prevents malicious uploads
- CORS is configured for specific frontend URL
- Input sanitization on all endpoints

## 📚 Dependencies

- `express`: Web framework
- `@google/generative-ai`: Gemini API client
- `multer`: File upload handling
- `pdf-parse`: PDF text extraction
- `cors`: CORS middleware
- `dotenv`: Environment variable management

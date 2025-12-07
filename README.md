# AI Quiz Generator

A production-ready, highly aesthetic AI Quiz Generator web application built with React, Vite, and Tailwind CSS featuring a stunning "Cosmic Glassmorphism" theme.

## 🌟 Features

- **AI-Powered Quizzes**: Generate personalized quizzes on Space, Coding, History, and Science
- **Multiple Difficulty Levels**: Easy, Medium, and Hard options
- **Interactive Quiz Experience**: 15-second timer per question with visual feedback
- **Leaderboard System**: Compete with others and track your progress
- **Review System**: Review all answers with detailed explanations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Cosmic Glassmorphism UI**: Beautiful glass-effect cards with animated backgrounds
- **Sound Effects**: Immersive audio experience (audio files not included)

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing
- **React Toastify** - Toast notifications
- **Lucide React** - Icon library
- **Canvas Confetti** - Celebration effects

## 📦 Installation

1. Clone the repository or navigate to the project directory:
```bash
cd ai-quiz
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🔌 Backend Setup (Required for AI Features)

The project includes an Express server for Gemini API integration.

1. Navigate to the server directory:
```bash
cd server
```

2. Install server dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server` directory with your Gemini API Key:
```env
GEMINI_API_KEY=your_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

4. Start the server:
```bash
npm start
```
The server runs on port 3001. Ensure both the frontend (Vite) and backend (Express) are running.

## 🏗️ Project Structure

```
ai-quiz/
├── public/
│   └── audio/              # Audio files directory (optional)
├── src/
│   ├── components/
│   │   ├── home/          # Home page components
│   │   ├── quiz/          # Quiz page components
│   │   ├── result/        # Result page components
│   │   ├── layout/        # Layout components (Navbar, Footer, etc.)
│   │   └── ui/            # Reusable UI components
│   ├── context/           # React Context providers
│   ├── data/              # Mock data (questions, leaderboard)
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎮 How to Use

1. **Home Page**: Enter your name, select a topic and difficulty level
2. **Quiz**: Answer 10 questions within 15 seconds each
3. **Results**: View your score, accuracy, and earned coins
4. **Review**: Check all answers with explanations
5. **Leaderboard**: See how you rank against others

## 🎨 Features Breakdown

### Home Page
- Hero section with call-to-action
- User setup form with validation
- Suggested quizzes (auto-fill form)
- About section
- Contact form with toast notifications

### Quiz Page
- Loading animation (simulates AI generation)
- 3-2-1 countdown before start
- Circular timer (15 seconds per question)
- Progress bar
- Visual feedback (green/red for correct/wrong)
- Skip functionality
- Exit confirmation modal

### Result Page
- Confetti celebration effect
- Animated score counter
- Performance statistics
- Coins earned display
- Review answers feature
- Navigation to leaderboard

### Leaderboard Page
- Top 3 podium display
- Paginated table (10 users per page)
- Current user highlighting
- Rank badges and icons

## 🎵 Audio Setup (Optional)

Place audio files in `public/audio/` directory:
- `background-music.mp3`
- `click.mp3`
- `correct.mp3`
- `wrong.mp3`
- `success.mp3`

The app works fine without audio files.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🛠️ Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 🎯 Quiz Topics

- **Space**: Solar system, astronomy, and space exploration
- **Coding**: Programming concepts, algorithms, and web development
- **History**: World history, civilizations, and historical events
- **Science**: Physics, chemistry, biology, and general science

## 📊 Scoring System

- **100 points** per correct answer
- **0 points** for wrong or skipped answers
- **Coins**: Score × difficulty multiplier (Easy: 1x, Medium: 1.5x, Hard: 2x)

## 🤝 Contributing

This is a demonstration project. Feel free to fork and modify for your own use.

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- Built with modern React best practices
- Designed with accessibility in mind
- Optimized for performance and user experience

---

**Enjoy the quiz! 🚀✨**

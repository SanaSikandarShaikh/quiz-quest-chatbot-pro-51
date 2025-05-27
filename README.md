
# Interview Questions Generator

A modern, interactive web application that helps students and job seekers practice interview questions with an AI-powered chatbot interface. The application provides questions for both freshers and experienced professionals across multiple software domains.

## 🌟 Features

- **Interactive Chatbot Interface**: Engaging conversation-style interface with typing animations
- **Multi-Level Support**: Questions tailored for both freshers and experienced professionals
- **Domain-Specific Questions**: Covers JavaScript, React, Python, Database, and System Design
- **Real-time Scoring**: Instant feedback and scoring based on answer accuracy
- **Session Tracking**: Save progress and review performance history
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradients, animations, and smooth transitions

## 🚀 Technologies Used

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/UI** components
- **Lucide React** for icons
- **Vite** for fast development and building

### Backend (As per requirement - to be implemented separately)
- **Python** with Flask
- **SQLite/PostgreSQL** for database
- RESTful API for question management and scoring

### Additional Libraries
- **React Router** for navigation
- **Date-fns** for date handling
- **LocalStorage** for session persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatInterface.tsx      # Main chat interface component
│   ├── ChatMessage.tsx        # Individual chat message component
│   ├── QuestionCard.tsx       # Question display and answer input
│   └── ScoreDisplay.tsx       # Results and performance display
├── data/
│   └── questions.ts           # Question database
├── services/
│   └── sessionService.ts     # Session management logic
├── types/
│   └── index.ts              # TypeScript type definitions
├── pages/
│   └── Index.tsx             # Main page component
└── App.tsx                   # Root application component
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interview-questions-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🎮 How to Use

### Getting Started
1. **Choose Experience Level**: Select between "Fresher" or "Experienced"
2. **Select Domain**: Choose from JavaScript, React, Python, Database, System Design, or All Domains
3. **Answer Questions**: Type your answers in the provided text area
4. **Get Feedback**: Receive instant feedback and scoring
5. **View Results**: Review your performance at the end of the session

### Features in Detail

#### Question Categories
- **Fresher Level**: Basic concepts and fundamental questions
- **Experienced Level**: Advanced topics and complex scenarios

#### Domains Covered
- **JavaScript**: ES6+, async/await, closures, hoisting
- **React**: Hooks, lifecycle, state management, performance
- **Python**: Data structures, OOP, decorators, GIL
- **Database**: SQL, NoSQL, normalization, indexing
- **System Design**: Scalability, CAP theorem, distributed systems

#### Scoring System
- **Point-based scoring** with different weights for question difficulty
- **Accuracy tracking** with percentage calculations
- **Time tracking** for each question and overall session
- **Performance feedback** with encouraging messages

## 🔧 Configuration

### Adding New Questions
Questions can be added to `src/data/questions.ts`:

```typescript
{
  id: 21,
  question: "Your question here",
  domain: "JavaScript",
  level: "fresher",
  correctAnswer: "Expected answer",
  points: 5,
}
```

### Customizing Scoring Logic
Modify the evaluation logic in `src/services/sessionService.ts`:

```typescript
evaluateAnswer(userAnswer: string, correctAnswer: string, question: Question): UserAnswer {
  // Custom evaluation logic here
}
```

## 🎨 Customization

### Theme Colors
The application uses a purple-blue gradient theme. To customize:

1. **Tailwind Configuration**: Modify `tailwind.config.ts`
2. **CSS Custom Properties**: Update color variables in `src/index.css`
3. **Component Styling**: Adjust gradient classes in components

### Animation Settings
Animations can be customized in the Tailwind configuration:

```typescript
// In tailwind.config.ts
animation: {
  'fade-in': 'fade-in 0.3s ease-out',
  'scale-in': 'scale-in 0.2s ease-out',
}
```

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach**
- **Flexible grid layouts**
- **Touch-friendly interactions**
- **Optimized typography scaling**

## 🔄 Future Enhancements

### Planned Features
- **Backend Integration**: Python Flask API for question management
- **Database Integration**: PostgreSQL for persistent data storage
- **User Authentication**: Login/register functionality
- **Progress Tracking**: Historical performance analysis
- **Question Difficulty**: AI-powered difficulty adjustment
- **Multiplayer Mode**: Compete with other users
- **Custom Question Sets**: User-generated content

### Backend Architecture (To be implemented)
```
backend/
├── app.py                 # Flask application entry point
├── models/
│   ├── question.py        # Question model
│   ├── session.py         # Session model
│   └── user.py           # User model
├── routes/
│   ├── questions.py       # Question management routes
│   ├── sessions.py        # Session handling routes
│   └── scoring.py         # Scoring system routes
├── database/
│   └── init_db.py        # Database initialization
└── requirements.txt       # Python dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/UI** for beautiful component library
- **Tailwind CSS** for utility-first styling
- **Lucide React** for gorgeous icons
- **React Team** for the amazing framework

---

**Happy Interviewing! 🚀**

For any questions or support, please open an issue in the repository.

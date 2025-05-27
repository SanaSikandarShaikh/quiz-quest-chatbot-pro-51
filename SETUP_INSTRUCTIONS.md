
# Complete Setup Instructions for Interview Questions App

This application consists of a **React frontend** and a **Python Flask backend**.

## 🚀 Quick Start

### Backend Setup (Python Flask)

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**
   
   **Windows:**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
   
   **macOS/Linux:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the backend server**
   ```bash
   python app.py
   ```
   
   ✅ Backend will run on: http://localhost:8000

### Frontend Setup (React)

1. **Open a new terminal** (keep backend running)

2. **Navigate to project root** (where package.json is located)
   ```bash
   cd ..  # if you're in backend folder
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   
   ✅ Frontend will run on: http://localhost:8080

## 🔧 Verification Steps

1. **Check Backend Health**
   ```bash
   curl http://localhost:8000/api/health
   ```
   Should return: `{"status": "healthy", "message": "Backend is running"}`

2. **Check Frontend**
   - Open http://localhost:8080 in your browser
   - You should see the Interview Questions Generator interface

## 📁 Project Structure

```
├── backend/               # Python Flask backend
│   ├── app.py            # Main Flask application
│   ├── requirements.txt  # Python dependencies
│   └── README.md         # Backend documentation
├── src/                  # React frontend source
│   ├── components/       # React components
│   ├── services/         # API and session services
│   └── ...
├── package.json          # Node.js dependencies
└── SETUP_INSTRUCTIONS.md # This file
```

## 🌐 How It Works

- **Frontend (React)**: Runs on port 8080, handles UI and user interactions
- **Backend (Flask)**: Runs on port 8000, provides API endpoints for questions and sessions
- **Communication**: Frontend makes HTTP requests to backend API
- **Data Flow**: Questions → Backend → Frontend → User Answers → Backend → Scoring

## 🛠️ Development Workflow

1. Keep both servers running in separate terminals
2. Make changes to frontend code → auto-refreshes on save
3. Make changes to backend code → restart Flask server (`python app.py`)
4. Test API endpoints using browser dev tools or curl

## 🔍 Troubleshooting

**Backend Issues:**
- Ensure Python 3.7+ is installed
- Check if port 8000 is available
- Verify virtual environment is activated

**Frontend Issues:**
- Ensure Node.js 16+ is installed
- Check if port 8080 is available
- Clear browser cache if needed

**Connection Issues:**
- Verify both servers are running
- Check browser console for CORS errors
- Ensure API calls are going to correct URL (localhost:8000)

## 📚 Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `python app.py` - Start Flask development server
- `pip freeze > requirements.txt` - Update dependencies list

You're all set! 🎉
```

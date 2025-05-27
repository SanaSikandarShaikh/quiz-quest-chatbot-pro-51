
# Interview Questions Generator - Complete Setup Guide

This guide will help you set up and run the Interview Questions Generator project with Python Flask backend and React frontend.

## Prerequisites

Before starting, make sure you have the following installed:

1. **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
2. **Python** (version 3.8 or higher) - [Download here](https://python.org/)
3. **VS Code** - [Download here](https://code.visualstudio.com/)
4. **Git** (optional) - [Download here](https://git-scm.com/)

## Project Structure

```
interview-questions-generator/
├── backend/                 # Python Flask backend
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── config.py          # Configuration settings
│   └── README.md          # Backend documentation
├── src/                    # React frontend source
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   └── types/           # TypeScript types
└── package.json           # Node.js dependencies
```

## Step-by-Step Setup Instructions

### Step 1: Open Project in VS Code

1. Open VS Code
2. Click `File` → `Open Folder`
3. Navigate to your project folder and select it
4. The project should now be open in VS Code

### Step 2: Set Up the Backend (Python Flask)

1. **Open Terminal in VS Code**:
   - Press `Ctrl + `` (backtick) or go to `Terminal` → `New Terminal`

2. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

3. **Create a Python virtual environment**:
   ```bash
   python -m venv venv
   ```

4. **Activate the virtual environment**:
   
   **On Windows:**
   ```bash
   venv\Scripts\activate
   ```
   
   **On macOS/Linux:**
   ```bash
   source venv/bin/activate
   ```
   
   You should see `(venv)` at the beginning of your terminal prompt.

5. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

6. **Run the Flask backend**:
   ```bash
   python app.py
   ```

   You should see output like:
   ```
   Starting Flask backend server...
   Backend running on: http://localhost:8000
   * Running on all addresses (0.0.0.0)
   * Running on http://127.0.0.1:8000
   * Running on http://localhost:8000
   ```

7. **Test the backend** (optional):
   Open a new browser tab and go to: `http://localhost:8000/api/health`
   You should see: `{"message":"Backend is running","status":"healthy"}`

### Step 3: Set Up the Frontend (React)

1. **Open a new terminal**:
   - In VS Code, click the `+` button in the terminal panel to open a new terminal
   - Or press `Ctrl + Shift + `` (backtick)

2. **Make sure you're in the root directory** (not in the backend folder):
   ```bash
   cd ..
   ```
   or if you're already in the root directory, you can skip this step.

3. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

4. **Start the React development server**:
   ```bash
   npm run dev
   ```

   You should see output like:
   ```
   > vite
   
   VITE v4.x.x ready in xxx ms
   
   ➜  Local:   http://localhost:8080/
   ➜  Network: use --host to expose
   ```

5. **Open the application**:
   - Open your browser and go to: `http://localhost:8080`
   - You should see the Interview Questions Generator interface

## Running Both Services

You need **TWO terminals** running simultaneously:

### Terminal 1 (Backend):
```bash
cd backend
venv\Scripts\activate    # On Windows
# or: source venv/bin/activate    # On macOS/Linux
python app.py
```

### Terminal 2 (Frontend):
```bash
npm run dev
```

## Verifying Everything Works

1. **Backend Health Check**:
   - Go to: `http://localhost:8000/api/health`
   - Should return: `{"message":"Backend is running","status":"healthy"}`

2. **Frontend Application**:
   - Go to: `http://localhost:8080`
   - You should see the Interview Questions Generator interface
   - Try selecting a level (Fresher/Experienced) and domain
   - Answer some questions to test the full flow

## Common Issues and Solutions

### Issue 1: "python command not found"
**Solution**: Install Python or use `python3` instead of `python`

### Issue 2: "pip command not found"
**Solution**: Install Python properly or use `python -m pip` instead of `pip`

### Issue 3: "npm command not found"
**Solution**: Install Node.js from the official website

### Issue 4: Backend port 8000 already in use
**Solution**: 
- Stop any other applications using port 8000
- Or change the port in `backend/app.py` (line with `port=8000`)

### Issue 5: Frontend port 8080 already in use
**Solution**: Vite will automatically suggest an alternative port (like 8081)

### Issue 6: CORS errors in browser console
**Solution**: Make sure both frontend and backend are running on the correct ports

## Development Tips

1. **Auto-reload**: Both frontend and backend support auto-reload when you make changes
2. **Debug mode**: The Flask backend runs in debug mode, so changes will be reflected automatically
3. **Console logs**: Check browser developer tools (F12) for frontend logs
4. **Backend logs**: Check the terminal running the Flask server for backend logs

## Stopping the Services

1. **Stop Frontend**: Press `Ctrl + C` in the terminal running `npm run dev`
2. **Stop Backend**: Press `Ctrl + C` in the terminal running `python app.py`
3. **Deactivate Python environment**: Type `deactivate` in the backend terminal

## Next Steps

Once everything is running:

1. Test the application thoroughly
2. Try different question domains (JavaScript, React, Python, Java)
3. Test both Fresher and Experienced levels
4. Review the scoring system
5. Check the detailed answer review feature

For any issues, check the browser console (F12) and terminal outputs for error messages.

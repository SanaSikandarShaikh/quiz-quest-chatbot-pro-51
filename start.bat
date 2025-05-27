
@echo off
echo Starting Interview Questions Generator...
echo.

REM Start backend in a new command window
echo Starting Flask Backend on port 8000...
start "Flask Backend" cmd /k "cd backend && venv\Scripts\activate && python app.py"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo Starting React Frontend on port 8080...
echo.
npm run dev

pause

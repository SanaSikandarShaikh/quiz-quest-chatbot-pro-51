
#!/bin/bash

echo "Starting Interview Questions Generator..."
echo ""

# Start backend in background
echo "Starting Flask Backend on port 8000..."
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Return to root directory
cd ..

# Start frontend
echo "Starting React Frontend on port 8080..."
echo ""
npm run dev

# When frontend stops, also stop backend
kill $BACKEND_PID

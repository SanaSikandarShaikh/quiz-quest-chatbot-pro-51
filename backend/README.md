
# Interview Questions Backend

Python Flask backend for the Interview Questions Generator application.

## Setup Instructions

1. **Create Virtual Environment**
   ```bash
   cd backend
   python -m venv venv
   ```

2. **Activate Virtual Environment**
   
   **Windows:**
   ```bash
   venv\Scripts\activate
   ```
   
   **macOS/Linux:**
   ```bash
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Backend**
   ```bash
   python app.py
   ```

The backend will start on http://localhost:8000

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/questions` - Get questions (supports level and domain filters)
- `POST /api/sessions` - Create new session
- `GET /api/sessions/<id>` - Get session by ID
- `POST /api/sessions/<id>/answers` - Add answer to session
- `PUT /api/sessions/<id>` - Update session

## Testing the API

You can test the backend using curl or Postman:

```bash
# Health check
curl http://localhost:8000/api/health

# Get all questions
curl http://localhost:8000/api/questions

# Get fresher level questions
curl "http://localhost:8000/api/questions?level=fresher"

# Create a session
curl -X POST http://localhost:8000/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"level": "fresher", "domain": "JavaScript"}'
```

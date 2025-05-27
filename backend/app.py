
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os
import uuid

app = Flask(__name__)
CORS(app, origins=["http://localhost:8080", "http://localhost:3000"])  # Enable CORS for React frontend

# In-memory storage (replace with database in production)
sessions = []
questions = [
    {
        "id": 1,
        "question": "What is the difference between let, const, and var in JavaScript?",
        "domain": "JavaScript",
        "level": "fresher",
        "correctAnswer": "let and const are block-scoped while var is function-scoped. const cannot be reassigned after declaration, let can be reassigned, and var can be redeclared and reassigned.",
        "points": 10
    },
    {
        "id": 2,
        "question": "Explain closures in JavaScript with an example.",
        "domain": "JavaScript",
        "level": "experienced",
        "correctAnswer": "A closure is a function that has access to variables in its outer scope even after the outer function has returned. Example: function outer() { let count = 0; return function inner() { count++; return count; }; }",
        "points": 10
    },
    {
        "id": 3,
        "question": "What are React Hooks and why were they introduced?",
        "domain": "React",
        "level": "fresher",
        "correctAnswer": "React Hooks are functions that let you use state and other React features in functional components. They were introduced to allow functional components to have state and lifecycle methods without converting to class components.",
        "points": 10
    },
    {
        "id": 4,
        "question": "Explain the concept of Virtual DOM in React.",
        "domain": "React",
        "level": "experienced",
        "correctAnswer": "Virtual DOM is a JavaScript representation of the actual DOM. React uses it to optimize rendering by comparing the virtual DOM tree with the previous version and only updating the parts that changed.",
        "points": 10
    },
    {
        "id": 5,
        "question": "What is the difference between lists and tuples in Python?",
        "domain": "Python",
        "level": "fresher",
        "correctAnswer": "Lists are mutable and ordered collections that can be modified after creation. Tuples are immutable and ordered collections that cannot be changed after creation. Lists use square brackets, tuples use parentheses.",
        "points": 10
    },
    {
        "id": 100,
        "question": "What is inheritance in Java?",
        "domain": "Java",
        "level": "fresher",
        "correctAnswer": "Inheritance is a mechanism in Java where one class acquires the properties and methods of another class. It promotes code reusability and establishes a parent-child relationship between classes.",
        "points": 10
    },
    {
        "id": 101,
        "question": "Explain method overloading in Java.",
        "domain": "Java",
        "level": "experienced",
        "correctAnswer": "Method overloading allows multiple methods with the same name but different parameters in the same class. The compiler determines which method to call based on the number and types of arguments passed.",
        "points": 10
    },
    {
        "id": 102,
        "question": "What is polymorphism in Java?",
        "domain": "Java",
        "level": "experienced",
        "correctAnswer": "Polymorphism allows objects of different classes to be treated as objects of a common base class. It enables one interface to represent different underlying forms through method overriding and overloading.",
        "points": 10
    },
    {
        "id": 103,
        "question": "What is the difference between abstract class and interface in Java?",
        "domain": "Java",
        "level": "experienced",
        "correctAnswer": "Abstract classes can have both abstract and concrete methods, while interfaces can only have abstract methods (before Java 8). A class can implement multiple interfaces but extend only one abstract class.",
        "points": 10
    },
    {
        "id": 104,
        "question": "What is exception handling in Java?",
        "domain": "Java",
        "level": "fresher",
        "correctAnswer": "Exception handling is a mechanism to handle runtime errors in Java using try-catch blocks. It allows programs to continue execution even when errors occur, making applications more robust.",
        "points": 10
    }
]

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Backend is running"})

@app.route('/api/questions', methods=['GET'])
def get_questions():
    level = request.args.get('level')
    domain = request.args.get('domain')
    
    filtered_questions = questions
    
    if level:
        filtered_questions = [q for q in filtered_questions if q['level'] == level]
    
    if domain and domain.lower() not in ['all domains', 'all']:
        filtered_questions = [q for q in filtered_questions if q['domain'].lower() == domain.lower()]
    
    return jsonify(filtered_questions)

@app.route('/api/sessions', methods=['POST'])
def create_session():
    try:
        data = request.json
        session = {
            "id": f"session_{int(datetime.now().timestamp())}_{str(uuid.uuid4())[:8]}",
            "level": data.get('level'),
            "domain": data.get('domain'),
            "currentQuestionIndex": 0,
            "answers": [],
            "totalScore": 0,
            "startTime": datetime.now().isoformat(),
            "endTime": None
        }
        
        sessions.append(session)
        print(f"Created session: {session['id']}")
        return jsonify(session)
    except Exception as e:
        print(f"Error creating session: {e}")
        return jsonify({"error": "Failed to create session"}), 500

@app.route('/api/sessions/<session_id>', methods=['GET'])
def get_session(session_id):
    session = next((s for s in sessions if s['id'] == session_id), None)
    if not session:
        return jsonify({"error": "Session not found"}), 404
    return jsonify(session)

@app.route('/api/sessions/<session_id>/answers', methods=['POST'])
def add_answer(session_id):
    try:
        session = next((s for s in sessions if s['id'] == session_id), None)
        if not session:
            return jsonify({"error": "Session not found"}), 404
        
        data = request.json
        question_id = data.get('questionId')
        user_answer = data.get('userAnswer')
        time_spent = data.get('timeSpent', 0)
        
        # Find the question
        question = next((q for q in questions if q['id'] == question_id), None)
        if not question:
            return jsonify({"error": "Question not found"}), 404
        
        # Evaluate answer (simple keyword matching)
        correct_answer = question['correctAnswer'].lower()
        user_answer_lower = user_answer.lower()
        
        # Extract key words from correct answer
        key_words = [word for word in correct_answer.split() if len(word) > 3]
        matching_words = [word for word in key_words if word in user_answer_lower]
        
        # Calculate score based on keyword matching
        match_percentage = len(matching_words) / len(key_words) if key_words else 0
        is_correct = match_percentage >= 0.4  # 40% threshold
        
        answer = {
            "questionId": question_id,
            "userAnswer": user_answer,
            "isCorrect": is_correct,
            "points": question['points'] if is_correct else 0,
            "timeSpent": time_spent
        }
        
        session['answers'].append(answer)
        session['totalScore'] += answer['points']
        session['currentQuestionIndex'] += 1
        
        print(f"Added answer to session {session_id}: {answer}")
        return jsonify({"session": session, "answer": answer})
    except Exception as e:
        print(f"Error adding answer: {e}")
        return jsonify({"error": "Failed to add answer"}), 500

@app.route('/api/sessions/<session_id>', methods=['PUT'])
def update_session(session_id):
    try:
        session = next((s for s in sessions if s['id'] == session_id), None)
        if not session:
            return jsonify({"error": "Session not found"}), 404
        
        data = request.json
        session.update(data)
        
        print(f"Updated session {session_id}")
        return jsonify(session)
    except Exception as e:
        print(f"Error updating session: {e}")
        return jsonify({"error": "Failed to update session"}), 500

if __name__ == '__main__':
    print("Starting Flask backend server...")
    print("Backend running on: http://localhost:8000")
    print("Frontend should connect to: http://localhost:8000")
    app.run(debug=True, host='0.0.0.0', port=8000)

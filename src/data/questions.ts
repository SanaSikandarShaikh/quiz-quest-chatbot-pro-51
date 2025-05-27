
import { Question } from '../types';

export const questions: Question[] = [
  // JavaScript - Fresher
  {
    id: 1,
    question: "What is the difference between 'let', 'const', and 'var' in JavaScript?",
    domain: "JavaScript",
    level: "fresher",
    correctAnswer: "var is function-scoped and can be redeclared, let is block-scoped and can be reassigned, const is block-scoped and cannot be reassigned",
    points: 5,
  },
  {
    id: 2,
    question: "Explain what is hoisting in JavaScript?",
    domain: "JavaScript",
    level: "fresher",
    correctAnswer: "Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope during compilation",
    points: 5,
  },
  {
    id: 3,
    question: "What are closures in JavaScript?",
    domain: "JavaScript",
    level: "fresher",
    correctAnswer: "A closure is a function that has access to variables in its outer scope even after the outer function has returned",
    points: 6,
  },

  // JavaScript - Experienced
  {
    id: 4,
    question: "Explain the event loop in JavaScript and how it handles asynchronous operations?",
    domain: "JavaScript",
    level: "experienced",
    correctAnswer: "The event loop is a mechanism that handles asynchronous operations by managing the call stack, callback queue, and microtask queue, ensuring non-blocking execution",
    points: 10,
  },
  {
    id: 5,
    question: "What is the difference between Promise.all() and Promise.allSettled()?",
    domain: "JavaScript",
    level: "experienced",
    correctAnswer: "Promise.all() fails fast if any promise rejects, while Promise.allSettled() waits for all promises to settle and returns results for all",
    points: 8,
  },

  // React - Fresher
  {
    id: 6,
    question: "What is JSX in React?",
    domain: "React",
    level: "fresher",
    correctAnswer: "JSX is a syntax extension for JavaScript that allows writing HTML-like syntax in React components",
    points: 5,
  },
  {
    id: 7,
    question: "What is the difference between state and props in React?",
    domain: "React",
    level: "fresher",
    correctAnswer: "State is internal component data that can change, while props are external data passed from parent components and are read-only",
    points: 6,
  },
  {
    id: 8,
    question: "What are React Hooks?",
    domain: "React",
    level: "fresher",
    correctAnswer: "Hooks are functions that allow functional components to use state and lifecycle methods previously only available in class components",
    points: 6,
  },

  // React - Experienced
  {
    id: 9,
    question: "Explain the concept of React reconciliation and the virtual DOM?",
    domain: "React",
    level: "experienced",
    correctAnswer: "Reconciliation is React's process of comparing virtual DOM trees to efficiently update the real DOM by identifying minimal changes needed",
    points: 10,
  },
  {
    id: 10,
    question: "What are higher-order components (HOCs) and when would you use them?",
    domain: "React",
    level: "experienced",
    correctAnswer: "HOCs are functions that take a component and return a new component with additional props or behavior, used for code reuse and cross-cutting concerns",
    points: 9,
  },

  // Python - Fresher
  {
    id: 11,
    question: "What is the difference between list and tuple in Python?",
    domain: "Python",
    level: "fresher",
    correctAnswer: "Lists are mutable and use square brackets, while tuples are immutable and use parentheses",
    points: 5,
  },
  {
    id: 12,
    question: "Explain what is list comprehension in Python?",
    domain: "Python",
    level: "fresher",
    correctAnswer: "List comprehension is a concise way to create lists using a single line of code with optional conditions",
    points: 6,
  },

  // Python - Experienced
  {
    id: 13,
    question: "Explain the Global Interpreter Lock (GIL) in Python?",
    domain: "Python",
    level: "experienced",
    correctAnswer: "GIL is a mutex that prevents multiple threads from executing Python bytecodes simultaneously, limiting true parallelism in CPU-bound tasks",
    points: 10,
  },
  {
    id: 14,
    question: "What are decorators in Python and how do they work?",
    domain: "Python",
    level: "experienced",
    correctAnswer: "Decorators are functions that modify or extend the behavior of other functions without changing their code, using the @ syntax",
    points: 8,
  },

  // Database - Fresher
  {
    id: 15,
    question: "What is the difference between SQL and NoSQL databases?",
    domain: "Database",
    level: "fresher",
    correctAnswer: "SQL databases are relational with structured schemas and ACID properties, while NoSQL databases are non-relational with flexible schemas and horizontal scaling",
    points: 6,
  },
  {
    id: 16,
    question: "What is a primary key in a database?",
    domain: "Database",
    level: "fresher",
    correctAnswer: "A primary key is a unique identifier for each record in a table that cannot be null and ensures entity integrity",
    points: 5,
  },

  // Database - Experienced
  {
    id: 17,
    question: "Explain database normalization and its different forms?",
    domain: "Database",
    level: "experienced",
    correctAnswer: "Normalization reduces data redundancy through forms (1NF, 2NF, 3NF, BCNF) by organizing data into related tables with minimal duplication",
    points: 10,
  },
  {
    id: 18,
    question: "What is database indexing and how does it improve performance?",
    domain: "Database",
    level: "experienced",
    correctAnswer: "Indexing creates data structures that improve query performance by providing faster data retrieval paths, trading storage space for speed",
    points: 9,
  },

  // System Design - Experienced
  {
    id: 19,
    question: "How would you design a URL shortening service like bit.ly?",
    domain: "System Design",
    level: "experienced",
    correctAnswer: "Use base62 encoding for short URLs, hash table for mapping, load balancers, caching layer, and database sharding for scalability",
    points: 15,
  },
  {
    id: 20,
    question: "Explain the CAP theorem and its implications for distributed systems?",
    domain: "System Design",
    level: "experienced",
    correctAnswer: "CAP theorem states that distributed systems can only guarantee two of: Consistency, Availability, and Partition tolerance, requiring trade-offs",
    points: 12,
  },
];

export const domains = ["JavaScript", "React", "Python", "Database", "System Design"];
export const levels = ["fresher", "experienced"] as const;

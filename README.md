# 🌍 AI Career Roadmap Generator + OS Explorer

A full-stack AI-powered platform that helps students generate personalized career roadmaps, explore open-source opportunities, and manage authentication — powered by Google Gemini AI.

---

## 🚀 Features

### 👤 Authentication System
- User registration & login (JWT-based auth)
- Secure password hashing with bcrypt
- HTTP-only cookies for session management
- Logout functionality

### 🧠 AI Roadmap Generator
- Generates personalized career roadmaps using Gemini AI
- Inputs: stream, subjects, interests, grade
- Provides 2–3 year structured career strategy

### 🌐 Open Source Opportunity Finder
- Suggests beginner-friendly open-source organizations
- Provides GitHub links, labels, and contribution guidance
- Helps students start contributing to OSS

### 📊 Admin Analytics
- Total users tracking
- Total roadmaps generated
- Latest users & roadmaps
- Most common student stream analytics (MongoDB aggregation)

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
- Google Gemini AI API
- cookie-parser
- dotenv

### Frontend
- React 19
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Framer Motion
- React Markdown
- Lucide Icons

---

## 📁 Project Structure

server/
├── models/
├── controllers/
├── routes/
├── utils/
├── config/
└── index.js

client/
├── src/
├── components/
├── pages/
└── main.jsx


---

## ⚙️ Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/ai-roadmap-project.git
cd ai-roadmap-project
cd server
npm install
npm run dev

.env:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key


cd client
npm install
npm run dev

🔐 API Features
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/ai/roadmap
POST /api/ai/os-opportunities
GET /api/admin/stats

👨‍💻 Author

Juned Khan
Full-Stack Developer | MERN | AI Enthusiast


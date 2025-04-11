# 🎓 Module 6 - Real-Time Tutoring & Feedback System

This project is part of a broader educational platform and focuses on real-time student-tutor interactions, audio feedback, sentiment analysis, intelligent recommendations, and real-time dashboards.

## 📦 Features

### 1. Real-Time Interaction with Tutor (WebSocket)
- Students can chat with tutors in real time.
- Tutors can answer questions and collect feedback.
- Admins can monitor live conversations for quality assurance.

### 2. Voice Feedback with Speech Recognition
- Students can submit voice feedback.
- Admins can access transcribed text for further analysis.

### 3. Sentiment Analysis
- Automatic sentiment detection on feedback.
- Helps instructors and admins identify potential issues.

### 4. Intelligent Recommendation System
- Personalized course suggestions for students.
- Admins can fine-tune the algorithm to improve engagement.

### 5. Real-Time Dashboard
- Admin view of course popularity and feedback trends.
- Instructors can view feedback on their own content.

---

## 🛠️ Tech Stack

- **Backend:** Spring Boot 3.3.4
- **Real-Time Communication:** WebSocket (STOMP)
- **Voice Recognition:** Google Speech-to-Text API (or equivalent)
- **Sentiment Analysis:** OpenNLP / TextBlob / Custom ML models
- **Frontend:** React / Angular / Vue (optional depending on UI)
- **Database:** PostgreSQL / MySQL
- **Build Tool:** Maven

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://gitlab.com/your-username/your-project-name.git
cd your-project-name


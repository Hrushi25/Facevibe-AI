# FaceVibe 🧘‍♂️  
**Applied AI Facial Wellness Web Application**

FaceVibe is a real-time facial wellness web application that combines **applied computer vision** with **generative AI** to deliver personalized stress-aware feedback and coaching.  
The project focuses on building a **user-facing AI product** with low latency, clean engineering practices, and production-safe AI integration.

---

## ✨ Key Features

- 🎥 **Real-time webcam-based facial analysis** with sub-second latency  
- 📊 **Stress inference** using facial motion signals and temporal smoothing  
- 🎯 **Gamified facial exercises** with live progress feedback  
- 💬 **AI Trainer Chat** providing personalized coaching using a GenAI model  
- 🔐 **Secure backend proxy** for AI integration (no API keys in frontend)

---

## 🧠 Applied AI & GenAI Overview

### Applied AI
- Live facial signal extraction from webcam input
- Heuristic stress inference based on facial movement volatility
- Real-time biofeedback loop driving UI behavior and exercise guidance
- Designed for responsiveness, explainability, and low-latency interaction

### Generative AI (GenAI)
- AI trainer powered by a large language model (Gemini)
- Context-aware responses conditioned on:
  - User messages
  - Inferred stress level
  - Exercise progress
- Backend-only LLM access via a secure proxy architecture

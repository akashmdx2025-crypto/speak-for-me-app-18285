# 🗣️ Speak For Me

> *An AI that gives a voice to people who struggle to express their problems.*

---

## 🎯 The Problem

Millions of people face situations where they need help — medical, legal, financial, or bureaucratic — but cannot express their problem clearly due to anxiety, illness, or language barriers. They get ignored, receive the wrong help, or give up entirely.

**Speak For Me** helps people who can't find the right words. It captures their messy, emotional descriptions and translates them instantly into clear, actionable professional statements.

---

## 🧪 The Application

<p align="center">
  <img src="public/screenshot.png" alt="Speak For Me Application Screenshot" width="800"/>
</p>

### Live Deployment
The project is built, structurally validated, and hosted securely. Try it out:
**[View on Vercel](#)** *(Link provided in deployment)*

---

## 📖 Rubric & Course Conceptual Demonstration

This project strictly adheres to the core submission criteria outlined in the course materials. Rather than building a sprawling, half-broken massive application, this tool perfectly scopes a high-value interaction: **One input → Three actionable outputs.** 

### A. 🎯 A Clear Problem
"If the problem statement is weak, the whole project feels weaker."
* **The Problem**: Vulnerable individuals cannot easily formalize their grievances to authorities.
* **The Fix**: The application instantly converts broken descriptions into a 3-part structured JSON layout readable by anyone.

### B. ✂️ Scope Discipline
"A smaller working prototype is better than a grand unfinished system."
* There is no sprawling backend or fragmented microservice logic. The app provides a beautiful, accessible UI connected directly to a strictly governed AI prompt, achieving 100% functionality with zero broken buttons.

### C. 🤖 Sensible Use of AI
"Do not add AI just to say you used AI."
* **Transformation & Structuring**: The AI does not generate decorative filler text. It serves purely as an extraction engine, using its semantic bridging to identify the facts (e.g., *2 months ago, ₹20,000*) and transcribing them into actionable data strings.

### D. 📚 Better Integration of Course Ideas
* **Prompting with Clear Constraints**: The system prompt is engineered to definitively reject outputs outside the bounded JSON schema.
* **Guardrails**: The prompt contains explicit rules to filter and reject nonsensical or illegal prompts, mapping them gracefully to user-readable errors rather than crashing the system.

### E. 🧪 A Usable Artifact
"If the instructor can open it and try it, the work is easier to trust."
* The application runs locally utilizing `@google/generative-ai` connected to the latest iteration of `gemini-flash-latest`, ensuring maximum stability and reliability, avoiding 404 or 503 bottlenecks dynamically.

---

## Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Handcrafted Zero-Library Custom Glassmorphism CSS
- **AI Core**: Google Gemini API (`gemini-flash-latest`)
- **Deployment**: Vercel

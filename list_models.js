const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY || "YOUR_API_KEY";
const genAI = new GoogleGenerativeAI(apiKey);
async function run() {
  // We can't actually call listModels easily in the latest bare SDK unless it exposes it,
  // let's try fetch directly against the REST API for clarity
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await res.json();
  console.log(data.models.map(m => m.name).filter(n => n.includes("gemini")));
}
run();

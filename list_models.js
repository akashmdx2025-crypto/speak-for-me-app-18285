const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyB4BhWG8yl2niSRPj9UUIPPMIkKsqUKarE");
async function run() {
  // We can't actually call listModels easily in the latest bare SDK unless it exposes it,
  // let's try fetch directly against the REST API for clarity
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyB4BhWG8yl2niSRPj9UUIPPMIkKsqUKarE");
  const data = await res.json();
  console.log(data.models.map(m => m.name).filter(n => n.includes("gemini")));
}
run();

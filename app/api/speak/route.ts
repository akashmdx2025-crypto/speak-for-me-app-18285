// source_handbook: week11-hackathon-preparation
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "Please provide a description of your problem." }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API Key is missing. Please set GEMINI_API_KEY in your environment." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const systemPrompt = `
You are 'Speak For Me', an AI that gives a voice to people who struggle to express their problems.
You will receive a broken, emotional, or confusing description of a problem.
1. Translate it into a clear, professional statement.
2. Provide a one-sentence summary.
3. Provide a specific, actionable next step they should take today.

STRICT RULES:
- If the input is completely nonsensical or requests illegal activity, reject it by returning JSON with the error property.
- You must preserve all facts from the input (numbers, dates, relationships).
- Output MUST be valid JSON ONLY without any markdown tags.

EXPECTED JSON FORMAT (on success):
{
  "professionalStatement": "[Clear professional statement]",
  "summary": "[One sentence summary]",
  "nextStep": "[Specific next step]"
}
`;

    const result = await model.generateContent(systemPrompt + "\n\nUser Input: " + text);
    const rawText = result.response.text().trim();
    
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (e) {
      return NextResponse.json({ error: "AI produced an invalid response format. Please try again." }, { status: 500 });
    }

    if (parsed.error) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    console.log({
      timestamp: new Date().toISOString(),
      inputLength: text.length,
      outputKeys: Object.keys(parsed),
      success: true
    });

    return NextResponse.json({ data: parsed });

  } catch (error: any) {
    console.error("Speak API Error:", error);
    return NextResponse.json({ error: error.message || "An unexpected error occurred." }, { status: 500 });
  }
}

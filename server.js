import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  console.error(
    "GEMINI_API_KEY is missing from .env"
  );

  process.exit(1);
}

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

app.post(
  "/api/coach",
  async (req, res) => {
    try {
      const {
        age,
        income,
        expenses,
        savings,
        debt,
        investing,
        goal,
        question,
      } = req.body;

      if (!question?.trim()) {
        return res.status(400).json({
          error:
            "Please enter a question.",
        });
      }

      const prompt = `
You are MoneyEcho AI.

You are a modern, concise personal-finance decision coach.

Your purpose is to help the user understand the financial "echo" of a decision.

USER:
Age: ${age}
Monthly income: $${income}
Monthly expenses: $${expenses}
Savings: $${savings}
Debt: $${debt}
Monthly investing: $${investing}
Goal: ${goal}

QUESTION:
${question}

RESPONSE RULES:

- Maximum 120 words.
- Be direct and useful.
- Use the user's actual numbers.
- Do not repeat the entire profile.
- Do not write a long introduction.
- Do not write a generic financial article.
- Do not use Markdown.
- NEVER use **.
- NEVER use ##.
- NEVER use bullet symbols.
- Return ONLY valid JSON.
- Do not use markdown code fences.
- Never guarantee investment returns.
- Clearly label estimates as estimates.
- Actual rates, returns, insurance costs and expenses vary.
- Sound like a modern fintech product.
- Be calm, intelligent and concise.

TONE:

Use "positive" when the decision is financially favorable or improves the user's trajectory.

Use "warning" when the decision could significantly hurt cash flow, savings, debt or the user's goal.

Use "neutral" when the answer depends on tradeoffs and there is no obvious positive or negative direction.

Return exactly this JSON structure:

{
  "tone": "positive",
  "verdict": "One short sentence answering the question.",
  "why": [
    "Short point using the user's numbers.",
    "Short point explaining the main tradeoff.",
    "Short point explaining the effect on the user's goal."
  ],
  "bestMove": "One or two short sentences describing the most sensible next step.",
  "echo": "One memorable sentence describing the long-term echo of this decision."
}

IMPORTANT:

The value of "tone" must be exactly one of:

positive
warning
neutral
`;

      const result =
        await model.generateContent(
          prompt
        );

      let text =
        result.response
          .text()
          .trim();

      // Remove accidental code fences
      text = text
        .replace(
          /^```json\s*/i,
          ""
        )
        .replace(
          /^```\s*/i,
          ""
        )
        .replace(
          /\s*```$/i,
          ""
        )
        .trim();

      let parsed;

      try {
        parsed =
          JSON.parse(text);
      } catch (error) {
        console.error(
          "Invalid Gemini JSON:",
          text
        );

        return res.status(500).json({
          error:
            "MoneyEcho AI returned an invalid response. Please try again.",
        });
      }

      if (
        ![
          "positive",
          "warning",
          "neutral",
        ].includes(parsed.tone)
      ) {
        parsed.tone = "neutral";
      }

      if (
        !parsed.verdict ||
        !Array.isArray(parsed.why)
      ) {
        return res.status(500).json({
          error:
            "MoneyEcho AI returned an incomplete response.",
        });
      }

      res.json(parsed);
    } catch (error) {
      console.error(
        "Gemini error:",
        error
      );

      res.status(500).json({
        error:
          "MoneyEcho AI could not generate a response.",
      });
    }
  }
);

app.listen(3001, () => {
  console.log(
    "MoneyEcho AI running on http://localhost:3001"
  );
});
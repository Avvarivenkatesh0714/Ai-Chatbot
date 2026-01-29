import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  const { message } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 120,
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content:
          "You are a website assistant. Answer only questions related to this website."
      },
      { role: "user", content: message }
    ]
  });

  res.json({ reply: completion.choices[0].message.content });
}

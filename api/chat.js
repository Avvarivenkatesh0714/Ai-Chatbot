
export default async function handler(req, res) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 120
    })
  });
  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
}

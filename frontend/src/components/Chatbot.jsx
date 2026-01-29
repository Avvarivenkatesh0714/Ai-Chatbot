
import { useState, useEffect } from "react";
import "./Chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([{ from: "bot", text: "👋 Hi! How can I help you?" }]);
  }, []);

  const sendMessage = async (text) => {
    if (!text) return;
    setMessages(m => [...m, { from: "user", text }]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    setMessages(m => [...m, { from: "bot", text: data.reply }]);
    setLoading(false);
  };

  return (
    <>
      <div className={`chatbot ${open ? "open" : ""}`}>
        <div className="header">
          AI Assistant <span onClick={() => setOpen(false)}>✖</span>
        </div>

        <div className="messages">
          {messages.map((m, i) => (
            <div key={i} className={m.from}>{m.text}</div>
          ))}
          {loading && <div className="bot">Typing...</div>}
        </div>

        <div className="input">
          <input value={input} onChange={e => setInput(e.target.value)} />
          <button onClick={() => sendMessage(input)}>Send</button>
        </div>
      </div>

      <div className="toggle" onClick={() => setOpen(!open)}>💬</div>
    </>
  );
}

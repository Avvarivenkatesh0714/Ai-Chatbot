import { useState, useEffect } from "react";
import "./Chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMessages([
      {
        from: "bot",
        text: "👋 Hi! I’m your AI assistant. How can I help you today?"
      }
    ]);
  }, []);

  const sendMessage = async (text) => {
    if (!text) return;

    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      setMessages((m) => [...m, { from: "bot", text: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { from: "bot", text: "⚠️ Something went wrong. Please try again." }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <div className={`chatbot ${open ? "open" : ""} ${dark ? "dark" : ""}`}>
        <div className="header">
          <span>🤖 AI Assistant</span>
          <div className="actions">
            <button onClick={() => setDark(!dark)}>
              {dark ? "☀️" : "🌙"}
            </button>
            <span onClick={() => setOpen(false)}>✖</span>
          </div>
        </div>

        <div className="messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.from}`}>
              {m.from === "bot" && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                  className="avatar"
                />
              )}
              <div className="bubble">{m.text}</div>
            </div>
          ))}

          {loading && (
            <div className="msg bot">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                className="avatar"
              />
              <div className="bubble typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
        </div>

        <div className="quick">
          <button onClick={() => sendMessage("About")}>About</button>
          <button onClick={() => sendMessage("Services")}>Services</button>
          <button onClick={() => sendMessage("Contact")}>Contact</button>
        </div>

        <div className="input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />
          <button onClick={() => sendMessage(input)}>➤</button>
        </div>
      </div>

      <div className="toggle" onClick={() => setOpen(!open)}>
        💬
      </div>
    </>
  );
}

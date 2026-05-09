import { useState, useRef, useEffect } from "react";
 import { adminApi } from "../api/adminApi"; // adjust path

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 

const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const data = await adminApi.chat(text, messages);
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {open && (
        <div className="w-[360px] max-h-[520px] bg-gray-900 border border-gray-700 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-sm">Blog Assistant</span>
              <span className="bg-yellow-400/10 text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider">
                GROQ
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-[200px] max-h-[340px]">
            {messages.length === 0 && (
              <div className="m-auto text-center text-gray-600 text-xs leading-loose">
                <span className="block text-2xl mb-2 opacity-40">✦</span>
                Ask me to write, improve,
                <br />
                or brainstorm blog content.
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <span className="text-[10px] text-gray-600 px-1 tracking-widest uppercase">
                  {msg.role === "user" ? "You" : "AI"}
                </span>
                <div
                  className={`max-w-[88%] px-3 py-2 rounded-xl text-[12.5px] leading-relaxed whitespace-pre-wrap break-words ${
                    msg.role === "user"
                      ? "bg-yellow-400 text-gray-900 rounded-br-sm"
                      : "bg-gray-800 text-gray-300 border border-gray-700 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex flex-col items-start gap-1">
                <span className="text-[10px] text-gray-600 px-1 tracking-widest uppercase">AI</span>
                <div className="flex gap-1.5 items-center px-3 py-3 bg-gray-800 border border-gray-700 rounded-xl rounded-bl-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-yellow-400 opacity-40 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-end gap-2 px-4 py-3 border-t border-gray-800">
            <textarea
              ref={inputRef}
              className="flex-1 bg-gray-800 border border-gray-700 focus:border-yellow-400 rounded-xl px-3 py-2 text-white text-xs resize-none outline-none leading-relaxed placeholder-gray-600 transition-colors"
              placeholder="Write a blog intro about..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-9 h-9 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all hover:scale-105 flex-shrink-0"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-gray-900 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest transition-all shadow-lg hover:shadow-yellow-400/20"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        AI
      </button>
    </div>
  );
}
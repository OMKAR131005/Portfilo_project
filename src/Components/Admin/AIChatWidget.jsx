import { useState, useRef, useEffect } from "react";
import { adminApi } from "../../utils/api";

// ---- Helpers ----

// Split AI response into segments: code blocks and text
function parseResponse(text) {
  const segments = [];
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", content: text.slice(lastIndex, match.index).trim() });
    }
    segments.push({ type: "code", lang: match[1] || "code", content: match[2].trim() });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", content: text.slice(lastIndex).trim() });
  }

  return segments.filter((s) => s.content);
}

// Format text: bold, inline code, bullet points
function formatText(text) {
  return text.split("\n").map((line, i) => {
    const isBullet = /^[-*•]\s/.test(line);
    const formatted = line
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, '<code class="bg-purple-900/50 text-purple-200 px-1 rounded text-[11px]">$1</code>');
    return (
      <p
        key={i}
        className={`${isBullet ? "pl-3 border-l-2 border-purple-500/40" : ""} leading-relaxed`}
        dangerouslySetInnerHTML={{ __html: isBullet ? formatted.replace(/^[-*•]\s/, "") : formatted }}
      />
    );
  });
}

// Copy to clipboard
function copyToClipboard(text, setCopied) {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  });
}

// ---- Code Block ----
function CodeBlock({ lang, content }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-lg overflow-hidden border border-purple-800/40 mt-1">
      <div className="flex items-center justify-between px-3 py-1.5 bg-purple-950/80 border-b border-purple-800/40">
        <span className="text-[10px] text-purple-400 font-mono tracking-widest uppercase">{lang}</span>
        <button
          onClick={() => copyToClipboard(content, setCopied)}
          className="text-[10px] text-purple-400 hover:text-white transition-colors flex items-center gap-1"
        >
          {copied ? (
            <><CheckIcon /> Copied</>
          ) : (
            <><CopyIcon /> Copy</>
          )}
        </button>
      </div>
      <pre className="bg-[#0d0d1a] text-purple-100 text-[11.5px] font-mono p-3 overflow-x-auto leading-relaxed whitespace-pre">
        {content}
      </pre>
    </div>
  );
}

// ---- Text Message ----
function TextSegment({ content }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="group relative">
      <div className="text-[12.5px] text-gray-300 space-y-1">
        {formatText(content)}
      </div>
      <button
        onClick={() => copyToClipboard(content, setCopied)}
        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-purple-400 hover:text-purple-200 flex items-center gap-1 bg-gray-900 px-2 py-0.5 rounded-md border border-purple-800/40"
      >
        {copied ? <><CheckIcon /> Copied</> : <><CopyIcon /> Copy</>}
      </button>
    </div>
  );
}

// ---- Icons ----
function CopyIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ---- AI Message ----
function AIMessage({ text }) {
  const [copiedAll, setCopiedAll] = useState(false);
  const segments = parseResponse(text);

  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <div className="flex items-center justify-between w-full px-1">
        <span className="text-[10px] text-purple-500 tracking-widest uppercase font-semibold">AI</span>
        <button
          onClick={() => copyToClipboard(text, setCopiedAll)}
          className="text-[10px] text-purple-500 hover:text-purple-300 transition-colors flex items-center gap-1"
        >
          {copiedAll ? <><CheckIcon /> Copied all</> : <><CopyIcon /> Copy all</>}
        </button>
      </div>
      <div className="max-w-[95%] bg-[#13102a] border border-purple-800/30 rounded-xl rounded-bl-sm px-3 py-2.5 space-y-2 w-full">
        {segments.map((seg, i) =>
          seg.type === "code" ? (
            <CodeBlock key={i} lang={seg.lang} content={seg.content} />
          ) : (
            <TextSegment key={i} content={seg.content} />
          )
        )}
      </div>
    </div>
  );
}

// ---- Main Widget ----
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

  const clearChat = () => setMessages([]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {open && (
        <div className="w-[400px] max-h-[560px] bg-[#0a0812] border border-purple-800/40 rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-purple-950/50">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-purple-900/40 bg-[#0d0b1a]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-white font-semibold text-sm">Blog Assistant</span>
              <span className="bg-purple-500/10 text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider border border-purple-500/20">
                GROQ
              </span>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="text-[10px] text-purple-500 hover:text-purple-300 transition-colors tracking-wider"
                >
                  CLEAR
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-white transition-colors text-xl leading-none w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 min-h-[220px] max-h-[380px] scrollbar-thin">
            {messages.length === 0 && (
              <div className="m-auto text-center space-y-2">
                <div className="text-3xl opacity-20">◈</div>
                <p className="text-gray-600 text-xs leading-loose">
                  Ask me to write, improve,<br />or brainstorm blog content.
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                  {["Write an intro", "Improve my text", "Suggest a title"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setInput(s)}
                      className="text-[10px] text-purple-500 border border-purple-800/40 px-2 py-1 rounded-lg hover:bg-purple-900/20 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) =>
              msg.role === "user" ? (
                <div key={i} className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-purple-500 px-1 tracking-widest uppercase font-semibold">You</span>
                  <div className="max-w-[88%] px-3 py-2 rounded-xl rounded-br-sm bg-purple-600 text-white text-[12.5px] leading-relaxed whitespace-pre-wrap break-words">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <AIMessage key={i} text={msg.text} />
              )
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex flex-col items-start gap-1">
                <span className="text-[10px] text-purple-500 px-1 tracking-widest uppercase font-semibold">AI</span>
                <div className="flex gap-1.5 items-center px-4 py-3 bg-[#13102a] border border-purple-800/30 rounded-xl rounded-bl-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-end gap-2 px-4 py-3 border-t border-purple-900/40 bg-[#0d0b1a]">
            <textarea
              ref={inputRef}
              className="flex-1 bg-[#13102a] border border-purple-800/40 focus:border-purple-500 rounded-xl px-3 py-2 text-white text-xs resize-none outline-none leading-relaxed placeholder-purple-900 transition-colors"
              placeholder="Write a blog intro about..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-9 h-9 bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all hover:scale-105 flex-shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest transition-all shadow-lg shadow-purple-900/40 hover:shadow-purple-700/40 hover:scale-105"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        AI
      </button>
    </div>
  );
}
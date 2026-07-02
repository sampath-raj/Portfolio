import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { chatbotResponses } from "../../utils/data";

const QUICK_QUESTIONS = [
  "What are your skills?",
  "Tell me about your projects",
  "How to contact you?",
  "What's your education?",
  "Any experience?",
];

function getBotResponse(text) {
  const t = text.toLowerCase();
  if (t.includes("skill") || t.includes("tech") || t.includes("know")) return chatbotResponses.skills;
  if (t.includes("project") || t.includes("build") || t.includes("work")) return chatbotResponses.projects;
  if (t.includes("contact") || t.includes("email") || t.includes("reach")) return chatbotResponses.contact;
  if (t.includes("education") || t.includes("degree") || t.includes("college") || t.includes("study")) return chatbotResponses.education;
  if (t.includes("experience") || t.includes("intern") || t.includes("certif") || t.includes("hackathon")) return chatbotResponses.experience;
  if (t.includes("hi") || t.includes("hello") || t.includes("hey")) return chatbotResponses.greeting[0];
  return chatbotResponses.default;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 0, role: "bot", text: "Hi! Ask me about Sampath's skills, projects, or experience." },
  ]);
  const msgIdRef = useRef(1);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: msgIdRef.current++, role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botReply = getBotResponse(text);
      setMessages((m) => [...m, { id: msgIdRef.current++, role: "bot", text: botReply }]);
      setTyping(false);
    }, 800 + Math.random() * 400);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[200] w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: "var(--accent)",
          boxShadow: "0 4px 20px rgba(79,158,255,0.35)",
        }}
        aria-label="Open AI assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={18} color="white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Bot size={18} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 right-6 z-[199] w-80 sm:w-96 flex flex-col overflow-hidden"
            style={{
              height: "460px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-hover)",
              borderRadius: "14px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div
              className="p-4 flex items-center gap-3"
              style={{
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-border)" }}
              >
                <Bot size={15} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <p className="font-display font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                  Ask me anything
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-3 py-2 text-sm max-w-[80%] leading-relaxed ${
                      msg.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"
                    }`}
                    style={{ color: msg.role === "bot" ? "var(--text-primary)" : "#fff" }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="chat-bubble-bot px-3 py-2 flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--accent)" }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.12 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick questions */}
            <div
              className="px-4 py-2 flex gap-1.5 overflow-x-auto"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors whitespace-nowrap"
                  style={{
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                    color: "var(--accent)",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div
              className="p-3 flex gap-2"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  fontFamily: "'Inter', sans-serif",
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--accent)" }}
                aria-label="Send message"
              >
                <Send size={13} color="white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

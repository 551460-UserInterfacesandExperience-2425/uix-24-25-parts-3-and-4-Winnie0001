import React, { useState, useRef, useEffect } from 'react';
import './ChatPage.css';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Hi there! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const simulateBotReply = (userText) => {
    const lc = userText.toLowerCase();
    if (lc.includes('help')) return "Sure — tell me more about what you need help with.";
    if (lc.includes('book')) return 'You can book a meeting on the Services page.';
    if (lc.includes('emergency')) return 'If it’s urgent, please call 999 immediately.';
    return "I’m not sure I understand. Can you rephrase?";
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(m => [...m, { from: 'user', text: input }]);
    const reply = simulateBotReply(input);
    setInput('');

    setTimeout(() => {
      setMessages(m => [...m, { from: 'bot', text: reply }]);
    }, 700);
  };

  return (
    <div className="chat-page">
      <h2>Live Chat</h2>
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`chat-message ${m.from}`}>
            {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form className="chat-input-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message…"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

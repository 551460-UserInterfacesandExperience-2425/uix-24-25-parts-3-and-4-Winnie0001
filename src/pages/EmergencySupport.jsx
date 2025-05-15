import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmergencySupport.css';

export default function EmergencySupport() {
  const navigate = useNavigate();

  const callNumber = num => {
    // This will prompt the device to dial
    window.location.href = `tel:${num}`;
  };

  return (
    <div className="page-container emergency-page">
      <h2>🚨 Emergency Support</h2>
      <p>If you’re in crisis, please call immediately:</p>

      <div className="em-buttons">
        <button
          onClick={() => callNumber('999')}
          className="btn-em-red"
        >
          Call 999 (Emergency)
        </button>
        <button
          onClick={() => callNumber('111')}
          className="btn-em-light"
        >
          Call 111 (NHS)
        </button>
      </div>

      <section className="other-lines">
        <h3>Other Support Lines</h3>
        <p>
          Samaritans:{' '}
          <a href="tel:116123">116 123</a><br/>
          University Counselling:{' '}
          <a href="tel:01234567890">01234 567 890</a>
        </p>
      </section>

      <section className="chat-section">
        <h3>Chat with a Counselor</h3>
        <button
          className="btn-em-chat"
          onClick={() => navigate('/chat')}
        >
          💬 Start Chat
        </button>
      </section>
    </div>
  );
}

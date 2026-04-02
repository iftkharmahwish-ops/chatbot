import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const userMsg = { sender: "user", text: message };
    setChat([...chat, userMsg]);

    const res = await axios.post("http://127.0.0.1:8000/chat", {
      message: message,
    });

    const botMsg = { sender: "bot", text: res.data.reply };
    setChat((prev) => [...prev, botMsg]);

    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chatbot</h2>

      <div>
        {chat.map((msg, index) => (
          <p key={index}>
            <b>{msg.sender}:</b> {msg.text}
          </p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;

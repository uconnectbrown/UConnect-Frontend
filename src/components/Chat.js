import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import SendMessage from "./SendMessage";

function Chat() {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <div>
      {messages.map(({ id, text, photoUrl, uid }) => (
        <div>
          <div
            key={id}
            className={`msg ${
              uid == localStorage.emailId ? "sent" : "received"
            }`}
          >
            <img src={photoUrl} alt="" style={{ height: 100 }}></img>
            <p>{text}</p>
          </div>
        </div>
      ))}
      <SendMessage scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  );
}

export default Chat;

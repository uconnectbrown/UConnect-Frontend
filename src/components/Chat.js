import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import SendMessage from "./SendMessage";

import "./Chat.css";

function Chat(props) {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const studentName = props.studentName;
  const studentImageUrl = props.studentImageUrl;
  const studentId = props.studentId;
  const ownId = props.ownId;
  const ownImageUrl = props.ownImageUrl;
  const ownName = props.ownName;
  let roomId = props.roomId;

  useEffect(() => {
    db.collection("messages")
      .doc(props.roomId)
      .collection("chat")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, [props.roomId]);

  return (
    <div>
      <div className="chat-top d-flex align-items-center justify-content-center flex-column">
        <img
          className="recipient-profile"
          alt="Profile Picture"
          src={studentImageUrl}
        />
        {props.studentName}
      </div>
      <div className="chat-msgs d-flex flex-column">
        {messages.map((message) => (
          <div>
            <div
              key={message.id}
              className={`msg ${message.ownId === ownId ? "sent" : "received"}`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <SendMessage
        scroll={scroll}
        studentName={studentName}
        studentImageUrl={studentImageUrl}
        studentId={studentId}
        ownId={ownId}
        ownName={ownName}
        ownImageUrl={ownImageUrl}
        roomId={props.roomId}
        refreshMessages={props.refreshMessages}
      />

      <div ref={scroll}></div>
    </div>
  );
}

export default Chat;

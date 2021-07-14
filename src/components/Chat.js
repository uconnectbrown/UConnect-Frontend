import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import SendMessage from "./SendMessage";

function Chat(props) {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const course = localStorage.courseCode;
    let uid = localStorage.emailId;
    let recipient = localStorage.studentId;
    let roomId;
    if (uid < recipient) {
      roomId = `${uid} ${recipient}`;
    } else roomId = `${recipient} ${uid}`;
    db.collection("courses")
      .doc(course)
      .collection("imessages")
      .doc(roomId)
      .collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <div className="msgs">
      {messages.map(({ id, text, photoUrl, uid }) => (
        <div>
          <div
            key={id}
            className={`msg ${
              uid == localStorage.emailId ? "sent" : "received"
            }`}
          >
            <img
              src={photoUrl}
              alt=""
              style={{
                borderRadius: "10%",
                height: "45px",
                width: "45px",
                objectFit: "cover",
                marginTop: "-20px",
              }}
            ></img>
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

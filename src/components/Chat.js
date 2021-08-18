import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import SendMessage from "./SendMessage";

function Chat(props) {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const studentName = props.studentName;
  const studentImageUrl = props.studentImageUrl;
  const studentId = props.studentId;
  const ownId = props.ownId;
  const ownImageUrl = props.ownImageUrl;
  const ownName = props.ownName;
  const [roomId, setRoomId] = useState(props.roomId);

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
    <div className="msgs">
      {messages.map((message) => (
        <div>
          <div
            key={message.id}
            className={`msg ${message.ownId === ownId ? "sent" : "received"}`}
          >
            <img
              src={message.ownImageUrl}
              alt=""
              style={{
                borderRadius: "10%",
                height: "45px",
                width: "45px",
                objectFit: "cover",
                marginTop: "-20px",
              }}
            ></img>
            <p>{message.text}</p>
          </div>
        </div>
      ))}

      <SendMessage
        scroll={scroll}
        studentName={studentName}
        studentImageUrl={studentImageUrl}
        studentId={studentId}
        ownId={ownId}
        ownName={ownName}
        ownImageUrl={ownImageUrl}
        roomId={roomId}
      />
      <div ref={scroll}></div>
    </div>
  );
}

export default Chat;

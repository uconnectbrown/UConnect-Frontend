import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import SendMessage from "./SendMessage";

function Chat(props) {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const recipientName = props.recipientName;
  const recipientImage = props.recipientImage;
  const recipientId = props.recipientId;
  const courseCode = props.code;
  const ownId = props.ownId;
  const ownImage = props.ownImage;
  const ownName = props.ownName;
  const roomId = props.roomId;

  useEffect(() => {
    // const courseCode = props.courseCode;
    // const roomId = props.roomId;
    db.collection("courses")
      .doc(courseCode)
      .collection("allMessages")
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
      {messages.map((message) => (
        <div>
          <div
            key={message.id}
            className={`msg ${message.ownId === ownId ? "sent" : "received"}`}
          >
            <img
              src={message.ownImage}
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
        recipientName={recipientName}
        recipientImage={recipientImage}
        recipientId={recipientId}
        courseCode={courseCode}
        ownId={ownId}
        ownName={ownName}
        ownImage={ownImage}
        roomId={roomId}
      />
      <div ref={scroll}></div>
    </div>
  );
}

export default Chat;

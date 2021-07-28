import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import SendGroupMessage from "./SendGroupMessage";

function GroupChat(props) {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const recipientNames = props.recipientNames;
  const recipientImages = props.recipientImages;
  const recipientIds = props.recipientIds;
  const courseCode = props.courseCode;
  const ownId = props.ownId;
  const ownImage = props.ownImage;
  const ownName = props.ownName;
  const roomId = props.roomId;

  useEffect(() => {
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

      <SendGroupMessage
        scroll={scroll}
        recipientNames={recipientNames}
        recipientImages={recipientImages}
        recipientIds={recipientIds}
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

export default GroupChat;

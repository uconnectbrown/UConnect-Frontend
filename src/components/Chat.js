import React, { useState, useEffect } from "react";
import { db } from "../firebase";

import "./Chat.css";

function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const studentName = props.studentName;
  const studentImageUrl = props.studentImageUrl;
  const studentId = props.studentId;
  const ownId = props.ownId;
  const ownImageUrl = props.ownImageUrl;
  const ownName = props.ownName;
  let roomId = props.roomId;

  useEffect(() => {
    const switchRoom = db
      .collection("messages")
      .doc(props.roomId)
      .collection("chat")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    return () => {
      switchRoom();
      db.collection("messages")
        .doc(props.roomId)
        .collection("chat")
        .orderBy("createdAt")
        .limit(50);
    };
  }, [props.roomId]);

  async function sendMessage(e) {
    e.preventDefault();

    await Promise.all([
      db.collection("messages").doc(roomId).collection("chat").add({
        text: msg,
        ownImageUrl,
        ownId,
        createdAt: new Date().toISOString(),
        roomId,
      }),

      db
        .collection("profiles")
        .doc(ownId)
        .collection(`messages`)
        .doc(roomId)
        .set({
          recipientName: studentName,
          recipientImage: studentImageUrl,
          roomId,
          recipientId: studentId,
          lastMessage: msg,
          lastSent: new Date().toISOString(),
          read: true,
        }),

      db
        .collection("profiles")
        .doc(studentId)
        .collection(`messages`)
        .doc(roomId)
        .set({
          recipientName: ownName,
          recipientImage: ownImageUrl,
          roomId,
          recipientId: ownId,
          lastMessage: msg,
          lastSent: new Date().toISOString(),
          read: false,
        }),
    ]);

    setMsg("");
    props.refreshMessages();
  }

  return (
    <>
      <div className="chat-top d-flex align-items-center">
        <div style={{ border: "5px solid #ffffff", borderRadius: "10rem" }}>
          <img
            className={
              props.imageUrl ===
              "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media"
                ? "recipient-profile-blur"
                : "recipient-profile"
            }
            alt="Profile"
            src={studentImageUrl}
          />
        </div>
        <div style={{ fontWeight: 500 }}>{props.studentName}</div>
      </div>
      <div className="chat-msgs d-flex flex-column-reverse">
        <div className="d-flex flex-column">
          {messages.map((message) => (
            <div>
              <div
                key={message.id}
                className={`msg ${
                  message.ownId === ownId ? "sent" : "received"
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={sendMessage}>
        <input
          className="msg-input mx-3 px-3 py-1"
          style={{
            width: "100%",
            fontSize: "15px",
          }}
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Message..."
        />
      </form>
    </>
  );
}

export default Chat;

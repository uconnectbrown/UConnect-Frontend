// Set Up
import React, { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { Input, Button } from "@material-ui/core";

// Body
function SendMessage({
  studentImageUrl,
  studentName,
  studentId,
  ownName,
  ownImageUrl,
  roomId,
  ownId,
  refreshMessages,
}) {
  const [msg, setMsg] = useState("");

  async function sendMessage(e) {
    e.preventDefault();

    await Promise.all([
      db.collection("messages").doc(roomId).collection("chat").add({
        text: msg,
        ownImageUrl,
        ownId,
        createdAt: new Date().toISOString(),
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
        }),
    ]);

    setMsg("");
    refreshMessages();
  }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className="sendMsg">
          <Input
            style={{
              width: "78%",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
            }}
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Message..."
          />
          <Button
            style={{
              width: "18%",
              fontSize: "15px",
              fontWeight: "550",
              margin: "4px 5% -13px 5%",
              maxWidth: "200px",
            }}
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMessage;

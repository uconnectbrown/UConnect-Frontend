// Set Up
import React, { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { Input, Button } from "@material-ui/core";

// Body
function SendMessage({
  scroll,
  recipientImage,
  recipientName,
  recipientId,
  courseCode,
  ownName,
  ownImage,
  roomId,
  ownId,
}) {
  const [msg, setMsg] = useState("");

  async function sendMessage(e) {
    e.preventDefault();

    await Promise.all([
      db
        .collection("courses")
        .doc(courseCode)
        .collection("allMessages")
        .doc(roomId)
        .collection("messages")
        .add({
          text: msg,
          ownImage,
          ownId,
          createdAt: new Date().toISOString(),
        }),

      db
        .collection("profiles")
        .doc(ownId + "@brown.edu")
        .collection(`${courseCode} messages`)
        .doc(roomId)
        .set({
          course: courseCode,
          recipientName: recipientName,
          recipientImage: recipientImage,
          roomId,
          recipientId: recipientId,
          mostRecent: new Date().toISOString(),
        }),

      db
        .collection("profiles")
        .doc(recipientId + "@brown.edu")
        .collection(`${courseCode} messages`)
        .doc(roomId)
        .set({
          course: courseCode,
          recipientName: ownName,
          recipientImage: ownImage,
          roomId,
          recipientId: ownId,
          mostRecent: new Date().toISOString(),
        }),
    ]);

    setMsg("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
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

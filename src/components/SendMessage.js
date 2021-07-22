// Set Up
import React, { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { Input, Button } from "@material-ui/core";

// Body
function SendMessage({
  scroll,
  studentImage,
  studentName,
  studentId,
  courseCode,
  profileName,
  imageUrl,
  roomId,
  emailId,
}) {
  const [msg, setMsg] = useState("");

  async function sendMessage(e) {
    e.preventDefault();

    await Promise.all([
      db
        .collection("courses")
        .doc(courseCode)
        .collection("imessages")
        .doc(roomId)
        .collection("messages")
        .add({
          text: msg,
          imageUrl,
          emailId,
          createdAt: new Date().toISOString(),
        }),

      db
        .collection("profiles")
        .doc(emailId + "@brown.edu")
        .collection(`${courseCode} messages`)
        .doc(roomId)
        .set({
          course: courseCode,
          name: studentName,
          image: studentImage,
          roomId,
          recipientId: studentId,
          mostRecent: new Date().toISOString(),
        }),

      db
        .collection("profiles")
        .doc(studentId + "@brown.edu")
        .collection(`${courseCode} messages`)
        .doc(roomId)
        .set({
          course: courseCode,
          name: profileName,
          image: imageUrl,
          roomId,
          recipientId: emailId,
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

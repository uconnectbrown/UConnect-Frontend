import React, { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { Input, Button } from "@material-ui/core";

function SendMessage({ scroll }) {
  const [msg, setMsg] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    let uid = localStorage.emailId;
    let photoUrl = localStorage.photoUrl;
    let course = localStorage.courseCode;
    let recipient = localStorage.studentId;
    let name = localStorage.studentName;
    let profileName = localStorage.profileName;
    let roomId;
    let studentImage = localStorage.studentImage;

    if (uid < recipient) {
      roomId = `${uid} ${recipient}`;
    } else roomId = `${recipient} ${uid}`;

    await Promise.all([
      db
        .collection("courses")
        .doc(course)
        .collection("imessages")
        .doc(roomId)
        .collection("messages")
        .add({
          text: msg,
          photoUrl,
          uid,
          createdAt: new Date().toISOString(),
        }),

      db
        .collection("profiles")
        .doc(uid + "@brown.edu")
        .collection(`${course} messages`)
        .doc(roomId)
        .set({
          course,
          name,
          image: studentImage,
          roomId,
          recipientId: recipient,
          mostRecent: new Date().toISOString(),
        }),

      db
        .collection("profiles")
        .doc(recipient + "@brown.edu")
        .collection(`${course} messages`)
        .doc(roomId)
        .set({
          course,
          name: profileName,
          image: photoUrl,
          roomId,
          recipientId: uid,
          mostRecent: firebase.firestore.FieldValue.serverTimestamp(),
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

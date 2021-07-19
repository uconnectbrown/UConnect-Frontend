import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import SendMessage from "./SendMessage";

function Chat(props) {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const studentName = props.studentName;
  const studentImage = props.studentImage;
  const studentId = props.studentId;
  const courseCode = props.courseCode;
  const emailId = props.emailId;
  const imageUrl = props.imageUrl;
  const profileName = props.profileName;
  const roomId = props.roomId;

  useEffect(() => {
    const courseCode = props.courseCode;
    const roomId = props.roomId;
    {
      console.log(roomId);
    }
    db.collection("courses")
      .doc(courseCode)
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
      {messages.map(({ id, text, imageUrl, emailId }) => (
        <div>
          <div
            key={id}
            className={`msg ${emailId == emailId ? "sent" : "received"}`}
          >
            <img
              src={imageUrl}
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

      <SendMessage
        scroll={scroll}
        studentName={studentName}
        studentImage={studentImage}
        studentId={studentId}
        courseCode={courseCode}
        emailId={emailId}
        profileName={profileName}
        imageUrl={imageUrl}
        roomId={roomId}
      />
      <div ref={scroll}></div>
    </div>
  );
}

export default Chat;

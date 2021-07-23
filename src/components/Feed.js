import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";

// Components
import SendFeedMessage from "./SendFeedMessage";

function Feed(props) {
  const scroll = useRef();
  const courseCode = props.courseCode;
  const ownId = props.ownId;
  const ownImage = props.ownImage;
  const ownName = props.ownName;
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("courses")
      .doc(courseCode)
      .collection("courseFeed")
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

      <SendFeedMessage
        scroll={scroll}
        courseCode={courseCode}
        ownId={ownId}
        ownName={ownName}
        ownImage={ownImage}
      />
      <div ref={scroll}></div>
    </div>
  );
}

export default Feed;

// Set-up
import React, { useState, useEffect } from "react";
import axios from "axios";
import { db, auth } from "../firebase";

// Components
import Chat from "../components/Chat";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import { Container, Row, Col } from "react-bootstrap";
import "./MessageView.css";

// Body
function MessageView(props) {
  const [emailId, setEmailId] = useState(null);

  const [messages, setMessages] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentImageUrl, setStudentImageUrl] = useState("");
  const [studentName, setStudentName] = useState("");
  const [ownId, setOwnId] = useState("");
  const [ownImageUrl, setOwnImageUrl] = useState("");
  const [ownName, setOwnName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [newMessage, setNewMessage] = useState(false);
  const [, setSelectedM] = useState(0);

  useEffect(() => {
    if (auth.currentUser) {
      setEmailId(auth.currentUser.email.split("@")[0]);
    }
  }, []);

  useEffect(() => {
    if (emailId) {
      if (props.history.location.state) {
        startMessage();
      } else {
        getMessages();
      }
      props.fetchMessageCount();
    }
  }, [emailId]);

  const startMessage = () => {
    let info = props.history.location.state.messageInfo;
    setStudentName(info.studentName);
    setStudentImageUrl(info.studentImage);
    setStudentId(info.studentId);
    setOwnName(info.ownName);
    setOwnImageUrl(info.ownImage);
    setOwnId(info.ownId);
    setRoomId(info.roomId);
    axios
      .get(`/messages/${info.ownId}`)
      .then((res) => {
        if (res.data.length > 0) {
          setMessages(res.data);
        }
        if (!res.data.map((message) => message.roomId).includes(info.roomId)) {
          setNewMessage(true);
        }
      })

      .catch((err) => console.log(err));
  };

  const getMessages = () => {
    let promises = [
      axios.get(`/messages/${emailId}`),
      axios.get(`/senderInfo/${auth.currentUser.email}`),
    ];

    Promise.all(promises)
      .then((res) => {
        if (res[0].data.length > 0) {
          setMessages(res[0].data);
          setStudentName(res[0].data[0].recipientName);
          setStudentImageUrl(res[0].data[0].recipientImage);
          setStudentId(res[0].data[0].recipientId);
          setOwnName(res[1].data.firstName + " " + res[1].data.lastName);
          setOwnImageUrl(res[1].data.imageUrl);
          setOwnId(res[1].data.emailId);
          setRoomId(res[0].data[0].roomId);
        } else return;
      })

      .catch((err) => console.error(err));
  };

  const setMessage = (index) => {
    setNewMessage(false);
    setSelectedM(index);
    setStudentId(messages[index].recipientId);
    setStudentImageUrl(messages[index].recipientImage);
    setStudentName(messages[index].recipientName);
    setRoomId(messages[index].roomId);
    if (!messages[index].read) {
      db.doc(`/profiles/${emailId}/messages/${messages[index].roomId}`)
        .update({
          read: true,
        })
        .then(() => {
          props.decMessageCount();
          let newMessages = [...messages];
          newMessages[index].read = true;
          setMessages(newMessages);
        })
        .catch((err) => console.log(err));
    }
  };

  const refreshMessages = () => {
    getMessages();
    setNewMessage(false);
  };

  const renderLeftPanel = () => {
    return (
      <div>
        <div className="d-flex align-items-center pt-3 pb-2">
          <h2 className="my-0">Messages</h2>
          {/* <FontAwesomeIcon
            icon={faEdit}
            style={{ height: "100%" }}
            className="d-inline-block"
          /> */}
        </div>
        {messages && renderMessageCards()}
      </div>
    );
  };

  const renderMessageCards = () => {
    if (!messages || messages.length === 0) {
      return (
        <p className="mt-3" style={{ fontSize: "14px" }}>
          No messages yet.
        </p>
      );
    }

    return (
      <div>
        {newMessage && (
          <Row className="message-card">
            <Col sm={4}>
              <img
                className={
                  props.imageUrl ===
                  "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media"
                    ? "message-profile recipient-blur"
                    : "message-profile recipient"
                }
                alt="Profile"
                src={studentImageUrl}
              />
            </Col>
            <Col sm={8}>
              <div>{studentName}</div>
            </Col>
          </Row>
        )}
        {messages.map((message, i) => {
          const messagePreview =
            message.lastMessage.length <= 30
              ? message.lastMessage
              : message.lastMessage.substring(0, 30) + "...";

          return (
            <Row className="message-card" onClick={() => setMessage(i)}>
              <Col sm={4}>
                <img
                  className={
                    props.imageUrl ===
                    "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media"
                      ? "message-profile recipient-blur"
                      : "message-profile recipient"
                  }
                  alt="Profile"
                  src={message.recipientImage}
                />
              </Col>
              <Col sm={8}>
                <div style={{ fontWeight: 600 }}>
                  {message.recipientName}{" "}
                  {!message.read && (
                    <FontAwesomeIcon
                      color="#473F9B"
                      style={{ width: 12 }}
                      icon={faCircle}
                    />
                  )}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: !message.read ? "bold" : "",
                  }}
                >
                  {messagePreview}
                </div>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-100 h-100" style={{ paddingRight: "5rem" }}>
      <Container fluid className="message-page h-100">
        <Row className="h-100">
          <Col sm={3} className="p-2">
            {renderLeftPanel()}
          </Col>
          <Col sm={9} className="p-2" style={{ backgroundColor: "white" }}>
            {roomId && (
              <Chat
                studentName={studentName}
                studentImageUrl={studentImageUrl}
                studentId={studentId}
                ownId={ownId}
                ownImageUrl={ownImageUrl}
                ownName={ownName}
                roomId={roomId}
                refreshMessages={refreshMessages}
                imageUrl={props.imageUrl}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MessageView;

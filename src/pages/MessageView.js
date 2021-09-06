// Set-up
import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";
import md5 from "md5";

// Components
import Chat from "../components/Chat";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { Container, Row, Col } from "react-bootstrap";
import "./MessageView.css";

// Body
function MessageView(props) {
  const emailId = auth.currentUser.email.split("@")[0];
  const [messages, setMessages] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentImageUrl, setStudentImageUrl] = useState("");
  const [studentName, setStudentName] = useState("");
  const [ownId, setOwnId] = useState("");
  const [ownImageUrl, setOwnImageUrl] = useState("");
  const [ownName, setOwnName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [newMessage, setNewMessage] = useState(false);
  const [selectedM, setSelectedM] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (props.history.location.state) {
      startMessage();
    } else {
      getMessages();
    }
  }, []);

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
  };

  const refreshMessages = () => {
    getMessages();
    setNewMessage(false);
  };

  const renderLeftPanel = () => {
    return (
      <div>
        <img
          className="message-profile"
          alt="Profile Picture"
          src={ownImageUrl}
          height={50}
        />
        <div
          className="d-flex align-items-center justify-content-center py-4"
          style={{ borderBottom: "1px solid lightgrey" }}
        >
          <h5 className="m-0">Messages</h5>
          <FontAwesomeIcon
            icon={faEdit}
            style={{ height: "100%", marginLeft: "3rem" }}
            className="d-inline-block"
          />
        </div>
        {messages && renderMessageCards()}
      </div>
    );
  };

  const renderMessageCards = () => {
    if (!messages || messages.length == 0) {
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
            <img
              className="message-profile"
              alt="Profile Picture"
              src={studentImageUrl}
            />
            <div>{studentName}</div>
          </Row>
        )}
        {messages.map((message, i) => {
          return (
            <Row className="message-card" onClick={() => setMessage(i)}>
              <img
                className="message-profile"
                alt="Profile Picture"
                src={message.recipientImage}
              />
              <div>{message.recipientName}</div>
              <div>{message.lastMessage}</div>
            </Row>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-100 h-100" style={{ paddingRight: "5rem" }}>
      <Container fluid className="message-page">
        <Row className="h-100">
          <Col sm={3} className="p-2">
            {renderLeftPanel()}
          </Col>
          <Col sm={9} className="p-2" style={{ backgroundColor: "white" }}>
            {studentName}
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
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MessageView;

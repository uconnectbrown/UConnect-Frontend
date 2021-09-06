// Set-up
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";
import md5 from "md5";

// Components
import Chat from "../components/Chat";
import SearchBar from "../components/SearchBar";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { Container, Row, Col } from "react-bootstrap";
import "./MessageView.css";

// Body
function MessageView() {
  const emailId = auth.currentUser.email.split("@")[0];
  const [messages, setMessages] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentImageUrl, setStudentImageUrl] = useState("");
  const [studentName, setStudentName] = useState("");
  const [ownId, setOwnId] = useState("");
  const [ownImageUrl, setOwnImageUrl] = useState("");
  const [ownName, setOwnName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [selectedM, setSelectedM] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getMessages();
  }, []);

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
          return [res[0].data[0].recipientId, res[1].data.emailId];
        } else return;
      })
      .then((alphaId) => {
        if (alphaId) {
          setRoomId(md5(alphaId.sort().join(" ")));
        }
      })
      .catch((err) => console.error(err));
  };

  const setMessage = (index) => {
    setSelectedM(index);
    setStudentId(messages[index].recipientId);
    setStudentImageUrl(messages[index].recipientImage);
    setStudentName(messages[index].recipientName);
    setRoomId(md5([ownId, messages[index].recipientId].sort().join(" ")));
  };

  const renderLeftPanel = () => {
    return (
      <div>
        <img
          className="message-profile"
          alt="Profile Picture"
          src={ownImageUrl}
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
        {renderMessageCards()}
      </div>
    );
  };

  const renderMessageCards = () => {
    const messages = [1, 2, 3, 4, 5];

    if (!messages || messages.length == 0) {
      return (
        <p className="mt-3" style={{ fontSize: "14px" }}>
          No messages yet.
        </p>
      );
    }

    return messages.map((message, i) => {
      return (
        <Row
          className="message-card"
          // onClick={() => setMessage(i)}
        >
          <img
            className="message-profile"
            alt="Profile Picture"
            src={studentImageUrl}
          />
          <div>First Last</div>
        </Row>
      );
    });
  };

  return (
    <div className="w-100 h-100" style={{ paddingRight: "5rem" }}>
      <Container fluid className="message-page">
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
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {messages && (
            <div>
              {messages.map((message, index) => {
                return (
                  <Card
                    align="center"
                    style={{
                      backgroundColor: index === selectedM ? "gray" : "white",
                      height: "90px",
                    }}
                  >
                    <ButtonBase
                      size="large"
                      color="primary"
                      style={{ width: "100%" }}
                      onClick={() => {
                        setMessage(index);
                      }}
                    >
                      <CardContent>
                        <img
                          height="50px"
                          alt="Profile Picture"
                          src={message.recipientImage}
                        />
                        <Typography variant="body2">
                          {message.recipientName}
                        </Typography>
                      </CardContent>
                    </ButtonBase>
                  </Card>
                );
              })}
            </div>
          )}
        </Grid>
        <Grid item xs={8}>
          {roomId && (
            <Chat
              studentName={studentName}
              studentImageUrl={studentImageUrl}
              studentId={studentId}
              ownId={ownId}
              ownImageUrl={ownImageUrl}
              ownName={ownName}
              roomId={roomId}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default MessageView;

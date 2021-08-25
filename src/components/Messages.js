// Set-up
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";
import md5 from "md5";

// Components
import Chat from "./Chat";
import NavBar from "./NavBar";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

// Body
function Messages() {
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
        console.log(res);
        setMessages(res[0].data);
        setStudentName(res[0].data[0].recipientName);
        setStudentImageUrl(res[0].data[0].recipientImage);
        setStudentId(res[0].data[0].recipientId);
        setOwnName(res[1].data.firstName + " " + res[1].data.lastName);
        setOwnImageUrl(res[1].data.imageUrl);
        setOwnId(res[1].data.emailId);
        return [res[0].data[0].recipientId, res[1].data.emailId];
      })
      .then((alphaId) => {
        setRoomId(md5(alphaId.sort().join(" ")));
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

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
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

export default Messages;

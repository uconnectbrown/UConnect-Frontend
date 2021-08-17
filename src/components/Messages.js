// Set-up
import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";
import md5 from "md5";

// Components
import Chat from "../components/Chat";

// MUI Stuff
import Grid from "@material-ui/core/Grid";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
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

  useEffect(() => {
    getSenderInfo();
  }, []);

  const getMessages = () => {
    axios
      .get(`/messages/${emailId}`)
      .then((res) => {
        setMessages(res.data);
        setStudentId(res.data[0].recipientId);
        setStudentImageUrl(res.data[0].recipientImage);
        setStudentName(res.data[0].recipientName);
      })
      .catch((err) => console.error(err));
  };

  const getSenderInfo = () => {
    axios
      .get(`/senderInfo/${auth.currentUser.email}`)
      .then((res) => {
        setOwnId(res.data.emailId);
        setOwnImageUrl(res.data.imageUrl);
        setOwnName(res.data.firstName + " " + res.data.lastName);
        setRoomId(md5([res.data.emailId, studentId].sort().join(" ")));
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
    <Grid container spacing={1}>
      <GridList cols={1} cellHeight="auto">
        {messages.map((message, index) => {
          return (
            <GridListTile item component="Card" sm>
              <Card
                align="center"
                style={{
                  backgroundColor: index === selectedM ? "gray" : "white",
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
                      width="50px"
                      alt="Profile Picture"
                      src={message.recipientImage}
                    />
                    <Typography variant="body2">
                      {message.recipientName}
                    </Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            </GridListTile>
          );
        })}
      </GridList>

      <Grid item xs={8} align="left">
        {roomId}
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
  );
}

export default Messages;

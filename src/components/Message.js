// Setup
import React, { useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";
import { auth } from "../firebase";

// Components
import Chat from "../components/Chat";

// MUI Stuff
import BackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";

// Body
function Message(props) {
  const [roomId, setRoomId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentImageUrl, setStudentImageUrl] = useState("");
  const [studentName, setStudentName] = useState("");
  const [ownId, setOwnId] = useState("");
  const [ownImageUrl, setOwnImageUrl] = useState("");
  const [ownName, setOwnName] = useState("");

  useEffect(() => {
    getSenderInfo();
  }, []);

  const getSenderInfo = () => {
    setStudentId(props.studentInfo[0]);
    setStudentImageUrl(props.studentInfo[1]);
    setStudentName(props.studentInfo[2]);
    axios
      .get(`/senderInfo/${auth.currentUser.email}`)
      .then((res) => {
        setOwnId(res.data.emailId);
        setOwnImageUrl(res.data.imageUrl);
        setOwnName(res.data.firstName + " " + res.data.lastName);
        setRoomId(
          md5([res.data.emailId, props.studentInfo[0]].sort().join(" "))
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <DialogContent>
      <Grid container>
        <Grid item sm>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={props.handleCloseMessage}
          >
            <BackIcon />
            <Typography variant="h6">Back</Typography>
          </IconButton>
        </Grid>
        <Grid item sm align="center">
          <Avatar
            alt="recipient"
            src={studentImageUrl}
            style={{ width: "70px", height: "70px" }}
          />
          <Typography variant="body1">{studentName.split(" ")[0]}</Typography>
        </Grid>
      </Grid>

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
    </DialogContent>
  );
}

export default Message;

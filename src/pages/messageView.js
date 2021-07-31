// Setup
import React, { Component } from "react";
import axios from "axios";
import md5 from "md5";
import { auth } from "../firebase";

// Components
import NavBar from "../components/NavBar";
import Chat from "../components/Chat";

// MUI Stuff
import BackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import MessageIcon from "@material-ui/icons/Sms";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

export class messageView extends Component {
  state = {
    courseInfo: this.props.location.state.recipientInfo[4],
    studentEmail: this.props.location.state.recipientInfo[5],
    recipientName: "",
    recipientImage: "",
    recipientId: "",
    courseCode: "",
    ownId: "",
    ownImage: "",
    ownName: "",
    roomId: "",
    loading: true,
    previousPage: this.props.location.state.previousPage,
  };

  componentDidMount() {
    console.log(this.props.location.state.recipientInfo[4]);
    this.setState({
      recipientName: this.props.location.state.recipientInfo[0],
      recipientImage: this.props.location.state.recipientInfo[1],
      recipientId: this.props.location.state.recipientInfo[2],
      courseCode: this.props.location.state.recipientInfo[3],
    });

    axios
      .get(`/senderInfo/${auth.currentUser.email}`)
      .then((res) => {
        this.setState({
          ownId: res.data.emailId,
          ownImage: res.data.imageUrl,
          ownName: res.data.firstName + " " + res.data.lastName,
        });
        let alphaId = [
          res.data.emailId,
          this.props.location.state.recipientInfo[2],
        ]
          .sort()
          .join(" ");
        this.setState({
          roomId: md5(alphaId),
        });
      })
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((err) => console.error(err));
  }

  handleMessage = () => {
    this.props.history.push("/messagesView");
  };

  handleBack = () => {
    if (this.state.previousPage == "courseView") {
      this.props.history.push({
        pathname: "/courseView",
        state: {
          courseInfo: [
            this.state.courseInfo[0],
            this.state.courseInfo[1],
            this.state.courseInfo[2],
            this.state.courseInfo[3],
          ],
        },
      });
    } else if (this.state.previousPage == "messagesView") {
      this.handleMessage();
    } else {
      this.props.history.push({
        pathname: "/studentView",
        state: {
          studentInfo: [
            this.state.courseInfo[0],
            this.state.courseInfo[1],
            this.state.courseInfo[2],
            this.state.courseInfo[3],
            this.state.studentEmail,
          ],
        },
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.loading && (
          <div align="center">
            <NavBar />
            <br />
            <CircularProgress size={100} />
            <br />
            <br />
            <Typography variant="h4">Fetching messages...</Typography>
          </div>
        )}
        {!this.state.loading && (
          <div>
            <NavBar />
            <AppBar>
              <Toolbar>
                <Grid container>
                  <Grid item sm>
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="back"
                      onClick={this.handleBack}
                    >
                      <BackIcon />
                      <Typography variant="h6">Back</Typography>
                    </IconButton>
                  </Grid>
                  <Grid item sm align="center">
                    <Avatar
                      alt="recipient"
                      src={this.state.recipientImage}
                      style={{ width: "70px", height: "70px" }}
                    />
                    <Typography variant="body1">
                      {this.state.recipientName.split(" ")[0]}
                    </Typography>
                  </Grid>
                  <Grid item sm align="right">
                    <IconButton
                      edge="end"
                      color="inherit"
                      aria-label="message"
                      onClick={this.handleMessage}
                    >
                      <Typography variant="h6"> To Messages</Typography>
                      <span style={{ marginRight: "5px" }} />
                      <MessageIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>

            <Chat
              recipientName={this.state.recipientName}
              recipientImage={this.state.recipientImage}
              recipientId={this.state.recipientId}
              courseCode={this.state.courseCode}
              ownId={this.state.ownId}
              ownImage={this.state.ownImage}
              ownName={this.state.ownName}
              roomId={this.state.roomId}
            />
          </div>
        )}
      </div>
    );
  }
}

export default messageView;

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
    // Props that courseView needs
    code: "",
    name: "",
    color: "",
    numCourses: "",
    // Props that studentView needs
    studentEmail: "",
    // Props that messageView needs
    recipientName: "",
    recipientImage: "",
    recipientId: "",
    ownId: "",
    ownImage: "",
    ownName: "",
    roomId: "",
    loading: true,
    previousPage: "",
  };

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push("/messagesView");
    } else {
      this.setState({
        // Props that courseView needs
        code: this.props.location.state.code,
        name: this.props.location.state.name,
        color: this.props.location.state.color,
        numCourses: this.props.location.state.numCourses,
        // Props that studnetView needs
        studentEmail: this.props.location.state.studentEmail,
        // Props that messageView needs
        recipientName: this.props.location.state.recipientName,
        recipientImage: this.props.location.state.recipientImage,
        recipientId: this.props.location.state.studentEmail.split("@")[0],
        previousPage: this.props.location.state.previousPage,
      });
    }

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
          this.props.location.state.studentEmail.split("@")[0],
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
          code: this.state.code,
          name: this.state.name,
          color: this.state.color,
          numCourses: this.state.numCourses,
          studentEmail: this.state.studentEmail,
        },
      });
      console.log(
        this.state.code,
        this.state.name,
        this.state.color,
        this.state.numCourses,
        this.state.studentEmail
      );
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
              code={this.state.code}
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

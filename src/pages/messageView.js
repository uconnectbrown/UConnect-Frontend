// Setup
import React, { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../firebase";

// Components
import NavBar from "../components/NavBar";
import Chat from "../components/Chat";

// MUI Stuff
import BackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

export class messageView extends Component {
  state = {
    recipientName: "",
    recipientImage: "",
    recipientId: "",
    courseCode: "",
    ownId: "",
    ownImage: "",
    ownName: "",
    roomId: "",
    loading: true,
  };

  componentDidMount() {
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
        if (this.props.location.state.recipientInfo[4]) {
          this.setState({
            roomId: this.props.location.state.recipientInfo[4],
          });
        } else {
          this.setState({ roomId: uuidv4() });
        }
      })
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((err) => console.error(err));
  }

  handleBack = () => {
    this.props.history.push("/messagesView");
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
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={this.handleBack}
            >
              <BackIcon />
            </IconButton>
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

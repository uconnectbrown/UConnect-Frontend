// Setup
import React, { Component } from "react";
import axios from "axios";

// Components
import NavBar from "../components/NavBar";
import Chat from "../components/Chat";

// MUI Stuff
import BackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

export class messageView extends Component {
  state = {
    studentName: this.props.location.state.studentInfo[0],
    studentImage: this.props.location.state.studentInfo[1],
    studentId: this.props.location.state.studentInfo[2],
    courseCode: this.props.location.state.studentInfo[3],
    emailId: "",
    imageUrl: "",
    profileName: "",
    roomId: "",
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/senderInfo")
      .then((res) => {
        this.setState({
          emailId: res.data.emailId,
          imageUrl: res.data.imageUrl,
          profileName: res.data.firstName + " " + res.data.lastName,
        });
      })
      .catch((err) => console.error(err));
    this.setState({ loading: false });
    // this.setState({ roomId: "colby_zarle ethan_huang1" });

    if (this.state.emailId < this.state.studentId) {
      this.setState({
        roomId: `${this.state.emailId} ${this.state.studentId}`,
      });
    } else
      this.setState({
        roomId: ` ${this.state.studentId} ${this.state.emailId}`,
      });
  }

  handleBack = () => {
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentImage");
    localStorage.removeItem("studentId");
    localStorage.removeItem("roomId");
    this.props.history.push("/messagesView");
  };

  render() {
    return (
      <div>
        {this.state.loading && <Typography> Loading ...</Typography>}
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
              studentName={this.state.studentName}
              studentImage={this.state.studentImage}
              studentId={this.state.studentId}
              courseCode={this.state.courseCode}
              emailId={this.state.emailId}
              imageUrl={this.state.imageUrl}
              profileName={this.state.profileName}
              roomId={this.state.roomId}
            />
          </div>
        )}
      </div>
    );
  }
}

export default messageView;
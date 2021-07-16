// Setup
import React, { Component } from "react";
import axios from "axios";

// Components
import NavBar from "../components/NavBar";
import Chat from "../components/Chat";

// MUI Stuff
import BackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

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
  };

  componentDidMount() {
    axios
      .get("/senderInfo")
      .then((res) => {
        this.setState({ emailId: res.data.emailId });
        this.setState({ imageUrl: res.data.imageUrl });
        this.setState({
          profileName: res.data.firstName + " " + res.data.lastName,
        });
        console.log(this.state.emailId);
      })
      .catch((err) => console.error(err));

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
    );
  }
}

export default messageView;

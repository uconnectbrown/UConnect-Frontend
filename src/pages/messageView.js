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
    studentName: "",
    studentImage: "",
    studentId: "",
    courseCode: "",
    emailId: "",
    imageUrl: "",
    profileName: "",
    roomId: "",
  };

  componentDidMount() {
    this.setState({
      studentName: this.props.location.state.studentInfo[0],
      studentImage: this.props.location.state.studentInfo[1],
      studentId: this.props.location.state.studentInfo[2],
      courseCode: this.props.location.state.studentInfo[3],
    })
    const FBIdToken = localStorage.FBIdToken;
    axios.defaults.headers.common["Authorization"] = FBIdToken;
    if (FBIdToken) {
      axios
      .get("/senderInfo")
      .then((res) => {
        this.setState({ 
          emailId: res.data.emailId, 
          imageUrl: res.data.imageUrl, 
          profileName: res.data.firstName + " " + res.data.lastName,
        });
        if (this.state.emailId < this.state.studentId) {
          this.setState({
            roomId: `${this.state.emailId} ${this.state.studentId}`,
          });
        } else
          this.setState({
            roomId: ` ${this.state.studentId} ${this.state.emailId}`,
          });
        {console.log(this.state.emailId)}
        {console.log(this.state.studentId)}
        {console.log(this.state.roomId)}
      })
      .catch((err) => console.error(err));
    }
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

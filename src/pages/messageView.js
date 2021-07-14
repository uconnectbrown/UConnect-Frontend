// Setup
import React, { Component } from "react";

// Components
import NavBar from "../components/NavBar";
import Chat from "../components/Chat";

// MUI Stuff
import BackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

export class messageView extends Component {
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
        <Chat />
      </div>
    );
  }
}

export default messageView;

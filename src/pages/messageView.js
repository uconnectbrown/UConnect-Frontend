// Setup
import React, { Component } from "react";

// Components
import NavBar from "../components/NavBar";
import Chat from "../components/Chat";

export class messageView extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Chat />
      </div>
    );
  }
}

export default messageView;

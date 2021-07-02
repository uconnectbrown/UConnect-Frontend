// Setup
import React, { Component } from "react";

// Components
import NavBar from "../components/NavBar";

export class messageView extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1>Messages</h1>
      </div>
    );
  }
}

export default messageView;

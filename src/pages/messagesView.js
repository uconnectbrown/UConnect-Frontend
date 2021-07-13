// Setup
import React, { Component } from "react";
import axios from "axios";

// Components
import NavBar from "../components/NavBar";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class messagesView extends Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    axios
      .get("/messages")
      .then((data) => {
        this.setState({ messages: data.data });
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    let messages = this.state.messages;
    return (
      <div>
        <NavBar />
        {messages.map((message) => (
          <div>
            <Card>
              <img src={message.image} width={50}></img>
              <CardContent>{message.name}</CardContent>
            </Card>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default messagesView;

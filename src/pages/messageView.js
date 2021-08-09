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
    ownId: "",
    ownImage: "",
    ownName: "",
    roomId: "",
    loading: true,
  };

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push("/messagesView");
    }
    axios
      .get(`/senderInfo/${auth.currentUser.email}`)
      .then((res) => {
        this.setState({
          ownId: res.data.emailId,
          ownImage: res.data.imageUrl,
          ownName: res.data.firstName + " " + res.data.lastName,
        });
        let alphaId = [res.data.emailId, this.props.location.state.recipientId]
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
          code: this.props.location.state.code,
          name: this.props.location.state.name,
          color: this.props.location.state.color,
        },
      });
    } else if (this.state.previousPage == "messagesView") {
      this.handleMessage();
    } else {
      this.props.history.push({
        pathname: "/studentView",
        state: {
          code: this.props.location.state.code,
          name: this.props.location.state.name,
          color: this.props.location.state.color,
          recipientId: this.props.location.state.recipientId,
        },
      });
    }
  };

  render() {
    let image = this.props.location.state.recipientImage;
    let name = this.props.location.state.recipientName;
    let id = this.props.location.state.recipientId;
    let codeNS = this.props.location.state.code.replace(/\s/g, "");
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
                      src={image}
                      style={{ width: "70px", height: "70px" }}
                    />
                    <Typography variant="body1">
                      {name.split(" ")[0]}
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
              recipientName={name}
              recipientImage={image}
              recipientId={id}
              code={codeNS}
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

// Setup
import React, { Component } from "react";
import axios from "axios";
import md5 from "md5";
import { auth } from "../firebase";

// Components
import GroupChat from "../components/GroupChat";

// MUI Stuff
import BackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import MessageIcon from "@material-ui/icons/Sms";

export class groupMessageView extends Component {
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
    } else {
      axios
        .get(`/senderInfo/${auth.currentUser.email}`)
        .then((res) => {
          this.setState({
            ownId: res.data.emailId,
            ownImage: res.data.imageUrl,
            ownName: res.data.firstName + " " + res.data.lastName,
          });
          let alphaId = this.props.location.state.allIds.sort().join(" ");
          console.log(alphaId);
          this.setState({
            roomId: md5(alphaId),
          });
        })
        .then(() => {
          this.setState({ loading: false });
        })
        .catch((err) => console.error(err));
    }
  }

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
    } else {
      this.handleMessage();
    }
  };

  handleMessage = () => {
    this.props.history.push("/messagesView");
  };

  render() {
    let images = this.props.location.state.recipientImages;
    let image1 = this.props.location.state.recipientImages[0];
    let image2 = this.props.location.state.recipientImages[1];
    let image3 = this.props.location.state.recipientImages[2];
    let names = this.props.location.state.recipientNames;
    let ids = this.props.location.state.recipientIds;
    let codeNS = this.props.location.state.code.replace(/\s/g, "");
    return (
      <div>
        {this.state.loading && (
          <div align="center">
            <br />
            <CircularProgress size={100} />
            <br />
            <br />
            <Typography variant="h4">Fetching messages...</Typography>
          </div>
        )}
        {!this.state.loading && (
          <div>
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
                    <AvatarGroup
                      max={3}
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      {image1 && <Avatar alt="recipient0" src={image1} />}
                      {image2 && <Avatar alt="recipient1" src={image2} />}
                      {image3 && <Avatar alt="recipient2" src={image3} />}
                    </AvatarGroup>
                    <Typography variant="body1">
                      {names.map((name) => name.split(" ")[0] + ", ")}
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

            <GroupChat
              recipientNames={names}
              recipientImages={images}
              recipientIds={ids}
              courseCode={codeNS}
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

export default groupMessageView;

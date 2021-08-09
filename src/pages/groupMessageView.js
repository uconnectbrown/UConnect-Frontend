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
    // // Props that courseView needs
    // code: "",
    // name: "",
    // color: "",
    // numCourses: "",
    // Props that groupMessageView needs
    recipientNames: [],
    recipientImages: [],
    recipientIds: [],
    ownId: "",
    ownImage: "",
    ownName: "",
    roomId: "",
    loading: true,
    previousPage: "",
  };

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push("/messagesView");
    } else {
      this.setState({
        // // Props that courseView needs
        // code: this.props.location.state.code,
        // name: this.props.location.state.name,
        // color: this.props.location.state.color,
        // numCourses: this.props.location.state.numCourses,
        // Props that groupMesssageView needs
        recipientNames: this.props.location.state.recipientNames,
        recipientImages: this.props.location.state.recipientImages,
        recipientIds: this.props.location.state.recipientIds,
        previousPage: this.props.location.state.previousPage,
      });
    }

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

  handleBack = () => {
    if (this.state.previousPage == "courseView") {
      this.props.history.push({
        pathname: "/courseView",
        state: {
          code: this.props.location.state.code,
          name: this.props.location.state.name,
          color: this.props.location.state.color,
          numCourses: this.props.location.state.numCourses,
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
                      {this.state.recipientImages[0] && (
                        <Avatar
                          alt="recipient0"
                          src={this.state.recipientImages[0]}
                        />
                      )}
                      {this.state.recipientImages[1] && (
                        <Avatar
                          alt="recipient1"
                          src={this.state.recipientImages[1]}
                        />
                      )}
                      {this.state.recipientImages[2] && (
                        <Avatar
                          alt="recipient2"
                          src={this.state.recipientImages[2]}
                        />
                      )}
                    </AvatarGroup>
                    <Typography variant="body1">
                      {this.state.recipientNames.map(
                        (name) => name.split(" ")[0] + ", "
                      )}
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
              recipientNames={this.state.recipientNames}
              recipientImages={this.state.recipientImages}
              recipientIds={this.state.recipientIds}
              courseCode={this.props.location.state.code.replace(/\s/g, "")}
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

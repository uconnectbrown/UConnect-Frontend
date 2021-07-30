// Setup
import React, { Component } from "react";
import axios from "axios";
import md5 from "md5";
import { auth } from "../firebase";

// Components
import NavBar from "../components/NavBar";
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
    courseInfo: this.props.location.state.recipientInfo[4],
    recipientNames: [],
    recipientImages: [],
    recipientIds: [],
    courseCode: "",
    ownId: "",
    ownImage: "",
    ownName: "",
    roomId: "",
    loading: true,
    previousPage: this.props.location.state.previousPage,
  };

  componentDidMount() {
    let names = this.props.location.state.recipientInfo[0];
    let images = this.props.location.state.recipientInfo[1];
    let ids = this.props.location.state.recipientInfo[2];
    let allIds = this.props.location.state.allIds;
    this.setState(
      {
        recipientNames: names,
        recipientImages: images,
        recipientIds: ids,
        courseCode: this.props.location.state.recipientInfo[3],
      },
      () => {
        axios
          .get(`/senderInfo/${auth.currentUser.email}`)
          .then((res) => {
            this.setState({
              ownId: res.data.emailId,
              ownImage: res.data.imageUrl,
              ownName: res.data.firstName + " " + res.data.lastName,
            });
            let alphaId = allIds.sort().join(" ");
            console.log(ids);
            this.setState({
              roomId: md5(alphaId),
            });
          })
          .then(() => {
            this.setState({ loading: false });
          })
          .catch((err) => console.error(err));
      }
    );
  }

  handleBack = () => {
    if (this.state.previousPage == "courseView") {
      this.props.history.push({
        pathname: "/courseView",
        state: {
          courseInfo: [
            this.state.courseInfo[0],
            this.state.courseInfo[1],
            this.state.courseInfo[2],
            this.state.courseInfo[3],
          ],
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
                    {this.state.previousPage !== "messagesView" && (
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
                    )}
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>

            <GroupChat
              recipientNames={this.state.recipientNames}
              recipientImages={this.state.recipientImages}
              recipientIds={this.state.recipientIds}
              courseCode={this.state.courseCode}
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

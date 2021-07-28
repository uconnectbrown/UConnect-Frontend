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

export class groupMessageView extends Component {
  state = {
    recipientNames: [],
    recipientImages: [],
    recipientIds: [],
    courseCode: "",
    ownId: "",
    ownImage: "",
    ownName: "",
    roomId: "",
    loading: true,
  };

  componentDidMount() {
    let names = this.props.location.state.recipientInfo[0];
    let images = this.props.location.state.recipientInfo[1];
    let ids = this.props.location.state.recipientInfo[2];
    let allIds = this.props.location.state.recipientInfo[4];
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
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={this.handleBack}
            >
              <BackIcon />
            </IconButton>
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

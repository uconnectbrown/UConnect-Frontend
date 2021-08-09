// Setup
import React, { Component } from "react";
import axios from "axios";
import { auth } from "../firebase";

// Components
import Feed from "../components/Feed";

// MUI Stuff
import BackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MessageIcon from "@material-ui/icons/Sms";

export class feedView extends Component {
  state = {
    ownId: "",
    ownImage: "",
    ownName: "",
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
        })
        .then(() => {
          this.setState({ loading: false });
        })
        .catch((err) => console.error(err));
    }
  }

  handleBack = () => {
    if (this.props.location.state.previousPage === "messagesView") {
      this.props.history.push("/messagesView");
    } else {
      this.props.history.push("/coursesView");
    }
  };

  handleMessage = () => {
    this.props.history.push("/messagesView");
  };

  render() {
    let code = this.props.location.state.code;
    let codeNS = this.props.location.state.code.replace(/\s/g, "");
    return (
      <div>
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
                    <Typography variant="h4">Course Feed for {code}</Typography>
                  </Grid>
                  <Grid item sm align="right">
                    {" "}
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

            <Feed
              courseCode={codeNS}
              ownId={this.state.ownId}
              ownImage={this.state.ownImage}
              ownName={this.state.ownName}
            />
          </div>
        )}
      </div>
    );
  }
}

export default feedView;

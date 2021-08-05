// Setup
import React, { Component } from "react";
import axios from "axios";
import { auth } from "../firebase";

// Components
import NavBar from "../components/NavBar";
import Feed from "../components/Feed";

// MUI Stuff
import BackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

export class feedView extends Component {
  state = {
    courseCode: "",
    ownId: "",
    ownImage: "",
    ownName: "",
    loading: true,
  };

  componentDidMount() {
    console.log(this.props.location.state.courseCode);
    if (!this.props.location.state) {
      this.props.history.push("/messagesView");
    } else {
      this.setState({
        courseCode: this.props.location.state.courseCode,
      });

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
    this.props.history.push("/messagesView");
  };

  render() {
    return (
      <div>
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
            <Feed
              courseCode={this.state.courseCode}
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

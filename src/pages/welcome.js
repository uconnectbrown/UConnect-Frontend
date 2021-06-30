import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

// Components
import Profile from "../components/Profile";

// MUI Stuff
import Button from "@material-ui/core/Button";

class welcome extends Component {
  state = {
    profiles: null,
  };
  componentDidMount() {
    axios
      .get("/profiles")
      .then((res) => {
        this.setState({
          profiles: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let profiles = this.state.profiles ? (
      this.state.profiles.map((profile) => (
        <Profile key={profile.email} profile={profile} />
      ))
    ) : (
      <p>Loading profiles...</p>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          <h1>Welcome to UConnect!</h1>
          <Button color="red" component={Link} to="/login">
            Login
          </Button>
          <Button color="blue" component={Link} to="/signup">
            Signup
          </Button>
        </Grid>
        <Grid item sm={4} xs={12}>
          {profiles}
        </Grid>
      </Grid>
    );
  }
}

export default welcome;

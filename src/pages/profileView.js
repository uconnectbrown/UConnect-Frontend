import React, { Component } from "react";
import axios from 'axios';
// import jwtDecode from 'jwt-decode';

// MUI Stuff
import Grid from '@material-ui/core/Grid';

class profileView extends Component {
  state = {
    userData: null
  }
  componentDidMount(){
    // const FBIdToken = `Bearer ${res.data.token}`;
    // localStorage.setItem("FBIdToken", FBIdToken);
    // axios.defaults.headers.common["Authorization"] = FBIdToken;
    // const token = localStorage.FBIdToken;
    // not sure how to get correct emailId, so temporarily hard coded
    const emailId = 'ethan_huang1'
    axios.get(`/user/${emailId}`)
      .then(res => {
        this.setState({
          userData: res.data
        })
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Grid container>
        <Grid item sm />
        <Grid item sm>
          <p>{this.state.userData.firstName}</p>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

export default profileView;

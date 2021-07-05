import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Components
import NavBar from "../components/NavBar";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

export class courseView extends Component {
  state = {
    courses: [{},{},{},{},{}],
  };

  componentDidMount() {
    const emailId = localStorage.emailId;
    axios
      .get(`/user/${emailId}`)
      .then((res) => {
        this.setState({
          courses: res.data.user.courses,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div align="center">
        <NavBar />
        <Typography variant="h2">Fall 2021</Typography>
        <br />
        <Grid container spacing={5}>
          <Grid item sm>
            <Card raised style={{borderStyle:'solid',borderWidth:'3px',borderColor:'red'}}>
              <CardContent align="center">
                <Typography variant="h4">{this.state.courses[0].courseCode}</Typography>
                <Typography variant="h5">{this.state.courses[0].courseName}</Typography>
                <hr />
                <br />
                <Typography variant="body1">Course Info</Typography>
              </CardContent>
            </Card>
            <br />
            <br />
            <Card raised style={{borderStyle:'solid',borderWidth:'3px',borderColor:'red'}}>
              <CardContent align="center">
                <Typography variant="h4">{this.state.courses[2].courseCode}</Typography>
                <Typography variant="h5">{this.state.courses[2].courseName}</Typography>
                <hr />
                <br />
                <Typography variant="body1">Course Info</Typography>
              </CardContent>
            </Card>
            {(this.state.courses[4].courseCode || this.state.courses[4].courseName) && (
              <div>
                <br />
                <br />
                <Card raised style={{borderStyle:'solid',borderWidth:'3px',borderColor:'red'}}>
                  <CardContent align="center">
                  <Typography variant="h4">{this.state.courses[4].courseCode}</Typography>
                  <Typography variant="h5">{this.state.courses[4].courseName}</Typography>
                  <hr />
                    <br />
                    <Typography variant="body1">Course Info</Typography>
                  </CardContent>
                </Card>
              </div>
            )}
          </Grid>
          <Grid item sm>
            <Card raised style={{borderStyle:'solid',borderWidth:'3px',borderColor:'red'}}>
              <CardContent align="center">
                <Typography variant="h4">{this.state.courses[1].courseCode}</Typography>
                <Typography variant="h5">{this.state.courses[1].courseName}</Typography>
                <hr />
                <br />
                <Typography variant="body1">Course Info</Typography>
              </CardContent>
            </Card>
            {(this.state.courses[3].courseCode || this.state.courses[3].courseName) && (
              <div>
                <br />
                <br />
                <Card raised style={{borderStyle:'solid',borderWidth:'3px',borderColor:'red'}}>
                  <CardContent align="center">
                  <Typography variant="h4">{this.state.courses[3].courseCode}</Typography>
                  <Typography variant="h5">{this.state.courses[3].courseName}</Typography>
                  <hr />
                    <br />
                    <Typography variant="body1">Course Info</Typography>
                  </CardContent>
                </Card>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default courseView;

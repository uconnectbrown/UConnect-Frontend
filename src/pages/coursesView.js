// Setup
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
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ButtonBase from "@material-ui/core/ButtonBase";

export class coursesView extends Component {
  state = {
    courses: [{}, {}, {}, {}, {}],
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

  handleClick = (code) => {
    const courseCode = code.replace(/\s/g, "");
    localStorage.setItem("courseCode", courseCode);
    this.props.history.push({
      pathname: "/courseView",
    });
  };

  render() {
    let code0 = this.state.courses[0].courseCode;
    let code1 = this.state.courses[1].courseCode;
    let code2 = this.state.courses[2].courseCode;
    let code3 = this.state.courses[3].courseCode;
    let code4 = this.state.courses[4].courseCode;
    let name0 = this.state.courses[0].courseName;
    let name1 = this.state.courses[1].courseName;
    let name2 = this.state.courses[2].courseName;
    let name3 = this.state.courses[3].courseName;
    let name4 = this.state.courses[4].courseName;
    return (
      <div align="center">
        <NavBar />
        <Typography variant="h2">Fall 2021</Typography>
        <br />
        <Grid container spacing={5}>
          <Grid item sm>
            <Card
              raised
              style={{
                borderStyle: "solid",
                borderWidth: "3px",
                borderColor: "red",
                height: 200,
              }}
            >
              <ButtonBase onClick={() => this.handleClick(code0)}>
                <CardContent align="center">
                  <Typography variant="h4">{code0}</Typography>
                  <Typography variant="h5">{name0}</Typography>
                  <hr />
                  <br />
                  <Typography variant="body1">Course Info</Typography>
                </CardContent>
              </ButtonBase>
            </Card>
            <br />
            <br />
            <Card
              raised
              style={{
                borderStyle: "solid",
                borderWidth: "3px",
                borderColor: "red",
                height: 200,
              }}
            >
              <ButtonBase onClick={() => this.handleClick(code2)}>
                <CardContent align="center">
                  <Typography variant="h4">{code2}</Typography>
                  <Typography variant="h5">{name2}</Typography>
                  <hr />
                  <br />
                  <Typography variant="body1">Course Info</Typography>
                </CardContent>
              </ButtonBase>
            </Card>
            {(this.state.courses[4].courseCode ||
              this.state.courses[4].courseName) && (
              <div>
                <br />
                <br />
                <Card
                  raised
                  style={{
                    borderStyle: "solid",
                    borderWidth: "3px",
                    borderColor: "red",
                    height: 200,
                  }}
                >
                  <ButtonBase onClick={() => this.handleClick(code4)}>
                    <CardContent align="center">
                      <Typography variant="h4">{code4}</Typography>
                      <Typography variant="h5">{name4}</Typography>
                      <hr />
                      <br />
                      <Typography variant="body1">Course Info</Typography>
                    </CardContent>
                  </ButtonBase>
                </Card>
              </div>
            )}
          </Grid>
          <Grid item sm>
            <Card
              raised
              style={{
                borderStyle: "solid",
                borderWidth: "3px",
                borderColor: "red",
                height: 200,
              }}
            >
              <ButtonBase onClick={() => this.handleClick(code1)}>
                <CardContent align="center">
                  <Typography variant="h4">{code1}</Typography>
                  <Typography variant="h5">{name1}</Typography>
                  <hr />
                  <br />
                  <Typography variant="body1">Course Info</Typography>
                </CardContent>
              </ButtonBase>
            </Card>
            {(this.state.courses[3].courseCode ||
              this.state.courses[3].courseName) && (
              <div>
                <br />
                <br />
                <Card
                  raised
                  style={{
                    borderStyle: "solid",
                    borderWidth: "3px",
                    borderColor: "red",
                    height: 200,
                  }}
                >
                  <ButtonBase onClick={() => this.handleClick(code3)}>
                    <CardContent align="center">
                      <Typography variant="h4">{code3}</Typography>
                      <Typography variant="h5">{name3}</Typography>
                      <hr />
                      <br />
                      <Typography variant="body1">Course Info</Typography>
                    </CardContent>
                  </ButtonBase>
                </Card>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default coursesView;

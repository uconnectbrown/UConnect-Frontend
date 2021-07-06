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
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export class courseView extends Component {
  state = {
    students: [],
  };

  componentDidMount() {
    const courseCode = localStorage.courseCode;
    console.log(courseCode);
    axios
      .get(`/course/${courseCode}`)
      .then((res) => {
        this.setState({
          students: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  handleBack() {
    localStorage.removeItem("courseCode");
  }

  render() {
    let students = this.state.students;
    return (
      <div>
        <NavBar />
        <h1>Course View</h1>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/coursesView"
          onClick={this.handleBack}
        >
          Back
        </Button>
        <br />
        <br />
        <Grid container spacing={5}>
          {students.map((student) => (
            <Grid item sm>
              <Card
                raised
                style={{
                  borderStyle: "solid",
                  borderWidth: "3px",
                  borderColor: "red",
                }}
              >
                <CardContent align="center">
                  <Typography variant="h4">{student}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default courseView;

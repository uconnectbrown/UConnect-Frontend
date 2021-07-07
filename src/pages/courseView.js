// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Components
import NavBar from "../components/NavBar";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";

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
    localStorage.removeItem("code");
    localStorage.removeItem("name");
  }

  render() {
    let students = this.state.students;
    const code = localStorage.code;
    const name = localStorage.name;
    return (
      <div>
        <NavBar />
        <Typography variant='h3' align='center'>{code}: {name}</Typography>
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
        <GridList cols={3} spacing={20} cellHeight='auto'>
          {students.map((student) => (
            <GridListTile item sm>
              <Card
                raised
                style={{
                  borderStyle: "solid",
                  borderWidth: "3px",
                  borderColor: "red",
                }}
                align="center"
              >
                <ButtonBase>
                  <CardContent>
                    <img src="https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media" style={{width:150, borderRadius:'50%'}} />
                    <br />
                    <br />
                    <Typography variant='h4'>Student Name</Typography>
                    <Typography variant='h6'>Graduating Class</Typography>
                    <Typography variant='h6'>Concentration(s)</Typography>
                    <Typography variant='body1'>Interests:</Typography>
                    <Typography variant='body1'>• Interest 1</Typography>
                    <Typography variant='body1'>• Interest 2</Typography>
                    <Typography variant='body1'>• Interest 3</Typography>
                    {/* <Typography variant="h4">{student}</Typography> */}
                  </CardContent>
                </ButtonBase>
              </Card>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default courseView;

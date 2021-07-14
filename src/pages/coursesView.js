// make cards taller to fill up the page better
// include a place for general info or to do for the course
// have the cards be color coded
// consider what else people would find most pertinent to a landing page

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
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { CodeRounded } from "@material-ui/icons";

export class coursesView extends Component {
  state = {
    courses: [{}, {}, {}, {}, {}],
    students0: [],
    students1: [],
    students2: [],
    students3: [],
    students4: [],
  };

  componentDidMount() {
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentId");
    localStorage.removeItem("courseCode");
    localStorage.removeItem("studentImage");
    localStorage.removeItem("roomId");
    localStorage.removeItem("courseName");
    localStorage.removeItem("codeSpace");
    const emailId = localStorage.emailId;
    let indexArray = [];
    let currentIndex = 0;
    axios
      .get("/update")
      .then(() => {
        return axios.get(`/user/${emailId}`).then((res) => {
          this.setState({
            courses: res.data.user.courses,
          });
        });
      })
      .then(() => {
        for (let j = 0; j < 5; j++) {
          if (this.state.courses[j].courseCode) {
            indexArray.push(j);
          }
        }
        let courseCodes = this.state.courses.map((course) =>
          course.courseCode.replace(/\s/g, "")
        );
        // pull students to obtain avatars
        let promises = [];
        console.log(indexArray);
        for (let i = 0; i < 5; i++) {
          if (indexArray.includes(i))
            promises.push(axios.get(`/course/${courseCodes[i]}`));
        }
        return promises;
      })
      .then((promises) => {
        return Promise.all(promises);
      })
      .then((results) => {
        if (indexArray.includes(0)) {
          this.setState({
            students0: results[currentIndex].data,
          });
          currentIndex++;
        }
        if (indexArray.includes(1)) {
          this.setState({
            students1: results[currentIndex].data,
          });
          currentIndex++;
        }
        if (indexArray.includes(2)) {
          this.setState({
            students2: results[currentIndex].data,
          });
          currentIndex++;
        }
        if (indexArray.includes(3)) {
          this.setState({
            students3: results[currentIndex].data,
          });
          currentIndex++;
        }
        if (indexArray.includes(4)) {
          this.setState({
            students4: results[currentIndex].data,
          });
          currentIndex++;
        }
      })
      .catch((err) => console.log(err));
  }

  handleClick = (code, name) => {
    const courseCode = code.replace(/\s/g, "");
    localStorage.setItem("courseCode", courseCode);
    localStorage.setItem("codeSpace", code);
    localStorage.setItem("courseName", name);
    this.props.history.push({
      pathname: "/courseView",
    });
  };

  render() {
    let studentList = [
      this.state.students0,
      this.state.students1,
      this.state.students2,
      this.state.students3,
      this.state.students4,
    ];
    let indexArray = [];
    for (let j = 0; j < 5; j++) {
      if (this.state.courses[j].courseCode) {
        indexArray.push(j);
      }
    }
    return (
      <div align="center">
        <NavBar />
        <Typography variant="h2">Fall 2021</Typography>
        <br />
        <GridList cols={3} spacing={20} cellHeight="auto">
          {indexArray.map((index) => (
            <GridListTile item sm>
              <Card
                raised
                style={{
                  borderStyle: "solid",
                  borderWidth: "3px",
                  borderColor: "red",
                  height: 200,
                }}
              >
                <ButtonBase
                  onClick={() =>
                    this.handleClick(
                      this.state.courses[index].courseCode,
                      this.state.courses[index].courseName
                    )
                  }
                >
                  <CardContent align="center">
                    <Typography variant="h4">
                      {this.state.courses[index].courseCode}
                    </Typography>
                    <Typography variant="h5">
                      {this.state.courses[index].courseName}
                    </Typography>
                    <hr />
                    <br />
                    {/* Proof of concept styling idea */}
                    <AvatarGroup max={6}>
                      {studentList[index].map((student) => (
                        <Avatar src={student.imageUrl} />
                      ))}
                    </AvatarGroup>
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

export default coursesView;

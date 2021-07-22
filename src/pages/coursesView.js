// Setup
import React, { Component } from "react";
import axios from "axios";

// Components
import NavBar from "../components/NavBar";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ButtonBase from "@material-ui/core/ButtonBase";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import CircularProgress from "@material-ui/core/CircularProgress";

export class coursesView extends Component {
  state = {
    courses: [{}, {}, {}, {}, {}],
    students0: [],
    students1: [],
    students2: [],
    students3: [],
    students4: [],
    loading: true,
  };

  componentDidMount() {
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentId");
    localStorage.removeItem("courseCode");
    localStorage.removeItem("studentImage");
    localStorage.removeItem("roomId");
    localStorage.removeItem("courseName");
    localStorage.removeItem("codeSpace");
    let indexArray = [];
    let currentIndex = 0;
    const FBIdToken = localStorage.FBIdToken;
    axios.defaults.headers.common["Authorization"] = FBIdToken;
    if (FBIdToken) {
    axios
      .get("/update")
      .then(() => {
        return axios.get("/user/courses").then((res) => {
          this.setState({
            courses: res.data,
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
            promises.push(axios.get(`/avatars/${courseCodes[i]}`));
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
        this.setState({loading: false})
      })
      .catch((err) => console.log(err));
    }
  }

  handleClick = (code, name, color) => {
    this.props.history.push({
      pathname: "/courseView",
      state: { courseInfo: [code, name, color] },
    });
  };

  render() {
    let avatarList = [
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
    let loading = this.state.loading;
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
                  borderWidth: "4px",
                  borderColor: `${this.state.courses[index].courseColor}`,
                  // borderColor: `${this.state.courses[index].undefined}`,
                }}
              >
                <ButtonBase
                  onClick={() =>
                    this.handleClick(
                      this.state.courses[index].courseCode,
                      this.state.courses[index].courseName,
                      this.state.courses[index].courseColor,
                      // this.state.courses[index].undefined,
                    )
                  }
                  style={{width: "100%", height: "100%"}}
                >
                  <CardContent align="center">
                    <Typography variant="h4" style={{color: `${this.state.courses[index].courseColor}`}}>
                      {this.state.courses[index].courseCode}
                    </Typography>
                    <Typography variant="h5">
                      {this.state.courses[index].courseName}
                    </Typography>
                    <hr />
                    <br />
                    {/* Proof of concept styling idea */}
                    {loading && (
                      <div>
                        <span>
                          <Typography variant="body1" align="center" style={{marginBottom: "5px"}}>Fetching course data...</Typography>
                          <CircularProgress />
                        </span>
                      </div>
                    )}
                    {!loading && (
                      <AvatarGroup max={6}>
                      {avatarList[index].map((url) => (
                        <Avatar src={url} style={{marginBottom: "5px"}}/>
                      ))}
                      </AvatarGroup>
                    )}
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

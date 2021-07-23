// Setup
import React, { Component } from "react";
import axios from "axios";

// Components
import NavBar from "../components/NavBar";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ButtonBase from "@material-ui/core/ButtonBase";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "@material-ui/icons/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "@material-ui/core/MenuItem";

// Body
export class coursesView extends Component {
  state = {
    courses: [{}, {}, {}, {}, {}],
    avatars0: [],
    avatars1: [],
    avatars2: [],
    avatars3: [],
    avatars4: [],
    loading: true,
    notesOpen: [
      false,
      false,
      false,
      false,
      false,
    ],
    overlayOn: true,
    assignmentsOpen: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  };

  componentDidMount() {
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
              avatars0: results[currentIndex].data,
            });
            currentIndex++;
          }
          if (indexArray.includes(1)) {
            this.setState({
              avatars1: results[currentIndex].data,
            });
            currentIndex++;
          }
          if (indexArray.includes(2)) {
            this.setState({
              avatars2: results[currentIndex].data,
            });
            currentIndex++;
          }
          if (indexArray.includes(3)) {
            this.setState({
              avatars3: results[currentIndex].data,
            });
            currentIndex++;
          }
          if (indexArray.includes(4)) {
            this.setState({
              avatars4: results[currentIndex].data,
            });
            currentIndex++;
          }
          this.setState({ loading: false });
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

  handleAssignmentsOpen = (index) => {
    let newAssignmentsOpen = this.state.assignmentsOpen.slice()
    newAssignmentsOpen[index] = true
    this.setState({ assignmentsOpen: newAssignmentsOpen });
  }
  handleAssignmentsClose = () => {
    this.setState({ assignmentsOpen: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]})
  }

  handleNotesOpen = (index) => {
    let newNotesOpen = this.state.notesOpen.slice()
    newNotesOpen[index] = true
    this.setState({ notesOpen: newNotesOpen });
  };

  handleNotesClose = () => {
    this.setState({ notesOpen: [
      false,
      false,
      false,
      false,
      false,
    ]})
  }

  render() {
    let avatarList = [
      this.state.avatars0,
      this.state.avatars1,
      this.state.avatars2,
      this.state.avatars3,
      this.state.avatars4,
    ];
    let indexArray = [];
    for (let j = 0; j < 5; j++) {
      if (this.state.courses[j].courseCode) {
        indexArray.push(j);
      }
    }
    let numCourses = indexArray.length;
    let loading = this.state.loading;
    let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return (
      <div align="center">
        <NavBar />
        <Typography variant="h2">Fall 2021</Typography>
        <br />
        <GridList cols={numCourses} spacing={20} cellHeight="auto">
          {indexArray.map((index) => (
            <GridListTile item sm>
              <Card
                raised
                style={{
                  borderStyle: "solid",
                  borderWidth: "4px",
                  borderColor: `${this.state.courses[index].courseColor}`,
                  // borderColor: `${this.state.courses[index].undefined}`,
                  height: "96%"
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
                  // disabled={!this.state.overlayOn}
                  style={{ width: "100%", height: "100%", position: "relative" }}
                  Zindex="0"
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
                          <Typography
                            variant="body1"
                            align="center"
                            style={{ marginBottom: "5px" }}
                          >
                            Fetching course data...
                          </Typography>
                          <CircularProgress />
                        </span>
                      </div>
                    )}
                    {!loading && (
                      <AvatarGroup max={10-numCourses}>
                        {avatarList[index].map((url) => (
                          <Avatar src={url} style={{ marginBottom: "5px" }} />
                        ))}
                      </AvatarGroup>
                    )}
                    <Tooltip title="Course notes" placement="right"
                      // onMouseEnter={() => {this.setState({overlayOn: false})}}
                      // onMouseOut={() => {this.setState({overlayOn: true})}}
                      >
                      <IconButton Zindex="10" style={{marginBottom: "-10px", position: "relative"}} 
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          this.handleNotesOpen(index);
                        }}>
                        <Menu />
                      </IconButton>
                    </Tooltip>
                    <Dialog
                        overlayStyle={{ backgroundColor: "transparent" }}
                        open={this.state.notesOpen[index]}
                      >
                        <DialogTitle
                          style={{ cursor: "move" }}
                          id="draggable-dialog-title"
                        >
                          Course Notes
                        </DialogTitle>
                        <DialogContent>
                        <TextField
                          id="courseNotes"
                          name="courseNotes"
                          autoComplete="off"
                          multiline
                          // onChange={this.handleChange}
                          rows={10}
                          variant="outlined"
                        />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleNotesClose} color="secondary">
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>
                  </CardContent>
                </ButtonBase>
              </Card>
            </GridListTile>
          ))}
        </GridList>
        <br />
        <GridList cols={7} spacing={20} cellHeight="auto">
          {weekdays.map((day) => (
            <GridListTile item sm>
              <Card 
                raised
                style={{
                  height: "96%"
                }}>
                <CardContent>
                  <Typography variant="h6" align="center">
                    {day}
                  </Typography>
                  <hr />
                  <Tooltip title="Add assignment" placement="right">
                  <IconButton onClick={() => this.handleAssignmentsOpen(day)} color="secondary" style={{marginBottom: "-15px"}}>
                    <AddIcon />
                  </IconButton>
                  </Tooltip>
                  <Dialog
                    overlayStyle={{ backgroundColor: "transparent" }}
                    open={this.state.assignmentsOpen[day]}
                  >
                    <DialogTitle
                      style={{ cursor: "move" }}
                      id="draggable-dialog-title"
                    >
                      Add Assignments
                    </DialogTitle>
                    <DialogContent>
                      <Typography>What course is the assignment for?</Typography>
                    <TextField
                      autofocus
                      margin="dense"
                      id="courseCode"
                      name="courseCode"
                      autoComplete="off"
                      select
                      label="Course Code"
                      // onChange={this.handleChange}
                      helperText="Please select a course code"
                    >
                      {this.state.courses.map((course) => (
                        <MenuItem key={course.courseCode} value={course.courseCode}>
                          <Typography
                            variant="h6"
                            style={{
                              color: course.courseColor,
                            }}
                          >
                            {course.courseCode}
                          </Typography>
                        </MenuItem>
                      ))}
                    </TextField>
                    <br />
                    <br />
                    <Typography>What is the name of the assignment?</Typography>
                    <TextField
                      autofocus
                      type="text"
                      margin="dense"
                      id="assignment"
                      name="addAssignment"
                      label="Assignment Name"
                      fullWidth
                      // onChange={this.handleChange}
                    />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleAssignmentsClose} color="secondary">
                        Cancel
                      </Button>
                      <Button onClick={this.handleAssignmentsClose} color="secondary">
                        Save Assignment
                      </Button>
                    </DialogActions>
                  </Dialog>
                </CardContent>
              </Card>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default coursesView;

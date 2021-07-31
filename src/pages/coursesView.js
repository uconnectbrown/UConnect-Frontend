// Setup
import React, { Component } from "react";
import axios from "axios";
import { auth } from "../firebase";

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
import MessageIcon from "@material-ui/icons/ChatBubbleOutline";
import StarIcon from "@material-ui/icons/StarOutline";
import Checkbox from "@material-ui/core/Checkbox";

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
    notesOpen: [false, false, false, false, false],
    overlayOn: true,
    assignmentsOpen: [false, false, false, false, false, false, false],
    assignCourse: "",
    assignmentName: "",
    dailyAssignments: [[], [], [], [], [], [], []],
  };

  componentDidMount() {
    let indexArray = [];
    let currentIndex = 0;
    axios
      .get(`/update/${auth.currentUser.email}`)
      .then(() => {
        return axios.get(`/courses/${auth.currentUser.email}`).then((res) => {
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
        let newAssignments = [...this.state.dailyAssignments];
        for (let i = 0; i < 7; i++) {
          this.state.courses.map((course) => {
            {
              course.assignments &&
                course.assignments.map((assignment) => {
                  if (assignment["day"] === i) {
                    // {console.log(course['courseColor'], assignment['name'])}
                    newAssignments[i].push({
                      color: course["courseColor"],
                      name: assignment["name"],
                    });
                    // {console.log(newAssignments)}
                  }
                });
            }
          });
        }
        this.setState({ dailyAssignments: newAssignments });
        this.setState({ loading: false });
      })
      .catch((err) => console.log(err));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = (code, name, color, courseCodes) => {
    this.props.history.push({
      pathname: "/courseView",
      state: { courseInfo: [code, name, color, courseCodes] },
    });
  };

  handleAssignmentsOpen = (index) => {
    let newAssignmentsOpen = this.state.assignmentsOpen.slice();
    newAssignmentsOpen[index] = true;
    this.setState({ assignmentsOpen: newAssignmentsOpen });
  };
  handleAssignmentsClose = () => {
    this.setState({
      assignmentsOpen: [false, false, false, false, false, false, false],
    });
  };
  handleSubmitAssignment = (index) => {
    let courseList = [];
    let courseIndex = this.state.courses
      .map((course) => course.courseCode)
      .indexOf(this.state.assignCourse);
    let newAssignments = [...this.state.courses[courseIndex].assignments];
    console.log(newAssignments);
    newAssignments.push({ day: index, name: this.state.assignmentName });
    console.log(newAssignments);
    let newCourse = {
      courseCode: this.state.courses[courseIndex].courseCode,
      courseName: this.state.courses[courseIndex].courseName,
      courseColor: this.state.courses[courseIndex].courseColor,
      assignments: newAssignments,
    };
    for (let j = 0; j < 5; j++) {
      if (j !== courseIndex) {
        courseList.push(this.state.courses[j]);
      } else courseList.push(newCourse);
    }
    let newCourses = { courses: courseList };
    console.log(newCourses);
    axios.post("/edit", newCourses).then(() => {
      this.setState({ courses: courseList });
      return axios.get("/update");
    });
    this.setState({
      assignmentsOpen: [false, false, false, false, false, false, false],
      assignCourse: "",
      assignmentName: "",
    });
  };

  handleNotesOpen = (index) => {
    let newNotesOpen = this.state.notesOpen.slice();
    newNotesOpen[index] = true;
    this.setState({ notesOpen: newNotesOpen });
  };

  handleNotesClose = () => {
    this.setState({ notesOpen: [false, false, false, false, false] });
  };

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
    let indices = [0, 1, 2, 3, 4, 5, 6];
    let weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let courseCodes = this.state.courses.map((course) => course.courseCode);
    let dailyAssignments = this.state.dailyAssignments;
    console.log(dailyAssignments);
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
                  height: "96%",
                }}
              >
                <ButtonBase
                  onClick={() =>
                    this.handleClick(
                      this.state.courses[index].courseCode,
                      this.state.courses[index].courseName,
                      this.state.courses[index].courseColor,
                      courseCodes
                      // this.state.courses[index].undefined,
                    )
                  }
                  // disabled={!this.state.overlayOn}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                  Zindex="0"
                >
                  <CardContent align="center">
                    <Typography
                      variant="h4"
                      style={{
                        color: `${this.state.courses[index].courseColor}`,
                      }}
                    >
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
                      <AvatarGroup max={10 - numCourses}>
                        {avatarList[index].map((url) => (
                          <Avatar src={url} style={{ marginBottom: "5px" }} />
                        ))}
                      </AvatarGroup>
                    )}
                    <Tooltip
                      title="Course feed"
                      placement="left"
                      // onMouseEnter={() => {this.setState({overlayOn: false})}}
                      // onMouseOut={() => {this.setState({overlayOn: true})}}
                    >
                      <IconButton
                        Zindex="10"
                        style={{ marginBottom: "-10px", position: "relative" }}
                      >
                        <MessageIcon />
                      </IconButton>
                    </Tooltip>
                    {/* <Tooltip
                      title="Course assignments"
                      placement="bottom"
                      // onMouseEnter={() => {this.setState({overlayOn: false})}}
                      // onMouseOut={() => {this.setState({overlayOn: true})}}
                    >
                      <IconButton
                        Zindex="10"
                        style={{ marginBottom: "-10px", position: "relative" }}
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          this.handleNotesOpen(index);
                        }}
                      >
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
                        Course Assignments
                      </DialogTitle>
                      <DialogContent>
                        <GridList cols={7} spacing={5} cellHeight="auto">
                          <GridListTile item sm>
                            <span>
                              <Typography variant="h5" align="center">
                                {weekdays[0]}
                              </Typography>
                              {this.state.courses[index].assignments.map(
                                (assignment) => {
                                  // return <Typography>{weekdays[assignment['day']]}: {assignment['name']}</Typography>
                                  if (assignment["day"] === 0) {
                                    return (
                                      <span>
                                        <Typography variant="h6">
                                          <Checkbox
                                            style={{
                                              color: `${this.state.courses[index].courseColor}`,
                                            }}
                                            inputProps={{
                                              "aria-label":
                                                "uncontrolled-checkbox",
                                            }}
                                          />
                                          {assignment["name"]}
                                        </Typography>
                                      </span>
                                    );
                                  }
                                }
                              )}
                            </span>
                          </GridListTile>
                          <GridListTile item sm>
                            <span>
                              <Typography variant="h5" align="center">
                                {weekdays[1]}
                              </Typography>
                              {this.state.courses[index].assignments.map(
                                (assignment) => {
                                  // return <Typography>{weekdays[assignment['day']]}: {assignment['name']}</Typography>
                                  if (assignment["day"] === 1) {
                                    return (
                                      <span>
                                        <Typography variant="h6">
                                          <Checkbox
                                            style={{
                                              color: `${this.state.courses[index].courseColor}`,
                                            }}
                                            inputProps={{
                                              "aria-label":
                                                "uncontrolled-checkbox",
                                            }}
                                          />
                                          {assignment["name"]}
                                        </Typography>
                                      </span>
                                    );
                                  }
                                }
                              )}
                            </span>
                          </GridListTile>
                          <GridListTile item sm>
                            <span>
                              <Typography variant="h5" align="center">
                                {weekdays[2]}
                              </Typography>
                              {this.state.courses[index].assignments.map(
                                (assignment) => {
                                  // return <Typography>{weekdays[assignment['day']]}: {assignment['name']}</Typography>
                                  if (assignment["day"] === 2) {
                                    return (
                                      <span>
                                        <Typography variant="h6">
                                          <Checkbox
                                            style={{
                                              color: `${this.state.courses[index].courseColor}`,
                                            }}
                                            inputProps={{
                                              "aria-label":
                                                "uncontrolled-checkbox",
                                            }}
                                          />
                                          {assignment["name"]}
                                        </Typography>
                                      </span>
                                    );
                                  }
                                }
                              )}
                            </span>
                          </GridListTile>
                          <GridListTile item sm>
                            <span>
                              <Typography variant="h5" align="center">
                                {weekdays[3]}
                              </Typography>
                              {this.state.courses[index].assignments.map(
                                (assignment) => {
                                  // return <Typography>{weekdays[assignment['day']]}: {assignment['name']}</Typography>
                                  if (assignment["day"] === 3) {
                                    return (
                                      <span>
                                        <Typography variant="h6">
                                          <Checkbox
                                            style={{
                                              color: `${this.state.courses[index].courseColor}`,
                                            }}
                                            inputProps={{
                                              "aria-label":
                                                "uncontrolled-checkbox",
                                            }}
                                          />
                                          {assignment["name"]}
                                        </Typography>
                                      </span>
                                    );
                                  }
                                }
                              )}
                            </span>
                          </GridListTile>
                          <GridListTile item sm>
                            <span>
                              <Typography variant="h5" align="center">
                                {weekdays[4]}
                              </Typography>
                              {this.state.courses[index].assignments.map(
                                (assignment) => {
                                  // return <Typography>{weekdays[assignment['day']]}: {assignment['name']}</Typography>
                                  if (assignment["day"] === 4) {
                                    return (
                                      <span>
                                        <Typography variant="h6">
                                          <Checkbox
                                            style={{
                                              color: `${this.state.courses[index].courseColor}`,
                                            }}
                                            inputProps={{
                                              "aria-label":
                                                "uncontrolled-checkbox",
                                            }}
                                          />
                                          {assignment["name"]}
                                        </Typography>
                                      </span>
                                    );
                                  }
                                }
                              )}
                            </span>
                          </GridListTile>
                          <GridListTile item sm>
                            <span>
                              <Typography variant="h5" align="center">
                                {weekdays[5]}
                              </Typography>
                              {this.state.courses[index].assignments.map(
                                (assignment) => {
                                  // return <Typography>{weekdays[assignment['day']]}: {assignment['name']}</Typography>
                                  if (assignment["day"] === 5) {
                                    return (
                                      <span>
                                        <Typography variant="h6">
                                          <Checkbox
                                            style={{
                                              color: `${this.state.courses[index].courseColor}`,
                                            }}
                                            inputProps={{
                                              "aria-label":
                                                "uncontrolled-checkbox",
                                            }}
                                          />
                                          {assignment["name"]}
                                        </Typography>
                                      </span>
                                    );
                                  }
                                }
                              )}
                            </span>
                          </GridListTile>
                          <GridListTile item sm>
                            <span>
                              <Typography variant="h5" align="center">
                                {weekdays[6]}
                              </Typography>
                              {this.state.courses[index].assignments.map(
                                (assignment) => {
                                  // return <Typography>{weekdays[assignment['day']]}: {assignment['name']}</Typography>
                                  if (assignment["day"] === 6) {
                                    return (
                                      <span>
                                        <Typography variant="h6">
                                          <Checkbox
                                            style={{
                                              color: `${this.state.courses[index].courseColor}`,
                                            }}
                                            inputProps={{
                                              "aria-label":
                                                "uncontrolled-checkbox",
                                            }}
                                          />
                                          {assignment["name"]}
                                        </Typography>
                                      </span>
                                    );
                                  }
                                }
                              )}
                            </span>
                          </GridListTile>
                        </GridList>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={this.handleNotesClose}
                          color="secondary"
                        >
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog> */}
                    <Tooltip
                      title="Saved profiles"
                      placement="right"
                      // onMouseEnter={() => {this.setState({overlayOn: false})}}
                      // onMouseOut={() => {this.setState({overlayOn: true})}}
                    >
                      <IconButton
                        Zindex="10"
                        style={{ marginBottom: "-10px", position: "relative" }}
                      >
                        <StarIcon />
                      </IconButton>
                    </Tooltip>
                  </CardContent>
                </ButtonBase>
              </Card>
            </GridListTile>
          ))}
        </GridList>
        <br />

        {/* <GridList cols={7} spacing={20} cellHeight="auto">
          {indices.map((index) => (
            <GridListTile item sm>
              <Card
                raised
                style={{
                  height: "96%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" align="center">
                    {weekdays[index]}
                  </Typography>
                  <hr />
                  {loading && (
                    <div>
                      <CircularProgress size={20} />
                      <br />
                    </div>
                  )}
                  {!loading && (
                    dailyAssignments[index].map((assignment) => {
                      {console.log(assignment['name'])}
                      <Typography variant="h6" align="center">hi</Typography>
                    })
                  )}

                  {this.state.courses.map((course) => (
                    course.assignments[index].map((assignment) => {
                      return <Typography>{assignment}</Typography>
                    })
                  ))}
                  <Tooltip title="Add assignment" placement="right">
                    <IconButton
                      onClick={() => this.handleAssignmentsOpen(index)}
                      color="secondary"
                      style={{ marginBottom: "-15px" }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  <Dialog
                    overlayStyle={{ backgroundColor: "transparent" }}
                    open={this.state.assignmentsOpen[index]}
                  >
                    <DialogTitle
                      style={{ cursor: "move" }}
                      id="draggable-dialog-title"
                    >
                      Add Assignments
                    </DialogTitle>
                    <DialogContent>
                      <Typography>
                        What course is the assignment for?
                      </Typography>
                      <TextField
                        autofocus
                        margin="dense"
                        id="assignCourse"
                        name="assignCourse"
                        autoComplete="off"
                        select
                        label="Course Code"
                        onChange={this.handleChange}
                        helperText="Please select a course code"
                      >
                        {indexArray.map((index) => (
                          <MenuItem
                            key={this.state.courses[index].courseCode}
                            value={this.state.courses[index].courseCode}
                          >
                            <Typography
                              variant="h6"
                              style={{
                                color: this.state.courses[index].courseColor,
                              }}
                            >
                              {this.state.courses[index].courseCode}
                            </Typography>
                          </MenuItem>
                        ))}
                      </TextField>
                      <br />
                      <br />
                      <Typography>
                        What is the name of the assignment?
                      </Typography>
                      <TextField
                        autofocus
                        type="text"
                        margin="dense"
                        id="assignmentName"
                        name="assignmentName"
                        label="Assignment Name"
                        fullWidth
                        onChange={this.handleChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={this.handleAssignmentsClose}
                        color="secondary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => this.handleSubmitAssignment(index)}
                        color="secondary"
                      >
                        Save Assignment
                      </Button>
                    </DialogActions>
                  </Dialog>
                </CardContent>
              </Card>
            </GridListTile>
          ))}
        </GridList> */}
      </div>
    );
  }
}

export default coursesView;

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
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import RemoveIcon from "@material-ui/icons/Remove";

class profileView extends Component {
  state = {
    addCourseCode: "",
    addCourseName: "",
    affinitySports: [],
    bio: "",
    class: "",
    courses: [{}, {}, {}, {}, {}],
    createdAt: "",
    delete: false,
    email: "",
    favorites: {},
    firstName: "",
    greekLife: "",
    groups: [],
    imageUrl: "",
    interests: [],
    lastName: "",
    majors: [],
    addOpen: false,
    removeOpen: false,
    deleteCourse: false,
    preferredPronouns: "",
    userId: "",
    varsitySports: [],
  };

  componentDidMount() {
    const emailId = localStorage.emailId;
    axios
      .get(`/user/${emailId}`)
      .then((res) => {
        this.setState({
          affinitySports: res.data.user.affinitySports,
          bio: res.data.user.bio,
          class: res.data.user.class,
          courses: res.data.user.courses,
          createdAt: res.data.user.createdAt,
          email: res.data.user.email,
          favorites: res.data.user.favorites,
          firstName: res.data.user.firstName,
          greekLife: res.data.user.greekLife,
          groups: res.data.user.groups,
          imageUrl: res.data.user.imageUrl,
          interests: res.data.user.interests,
          lastName: res.data.user.lastName,
          majors: res.data.user.majors,
          preferredPronouns: res.data.user.preferredPronouns,
          userId: res.data.user.userId,
          varsitySports: res.data.user.varsitySports,
        });
        return axios.get("/update");
      })
      .catch((err) => console.log(err));
  }

  logoutUser = () => {
    localStorage.removeItem("emailId");
    localStorage.removeItem("FBIdToken");
    localStorage.removeItem("courseCode");
    delete axios.defaults.headers.common["Authorization"];
  };

  // attempting to implement edit user image function
  // think i'm using the backend post request wrong
  handleImageChange = (event) => {
    event.preventDefault();
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    axios
      .post("/image", formData)
      .then((data) => {
        this.setState({ imageUrl: data.data.imageUrl });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleAddOpen = () => {
    this.setState({ addOpen: true });
  };

  handleRemoveOpen = (deleteIndex) => {
    this.setState({ removeOpen: true });
    let courseList = [];
    for (let i = 0; i < 5; i++) {
      if (i === deleteIndex) {
        courseList.push({ courseCode: "", courseName: "" });
      } else courseList.push(this.state.courses[i]);
    }
    let newCourses = { courses: courseList };
    axios.post("/edit", newCourses).then(() => {
      this.setState({ courses: courseList });
      return axios.get("/update");
    });
    this.setState({ removeOpen: false });
  };

  handleAddClose = () => {
    this.setState({ addOpen: false });
  };
  handleRemoveClose = () => {
    this.setState({ removeOpen: false });
  };

  handleSubmitAdd = () => {
    let firstIndex;
    let courseList = [];
    for (let i = 0; i < 5; i++) {
      if (!this.state.courses[i].courseCode) {
        firstIndex = i;
        break;
      }
    }
    let newCourse = {
      courseCode: this.state.addCourseCode,
      courseName: this.state.addCourseName,
    };
    for (let j = 0; j < 5; j++) {
      if (j !== firstIndex) {
        courseList.push(this.state.courses[j]);
      } else courseList.push(newCourse);
    }
    let newCourses = { courses: courseList };
    axios.post("/edit", newCourses).then(() => {
      this.setState({ courses: courseList });
      return axios.get("/update");
    });
    this.setState({ addOpen: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleDelete = () => {
    this.setState({ delete: !this.state.delete });
  };

  render() {
    let courseCode0 = this.state.courses[0].courseCode;
    let courseCode1 = this.state.courses[1].courseCode;
    let courseCode2 = this.state.courses[2].courseCode;
    let courseCode3 = this.state.courses[3].courseCode;
    let courseCode4 = this.state.courses[4].courseCode;
    let numCourses = [
      courseCode0,
      courseCode1,
      courseCode2,
      courseCode3,
      courseCode4,
    ].filter(Boolean).length;
    let indexArray = [];
    for (let j = 0; j < 5; j++) {
      if (this.state.courses[j].courseCode) {
        indexArray.push(j);
      }
    }
    return (
      <div>
        <NavBar />
        <Card raised>
          <CardContent align="center">
            <img src={this.state.imageUrl} width={450} />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={this.handleImageChange}
            />
            <Tooltip title="Edit profile picture" placement="top">
              <IconButton onClick={this.handleEditPicture} className="button">
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            {/* <Button onClick={this.handleEditPicture}>
              <EditIcon color="primary" />
            </Button> */}
            <br />
            <br />
            <Typography variant="h3">
              {this.state.firstName} {this.state.lastName}
            </Typography>
            <Typography variant="h5">
              {this.state.preferredPronouns &&
                `(${this.state.preferredPronouns})`}
            </Typography>
            <br />
            <Card
              variant="outlined"
              style={{
                maxWidth: 450,
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "red",
              }}
            >
              <CardContent>
                <Typography variant="body1">
                  Class of {this.state.class}
                </Typography>
                <Typography variant="body1">
                  Concentration(s): {this.state.majors[0]}
                  {this.state.majors[1] && `, ${this.state.majors[1]}`}
                  {this.state.majors[2] && `, ${this.state.majors[2]}`}
                </Typography>
                {this.state.varsitySports[0] && (
                  <Typography variant="body1">
                    Sport(s): {this.state.varsitySports[0]}
                    {this.state.varsitySports[1] &&
                      `, ${this.state.varsitySports[1]}`}
                  </Typography>
                )}
                {this.state.greekLife && (
                  <Typography variant="body1">
                    Greek Organization: {this.state.greekLife}
                  </Typography>
                )}
                <br />
                <Typography variant="body1">{this.state.bio}</Typography>
              </CardContent>
            </Card>
            <br />
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EditIcon />}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>
        <br />
        <Grid container spacing={2}>
          <Grid item sm>
            <Card raised>
              <CardContent align="center">
                <Typography variant="h3">Groups</Typography>
                <hr />
                <br />
                {this.state.groups.map((group) => (
                  <Typography variant="body1">{group}</Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm>
            <Card raised>
              <CardContent align="center">
                <Typography variant="h3">Interests</Typography>
                <hr />
                <br />

                <Typography variant="h5">General</Typography>
                <Grid container>
                  <Grid item sm>
                    <Typography variant="body1">
                      • {this.state.interests[0]}
                    </Typography>
                    <Typography variant="body1">
                      • {this.state.interests[2]}
                    </Typography>
                    {this.state.interests[4] && (
                      <Typography variant="body1">
                        • {this.state.interests[4]}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item sm>
                    <Typography variant="body1">
                      • {this.state.interests[1]}
                    </Typography>
                    {this.state.interests[3] && (
                      <Typography variant="body1">
                        • {this.state.interests[3]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                <br />

                {(this.state.affinitySports[0] ||
                  this.state.affinitySports[1] ||
                  this.state.affinitySports[2]) && (
                  <Typography variant="h5">Athletic</Typography>
                )}
                <Grid container>
                  <Grid item sm>
                    {this.state.affinitySports[0] && (
                      <Typography variant="body1">
                        • {this.state.affinitySports[0]}
                      </Typography>
                    )}
                    {this.state.affinitySports[2] && (
                      <Typography variant="body1">
                        • {this.state.affinitySports[2]}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item sm>
                    {this.state.affinitySports[1] && (
                      <Typography variant="body1">
                        • {this.state.affinitySports[1]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm>
            <Card raised>
              <CardContent align="center">
                <Typography variant="h3">Favorites</Typography>
                <hr />
                <br />
                <Typography variant="body1">
                  Book: {this.state.favorites.book}
                </Typography>
                <Typography variant="body1">
                  Movie: {this.state.favorites.movie}
                </Typography>
                <Typography variant="body1">
                  Show: {this.state.favorites.tvShow}
                </Typography>
                <Typography variant="body1">
                  Artist: {this.state.favorites.artist}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <br />
        <Card raised>
          <CardContent align="center">
            <Typography variant="h3">Courses</Typography>
            <hr />
            <br />
            <Grid container spacing={2}>
              {indexArray.map((index) => (
                <Grid item sm>
                  <Card
                    style={{
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "red",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5">
                        {this.state.courses[index].courseCode}
                      </Typography>
                      <Typography variant="body1">
                        {this.state.courses[index].courseName}
                      </Typography>
                    </CardContent>
                    {this.state.delete && (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<RemoveIcon />}
                        onClick={() => this.handleRemoveOpen(index)}
                      >
                        {index + 1}
                      </Button>
                    )}
                  </Card>
                </Grid>
              ))}
              <Grid item sm>
                {numCourses < 5 && (
                  <div>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<AddIcon />}
                      onClick={this.handleAddOpen}
                    >
                      Add Course
                    </Button>
                    <Dialog
                      overlayStyle={{ backgroundColor: "transparent" }}
                      open={this.state.addOpen}
                      onClose={this.handleAddClose}
                    >
                      <DialogTitle
                        style={{ cursor: "move" }}
                        id="draggable-dialog-title"
                      >
                        Add Course
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Please enter the course code and course name below:
                        </DialogContentText>
                        <TextField
                          autofocus
                          margin="dense"
                          id="courseCode"
                          name="addCourseCode"
                          label="Course Code (e.g. ECON 0110)"
                          fullWidth
                          type="text"
                          onChange={this.handleChange}
                        />
                        <TextField
                          autofocus
                          type="text"
                          margin="dense"
                          id="courseName"
                          name="addCourseName"
                          label="Course Name (e.g. Principles of Economics)"
                          fullWidth
                          onChange={this.handleChange}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleSubmitAdd} color="primary">
                          Add
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                )}
                <br />

                {numCourses > 0 && (
                  <div>
                    {!this.state.delete && (
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={this.toggleDelete}
                      >
                        Remove Course
                      </Button>
                    )}
                    {this.state.delete && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.toggleDelete}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <br />
        <Grid contained align="center">
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
            onClick={this.logoutUser}
          >
            <Typography variant="body1">Logout</Typography>
          </Button>
        </Grid>
        <br />
      </div>
    );
  }
}

export default profileView;

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
import PhotoIcon from "@material-ui/icons/PhotoCamera";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import RemoveIcon from "@material-ui/icons/RemoveCircle";

class profileView extends Component {
  state = {
    addCourseCode: "",
    addCourseName: "",
    affinitySports: [],
    affinitySportOne: "",
    affinitySportTwo: "",
    affinitySportThree: "",
    bio: "",
    class: "",
    courses: [{}, {}, {}, {}, {}],
    createdAt: "",
    delete: false,
    email: "",
    favorites: {},
    favoriteBook: "",
    favoriteMovie: "",
    favoriteShow: "",
    favoriteArtist: "",
    firstName: "",
    greekLife: "",
    groups: [],
    groupOne: "",
    groupTwo: "",
    groupThree: "",
    imageUrl: "",
    interests: [],
    interestOne: "",
    interestTwo: "",
    interestThree: "",
    interestFour: "",
    interestFive: "",
    lastName: "",
    majors: [],
    majorOne: "",
    majorTwo: "",
    majorThree: "",
    addOpen: false,
    removeOpen: false,
    deleteCourse: false,
    preferredPronouns: "",
    userId: "",
    varsitySports: [],
    varsitySportOne: "",
    varsitySportTwo: "",
    groupOpen: false,
    basicOpen: false,
    interestsOpen: false,
    favoritesOpen: false,
  };

  componentDidMount() {
    const emailId = localStorage.emailId;
    axios
      .get(`/user/${emailId}`)
      .then((res) => {
        this.setState({
          affinitySportOne: res.data.user.affinitySports[0],
          affinitySportTwo: res.data.user.affinitySports[1],
          affinitySportThree: res.data.user.affinitySports[2],
          bio: res.data.user.bio,
          class: res.data.user.class,
          courses: res.data.user.courses,
          createdAt: res.data.user.createdAt,
          email: res.data.user.email,
          favoriteBook: res.data.user.favorites.book,
          favoriteMovie: res.data.user.favorites.movie,
          favoriteShow: res.data.user.favorites.tvShow,
          favoriteArtist: res.data.user.favorites.artist,
          firstName: res.data.user.firstName,
          greekLife: res.data.user.greekLife,
          groupOne: res.data.user.groups[0],
          groupTwo: res.data.user.groups[1],
          groupThree: res.data.user.groups[2],
          imageUrl: res.data.user.imageUrl,
          interestOne: res.data.user.interests[0],
          interestTwo: res.data.user.interests[1],
          interestThree: res.data.user.interests[2],
          interestFour: res.data.user.interests[3],
          interestFive: res.data.user.interests[4],
          lastName: res.data.user.lastName,
          majorOne: res.data.user.majors[0],
          majorTwo: res.data.user.majors[1],
          majorThree: res.data.user.majors[2],
          preferredPronouns: res.data.user.preferredPronouns,
          userId: res.data.user.userId,
          varsitySportOne: res.data.user.varsitySports[0],
          varsitySportTwo: res.data.user.varsitySports[1],
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
  handleBasicOpen = () => {
    this.setState({ basicOpen: true });
  };
  handleGroupsOpen = () => {
    this.setState({ groupOpen: true });
  };
  handleInterestsOpen = () => {
    this.setState({ interestsOpen: true });
  };
  handleFavoritesOpen = () => {
    this.setState({ favoritesOpen: true });
  };

  handleRemoveOpen = (deleteIndex) => {
    this.setState({ removeOpen: true });
    let courseList = [];
    let deleteCourse;
    for (let i = 0; i < 5; i++) {
      if (i === deleteIndex) {
        courseList.push({ courseCode: "", courseName: "" });
        deleteCourse = this.state.courses[i].courseCode.replace(/\s/g, "");
      } else courseList.push(this.state.courses[i]);
    }
    let newCourses = { courses: courseList };
    axios.post("/edit", newCourses).then(() => {
      this.setState({ courses: courseList });
      return axios.get(`delete/${deleteCourse}`);
    });
    this.setState({ removeOpen: false });
    this.setState({ delete: false });
  };

  handleAddClose = () => {
    this.setState({ addOpen: false });
  };
  handleRemoveClose = () => {
    this.setState({ removeOpen: false });
  };
  handleGroupsClose = () => {
    this.setState({ groupOpen: false });
  };
  handleInterestsClose = () => {
    this.setState({ interestsOpen: false });
  };
  handleFavoritesClose = () => {
    this.setState({ favoritesOpen: false });
  };
  handleBasicClose = () => {
    this.setState({ basicOpen: false });
  };

  handleSubmitCourses = () => {
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
  handleSubmitGroups = () => {
    let groupList = [
      this.state.groupOne,
      this.state.groupTwo,
      this.state.groupThree,
    ];
    let newGroups = {
      groups: groupList,
    };
    axios.post("/edit", newGroups).then(() => {
      this.setState({
        groupOne: groupList[0],
        groupTwo: groupList[1],
        groupThree: groupList[2],
      });
    });
    this.setState({ groupOpen: false });
  };
  handleSubmitInterests = () => {
    let interestsList = [
      this.state.interestOne,
      this.state.interestTwo,
      this.state.interestThree,
      this.state.interestFour,
      this.state.interestFive,
    ];
    let affinitySportsList = [
      this.state.affinitySportOne,
      this.state.affinitySportTwo,
      this.state.affinitySportThree,
    ];
    let newInterests = {
      interests: interestsList,
      affinitySports: affinitySportsList,
    };
    axios.post("/edit", newInterests).then(() => {
      this.setState({
        interestOne: interestsList[0],
        interestTwo: interestsList[1],
        interestThree: interestsList[2],
        interestFour: interestsList[3],
        interestFive: interestsList[4],
        affinitySportOne: affinitySportsList[0],
        affinitySportTwo: affinitySportsList[1],
        affinitySportThree: affinitySportsList[2],
      });
    });
    this.setState({ interestsOpen: false });
  };
  handleSubmitFavorites = () => {
    let favorites = {
      book: this.state.favoriteBook,
      movie: this.state.favoriteMovie,
      tvShow: this.state.favoriteShow,
      artist: this.state.favoriteArtist
    };
    let newFavorites = {
      favorites: favorites,
    };
    axios.post("/edit", newFavorites).then(() => {
      this.setState({
        favoriteBook: favorites['book'],
        favoriteMovie: favorites['movie'],
        favoriteShow: favorites['tvShow'],
        favoriteArtist: favorites['artist'],
      });
    });
    this.setState({ favoritesOpen: false });
  };
  handleSubmitBasic = () => {
    let newBasicInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      preferredPronouns: this.state.preferredPronouns,
      class: this.state.class,
      majors: [this.state.majorOne, this.state.majorTwo, this.state.majorThree],
      varsitySports: [this.state.varsitySportOne, this.state.varsitySportTwo],
      greekLife: this.state.greekLife,
      bio: this.state.bio,
    };
    axios.post("/edit", newBasicInfo).then(() => {
      this.setState({
        firstName: newBasicInfo['firstName'],
        lastName: newBasicInfo['lastName'],
        preferredPronouns: newBasicInfo['preferredPronouns'],
        class: newBasicInfo['class'],
        majors: newBasicInfo['majors'],
        varsitySports: newBasicInfo['varsitySports'],
        greekLife: newBasicInfo['greekLife'],
        bio: newBasicInfo['bio'],
      });
    });
    this.setState({ basicOpen: false });
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
            <br />
            <Tooltip title="Edit profile picture" placement="top">
              <IconButton onClick={this.handleEditPicture} className="button">
                <PhotoIcon color="primary" />
              </IconButton>
            </Tooltip>
            {/* <Button onClick={this.handleEditPicture}>
              <EditIcon color="primary" />
            </Button> */}
            <br />

            <br />
            <Typography variant="h3" align="center">
              {this.state.firstName} {this.state.lastName}{" "}
              <Tooltip title="Edit basic info" placement="top">
                    <IconButton
                      onClick={this.handleBasicOpen}
                      className="button"
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Dialog
                    overlayStyle={{ backgroundColor: "transparent" }}
                    open={this.state.basicOpen}
                    onClose={this.handleBasicClose}
                  >
                    <DialogTitle
                      style={{ cursor: "move" }}
                      id="draggable-dialog-title"
                    >
                      Edit Basic Info
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        autofocus
                        margin="dense"
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        defaultValue={this.state.firstName}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        defaultValue={this.state.lastName}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="preferredPronouns"
                        name="preferredPronouns"
                        label="Preferred Pronouns"
                        defaultValue={this.state.preferredPronouns}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="class"
                        name="class"
                        label="Graduating Class"
                        defaultValue={this.state.class}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="majorOne"
                        name="majorOne"
                        label="First Major"
                        defaultValue={this.state.majorOne}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="majorTwo"
                        name="majorTwo"
                        label="Second Major"
                        defaultValue={this.state.majorTwo}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="majorThree"
                        name="majorThree"
                        label="Third Major"
                        defaultValue={this.state.majorThree}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="varsitySportOne"
                        name="varsitySportOne"
                        label="First Varsity Sport"
                        defaultValue={this.state.varsitySportOne}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="varsitySportTwo"
                        name="varsitySportTwo"
                        label="Second Varsity Sport"
                        defaultValue={this.state.varsitySportTwo}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="greekLife"
                        name="greekLife"
                        label="Greek Organization"
                        defaultValue={this.state.greekLife}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="bio"
                        name="bio"
                        label="Bio"
                        defaultValue={this.state.bio}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={this.handleSubmitBasic}
                        color="secondary"
                      >
                        Edit
                      </Button>
                    </DialogActions>
                  </Dialog>
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
          </CardContent>
        </Card>
        <br />
        <Grid container spacing={2}>
          <Grid item sm>
            <Card raised>
              <CardContent align="center">
                <Typography variant="h3">
                  Groups{" "}
                  <Tooltip title="Edit groups" placement="top">
                    <IconButton
                      onClick={this.handleGroupsOpen}
                      className="button"
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Dialog
                    overlayStyle={{ backgroundColor: "transparent" }}
                    open={this.state.groupOpen}
                    onClose={this.handleGroupsClose}
                  >
                    <DialogTitle
                      style={{ cursor: "move" }}
                      id="draggable-dialog-title"
                    >
                      Edit Groups
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        autofocus
                        margin="dense"
                        id="groupOne"
                        name="groupOne"
                        label="Group 1"
                        defaultValue={this.state.groupOne}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="groupTwo"
                        name="groupTwo"
                        label="Group 2"
                        defaultValue={this.state.groupTwo}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="groupThree"
                        name="groupThree"
                        label="Group 3"
                        defaultValue={this.state.groupThree}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={this.handleSubmitGroups}
                        color="secondary"
                      >
                        Edit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Typography>
                <hr />
                <br />
                {[
                  this.state.groupOne,
                  this.state.groupTwo,
                  this.state.groupThree,
                ].map((group) => (
                  <Typography variant="body1">{group}</Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm>
            <Card raised>
              <CardContent align="center">
                <Typography variant="h3">
                  Interests{" "}
                  <Tooltip title="Edit interests" placement="top">
                    <IconButton
                      onClick={this.handleInterestsOpen}
                      className="button"
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Dialog
                    overlayStyle={{ backgroundColor: "transparent" }}
                    open={this.state.interestsOpen}
                    onClose={this.handleInterestsClose}
                  >
                    <DialogTitle
                      style={{ cursor: "move" }}
                      id="draggable-dialog-title"
                    >
                      Edit Interests
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        autofocus
                        margin="dense"
                        id="interestOne"
                        name="interestOne"
                        label="First General Interest"
                        defaultValue={this.state.interestOne}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="interestTwo"
                        name="interestTwo"
                        label="Second General Interest"
                        defaultValue={this.state.interestTwo}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="interestThree"
                        name="interestThree"
                        label="Third General Interest"
                        defaultValue={this.state.interestThree}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="interestFour"
                        name="interestFour"
                        label="Fourth General Interest"
                        defaultValue={this.state.interestFour}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="interestFive"
                        name="interestFive"
                        label="Fifth General Interest"
                        defaultValue={this.state.interestFive}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="affinitySportOne"
                        name="affinitySportOne"
                        label="First Athletic Interest"
                        defaultValue={this.state.affinitySportOne}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="affinitySportTwo"
                        name="affinitySportTwo"
                        label="Second Athletic Interest"
                        defaultValue={this.state.affinitySportTwo}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="affinitySportThree"
                        name="affinitySportThree"
                        label="Third Athletic Interest"
                        defaultValue={this.state.affinitySportThree}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={this.handleSubmitInterests}
                        color="secondary"
                      >
                        Edit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Typography>
                <hr />
                <br />

                <Typography variant="h5">General</Typography>
                <Grid container>
                  <Grid item sm>
                    <Typography variant="body1">
                      • {this.state.interestOne}
                    </Typography>
                    <Typography variant="body1">
                      • {this.state.interestThree}
                    </Typography>
                    {this.state.interestFive && (
                      <Typography variant="body1">
                        • {this.state.interestFive}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item sm>
                    <Typography variant="body1">
                      • {this.state.interestTwo}
                    </Typography>
                    {this.state.interestFour && (
                      <Typography variant="body1">
                        • {this.state.interestFour}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                <br />

                {(this.state.affinitySportOne ||
                  this.state.affinitySportTwo ||
                  this.state.affinitySportThree) && (
                  <Typography variant="h5">Athletic</Typography>
                )}
                <Grid container>
                  <Grid item sm>
                    {this.state.affinitySportOne && (
                      <Typography variant="body1">
                        • {this.state.affinitySportOne}
                      </Typography>
                    )}
                    {this.state.affinitySportThree && (
                      <Typography variant="body1">
                        • {this.state.affinitySportThree}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item sm>
                    {this.state.affinitySportTwo && (
                      <Typography variant="body1">
                        • {this.state.affinitySportTwo}
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
                <Typography variant="h3">
                  Favorites{" "}
                  <Tooltip title="Edit favorites" placement="top">
                    <IconButton
                      onClick={this.handleFavoritesOpen}
                      className="button"
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Dialog
                    overlayStyle={{ backgroundColor: "transparent" }}
                    open={this.state.favoritesOpen}
                    onClose={this.handleFavoritesClose}
                  >
                    <DialogTitle
                      style={{ cursor: "move" }}
                      id="draggable-dialog-title"
                    >
                      Edit Favorites
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        autofocus
                        margin="dense"
                        id="favoriteBook"
                        name="favoriteBook"
                        label="Book"
                        defaultValue={this.state.favoriteBook}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="favoriteMovie"
                        name="favoriteMovie"
                        label="Movie"
                        defaultValue={this.state.favoriteMovie}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="favoriteShow"
                        name="favoriteShow"
                        label="Show"
                        defaultValue={this.state.favoriteShow}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="favoriteArtist"
                        name="favoriteArtist"
                        label="Artist"
                        defaultValue={this.state.favoriteArtist}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={this.handleSubmitFavorites}
                        color="secondary"
                      >
                        Edit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Typography>
                <hr />
                <br />
                <Typography variant="body1">
                  Book: {this.state.favoriteBook}
                </Typography>
                <Typography variant="body1">
                  Movie: {this.state.favoriteMovie}
                </Typography>
                <Typography variant="body1">
                  Show: {this.state.favoriteShow}
                </Typography>
                <Typography variant="body1">
                  Artist: {this.state.favoriteArtist}
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
                      height: 125,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5">
                        {this.state.courses[index].courseCode}
                      </Typography>
                      <Typography variant="body1">
                        {this.state.courses[index].courseName}
                      </Typography>
                      {this.state.delete && (
                        <IconButton
                          size="large"
                          color="primary"
                          onClick={() => this.handleRemoveOpen(index)}
                        >
                          <DeleteIcon fontSize="large" />
                        </IconButton>
                      )}
                    </CardContent>
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
                        <Button
                          onClick={this.handleSubmitCourses}
                          color="primary"
                        >
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
                        color="primary"
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

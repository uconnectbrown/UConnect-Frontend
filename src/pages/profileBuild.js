// Setup
import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
import { auth } from "../firebase";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import UncheckedButton from '@material-ui/icons/RadioButtonUnchecked';
import CheckedCircle from '@material-ui/icons/CheckCircleOutline';

// Components
import Interests from "../components/Interests.js";

// Import Data
import majorList from "../resources/majors";
import varsitySports from "../resources/varsitySports";
import emptyProfile from "../resources/emptyProfile";
import greekLife from "../resources/greekLife";

// Styling
const styles = (theme) => ({
  ...theme.spreadThis,
});

// Validators
const { validProfile } = require("../util/validators");

// Body
class profileBuild extends Component {
  constructor() {
    super();
    this.state = emptyProfile;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const newUserData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      class: this.state.class,
      email: auth.currentUser.email,
      majors: [this.state.majorOne, this.state.majorTwo, this.state.majorThree],
      preferredPronouns: this.state.preferredPronouns,
      interests1: this.state.interests1,
      interests2: this.state.interests2,
      interests3: this.state.interests3,
      groups: [this.state.groupOne, this.state.groupTwo, this.state.groupThree],
      varsitySports: [this.state.varsitySportOne, this.state.varsitySportTwo],
      affinitySports: [
        this.state.affinitySportOne,
        this.state.affinitySportTwo,
        this.state.affinitySportThree,
      ],
      greekLife: this.state.greekLife,
      favorites: this.state.favorites,
      bio: this.state.bio,
      courses: [
        this.state.courseOne,
        this.state.courseTwo,
        this.state.courseThree,
        this.state.courseFour,
        this.state.courseFive,
      ],
    };

    for (let i = 0; i < 5; i++) {
      if (Object.keys(newUserData.courses[i]).length === 3) {
        newUserData.courses[i] = {
          courseCode: newUserData.courses[i].courseCode,
          courseName: newUserData.courses[i].courseName,
          courseColor: newUserData.courses[i].courseColor,
          assignments: [],
        };
      }
    }

    for (let i = 0; i < 5; i++) {
      if (Object.keys(newUserData.courses[i]).length === 0) {
        newUserData.courses[i] = {
          courseCode: "",
          courseName: "",
          courseColor: "",
          assignments: [],
        };
      }
    }

    if (!validProfile(newUserData)) {
      this.setState({
        loading: false,
        validProfile: false,
      });
      return;
    }

    axios
      .post("/signup", newUserData)
      .then(() => {
        this.setState({
          loading: false,
          validProfile: true,
        });
        this.props.history.push({
          pathname: "/profileView",
        });
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleInterests = (i1, i2, i3) => {
    this.setState({ interests1: i1, interests2: i2, interests3: i3 });
  };

  handleFavorites = (event) => {
    let input = event.target.value;
    let subfield = event.target.id;
    this.setState((prevState) => {
      let favorites = Object.assign({}, prevState.favorites);
      favorites[subfield] = input;
      return { favorites };
    });
  };

  handleCourseOne = (event) => {
    let input = event.target.value;
    let subfield = event.target.name;
    this.setState((prevState) => {
      let courseOne = Object.assign({}, prevState.courseOne);
      courseOne[subfield] = input;
      return { courseOne };
    });
  };

  handleCourseTwo = (event) => {
    let input = event.target.value;
    let subfield = event.target.name;
    this.setState((prevState) => {
      let courseTwo = Object.assign({}, prevState.courseTwo);
      courseTwo[subfield] = input;
      return { courseTwo };
    });
  };

  handleCourseThree = (event) => {
    let input = event.target.value;
    let subfield = event.target.name;
    this.setState((prevState) => {
      let courseThree = Object.assign({}, prevState.courseThree);
      courseThree[subfield] = input;
      return { courseThree };
    });
  };

  handleCourseFour = (event) => {
    let input = event.target.value;
    let subfield = event.target.name;
    this.setState((prevState) => {
      let courseFour = Object.assign({}, prevState.courseFour);
      courseFour[subfield] = input;
      return { courseFour };
    });
  };

  handleCourseFive = (event) => {
    let input = event.target.value;
    let subfield = event.target.name;
    this.setState((prevState) => {
      let courseFive = Object.assign({}, prevState.courseFive);
      courseFive[subfield] = input;
      return { courseFive };
    });
  };

  handleSecondMajor = () => {
    this.setState({ secondMajor: true });
  };

  handleThirdMajor = () => {
    this.setState({ thirdMajor: true });
  };

  handleVarsity = () => {
    this.setState({ secondVarsitySport: true });
  };

  handleFifthCourse = () => {
    this.setState({ fifthCourse: true });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    let palette = [
      "#16a085",
      "#27ae60",
      "#2980b9",
      "#8e44ad",
      "#2c3e50",
      "#f1c40f",
      "#e67e22",
      "#e74c3c",
      "#ecf0f1",
      "#95a5a6",
    ];
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <Typography variant="h2" className={classes.pageTitle}>
              Build Profile
            </Typography>

            <span>
            <h2>Basic Info{" "}
            {(this.state.firstName === "" || this.state.lastName === "" || this.state.class === "" || this.state.majorOne === "") 
              ? <UncheckedButton style={{ marginTop: "5px" }} color="primary" /> : <CheckedCircle style={{ marginTop: "5px" }} color="secondary" />}
            </h2>
            </span>

            <TextField
              id="firstName"
              autoComplete="off"
              name="firstName"
              type="text"
              label="First Name"
              className={classes.textField}
              value={this.state.firstName}
              onChange={this.handleChange}
              fullWidth
              required
              variant="outlined"
              size={"small"}
            />
            <br />
            <TextField
              id="lastName"
              autoComplete="off"
              name="lastName"
              type="text"
              label="Last Name"
              className={classes.textField}
              value={this.state.lastName}
              onChange={this.handleChange}
              fullWidth
              required
              variant="outlined"
              size={"small"}
            />
            <TextField
              id="class"
              name="class"
              select
              label="Class of ..."
              className={classes.textField}
              value={this.state.class}
              onChange={this.handleChange}
              variant="outlined"
              required
              helperText="Please select your graduating class"
              size={"small"}
            >
              <MenuItem key="2021.5" value="2021.5">
                2021.5
              </MenuItem>
              <MenuItem key="2022" value="2022">
                2022
              </MenuItem>
              <MenuItem key="2022.5" value="2022.5">
                2022.5
              </MenuItem>
              <MenuItem key="2023" value="2023">
                2023
              </MenuItem>
              <MenuItem key="2023.5" value="2023.5">
                2023.5
              </MenuItem>
              <MenuItem key="2024" value="2024">
                2024
              </MenuItem>
              <MenuItem key="2024.5" value="2024.5">
                2024.5
              </MenuItem>
              <MenuItem key="2025" value="2025">
                2025
              </MenuItem>
            </TextField>
            <br />
            <body1>
              What is your intended major? Feel free to type out an independent
              major or put "Undecided" if you don't know at this point.
            </body1>
            <br />
            <span>
              <TextField
                variant="outlined"
                name="majorOne"
                autoComplete="off"
                size={"small"}
                label="Concentration"
                className={classes.textField}
                required
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: majorList,
                  inputProps: {
                    list: "majors",
                  },
                }}
              />
              {!this.state.secondMajor && (
                <Tooltip
                  title="Add Second Concentration"
                  placement="top"
                  style={{ marginTop: "5px" }}
                >
                  <IconButton onClick={this.handleSecondMajor}>
                    <AddIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              )}
            </span>

            <span>
              {this.state.secondMajor && (
                <div>
                  <br />
                  <TextField
                    style={{ marginTop: "-10px" }}
                    variant="outlined"
                    name="majorTwo"
                    autoComplete="off"
                    size={"small"}
                    label="Second Concentration"
                    className={classes.textField}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: majorList,
                      inputProps: {
                        list: "majors",
                      },
                    }}
                  />
                </div>
              )}
              {this.state.secondMajor && !this.state.thirdMajor && (
                <Tooltip title="Add Third Concentration" placement="top">
                  <IconButton onClick={this.handleThirdMajor}>
                    <AddIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              )}
            </span>

            {this.state.thirdMajor && (
              <div>
                <br />
                <TextField
                  style={{ marginTop: "-10px", marginBottom: "-10px" }}
                  variant="outlined"
                  name="majorThree"
                  autoComplete="off"
                  size={"small"}
                  label="Third Concentration"
                  className={classes.textField}
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: majorList,
                    inputProps: {
                      list: "majors",
                    },
                  }}
                />
              </div>
            )}

            <br />

            <TextField
              id="preferredPronouns"
              name="preferredPronouns"
              select
              label="Preferred Pronouns"
              className={classes.textField}
              value={this.state.preferredPronouns}
              onChange={this.handleChange}
              variant="outlined"
              size={"small"}
              helperText="Please select your preferred pronouns"
            >
              <MenuItem key="he/him" value="he/him">
                he/him
              </MenuItem>
              <MenuItem key="she/her" value="she/her">
                she/her
              </MenuItem>
              <MenuItem key="they/them" value="they/them">
                they/them
              </MenuItem>
              <MenuItem key="ze/hir" value="ze/hir">
                ze/hir
              </MenuItem>
              <MenuItem key="other" value="other">
                other
              </MenuItem>
            </TextField>
            <h2>Interests{" "}
            {(this.state.interests1.length + this.state.interests2.length + this.state.interests3.length !== 10) 
              ? <UncheckedButton style={{ marginTop: "5px" }} color="primary" /> : <CheckedCircle style={{ marginTop: "5px" }} color="secondary" />}
            </h2>
            <body1>
              Among the 3 provided categories, please select a total of 10
              subcategories in which you are interested.
            </body1>
          </Grid>
          <Grid item sm />
        </Grid>
        <br />
        <Interests getInterests={this.handleInterests} />

        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            {/* <TextField
              id="interestOne"
              name="interestOne"
              autoComplete="off"
              type="text"
              label="First Interest"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="interestTwo"
              name="interestTwo"
              autoComplete="off"
              type="text"
              label="Second Interest"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="interestThree"
              name="interestThree"
              autoComplete="off"
              type="text"
              label="Third Interest"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="interestFour"
              name="interestFour"
              autoComplete="off"
              type="text"
              label="Fourth Interest"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />
            <TextField
              id="interestFive"
              name="interestFive"
              autoComplete="off"
              type="text"
              label="Fifth Interest"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            /> */}

            <h2>Groups</h2>
            <body1>
              Please list up to 3 clubs, affinity groups, or student
              organizations you are involved with.
            </body1>
            <TextField
              id="groupOne"
              name="groupOne"
              autoComplete="off"
              type="text"
              label="First Group"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />
            <TextField
              id="groupTwo"
              name="groupTwo"
              autoComplete="off"
              type="text"
              label="Second Group"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />
            <TextField
              id="groupThree"
              name="groupThree"
              autoComplete="off"
              type="text"
              label="Third Group"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />

            <h2>Athletics</h2>
            <body1>
              If you are a member of any varsity sports teams, please indicate
              which ones below.
            </body1>
            <br />
            <span>
              <TextField
                variant="outlined"
                name="varsitySportOne"
                autoComplete="off"
                size={"small"}
                label="First Varsity Sport"
                className={classes.textField}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: varsitySports,
                  inputProps: {
                    list: "varsitySports",
                  },
                }}
              />

              {!this.state.secondVarsitySport && (
                <Tooltip
                  title="Add Second Varsity Sport"
                  placement="top"
                  style={{ marginTop: "5px" }}
                >
                  <IconButton onClick={this.handleVarsity}>
                    <AddIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              )}
            </span>

            {this.state.secondVarsitySport && (
              <div>
                <br />
                <TextField
                  style={{ marginTop: "-10px" }}
                  variant="outlined"
                  name="varsitySportTwo"
                  autoComplete="off"
                  size={"small"}
                  label="Second Varsity Sport"
                  className={classes.textField}
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: varsitySports,
                    inputProps: {
                      list: "varsitySports",
                    },
                  }}
                />
              </div>
            )}
            <br />
            <body1>
              If you are not on a varsity sports team but still enjoy playing
              and competing in sports, please indicate which ones below.
            </body1>
            <TextField
              id="affinitySportOne"
              name="affinitySportOne"
              autoComplete="off"
              type="text"
              label="First Sport"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />
            <TextField
              id="affinitySportTwo"
              name="affinitySportTwo"
              autoComplete="off"
              type="text"
              label="Second Sport"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />
            <TextField
              id="affinitySportThree"
              name="affinitySportThree"
              autoComplete="off"
              type="text"
              label="Third Sport"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />

            <h2>Greek Life</h2>
            <body1>
              If you are a member of any Greek Organizations, please indicate
              which one below.
            </body1>
            <TextField
              variant="outlined"
              name="greekLife"
              autoComplete="off"
              size={"small"}
              label="Greek Organization"
              className={classes.textField}
              fullWidth
              onChange={this.handleChange}
              InputProps={{
                endAdornment: greekLife,
                inputProps: {
                  list: "greekLife",
                },
              }}
            />

            <h2>Favorites{" "}
            {(this.state.favorites.book === "" || this.state.favorites.movie === "" || this.state.favorites.tvShow === "" || this.state.favorites.artist === "") 
              ? <UncheckedButton style={{ marginTop: "5px" }} color="primary" /> : <CheckedCircle style={{ marginTop: "5px" }} color="secondary" />}
            </h2>
            <body1>
              Feel free to share your favorite book, movie, tv show, and artist
              below.
            </body1>
            <br />
            <span>
              <TextField
                id="book"
                name="favorites"
                type="text"
                label="Book"
                autoComplete="off"
                style={{ width: 150 }}
                className={classes.textField}
                value={this.state.favorites.book}
                onChange={this.handleFavorites}
                required
                size={"small"}
              />
              {"   "}
              <TextField
                id="movie"
                name="favorites"
                type="text"
                label="Movie"
                autoComplete="off"
                style={{ width: 150 }}
                className={classes.textField}
                value={this.state.favorites.movie}
                onChange={this.handleFavorites}
                required
                size={"small"}
              />
            </span>
            <span>
              <TextField
                id="tvShow"
                name="favorites"
                type="text"
                label="Show"
                autoComplete="off"
                style={{ width: 150 }}
                className={classes.textField}
                value={this.state.favorites.tvShow}
                onChange={this.handleFavorites}
                required
                size={"small"}
              />
              {"   "}
              <TextField
                id="artist"
                name="favorites"
                type="text"
                label="Artist/Band"
                autoComplete="off"
                style={{ width: 150 }}
                className={classes.textField}
                value={this.state.favorites.artist}
                onChange={this.handleFavorites}
                required
                size={"small"}
              />
            </span>

            <h2>Bio</h2>
            <body1>
              If there is anything else you would like to share, we would love
              for you to include it here.
            </body1>
            <br />
            <br />
            <TextField
              id="bio"
              name="bio"
              autoComplete="off"
              multiline
              onChange={this.handleChange}
              rows={4}
              variant="outlined"
              fullWidth
            />

            <h2>Courses{" "}
            {(Object.keys(this.state.courseOne).length > 2 && Object.keys(this.state.courseTwo).length > 2) 
              ? <CheckedCircle style={{ marginTop: "5px" }} color="secondary" /> : <UncheckedButton style={{ marginTop: "5px" }} color="primary" />} 
            </h2>
          </Grid>
          <Grid item sm />
        </Grid>
        <div align="center">
          <body>
            In order to give you access to the profiles of all of your
            classmates, we will need you to provide us with your current courses
            in the fields below.
          </body>
          <br />
          <body>
            The course code refers to the unique string identifier listed on C@B
            for the course (e.g. ECON 0110). Note: please include the space
            between the capital letters and the numbers and the 0 at the start
            of the numbers if it less than 1000.
          </body>
          <br />

          <body>
            The course name refers to the name listed on either C@B or Canvas
            for the course (e.g. Principles of Economics). Note: this name is
            just meant to help you easily recognize the class, so don't worry
            about formatting it in a particular way.
          </body>
        </div>
        <Grid container className={classes.form} align="center" spacing={2}>
          <Grid item sm>
            <h3>Course #1</h3>
            <TextField
              id="courseCode"
              name="courseCode"
              autoComplete="off"
              type="text"
              label="Course Code"
              className={classes.textField}
              helperText={errors.courseCode}
              error={errors.courseCode ? true : false}
              value={this.state.courseCode}
              onChange={this.handleCourseOne}
              size={"small"}
              required
              variant="outlined"
            />
            <TextField
              id="courseName"
              name="courseName"
              autoComplete="off"
              type="text"
              label="Course Name"
              className={classes.textField}
              value={this.state.courseName}
              onChange={this.handleCourseOne}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="courseColor"
              name="courseColor"
              autoComplete="off"
              select
              label="Course Color"
              className={classes.textField}
              value={this.state.courseColor}
              onChange={this.handleCourseOne}
              variant="outlined"
              size={"small"}
              required
              helperText="Please select a course color"
            >
              {palette.map((color) => (
                <MenuItem key={color} value={color}>
                  <Typography
                    variant="h6"
                    style={{ backgroundColor: color, color: color }}
                  >
                    Color
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm>
            <h3>Course #2</h3>
            <TextField
              id="courseCode"
              name="courseCode"
              autoComplete="off"
              type="text"
              label="Course Code"
              className={classes.textField}
              helperText={errors.courseCode}
              error={errors.courseCode ? true : false}
              value={this.state.courseCode}
              onChange={this.handleCourseTwo}
              size={"small"}
              required
              variant="outlined"
            />
            <TextField
              id="courseName"
              name="courseName"
              autoComplete="off"
              type="text"
              label="Course Name"
              className={classes.textField}
              value={this.state.courseName}
              onChange={this.handleCourseTwo}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="courseColor"
              name="courseColor"
              autoComplete="off"
              select
              label="Course Color"
              className={classes.textField}
              value={this.state.courseColor}
              onChange={this.handleCourseTwo}
              variant="outlined"
              size={"small"}
              required
              helperText="Please select a course color"
            >
              {palette.map((color) => (
                <MenuItem key={color} value={color}>
                  <Typography
                    variant="h6"
                    style={{ backgroundColor: color, color: color }}
                  >
                    Color
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm>
            <h3>Course #3</h3>
            <TextField
              id="courseCode"
              name="courseCode"
              autoComplete="off"
              type="text"
              label="Course Code"
              className={classes.textField}
              helperText={errors.courseCode}
              error={errors.courseCode ? true : false}
              value={this.state.courseCode}
              onChange={this.handleCourseThree}
              size={"small"}
              variant="outlined"
            />
            <TextField
              id="courseName"
              name="courseName"
              autoComplete="off"
              type="text"
              label="Course Name"
              className={classes.textField}
              value={this.state.courseName}
              onChange={this.handleCourseThree}
              fullWidth
              size={"small"}
            />
            <TextField
              id="courseColor"
              name="courseColor"
              autoComplete="off"
              select
              label="Course Color"
              className={classes.textField}
              value={this.state.courseColor}
              onChange={this.handleCourseThree}
              variant="outlined"
              size={"small"}
              helperText="Please select a course color"
            >
              {palette.map((color) => (
                <MenuItem key={color} value={color}>
                  <Typography
                    variant="h6"
                    style={{ backgroundColor: color, color: color }}
                  >
                    Color
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm>
            <h3>Course #4</h3>
            <TextField
              id="courseCode"
              name="courseCode"
              autoComplete="off"
              type="text"
              label="Course Code"
              className={classes.textField}
              helperText={errors.courseCode}
              error={errors.courseCode ? true : false}
              value={this.state.courseCode}
              onChange={this.handleCourseFour}
              size={"small"}
              variant="outlined"
            />
            <TextField
              id="courseName"
              name="courseName"
              autoComplete="off"
              type="text"
              label="Course Name"
              className={classes.textField}
              value={this.state.courseName}
              onChange={this.handleCourseFour}
              fullWidth
              size={"small"}
            />
            <TextField
              id="courseColor"
              name="courseColor"
              autoComplete="off"
              select
              label="Course Color"
              className={classes.textField}
              value={this.state.courseColor}
              onChange={this.handleCourseFour}
              variant="outlined"
              size={"small"}
              helperText="Please select a course color"
            >
              {palette.map((color) => (
                <MenuItem key={color} value={color}>
                  <Typography
                    variant="h6"
                    style={{ backgroundColor: color, color: color }}
                  >
                    Color
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {!this.state.fifthCourse && (
            <Tooltip title="Add Fifth Course" placement="top">
              <IconButton onClick={this.handleFifthCourse}>
                <AddIcon color="secondary" />
              </IconButton>
            </Tooltip>
          )}

          {this.state.fifthCourse && (
            <Grid item sm>
              <h3>Course #5</h3>
              <TextField
                id="courseCode"
                name="courseCode"
                autoComplete="off"
                type="text"
                label="Course Code"
                className={classes.textField}
                helperText={errors.courseCode}
                error={errors.courseCode ? true : false}
                value={this.state.courseCode}
                onChange={this.handleCourseFive}
                size={"small"}
                variant="outlined"
              />
              <TextField
                id="courseName"
                name="courseName"
                autoComplete="off"
                type="text"
                label="Course Name"
                className={classes.textField}
                value={this.state.courseName}
                onChange={this.handleCourseFive}
                fullWidth
                size={"small"}
              />
              <TextField
                id="courseColor"
                name="courseColor"
                autoComplete="off"
                select
                label="Course Color"
                className={classes.textField}
                value={this.state.courseColor}
                onChange={this.handleCourseFive}
                variant="outlined"
                size={"small"}
                helperText="Please select a course color"
              >
                {palette.map((color) => (
                  <MenuItem key={color} value={color}>
                    <Typography
                      variant="h6"
                      style={{ backgroundColor: color, color: color }}
                    >
                      Color
                    </Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
        </Grid>
        <Grid container align="center">
          <Grid item sm />
          <Grid item sm>
            <h3>
              Thank you for taking the time to build your profile and welcome to
              UConnect!
            </h3>

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.Button}
              disabled={loading}
            >
              Create Profile
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>

            {!this.state.validProfile && (
              <Typography variant="body2" className={classes.customError}>
                Please fill out all required fields
              </Typography>
            )}
            <br />
            <br />
          </Grid>
          <Grid item sm />
        </Grid>
      </form>
    );
  }
}

profileBuild.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(profileBuild);

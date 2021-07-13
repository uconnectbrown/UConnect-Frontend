// Setup
import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    if (Object.keys(this.state.courseOne).length === 0) {
      this.setState.courseOne = { courseCode: "", courseName: "" };
    }
    if (Object.keys(this.state.courseTwo).length === 0) {
      this.setState.courseTwo = { courseCode: "", courseName: "" };
    }
    if (Object.keys(this.state.courseThree).length === 0) {
      this.setState.courseThree = { courseCode: "", courseName: "" };
    }
    if (Object.keys(this.state.courseFour).length === 0) {
      this.setState.courseFour = { courseCode: "", courseName: "" };
    }
    if (Object.keys(this.state.courseFive).length === 0) {
      this.setState.courseFive = { courseCode: "", courseName: "" };
    }
    const newUserData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      class: this.state.class,
      majors: [this.state.majorOne, this.state.majorTwo, this.state.majorThree],
      preferredPronouns: this.state.preferredPronouns,
      interests: [
        this.state.interestOne,
        this.state.interestTwo,
        this.state.interestThree,
        this.state.interestFour,
        this.state.interestFive,
      ],
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

    if (!validProfile(newUserData)) {
      this.setState({
        loading: false,
        validProfile: false,
      });
      return;
    }

    axios
      .post("/edit", newUserData)
      .then(() => {
        this.setState({
          loading: false,
          email: this.props.location.state.email,
          validProfile: true,
        });
        this.props.history.push({
          pathname: "/profileView",
          state: { email: this.state.email },
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
    let subfield = event.target.id;
    this.setState((prevState) => {
      let courseOne = Object.assign({}, prevState.courseOne);
      courseOne[subfield] = input;
      return { courseOne };
    });
  };

  handleCourseTwo = (event) => {
    let input = event.target.value;
    let subfield = event.target.id;
    this.setState((prevState) => {
      let courseTwo = Object.assign({}, prevState.courseTwo);
      courseTwo[subfield] = input;
      return { courseTwo };
    });
  };

  handleCourseThree = (event) => {
    let input = event.target.value;
    let subfield = event.target.id;
    this.setState((prevState) => {
      let courseThree = Object.assign({}, prevState.courseThree);
      courseThree[subfield] = input;
      return { courseThree };
    });
  };

  handleCourseFour = (event) => {
    let input = event.target.value;
    let subfield = event.target.id;
    this.setState((prevState) => {
      let courseFour = Object.assign({}, prevState.courseFour);
      courseFour[subfield] = input;
      return { courseFour };
    });
  };

  handleCourseFive = (event) => {
    let input = event.target.value;
    let subfield = event.target.id;
    this.setState((prevState) => {
      let courseFive = Object.assign({}, prevState.courseFive);
      courseFive[subfield] = input;
      return { courseFive };
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h2" className={classes.pageTitle}>
            Build Profile
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <h2>Basic Info</h2>
            <TextField
              id="firstName"
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
              What is your intended major? Feel free to put Undecided if you
              don't know at this point.
            </body1>
            <TextField
              variant="outlined"
              name="majorOne"
              size={"small"}
              label="Major"
              className={classes.textField}
              fullWidth
              required
              onChange={this.handleChange}
              InputProps={{
                endAdornment: majorList,
                inputProps: {
                  list: "majors",
                },
              }}
            />
            <body1>
              If you have more than one major, please list the others below.
            </body1>
            <TextField
              variant="outlined"
              name="majorTwo"
              size={"small"}
              label="Second Major"
              className={classes.textField}
              fullWidth
              onChange={this.handleChange}
              InputProps={{
                endAdornment: majorList,
                inputProps: {
                  list: "majors",
                },
              }}
            />
            <TextField
              variant="outlined"
              name="majorThree"
              size={"small"}
              label="Third Major"
              className={classes.textField}
              fullWidth
              onChange={this.handleChange}
              InputProps={{
                endAdornment: majorList,
                inputProps: {
                  list: "majors",
                },
              }}
            />
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

            <h2>Interests</h2>
            <body1>
              Please list between 3 and 5 areas of interest you have.
            </body1>
            <TextField
              id="interestOne"
              name="interestOne"
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
              type="text"
              label="Fifth Interest"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />

            <h2>Groups</h2>
            <body1>
              Please list up to 3 clubs, affinity groups, or student
              organizations you are involved with.
            </body1>
            <TextField
              id="groupOne"
              name="groupOne"
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
            <TextField
              variant="outlined"
              name="varsitySportOne"
              size={"small"}
              label="First Varsity Sport"
              className={classes.textField}
              fullWidth
              onChange={this.handleChange}
              InputProps={{
                endAdornment: varsitySports,
                inputProps: {
                  list: "varsitySports",
                },
              }}
            />
            <TextField
              variant="outlined"
              name="varsitySportTwo"
              size={"small"}
              label="Second Varsity Sport"
              className={classes.textField}
              fullWidth
              onChange={this.handleChange}
              InputProps={{
                endAdornment: varsitySports,
                inputProps: {
                  list: "varsitySports",
                },
              }}
            />
            <body1>
              If you are not on a varsity sports team but still enjoy playing
              and competing in sports, please indicate which ones below.
            </body1>
            <TextField
              id="affinitySportOne"
              name="affinitySportOne"
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

            <h2>Favorites</h2>
            <body1>
              Feel free to share your favorite book, movie, tv show, and artist
              below.
            </body1>
            <TextField
              id="book"
              name="favorites"
              type="text"
              label="Favorite Book"
              className={classes.textField}
              value={this.state.favorites.book}
              onChange={this.handleFavorites}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="movie"
              name="favorites"
              type="text"
              label="Favorite Movie"
              className={classes.textField}
              value={this.state.favorites.movie}
              onChange={this.handleFavorites}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="tvShow"
              name="favorites"
              type="text"
              label="Favorite Show"
              className={classes.textField}
              value={this.state.favorites.tvShow}
              onChange={this.handleFavorites}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="artist"
              name="favorites"
              type="text"
              label="Favorite Artist"
              className={classes.textField}
              value={this.state.favorites.artist}
              onChange={this.handleFavorites}
              fullWidth
              required
              size={"small"}
            />

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
              multiline
              onChange={this.handleChange}
              rows={4}
              variant="outlined"
              fullWidth
            />

            <h2>Courses</h2>
            <body1>
              In order to give you access to the profiles of all of your
              classmates, we will need you to provide us with your current
              courses in the fields below.
            </body1>
            <br />
            <br />
            <body>
              The course code refers to the unique string identifier listed on
              C@B for the course (e.g. ECON 0110). Note: please include the
              space between the capital letters and the numbers and the 0 at the
              start of the numbers if it less than 1000.
            </body>
            <br />
            
            <body>
              The course name refers to the name listed on either C@B or Canvas
              for the course (e.g. Principles of Economics). Note: this name is
              just meant to help you easily recognize the class, so don't worry
              about formatting it in a particular way.
            </body>
            <h3>Course #1</h3>
            <TextField
              id="courseCode"
              name="courseCode"
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
              type="text"
              label="Course Name"
              className={classes.textField}
              value={this.state.courseName}
              onChange={this.handleCourseOne}
              fullWidth
              required
              size={"small"}
            />
            <h3>Course #2</h3>
            <TextField
              id="courseCode"
              name="courseCode"
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
              type="text"
              label="Course Name"
              className={classes.textField}
              value={this.state.courseName}
              onChange={this.handleCourseTwo}
              fullWidth
              required
              size={"small"}
            />
            <h3>Course #3</h3>
            <TextField
              id="courseCode"
              name="courseCode"
              type="text"
              label="Course Code"
              className={classes.textField}
              helperText={errors.courseCode}
              error={errors.courseCode ? true : false}
              value={this.state.courseCode}
              onChange={this.handleCourseThree}
              size={"small"}
              required
              variant="outlined"
            />
            <TextField
              id="courseName"
              name="courseName"
              type="text"
              label="Course Name"
              className={classes.textField}
              value={this.state.courseName}
              onChange={this.handleCourseThree}
              fullWidth
              required
              size={"small"}
            />
            <h3>Course #4</h3>
            <TextField
              id="courseCode"
              name="courseCode"
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
              type="text"
              label="Course Name"
              className={classes.textField}
              value={this.state.courseName}
              onChange={this.handleCourseFour}
              fullWidth
              size={"small"}
            />
            <h3>Course #5</h3>
            <TextField
              id="courseCode"
              name="courseCode"
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
              type="text"
              label="Course Name"
              className={classes.textField}
              value={this.state.courseName}
              onChange={this.handleCourseFive}
              fullWidth
              size={"small"}
            />
            <h3>
              Thank you for taking the time to build your profile and welcome to
              Uconnect!
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
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

profileBuild.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(profileBuild);

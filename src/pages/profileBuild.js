import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Import Dropdown Data
import majorList from "../resources/majors";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto 20px auto",
    width: "200px",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  cutomError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
};

class profileBuild extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      class: "",
      concentrations: [],
      preferredPronouns: "",
      interests: [],
      groups: [],
      varsitySports: [],
      affinitySports: [],
      greekLife: "",
      favorites: {},
      bio: "",
      courses: [],
      loading: false,
      errors: {},
    };
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
      concentrations: this.state.concentrations,
      preferredPronouns: this.state.preferredPronouns,
      interests: this.state.interests,
      groups: this.state.groups,
      varsitySports: this.state.varsitySports,
      affinitySports: this.state.affinitySports,
      greekLife: this.state.greekLife,
      favorites: this.state.favorites,
      bio: this.state.bio,
      courses: this.state.courses,
    };
    // not sure what our profile data populating function is called
    console.log(newUserData);
    axios
      .post("/edit", newUserData)
      .then(() => {
        this.setState({
          loading: false,
        });
        // push to course landing page in future
        // this.props.history.pushState("/profileView");
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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
              What is your intended concentration? Feel free to put Undecided if
              you don't know at this point.
            </body1>
            <TextField
              variant="outlined"
              name="majors"
              size={"small"}
              label="Concentration"
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
              If you have more than one concentration, please list the others
              below.
            </body1>
            <TextField
              variant="outlined"
              name="majors"
              size={"small"}
              label="Second Concentration"
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
              name="majors"
              size={"small"}
              label="Third Concentration"
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
              value={this.state.interests[0]}
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
              value={this.state.interests[1]}
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
              value={this.state.interests[2]}
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
              value={this.state.interests[3]}
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
              value={this.state.interests[4]}
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
              value={this.state.groups[0]}
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
              value={this.state.groups[1]}
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
              value={this.state.groups[2]}
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
              name="varsitySports"
              size={"small"}
              label="First Varsity Sport"
              className={classes.textField}
              fullWidth
              onChange={this.handleChange}
              InputProps={{
                endAdornment: (
                  <datalist id="varsitySports">
                    <option value="Baseball" />
                    <option value="Basketball" />
                    <option value="Crew" />
                    <option value="Cross Country" />
                    <option value="Equestrian" />
                    <option value="Fencing" />
                    <option value="Field Hockey" />
                    <option value="Football" />
                    <option value="Ice Hockey" />
                    <option value="Lacrosse" />
                    <option value="Rugby" />
                    <option value="Sailing" />
                    <option value="Soccer" />
                    <option value="Softball" />
                    <option value="Swimming and Diving" />
                    <option value="Tennis" />
                    <option value="Track and Field" />
                    <option value="Volleyball" />
                    <option value="Water Polo" />
                    <option value="Wrestling" />
                  </datalist>
                ),
                inputProps: {
                  list: "varsitySports",
                },
              }}
            />
            <TextField
              variant="outlined"
              name="varsitySports"
              size={"small"}
              label="Second Varsity Sport"
              className={classes.textField}
              fullWidth
              onChange={this.handleChange}
              InputProps={{
                endAdornment: (
                  <datalist id="varsitySports">
                    <option value="Baseball" />
                    <option value="Basketball" />
                    <option value="Crew" />
                    <option value="Cross Country" />
                    <option value="Equestrian" />
                    <option value="Fencing" />
                    <option value="Field Hockey" />
                    <option value="Football" />
                    <option value="Ice Hockey" />
                    <option value="Lacrosse" />
                    <option value="Rugby" />
                    <option value="Sailing" />
                    <option value="Soccer" />
                    <option value="Softball" />
                    <option value="Swimming and Diving" />
                    <option value="Tennis" />
                    <option value="Track and Field" />
                    <option value="Volleyball" />
                    <option value="Water Polo" />
                    <option value="Wrestling" />
                  </datalist>
                ),
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
              value={this.state.affinitySports[0]}
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
              value={this.state.affinitySports[1]}
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
              value={this.state.affinitySports[2]}
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
                endAdornment: (
                  <datalist id="greekLife">
                    <option value="Alpha Chi Omega" />
                    <option value="Alpha Delta Phi Society" />
                    <option value="Alpha Phi Alpha" />
                    <option value="Beta Omega Chi" />
                    <option value="Delta Gamma" />
                    <option value="Delta Phi" />
                    <option value="Delta Sigma Theta" />
                    <option value="Delta Tau" />
                    <option value="Kappa Alpha Theta" />
                    <option value="Kappa Alpha Psi" />
                    <option value="Kappa Delta" />
                    <option value="Theta Alpha" />
                    <option value="Zeta Delta Xi" />
                  </datalist>
                ),
                inputProps: {
                  list: "greekLife",
                },
              }}
            />

            <h2>Favorites</h2>
            <body1>
              Feel free to share your favorite book, movie, tv show, and artist
              below. :)
            </body1>
            <TextField
              id="book"
              name="book"
              type="text"
              label="Favorite Book"
              className={classes.textField}
              value={this.state.favorites.book}
              onChange={this.handleChange}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="movie"
              name="movie"
              type="text"
              label="Favorite Movie"
              className={classes.textField}
              value={this.state.favorites.movie}
              onChange={this.handleChange}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="tvShow"
              name="tvShow"
              type="text"
              label="Favorite Show"
              className={classes.textField}
              value={this.state.favorites.tvShow}
              onChange={this.handleChange}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="artist"
              name="artist"
              type="text"
              label="Favorite Artist"
              className={classes.textField}
              value={this.state.favorites.artist}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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

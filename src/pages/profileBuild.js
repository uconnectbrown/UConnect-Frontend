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
import UncheckedButton from "@material-ui/icons/RadioButtonUnchecked";
import CheckedCircle from "@material-ui/icons/CheckCircleOutline";

// Components
import Interests from "../components/Interests.js";
import SignOut from "../components/SignOut";
import PBTextField from "../components/PBTextField";
import PBCourseGrid from "../components/PBCourseGrid";

// Import Data
import majorList from "../resources/majors";
import emptyProfile from "../resources/emptyProfile";
import { nameList } from "../resources/courses";

// Styling
import "./profileBuild.css";
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

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push("/");
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const newUserData = {
      // Basic Info
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      classYear: this.state.classYear,
      majors: [this.state.major1, this.state.major2, this.state.major3],
      preferredPronouns: this.state.preferredPronouns,
      email: auth.currentUser.email,
      // Interests
      interests1: this.state.interests1,
      interests2: this.state.interests2,
      interests3: this.state.interests3,
      // Courses
      courses: [
        this.state.course1,
        this.state.course2,
        this.state.course3,
        this.state.course4,
        this.state.course5,
      ],
    };

    // TO-DO: Check courses validator
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
      })
      .then(() => {
        return axios.get(`/update/${auth.currentUser.email}`);
      })
      .then(() => {
        this.props.history.push({
          pathname: "/profileView",
        });
      })
      .catch((err) => {
        this.setState({
          errors: err,
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

  handleCourse1 = (event) => {
    this.setState((prevState) => {
      let course1 = Object.assign({}, prevState.course1);
      course1["code"] = event.target.value.split(":")[0];
      course1["name"] = event.target.value.slice(
        event.target.value.indexOf(":") + 2,
        event.target.value.length
      );
      return { course1 };
    });
  };

  handleCourse2 = (event) => {
    this.setState((prevState) => {
      let course2 = Object.assign({}, prevState.course2);
      course2["code"] = event.target.value.split(":")[0];
      course2["name"] = event.target.value.slice(
        event.target.value.indexOf(":") + 2,
        event.target.value.length
      );
      return { course2 };
    });
  };

  handleCourse3 = (event) => {
    this.setState((prevState) => {
      let course3 = Object.assign({}, prevState.course3);
      course3["code"] = event.target.value.split(":")[0];
      course3["name"] = event.target.value.slice(
        event.target.value.indexOf(":") + 2,
        event.target.value.length
      );
      return { course3 };
    });
  };

  handleCourse4 = (event) => {
    this.setState((prevState) => {
      let course4 = Object.assign({}, prevState.course4);
      course4["code"] = event.target.value.split(":")[0];
      course4["name"] = event.target.value.slice(
        event.target.value.indexOf(":") + 2,
        event.target.value.length
      );
      return { course4 };
    });
  };

  handleCourse5 = (event) => {
    this.setState((prevState) => {
      let course5 = Object.assign({}, prevState.course5);
      course5["code"] = event.target.value.split(":")[0];
      course5["name"] = event.target.value.slice(
        event.target.value.indexOf(":") + 2,
        event.target.value.length
      );
      return { course5 };
    });
  };

  handleSecondMajor = () => {
    this.setState({ secondMajor: true });
  };

  handleThirdMajor = () => {
    this.setState({ thirdMajor: true });
  };

  handleFifthCourse = () => {
    this.setState({ fifthCourse: true });
  };

  getClassYears = () => {
    const currYear = new Date().getFullYear();
    const years = [];

    for (let i = currYear; i <= currYear + 4; i += 0.5) {
      years.push(String(i));
    }

    return years;
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;

    const classYears = this.getClassYears();
    const pronouns = ["he/him", "she/her", "they/them", "ze/hir", "other"];

    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <SignOut style={{ marginTop: "-50px" }} />
        <Grid container className="section-container">
          <Grid item sm>
            <Typography variant="h2" className={classes.pageTitle}>
              Build Profile
            </Typography>
            <div class="header-icon-wrap">
              <h2>Basic Info</h2>
              {this.state.firstName === "" ||
              this.state.lastName === "" ||
              this.state.class === "" ||
              this.state.major1 === "" ? (
                <UncheckedButton color="primary" fontSize="small" />
              ) : (
                <CheckedCircle color="secondary" fontSize="small" />
              )}
            </div>
            <Grid container className="info-input-container">
              <Grid item xs={12} md={6}>
                <PBTextField
                  name="firstName"
                  label="First Name"
                  handleChange={this.handleChange}
                  value={this.state.firstName}
                  className={classes.textField}
                  style={{ width: "80%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PBTextField
                  name="lastName"
                  label="Last Name"
                  handleChange={this.handleChange}
                  value={this.state.lastName}
                  className={classes.textField}
                  style={{ width: "80%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
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
                  style={{ width: "80%" }}
                >
                  {pronouns.map((p) => {
                    return (
                      <MenuItem key={p} value={p}>
                        {p}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="classYear"
                  name="classYear"
                  select
                  label="Class of ..."
                  className={classes.textField}
                  value={this.state.classYear}
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  helperText="Please select your graduating class"
                  size={"small"}
                  style={{ width: "80%" }}
                >
                  {classYears.map((year) => {
                    return (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <span>
                  <TextField
                    variant="outlined"
                    name="major1"
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
                    helperText='Feel free to enter an independent
                    major or put "Undecided".'
                    style={{ width: "80%" }}
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
              </Grid>
              <Grid item xs={12} md={6}>
                <span>
                  {this.state.secondMajor && (
                    <div>
                      <TextField
                        style={{ marginTop: "-10px" }}
                        variant="outlined"
                        name="major2"
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
                        style={{ width: "80%" }}
                      />
                      {!this.state.thirdMajor && (
                        <Tooltip
                          title="Add Third Concentration"
                          placement="top"
                          style={{ marginTop: "5px" }}
                        >
                          <IconButton onClick={this.handleThirdMajor}>
                            <AddIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  )}
                </span>
              </Grid>
              <Grid item xs={12} md={6}>
                <span>
                  {this.state.thirdMajor && (
                    <div>
                      <TextField
                        style={{ marginTop: "-10px", marginBottom: "-10px" }}
                        variant="outlined"
                        name="major3"
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
                        style={{ width: "80%" }}
                      />
                    </div>
                  )}
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container className="section-container">
          <Grid item sm>
            <div class="header-icon-wrap">
              <h2>Interests</h2>
              {this.state.interests1.length +
                this.state.interests2.length +
                this.state.interests3.length !==
              10 ? (
                <UncheckedButton color="primary" fontSize="small" />
              ) : (
                <CheckedCircle color="secondary" fontSize="small" />
              )}
            </div>
            <p>Please select 10 categories in which you are interested.</p>
            <Interests getInterests={this.handleInterests} />
          </Grid>
        </Grid>

        <Grid container className="section-container">
          <Grid item sm>
            <div class="header-icon-wrap">
              <h2>Courses</h2>
              {[
                this.state.course1.code,
                this.state.course2.code,
                this.state.course3.code,
                this.state.course4.code,
                this.state.course5.code,
              ].filter(Boolean).length > 1 ? (
                <CheckedCircle color="secondary" fontSize="small" />
              ) : (
                <UncheckedButton color="primary" fontSize="small" />
              )}
            </div>

            <Grid container spacing={3}>
              <PBCourseGrid
                course="Course #1"
                className={classes.textField}
                value={this.state.course1}
                handleChange={this.handleCourse1}
                required={true}
              />
              <PBCourseGrid
                course="Course #2"
                className={classes.textField}
                value={this.state.course2}
                handleChange={this.handleCourse2}
                required={true}
              />
              <PBCourseGrid
                course="Course #3"
                className={classes.textField}
                value={this.state.course3}
                handleChange={this.handleCourse3}
              />
              <PBCourseGrid
                course="Course #4"
                className={classes.textField}
                value={this.state.course4}
                handleChange={this.handleCourse4}
              />

              {!this.state.fifthCourse && (
                <Tooltip title="Add Fifth Course" placement="top">
                  <IconButton onClick={this.handleFifthCourse}>
                    <AddIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              )}

              {this.state.fifthCourse && (
                <PBCourseGrid
                  course="Course #5"
                  className={classes.textField}
                  value={this.state.course5}
                  handleChange={this.handlecourse5}
                />
              )}
            </Grid>
          </Grid>
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
              color="secondary"
              size="large"
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

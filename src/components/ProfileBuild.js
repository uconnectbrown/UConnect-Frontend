// Setup
import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import UncheckedButton from "@material-ui/icons/RadioButtonUnchecked";
import CheckedCircle from "@material-ui/icons/CheckCircleOutline";

// Components
import Interests from "./Interests.js";

// Import Data
import majorList from "../resources/majors";
import emptyProfile from "../resources/emptyProfile";

// Styling
import "./ProfileBuild.css";
const styles = (theme) => ({
  ...theme.spreadThis,
});

// Validators
const { validProfile } = require("../util/validators");

// Body
function ProfileBuild(props) {
  let history = useHistory();

  const [userData, setUserData] = useState(emptyProfile);
  const [email, setEmail] = useState(null);
  const classYears = ["2022", "2023", "2024", "2025"];
  const pronouns = ["he/him", "she/her", "they/them", "ze/hir", "other"];
  const { classes } = props;

  const handleInterests = (i1, i2, i3) => {
    setUserData({
      ...userData,
      interests1: i1,
      interests2: i2,
      interests3: i3,
    });
  };

  useEffect(() => {
    if (auth.currentUser) setEmail(auth.currentUser.email);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      // Basic Info
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      classYear: userData.classYear,
      majors: [userData.major1, userData.major2, userData.major3],
      pronouns: userData.pronouns,
      location: userData.location,
      email,
      // Interests
      interests1: userData.interests1,
      interests2: userData.interests2,
      interests3: userData.interests3,
    };

    // TO-DO: Check courses validator
    if (!validProfile(newUserData)) {
      setUserData({ ...userData, validProfile: false });
      return;
    }

    axios
      .post("/signup", newUserData)
      .then(() => {
        setUserData({ ...userData, validProfile: true });
        props.grantAccess();
      })
      .then(() => {
        history.push({
          pathname: "/home",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container className="profile-build-container">
        <Grid item sm>
          <Typography variant="h2" className={classes.pageTitle}>
            Build Profile
          </Typography>
          <div class="header-icon-wrap">
            <h2>Basic Info</h2>
            {userData.firstName === "" ||
            userData.lastName === "" ||
            userData.class === "" ||
            userData.major1 === "" ? (
              <UncheckedButton color="primary" fontSize="small" />
            ) : (
              <CheckedCircle color="secondary" fontSize="small" />
            )}
          </div>
          <Grid container className="info-input-container" spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                className={classes.textField}
                onChange={(event) =>
                  setUserData({ ...userData, firstName: event.target.value })
                }
                value={userData.firstName}
                variant="outlined"
                size={"small"}
                required
                style={{ width: "80%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                className={classes.textField}
                onChange={(event) =>
                  setUserData({ ...userData, lastName: event.target.value })
                }
                value={userData.lastName}
                variant="outlined"
                size={"small"}
                required
                style={{ width: "80%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Preferred Pronouns"
                className={classes.textField}
                onChange={(event) =>
                  setUserData({ ...userData, pronouns: event.target.value })
                }
                value={userData.pronouns}
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
                label="Location"
                className={classes.textField}
                onChange={(event) =>
                  setUserData({ ...userData, location: event.target.value })
                }
                value={userData.location}
                variant="outlined"
                size={"small"}
                style={{ width: "80%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Class of ..."
                className={classes.textField}
                onChange={(event) =>
                  setUserData({ ...userData, classYear: event.target.value })
                }
                value={userData.classYear}
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
                  autoComplete="off"
                  size={"small"}
                  label="Concentration"
                  className={classes.textField}
                  onChange={(event) =>
                    setUserData({ ...userData, major1: event.target.value })
                  }
                  required
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
                {!userData.secondMajor && (
                  <Tooltip
                    title="Add Second Concentration"
                    placement="top"
                    style={{ marginTop: "5px" }}
                  >
                    <IconButton
                      onClick={() =>
                        setUserData({ ...userData, secondMajor: true })
                      }
                    >
                      <AddIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                )}
              </span>
            </Grid>
            <Grid item xs={12} md={6}>
              <span>
                {userData.secondMajor && (
                  <div>
                    <TextField
                      style={{ marginTop: "-10px" }}
                      variant="outlined"
                      name="major2"
                      autoComplete="off"
                      size={"small"}
                      label="Second Concentration"
                      className={classes.textField}
                      onChange={(event) =>
                        setUserData({ ...userData, major2: event.target.value })
                      }
                      InputProps={{
                        endAdornment: majorList,
                        inputProps: {
                          list: "majors",
                        },
                      }}
                      style={{ width: "80%" }}
                    />
                    {!userData.thirdMajor && (
                      <Tooltip
                        title="Add Third Concentration"
                        placement="top"
                        style={{ marginTop: "5px" }}
                      >
                        <IconButton
                          onClick={() =>
                            setUserData({ ...userData, thirdMajor: true })
                          }
                        >
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
                {userData.thirdMajor && (
                  <div>
                    <TextField
                      style={{ marginTop: "-10px", marginBottom: "-10px" }}
                      variant="outlined"
                      name="major3"
                      autoComplete="off"
                      size={"small"}
                      label="Third Concentration"
                      className={classes.textField}
                      onChange={(event) =>
                        setUserData({ ...userData, major3: event.target.value })
                      }
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

      <Grid container className="profile-build-container">
        <Grid item sm>
          <div class="header-icon-wrap">
            <h2>Interests</h2>
            {(userData.interests1.length +
              userData.interests2.length +
              userData.interests3.length !==
              10) |
              (!userData.interests1.length === 0) ||
            userData.interests2.length === 0 ||
            userData.interests3.length === 0 ? (
              <UncheckedButton color="primary" fontSize="small" />
            ) : (
              <CheckedCircle color="secondary" fontSize="small" />
            )}
          </div>
          <p>Please select 10 categories in which you are interested.</p>
          <Interests getInterests={handleInterests} />
        </Grid>
      </Grid>

      <Grid container align="center">
        <Grid item sm />
        <Grid item sm>
          <h3>
            Thank you for taking the time to build your profile and welcome to
            UConnect!
          </h3>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            className={classes.Button}
            onClick={handleSubmit}
          >
            Create Profile
          </Button>
          {!userData.validProfile && (
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

ProfileBuild.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileBuild);

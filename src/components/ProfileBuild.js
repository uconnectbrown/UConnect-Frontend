// Setup
import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

// MUI Stuff
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import UncheckedButton from "@material-ui/icons/RadioButtonUnchecked";
import CheckedCircle from "@material-ui/icons/CheckCircleOutline";

import Interests from "./Interests.js";

import { Row, Col, Container, Button } from "react-bootstrap";

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
    if (email) {
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
          let emailId = email.split("@")[0];
          console.log("hi");
          return axios.get(`/newfeatured/${emailId}`);
        })
        .then(() => {
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
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Container fluid className="profile-build-container">
        <h1 className={classes.pageTitle}>
          Build Profile
        </h1>
        <div className="header-icon-wrap">
          <h3>Basic Info</h3>
          {userData.firstName === "" ||
          userData.lastName === "" ||
          userData.class === "" ||
          userData.major1 === "" ? (
            <UncheckedButton color="primary" fontSize="small" />
          ) : (
            <CheckedCircle color="secondary" fontSize="small" />
          )}
        </div>
        <Row className="info-input-container">
          <Col xs={12} md={6}>
            <TextField
              className="profile-build-input"
              label="First Name"
              onChange={(event) =>
                setUserData({ ...userData, firstName: event.target.value })
              }
              value={userData.firstName}
              variant="outlined"
              size={"small"}
              required
              // style={{ width: "80%" }}
            />
          </Col>
          <Col xs={12} md={6}>
            <TextField
              label="Last Name"
              className="profile-build-input"
              onChange={(event) =>
                setUserData({ ...userData, lastName: event.target.value })
              }
              value={userData.lastName}
              variant="outlined"
              size={"small"}
              required
            />
          </Col>
          <Col xs={12} md={6}>
            <TextField
              select
              label="Preferred Pronouns"
              className="profile-build-input"
              onChange={(event) =>
                setUserData({ ...userData, pronouns: event.target.value })
              }
              value={userData.pronouns}
              variant="outlined"
              size={"small"}
              helperText="Please select your preferred pronouns"            >
              {pronouns.map((p) => {
                return (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                );
              })}
            </TextField>
          </Col>
          <Col xs={12} md={6}>
            <TextField
              label="Location"
              className="profile-build-input"
              onChange={(event) =>
                setUserData({ ...userData, location: event.target.value })
              }
              value={userData.location}
              variant="outlined"
              size={"small"}            />
          </Col>
          <Col xs={12} md={6}>
            <TextField
              select
              label="Class of ..."
              className="profile-build-input"
              onChange={(event) =>
                setUserData({ ...userData, classYear: event.target.value })
              }
              value={userData.classYear}
              variant="outlined"
              required
              helperText="Please select your graduating class"
              size={"small"}            >
              {classYears.map((year) => {
                return (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                );
              })}
            </TextField>
          </Col>
          <Col xs={12} md={6}>
            <span>
              <TextField
                variant="outlined"
                autoComplete="off"
                size={"small"}
                label="Concentration"
                className="profile-build-input"
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
              />
              {!userData.secondMajor && (
                <Tooltip
                  title="Add Second Concentration"
                  placement="top"
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
          </Col>
          <Col xs={12} md={6}>
            {userData.secondMajor && (
              <div>
                <TextField
                  variant="outlined"
                  name="major2"
                  autoComplete="off"
                  size={"small"}
                  label="Second Concentration"
                  className="profile-build-input"
                  onChange={(event) =>
                    setUserData({ ...userData, major2: event.target.value })
                  }
                  InputProps={{
                    endAdornment: majorList,
                    inputProps: {
                      list: "majors",
                    },
                  }}
                />
                {!userData.thirdMajor && (
                  <Tooltip
                    title="Add Third Concentration"
                    placement="top"
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
          </Col>
          <Col xs={12} md={6}>
            {userData.thirdMajor && (
              <TextField
                variant="outlined"
                name="major3"
                autoComplete="off"
                size={"small"}
                label="Third Concentration"
                className="profile-build-input"
                onChange={(event) =>
                  setUserData({ ...userData, major3: event.target.value })
                }
                InputProps={{
                  endAdornment: majorList,
                  inputProps: {
                    list: "majors",
                  },
                }}
              />
            )}
          </Col>
        </Row>
      </Container>

      <Row className="profile-build-container">
        <div className="header-icon-wrap">
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
      </Row>

      <div className="d-flex flex-column align-items-center text-center py-5">
        <h3 style={{ width: '50%' }}>
          Thank you for taking the time to build your profile and welcome to
          UConnect!
        </h3>
        <Button type="submit" variant="success" size="lg" onClick={handleSubmit} className="mt-3 mb-5">
          Create Profile
        </Button>
        {!userData.validProfile && (
          <p>Please fill out all required fields</p>
        )}
      </div>
    </form>
  );
}

ProfileBuild.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileBuild);

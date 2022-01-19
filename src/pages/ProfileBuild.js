// Setup
import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

// Components
import Interests from "../components/Interests.js";

// MUI Stuff
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";

import { Row, Col, Container, Button } from "react-bootstrap";

// Import Data
import {
  countries as countryList,
  states as stateList,
  majors as majorList,
  pronouns as pronounList,
} from "../resources/profileFields";
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
  let history = useNavigate();
  const [userData, setUserData] = useState(emptyProfile);
  const [email, setEmail] = useState(null);
  const classYears = [
    "2021.5",
    "2022",
    "2022.5",
    "2023",
    "2023.5",
    "2024",
    "2024.5",
    "2025",
  ];
  const { classes } = props;
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const newUserData = {
        // Basic Info
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        classYear: userData.classYear,
        majors: [userData.major1, userData.major2],
        pronouns: userData.pronouns,
        location: {
          country: userData.country.trim(),
          state: userData.state.trim(),
          city: userData.city.trim(),
        },
        email,
        // Interests
        interests1: userData.interests1,
        interests2: userData.interests2,
        interests3: userData.interests3,
      };

      // TO-DO: Check courses validator
      if (!validProfile(newUserData)) {
        setUserData({ ...userData, validProfile: false });
        setLoading(false);
        return;
      }

      axios
        .post("/signup", newUserData)
        .then(() => {
          setUserData({ ...userData, validProfile: true });
        })
        .then(() => {
          props.fetchUser();
          setLoading(false);
        })
        .then(() => {
          history.push({
            pathname: "/discover",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const renderEmptyLocation = () => {
    return (
      <span>
        <TextField
          select
          label="Country of Origin"
          className="profile-build-half-input"
          onChange={(event) =>
            setUserData({ ...userData, country: event.target.value })
          }
          value={userData.country}
          variant="outlined"
          size={"small"}
        >
          {countryList.map((country) => {
            return (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          variant="outlined"
          disabled={true}
          value={"State/City"}
          className="profile-build-half-input"
          size={"small"}
          helperText="Please pick a country first"
        />
      </span>
    );
  };

  const renderUSA = () => {
    return (
      <span>
        <TextField
          select
          label="Country of Origin"
          className="profile-build-half-input"
          onChange={(event) =>
            setUserData({ ...userData, country: event.target.value })
          }
          value={userData.country}
          variant="outlined"
          size={"small"}
        >
          {countryList.map((country) => {
            return (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          select
          label="State"
          className="profile-build-third-input"
          onChange={(event) =>
            setUserData({ ...userData, state: event.target.value })
          }
          value={userData.state}
          variant="outlined"
          size={"small"}
        >
          {stateList.map((country) => {
            return (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          className="profile-build-third-input"
          label="City"
          onChange={(event) =>
            setUserData({ ...userData, city: event.target.value })
          }
          value={userData.city}
          variant="outlined"
          size={"small"}
        />
      </span>
    );
  };

  const renderNotUSA = () => {
    return (
      <span>
        <TextField
          select
          label="Country of Origin"
          className="profile-build-half-input"
          onChange={(event) =>
            setUserData({ ...userData, country: event.target.value })
          }
          value={userData.country}
          variant="outlined"
          size={"small"}
        >
          {countryList.map((country) => {
            return (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          className="profile-build-half-input"
          label="City"
          onChange={(event) =>
            setUserData({ ...userData, city: event.target.value })
          }
          value={userData.city}
          variant="outlined"
          size={"small"}
        />
      </span>
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit} autoComplete="off">
      <Container fluid className="profile-build-container">
        <h1 className={classes.pageTitle}>Build Profile</h1>
        <div className="header-icon-wrap">
          <h3>Basic Info</h3>
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
              autoComplete="off"
              // style={{ width: "80%" }}
            />
          </Col>
          <Col xs={12} md={6}>
            <TextField
              className="profile-build-input"
              label="Last Name"
              onChange={(event) =>
                setUserData({ ...userData, lastName: event.target.value })
              }
              value={userData.lastName}
              variant="outlined"
              size={"small"}
              required
              autoComplete="off"
              // style={{ width: "80%" }}
            />
          </Col>
          <Col xs={12} md={6}>
            <TextField
              variant="outlined"
              autoComplete="off"
              size={"small"}
              label="Preferred Pronouns"
              className="profile-build-input"
              onChange={(event) =>
                setUserData({ ...userData, pronouns: event.target.value })
              }
              InputProps={{
                endAdornment: pronounList,
                inputProps: {
                  list: "pronouns",
                },
              }}
            />
          </Col>
          <Col xs={12} md={6}>
            {!countryList.includes(userData.country) && renderEmptyLocation()}
            {userData.country === "United States of America" && renderUSA()}
            {countryList.includes(userData.country) &&
              userData.country !== "United States of America" &&
              renderNotUSA()}
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
              size={"small"}
            >
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
                <Tooltip title="Add Second Concentration" placement="top">
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
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <Row className="profile-build-container">
        <div className="header-icon-wrap">
          <h2>Interests</h2>
        </div>
        <h6>Please select 3 interests from each category.</h6>
        <Interests getInterests={handleInterests} />
      </Row>

      <div className="d-flex flex-column align-items-center text-center py-5">
        <h3 style={{ width: "50%" }}>
          Thank you for taking the time to build your profile and welcome to
          UConnect!
        </h3>
        <Tooltip
          className="mt-5"
          title={
            !validProfile({
              firstName: userData.firstName.trim(),
              lastName: userData.lastName.trim(),
              classYear: userData.classYear,
              majors: [userData.major1, userData.major2, userData.major3],
              email,
              interests1: userData.interests1,
              interests2: userData.interests2,
              interests3: userData.interests3,
            })
              ? "Please fill out all required fields"
              : ""
          }
        >
          <span>
            <Button
              type="submit"
              style={{ position: "relative" }}
              size="lg"
              onClick={handleSubmit}
              className="mb-5"
              disabled={
                loading ||
                !validProfile({
                  firstName: userData.firstName.trim(),
                  lastName: userData.lastName.trim(),
                  classYear: userData.classYear,
                  majors: [userData.major1, userData.major2],
                  email,
                  interests1: userData.interests1,
                  interests2: userData.interests2,
                  interests3: userData.interests3,
                })
              }
            >
              Create Profile
            </Button>
          </span>
        </Tooltip>
      </div>
    </form>
  );
}

ProfileBuild.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileBuild);

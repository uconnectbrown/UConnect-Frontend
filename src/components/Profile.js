// Setup
import React, { useState, useEffect } from "react";
import axios from "axios";
import { db, auth } from "../firebase";

// Components
import NavBar from "../components/NavBar";
import Interests from "../components/Interests.js";
import Crop from "../cropUtil/Crop.js";

// Resources
import majorList from "../resources/majors";
import varsitySports from "../resources/varsitySports";
import greekLife from "../resources/greekLife";
import {
  instrumentsList,
  pickUpSportsList,
  petsList,
} from "../resources/additionalInfo";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import AddCircle from "@material-ui/icons/AddCircle";
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
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dots from "@material-ui/icons/MoreHoriz";
import Book from "@material-ui/icons/MenuBook";
import Movie from "@material-ui/icons/Movie";
import Tv from "@material-ui/icons/Tv";
import Music from "@material-ui/icons/MusicNote";
import Pets from "@material-ui/icons/Pets";
import Sports from "@material-ui/icons/SportsBasketball";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

// Styles
import "./profileView.css";

// Body
function Profile() {
  const emailId = auth.currentUser.email.split("@")[0];
  const [profile, setProfile] = useState(null);
  const [indexArray, setIndexArray] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    axios
      .get(`/user/${emailId}`)
      .then((res) => {
        setProfile(res.data.user);
        let arr = [];
        for (let j = 0; j < 5; j++) {
          if (res.data.user.courses[j].code) {
            arr.push(j);
          }
        }
        setIndexArray(arr);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {profile && (
        <div>
          <Card raised>
            <CardContent align="center">
              <Grid container spacing={1}>
                <Grid item sm></Grid>
                <Grid item sm>
                  <img
                    alt="Profile"
                    src={profile.imageUrl}
                    style={{
                      width: 400,
                      height: 400,
                      objectFit: "cover",
                      borderRadius: "10%",
                      borderStyle: "solid",
                      borderColor: "red",
                      borderWidth: "2px",
                    }}
                  />
                  <br />
                </Grid>
                <Grid item sm></Grid>
              </Grid>

              <br />
              <Card raised style={{ display: "inline-block" }}>
                <CardContent>
                  <span>
                    <Typography variant="h3" align="center">
                      {profile.firstName} {profile.lastName}{" "}
                    </Typography>
                  </span>
                  <Typography variant="h5">
                    {profile.preferredPronouns &&
                      `(${profile.preferredPronouns})`}
                  </Typography>
                  <br />
                  <Typography variant="h5">
                    Class of {profile.classYear}
                  </Typography>
                  <Typography variant="h5">
                    Concentration(s): {profile.major1}
                    {profile.major2 && `, ${profile.major2}`}
                    {profile.major3 && `, ${profile.major3}`}
                  </Typography>
                </CardContent>
              </Card>
              <br />
              <br />
              {profile.bio && (
                <Card raised style={{ display: "inline-block" }}>
                  <CardContent>
                    <span>
                      <Typography variant="h4" align="center">
                        Bio
                      </Typography>
                    </span>
                    {profile.bio}{" "}
                  </CardContent>
                </Card>
              )}
              <br />
              <Grid container spacing={2}>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: "red",
                      height: "100%",
                      marginBottom: "-5px",
                    }}
                  >
                    <CardContent>
                      <div>
                        <span>
                          <Typography variant="h5">Groups</Typography>
                        </span>
                        <br />
                        {profile.group1 && (
                          <Typography>• {profile.group1}</Typography>
                        )}
                        {profile.group2 && (
                          <Typography>• {profile.group2}</Typography>
                        )}
                        {profile.group3 && (
                          <Typography>• {profile.group3}</Typography>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: "red",
                      height: "100%",
                      marginBottom: "-5px",
                    }}
                  >
                    <CardContent>
                      <div>
                        <span>
                          <Typography variant="h5">Varsity Sports</Typography>
                        </span>
                        <br />
                        {profile.varsitySport1 && (
                          <Typography>• {profile.varsitySport1}</Typography>
                        )}
                        {profile.varsitySport2 && (
                          <Typography>• {profile.varsitySport2}</Typography>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: "red",
                      height: "100%",
                      marginBottom: "-5px",
                    }}
                  >
                    <CardContent>
                      <div>
                        <span>
                          <Typography variant="h5">
                            Greek Organization
                          </Typography>
                        </span>
                        <br />
                        {profile.greekLife && (
                          <Typography>• {profile.greekLife}</Typography>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <br />
          <Card raised>
            <CardContent align="center">
              <Typography variant="h3">Interests </Typography>
              <hr />
              <br />
              <Grid container spacing={2}>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",

                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5">Career and Academic</Typography>
                      <br />
                      {profile.interests1.map((interest) => {
                        return <Typography>• {interest}</Typography>;
                      })}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",

                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5">
                        Physical Activity and Wellness
                      </Typography>
                      <br />
                      {profile.interests2.map((interest) => {
                        return <Typography>• {interest}</Typography>;
                      })}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5">General Hobbies</Typography>
                      <br />
                      {profile.interests3.map((interest) => {
                        return <Typography>• {interest}</Typography>;
                      })}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <br />
              <br />
              <Card raised style={{ marginBottom: "-5px" }}>
                <CardContent>
                  <Typography variant="h4">Additional Info</Typography>
                  <hr />
                  <br />
                  <Grid container>
                    <Grid item sm>
                      <div>
                        <Music />
                        <span>
                          <Typography variant="h6">Instruments</Typography>
                        </span>
                        <br />
                        {profile.instrument1 && (
                          <Typography>• {profile.instrument1}</Typography>
                        )}
                        {profile.instrument2 && (
                          <Typography>• {profile.instrument2}</Typography>
                        )}
                        {profile.instrument3 && (
                          <Typography>• {profile.instrument3}</Typography>
                        )}
                      </div>
                    </Grid>
                    <Grid item sm>
                      <div>
                        <Sports />
                        <span>
                          <Typography variant="h6">Pick-Up Sports</Typography>
                        </span>
                        <br />
                        {profile.pickUpSport1 && (
                          <Typography>• {profile.pickUpSport1}</Typography>
                        )}
                        {profile.pickUpSport2 && (
                          <Typography>• {profile.pickUpSport2}</Typography>
                        )}
                        {profile.pickUpSport3 && (
                          <Typography>• {profile.pickUpSport3}</Typography>
                        )}
                      </div>
                    </Grid>
                    <Grid item sm>
                      <div>
                        <Pets />
                        <span>
                          <Typography variant="h6">Pets</Typography>
                        </span>
                        <br />
                        {profile.pet1 && (
                          <Typography>• {profile.pet1}</Typography>
                        )}
                        {profile.pet2 && (
                          <Typography>• {profile.pet2}</Typography>
                        )}
                        {profile.pet3 && (
                          <Typography>• {profile.pet3}</Typography>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          <br />
          <Card raised>
            <CardContent align="center">
              <Typography variant="h3">Favorites </Typography>
              <hr />
              <br />
              <Grid container spacing={2}>
                <Grid item sm>
                  <div>
                    <Book />
                    <Typography variant="body1">
                      Book: {profile.favoriteBook}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm>
                  <div>
                    <Movie />
                    <Typography variant="body1">
                      Movie: {profile.favoriteMovie}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm>
                  <div>
                    <Tv />
                    <Typography variant="body1">
                      Show: {profile.favoriteShow}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm>
                  <div>
                    <Music />
                    <Typography variant="body1">
                      Artist: {profile.favoriteArtist}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
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
                        borderWidth: "3px",
                        borderColor: `${profile.courses[index].color}`,
                        height: "100%",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          style={{
                            color: `${profile.courses[index].color}`,
                          }}
                        >
                          {profile.courses[index].code}
                        </Typography>
                        <Typography variant="body1">
                          {profile.courses[index].name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
          <br />
        </div>
      )}
    </div>
  );
}

export default Profile;

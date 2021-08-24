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
import "./Profile.css";

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
        <div className="profile-card">
          <div className="column-1">
            <img alt="Profile" src={profile.imageUrl} className="profile-img"/>
            <p>{profile.firstName} {profile.lastName}</p>
          </div>
          <div className="column-2">
            <div className="section-container">
              <h4>Interests</h4>
            </div>
            <div className="section-container">
              <h4>Additional Info</h4>
            </div>
            <div className="section-container">
              <h4>Favourites</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

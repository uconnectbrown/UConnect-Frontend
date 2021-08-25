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

import { Container, Row, Col } from "react-bootstrap";
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
    <Container className="px-0 py-3">
      {profile && (
        <Row className="profile-card">
          <Col sm={4}>
             <center><img alt="Profile" src={profile.imageUrl} className="profile-img"/></center>
            <p><center> {profile.firstName} {profile.lastName}</center></p>
            <h4><center> {profile.preferredPronouns}</center></h4>
            <h4><center>Class of {profile.classYear}</center></h4>
            <h4><center>Computer Science {profile.major1}</center></h4>
            <br></br>
              <p id="normaltext"><strong>Bio: </strong>Interested in the intersection between tech and art!{profile.bio}</p>
              <p id="normaltext"><strong>Group: </strong>{profile.group1}</p>
              <p id="normaltext"><strong>Varsity Sports: </strong>{profile.varsitySport1}</p>
              <p id="normaltext"><strong>Greek Life: </strong>{profile.greekLife}</p>
          </Col>
          <Col sm={8}>
            <Row className="section-container">
              <p id="subheading"><center>Courses</center></p>
              <Col>
                <div class="card">
                <div class="course-body">
                  <div class="course-title"><center>CODE 0001{profile.course1}</center></div>
                   <div class="course-text"><center>Principles of Economics</center></div>
                </div>
                </div>
               </Col>
               <Col>
                <div class="card">
                <div class="course-body">
                  <div class="course-title"><center>CODE 0002{profile.course1}</center></div>
                   <div class="course-text"><center>Principles of Economics</center></div>
                </div>
                </div>
               </Col>
               <Col>
                <div class="card">
                <div class="course-body">
                  <div class="course-title"><center>CODE 0003{profile.course1}</center></div>
                   <div class="course-text"><center>Principles of Economics</center></div>
                </div>
                </div>
               </Col>
               <Col>
                <div class="card">
                <div class="course-body">
                  <div class="course-title"><center>CODE 0004{profile.course1}</center></div>
                   <div class="course-text"><center>Principles of Economics</center></div>
                </div>
                </div>
               </Col>
            </Row>
            <Row className="section-container2">
             <p id="subheading"><center>Interests</center></p>
              <Col sm={4}>
                 <p id="normaltext"><center><strong>Career and Academic</strong></center></p>
                <div class="card" id="interest-card">
                <div class="interest-body">
                  <p id="normaltext"><center>{profile.interests1}</center></p>
                </div>
                </div>
               </Col>
               <Col sm={4}>
                <p id="normaltext"><center><strong>Physical Activity and Wellness</strong></center></p>
                <div class="card" id="interest-card">
                <div class="interest-body">
                 <p id="normaltext"><center>{profile.interests2}</center></p>
                </div>
                </div>
               </Col>
               <Col sm={4}>
                <p id="normaltext"><center><strong>General Hobbies</strong></center></p>
                <div class="card" id="interest-card">
                <div class="interest-body">
                  <p id="normaltext"><center>{profile.interests3}</center></p>
                </div>
                </div>
               </Col>
            </Row>
            <Row className="section-container3">
              <p id="subheading"><center>Additional Info</center></p>
              <Col>
                 <p id="normaltext"><center><strong>Pick Up Sports</strong></center></p>
                <div class="card" id="adinfo-card">
                <div class="adinfo-body">
                  <p id="normaltext"><center>text</center></p>
                </div>
                </div>
               </Col>
               <Col>
                <p id="normaltext"><center><strong>Instruments</strong></center></p>
                <div class="card" id="adinfo-card">
                <div class="adinfo-body">
                 <p id="normaltext"><center>text</center></p>
                </div>
                </div>
               </Col>
               <Col>
                <p id="normaltext"><center><strong>Gaming</strong></center></p>
                <div class="card" id="adinfo-card">
                <div class="adinfo-body">
                  <p id="normaltext"><center>text</center></p>
                </div>
                </div>
               </Col>
               <Col>
                <p id="normaltext"><center><strong>Pets</strong></center></p>
                <div class="card" id="adinfo-card">
                <div class="adinfo-body">
                  <p id="normaltext"><center>text</center></p>
                </div>
                </div>
               </Col>
            </Row>
            <Row className="section-container4">
              <p id="subheading"><center>Favourites</center></p>
              <Col sm={3}>
              <p id="normaltext"><center><strong>Movies</strong></center></p>
                <div class="card" id="fav-card">
                <div class="fav-body">
                  <p id="normaltext"><center>text</center></p>
                </div>
                </div>
               </Col>
               <Col sm={3}>
              <p id="normaltext"><center><strong>Artists/Bands</strong></center></p>
                <div class="card" id="fav-card">
                <div class="fav-body">
                  <p id="normaltext"><center>text</center></p>
                </div>
                </div>
               </Col>
               <Col sm={3}>
              <p id="normaltext"><center><strong>Food</strong></center></p>
                <div class="card" id="fav-card">
                <div class="fav-body">
                  <p id="normaltext"><center>text</center></p>
                </div>
                </div>
               </Col>
               <Col sm={3}>
              <p id="normaltext"><center><strong>Celebrity</strong></center></p>
                <div class="card" id="fav-card">
                <div class="fav-body">
                  <p id="normaltext"><center>text</center></p>
                </div>
                </div>
               </Col>
               
               
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Profile;

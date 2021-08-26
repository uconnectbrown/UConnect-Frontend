// Setup
import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

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

import { Container, Row, Col } from "react-bootstrap";
import "./Profile.css";

// Body
function Profile() {
  const [emailId, setEmailId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [newProfile, setNewProfile] = useState(null);
  const [indexArray, setIndexArray] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setEmailId(auth.currentUser.email.split("@")[0]);
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [emailId]);

  const getProfile = () => {
    axios
      .get(`/user/${emailId}`)
      .then((res) => {
        console.log(res.data.user);
        setProfile(res.data.user);
        setNewProfile(res.data.user);
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

  const editProfile = () => {
    axios
      .post(`/edit/${emailId}`, newProfile)
      .then(() => {
        setProfile(newProfile);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setNewProfile({ ...newProfile, [event.target.name]: event.target.value });
  };

  return (
    <Container className="px-0 py-3">
      {profile && (
        <Row className="profile-card">
          <Col sm={4} style={{ justifyContent: "center" }}>
            <img alt="Profile" src={profile.imageUrl} className="profile-img" />
            <p>
              {profile.firstName} {profile.lastName}
            </p>
            <h4> {profile.preferredPronouns}</h4>
            <h4>Class of {profile.classYear}</h4>
            <h4>Computer Science {profile.major1}</h4>
            <br></br>
            <p id="normaltext">
              <strong>Bio: </strong>Interested in the intersection between tech
              and art!{profile.bio}
            </p>
            <p id="normaltext">
              <strong>Group: </strong>
              {profile.group1}
            </p>
            <p id="normaltext">
              <strong>Varsity Sports: </strong>
              {profile.varsitySport1}
            </p>
            <p id="normaltext">
              <strong>Greek Life: </strong>
              {profile.greekLife}
            </p>
          </Col>
          <Col sm={8}>
            <Row
              className="section-container0"
              style={{ justifyContent: "flex-end", margin: "1rem" }}
            >
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                style={{ width: "5rem" }}
              >
                Edit
              </button>
            </Row>
            <Row className="section-container1">
              <Col sm={3}>
                <div class="card">
                  <div class="course-title">CODE 0001{profile.course1}</div>
                  <div class="course-text">Principles of Economics</div>
                </div>
              </Col>
              <Col sm={3}>
                <div class="card">
                  <div class="course-title">CODE 0002{profile.course1}</div>
                  <div class="course-text">Principles of Economics</div>
                </div>
              </Col>
              <Col sm={3}>
                <div class="card">
                  <div class="course-title">CODE 0003{profile.course1}</div>
                  <div class="course-text">Principles of Economics</div>
                </div>
              </Col>
              <Col sm={3}>
                <div class="card">
                  <div class="course-title">CODE 0004{profile.course1}</div>
                  <div class="course-text">Principles of Economics</div>
                </div>
              </Col>
            </Row>
            <Row className="section-container2">
              <p id="subheading">Interests</p>
              <Col sm={4}>
                <p id="normaltext">
                  <strong>Career and Academic</strong>
                </p>
                <div class="card" id="interest-card">
                  <p id="normaltext">
                    {profile.interests1.map((interest) => interest + ", ")}
                  </p>
                </div>
              </Col>
              <Col sm={4}>
                <p id="normaltext">
                  <strong>Physical Activity and Wellness</strong>
                </p>
                <div class="card" id="interest-card">
                  <p id="normaltext">
                    {profile.interests2.map((interest) => interest + ", ")}
                  </p>
                </div>
              </Col>
              <Col sm={4}>
                <p id="normaltext">
                  <strong>General Hobbies</strong>
                </p>
                <div class="card" id="interest-card">
                  <p id="normaltext">
                    {profile.interests3.map((interest) => interest + ", ")}
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="section-container3">
              <p id="subheading">Additional Info</p>
              <Col sm={3}>
                <p id="normaltext">
                  <strong>Pick Up Sports</strong>
                </p>
                <div class="card" id="adinfo-card">
                  <p id="normaltext">text</p>
                </div>
              </Col>
              <Col sm={3}>
                <p id="normaltext">
                  <strong>Instruments</strong>
                </p>
                <div class="card" id="adinfo-card">
                  <p id="normaltext">text</p>
                </div>
              </Col>
              <Col sm={3}>
                <p id="normaltext">
                  <strong>Gaming</strong>
                </p>
                <div class="card" id="adinfo-card">
                  <p id="normaltext">text</p>
                </div>
              </Col>
              <Col sm={3}>
                <p id="normaltext">
                  <strong>Pets</strong>
                </p>
                <div class="card" id="adinfo-card">
                  <p id="normaltext">text</p>
                </div>
              </Col>
            </Row>
            <Row className="section-container4">
              <p id="subheading">Favourites</p>
              <Col sm={3}>
                <p id="normaltext">
                  <strong>Movies</strong>
                </p>
                <div class="card" id="fav-card">
                  <p id="normaltext">text</p>
                </div>
              </Col>
              <Col sm={3}>
                <p id="normaltext">
                  <strong>Artists/Bands</strong>
                </p>
                <div class="card" id="fav-card">
                  <p id="normaltext">text</p>
                </div>
              </Col>
              <Col sm={3}>
                <p id="normaltext">
                  <strong>Food</strong>
                </p>
                <div class="card" id="fav-card">
                  <p id="normaltext">text</p>
                </div>
              </Col>
              <Col sm={3}>
                <p id="normaltext">
                  <strong>Celebrity</strong>
                </p>
                <div class="card" id="fav-card">
                  <p id="normaltext">text</p>
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

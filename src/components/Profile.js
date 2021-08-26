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
          <Col sm={4}>
            <center>
              <img
                alt="Profile"
                src={profile.imageUrl}
                className="profile-img"
              />
            </center>
            {!edit && (
              <p>
                <center>
                  {profile.firstName} {profile.lastName}
                </center>
              </p>
            )}
            {edit && (
              <React.Fragment>
                <input
                  value={newProfile.firstName}
                  name="firstName"
                  onChange={handleChange}
                />
                <input
                  value={newProfile.lastName}
                  name="lastName"
                  onChange={handleChange}
                />
              </React.Fragment>
            )}

            <h4>
              <center> {profile.preferredPronouns}</center>
            </h4>
            <h4>
              <center>Class of {profile.classYear}</center>
            </h4>
            <h4>
              <center>Computer Science {profile.major1}</center>
            </h4>
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
            <Row className="section-container0">
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col>
                {!edit && (
                  <button
                    onClick={() => setEdit(true)}
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                  >
                    Edit
                  </button>
                )}

                {edit && (
                  <button
                    onClick={() => {
                      setEdit(false);
                      editProfile();
                    }}
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                  >
                    Save
                  </button>
                )}
              </Col>
            </Row>
            <Row className="section-container1">
              <Col>
                <div class="card">
                  <div class="course-body">
                    <div class="course-title">
                      <center>CODE 0001{profile.course1}</center>
                    </div>
                    <div class="course-text">
                      <center>Principles of Economics</center>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div class="card">
                  <div class="course-body">
                    <div class="course-title">
                      <center>CODE 0002{profile.course1}</center>
                    </div>
                    <div class="course-text">
                      <center>Principles of Economics</center>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div class="card">
                  <div class="course-body">
                    <div class="course-title">
                      <center>CODE 0003{profile.course1}</center>
                    </div>
                    <div class="course-text">
                      <center>Principles of Economics</center>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div class="card">
                  <div class="course-body">
                    <div class="course-title">
                      <center>CODE 0004{profile.course1}</center>
                    </div>
                    <div class="course-text">
                      <center>Principles of Economics</center>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="section-container2">
              <p id="subheading">
                <center>Interests</center>
              </p>
              <Col sm={4}>
                <p id="normaltext">
                  <center>
                    <strong>Career and Academic</strong>
                  </center>
                </p>
                <div class="card" id="interest-card">
                  <div class="interest-body">
                    <p id="normaltext">
                      <center>
                        {profile.interests1.map((interest) => interest + ", ")}
                      </center>
                    </p>
                  </div>
                </div>
              </Col>
              <Col sm={4}>
                <p id="normaltext">
                  <center>
                    <strong>Physical Activity and Wellness</strong>
                  </center>
                </p>
                <div class="card" id="interest-card">
                  <div class="interest-body">
                    <p id="normaltext">
                      <center>
                        {profile.interests2.map((interest) => interest + ", ")}
                      </center>
                    </p>
                  </div>
                </div>
              </Col>
              <Col sm={4}>
                <p id="normaltext">
                  <center>
                    <strong>General Hobbies</strong>
                  </center>
                </p>
                <div class="card" id="interest-card">
                  <div class="interest-body">
                    <p id="normaltext">
                      <center>
                        {profile.interests3.map((interest) => interest + ", ")}
                      </center>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="section-container3">
              <p id="subheading">
                <center>Additional Info</center>
              </p>
              <Col>
                <p id="normaltext">
                  <center>
                    <strong>Pick Up Sports</strong>
                  </center>
                </p>
                <div class="card" id="adinfo-card">
                  <div class="adinfo-body">
                    <p id="normaltext">
                      <center>text</center>
                    </p>
                  </div>
                </div>
              </Col>
              <Col>
                <p id="normaltext">
                  <center>
                    <strong>Instruments</strong>
                  </center>
                </p>
                <div class="card" id="adinfo-card">
                  <div class="adinfo-body">
                    <p id="normaltext">
                      <center>text</center>
                    </p>
                  </div>
                </div>
              </Col>
              <Col>
                <p id="normaltext">
                  <center>
                    <strong>Gaming</strong>
                  </center>
                </p>
                <div class="card" id="adinfo-card">
                  <div class="adinfo-body">
                    <p id="normaltext">
                      <center>text</center>
                    </p>
                  </div>
                </div>
              </Col>
              <Col>
                <p id="normaltext">
                  <center>
                    <strong>Pets</strong>
                  </center>
                </p>
                <div class="card" id="adinfo-card">
                  <div class="adinfo-body">
                    <p id="normaltext">
                      <center>text</center>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="section-container4">
              <p id="subheading">
                <center>Favourites</center>
              </p>
              <Col sm={3}>
                <p id="normaltext">
                  <center>
                    <strong>Movies</strong>
                  </center>
                </p>
                <div class="card" id="fav-card">
                  <div class="fav-body">
                    <p id="normaltext">
                      <center>text</center>
                    </p>
                  </div>
                </div>
              </Col>
              <Col sm={3}>
                <p id="normaltext">
                  <center>
                    <strong>Artists/Bands</strong>
                  </center>
                </p>
                <div class="card" id="fav-card">
                  <div class="fav-body">
                    <p id="normaltext">
                      <center>text</center>
                    </p>
                  </div>
                </div>
              </Col>
              <Col sm={3}>
                <p id="normaltext">
                  <center>
                    <strong>Food</strong>
                  </center>
                </p>
                <div class="card" id="fav-card">
                  <div class="fav-body">
                    <p id="normaltext">
                      <center>text</center>
                    </p>
                  </div>
                </div>
              </Col>
              <Col sm={3}>
                <p id="normaltext">
                  <center>
                    <strong>Celebrity</strong>
                  </center>
                </p>
                <div class="card" id="fav-card">
                  <div class="fav-body">
                    <p id="normaltext">
                      <center>text</center>
                    </p>
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

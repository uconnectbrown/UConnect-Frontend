// Setup
import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";

// Resources
import {
  majors,
  greekLife,
  instruments,
  pickUpSports,
  pets,
  varsitySports,
  CandAinterests,
  PAandWinterests,
  GHinterests,
  courseList,
} from "../resources/editFields";

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

  const handleArrChange = (event, index) => {
    let newArr = [...newProfile[event.target.name]];
    newArr[index] = event.target.value;
    setNewProfile({
      ...newProfile,
      [event.target.name]: newArr,
    });
  };

  const handleCourseChange = (event, index) => {
    let newCourses = [...newProfile.courses];
    let newCourse = {
      code: event.target.value.split(":")[0],
      name: event.target.value.split(":")[1],
      color: "#ffffff",
    };
    newCourses[index] = newCourse;
    console.log(newCourses);
    setNewProfile({
      ...newProfile,
      courses: newCourses,
    });
  };

  const renderProfile = () => {
    return (
      <Row className="profile-card">
        <Col sm={4} style={{ justifyContent: "center" }}>
          <img alt="Profile" src={profile.imageUrl} className="profile-img" />
          <p>
            {profile.firstName} {profile.lastName}
          </p>
          <h4> {profile.pronouns}</h4>
          <h4>Class of {profile.classYear}</h4>
          <h4>{profile.majors.map((major) => major + ", ")}</h4>
          <br></br>
          <p id="normaltext">
            <strong>Bio: </strong>
            {profile.bio}
          </p>
          <p id="normaltext">
            <strong>Groups: </strong>
            {profile.groups.map((group) => group + ", ")}
          </p>
          <p id="normaltext">
            <strong>Varsity Sports: </strong>
            {profile.varsitySports.map((sport) => sport + ", ")}
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
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          </Row>
          <Row className="section-container1">
            <Col sm={3}>
              <div class="card">
                <div class="course-title">{profile.courses[0].code}</div>
                <div class="course-text">{profile.courses[0].name}</div>
              </div>
            </Col>
            <Col sm={3}>
              <div class="card">
                <div class="course-title">{profile.courses[1].code}</div>
                <div class="course-text">{profile.courses[1].name}</div>
              </div>
            </Col>
            <Col sm={3}>
              <div class="card">
                <div class="course-title">{profile.courses[2].code}</div>
                <div class="course-text">{profile.courses[2].name}</div>
              </div>
            </Col>
            <Col sm={3}>
              <div class="card">
                <div class="course-title">{profile.courses[3].code}</div>
                <div class="course-text">{profile.courses[3].name}</div>
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
                <p id="normaltext">
                  {profile.pickUpSports.map((sport) => sport + ", ")}
                </p>
              </div>
            </Col>
            <Col sm={3}>
              <p id="normaltext">
                <strong>Instruments</strong>
              </p>
              <div class="card" id="adinfo-card">
                <p id="normaltext">
                  {profile.instruments.map((instrument) => instrument + ", ")}
                </p>
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
                <p id="normaltext">{profile.pets.map((pet) => pet + ", ")}</p>
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
    );
  };

  const renderEdit = () => {
    return (
      <Row className="profile-card">
        <Col sm={4} style={{ justifyContent: "center" }}>
          <img alt="Profile" src={profile.imageUrl} className="profile-img" />
          <p>
            <input
              value={newProfile.firstName}
              onChange={handleChange}
              name="firstName"
            />
            <input
              value={newProfile.lastName}
              onChange={handleChange}
              name="lastName"
            />
          </p>
          <select
            name="pronouns"
            id="pronouns"
            onChange={handleChange}
            value={newProfile.pronouns}
          >
            <option value="he/him">he/him</option>
            <option value="she/her">she/her</option>
            <option value="they/them">they/them</option>
            <option value="ze/hir">ze/hir</option>
          </select>
          <h4>
            Class of
            <select
              name="classYear"
              id="classYear"
              onChange={handleChange}
              value={newProfile.classYear}
            >
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </h4>
          <label>
            Major:
            <input
              list="majors"
              name="majors"
              onChange={(e) => {
                handleArrChange(e, 0);
              }}
              value={newProfile.majors[0]}
            />
          </label>
          <datalist id="majors">
            {majors.map((major, i) => {
              return <option key={i} value={major} />;
            })}
          </datalist>
          <label>
            Major 2 (optional):
            <input
              list="majors"
              name="majors"
              onChange={(e) => {
                handleArrChange(e, 1);
              }}
              value={newProfile.majors[1]}
            />
          </label>
          <datalist id="majors">
            {majors.map((major, i) => {
              return <option key={i} value={major} />;
            })}
          </datalist>
          <label>
            Major 3 (optional):
            <input
              list="majors"
              name="majors"
              onChange={(e) => {
                handleArrChange(e, 2);
              }}
              value={newProfile.majors[2]}
            />
          </label>
          <datalist id="majors">
            {majors.map((major, i) => {
              return <option key={i} value={major} />;
            })}
          </datalist>
          <br></br>
          <p id="normaltext">
            Bio:
            <input value={newProfile.bio} onChange={handleChange} name="bio" />
          </p>
          <p id="normaltext">
            <label>
              Group 1:
              <input
                name="groups"
                onChange={(e) => {
                  handleArrChange(e, 0);
                }}
                value={newProfile.groups[0]}
              />
            </label>
            <label>
              Group 2:
              <input
                name="groups"
                onChange={(e) => {
                  handleArrChange(e, 1);
                }}
                value={newProfile.groups[1]}
              />
            </label>
            <label>
              Group 2:
              <input
                name="groups"
                onChange={(e) => {
                  handleArrChange(e, 2);
                }}
                value={newProfile.groups[2]}
              />
            </label>
          </p>
          <p id="normaltext">
            <label>
              Varisty Sport 1:
              <input
                list="varsitySports"
                name="varsitySports"
                onChange={(e) => {
                  handleArrChange(e, 0);
                }}
                value={newProfile.varsitySports[0]}
              />
            </label>
            <datalist id="varsitySports">
              {varsitySports.map((sport, i) => {
                return <option key={i} value={sport} />;
              })}
            </datalist>
            <label>
              Varisty Sport 2:
              <input
                list="varsitySports"
                name="varsitySports"
                onChange={(e) => {
                  handleArrChange(e, 1);
                }}
                value={newProfile.varsitySports[1]}
              />
            </label>
            <datalist id="varsitySports">
              {varsitySports.map((sport, i) => {
                return <option key={i} value={sport} />;
              })}
            </datalist>
          </p>
          <p id="normaltext">
            <label>
              Greek Life:
              <input
                list="greekLife"
                name="greekLife"
                onChange={handleChange}
                value={newProfile.greekLife}
              />
            </label>
            <datalist id="greekLife">
              {greekLife.map((greek, i) => {
                return <option key={i} value={greek} />;
              })}
            </datalist>
          </p>
        </Col>
        <Col sm={8}>
          <Row
            className="section-container0"
            style={{ justifyContent: "flex-end", margin: "1rem" }}
          >
            <React.Fragment>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                style={{ width: "5rem" }}
                onClick={() => {
                  setEdit(false);
                  editProfile();
                }}
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                style={{ width: "5rem" }}
                onClick={() => {
                  setEdit(false);
                  setNewProfile(profile);
                }}
              >
                Cancel
              </button>
            </React.Fragment>
          </Row>
          <Row className="section-container1">
            <Col sm={3}>
              <div class="card">
                <label>
                  Course 1
                  <input
                    list="courseCodes"
                    name="courses"
                    onChange={(e) => {
                      handleCourseChange(e, 0);
                    }}
                    value={newProfile.courses[0].code}
                  />
                </label>

                <datalist id="courseCodes">
                  {courseList.map((course, i) => {
                    return (
                      <option key={i} value={course[0] + ": " + course[1]} />
                    );
                  })}
                </datalist>
              </div>
            </Col>
            <Col sm={3}>
              <div class="card">
                <label>
                  Course 2
                  <input
                    list="courseCodes"
                    name="courses"
                    onChange={(e) => {
                      handleCourseChange(e, 1);
                    }}
                    value={newProfile.courses[1].code}
                  />
                </label>

                <datalist id="courseCodes">
                  {courseList.map((course, i) => {
                    return (
                      <option key={i} value={course[0] + ": " + course[1]} />
                    );
                  })}
                </datalist>
              </div>
            </Col>
            <Col sm={3}>
              <div class="card">
                <label>
                  Course 3
                  <input
                    list="courseCodes"
                    name="courses"
                    onChange={(e) => {
                      handleCourseChange(e, 2);
                    }}
                    value={newProfile.courses[2].code}
                  />
                </label>

                <datalist id="courseCodes">
                  {courseList.map((course, i) => {
                    return (
                      <option key={i} value={course[0] + ": " + course[1]} />
                    );
                  })}
                </datalist>
              </div>
            </Col>
            <Col sm={3}>
              <div class="card">
                <label>
                  Course 4
                  <input
                    list="courseCodes"
                    name="courses"
                    onChange={(e) => {
                      handleCourseChange(e, 3);
                    }}
                    value={newProfile.courses[3].code}
                  />
                </label>

                <datalist id="courseCodes">
                  {courseList.map((course, i) => {
                    return (
                      <option key={i} value={course[0] + ": " + course[1]} />
                    );
                  })}
                </datalist>
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
                <input
                  list="pickUpSports"
                  name="pickUpSports"
                  onChange={(e) => {
                    handleArrChange(e, 0);
                  }}
                  value={newProfile.pickUpSports[0]}
                />
                <datalist id="pickUpSports">
                  {pickUpSports.map((sport, i) => {
                    return <option key={i} value={sport} />;
                  })}
                </datalist>

                <input
                  list="pickUpSports"
                  name="pickUpSports"
                  onChange={(e) => {
                    handleArrChange(e, 1);
                  }}
                  value={newProfile.pickUpSports[1]}
                />
                <datalist id="pickUpSports">
                  {majors.map((sport, i) => {
                    return <option key={i} value={sport} />;
                  })}
                </datalist>
                <input
                  list="pickUpSports"
                  name="pickUpSports"
                  onChange={(e) => {
                    handleArrChange(e, 2);
                  }}
                  value={newProfile.pickUpSports[2]}
                />
                <datalist id="pickUpSports">
                  {pickUpSports.map((sport, i) => {
                    return <option key={i} value={sport} />;
                  })}
                </datalist>
              </div>
            </Col>
            <Col sm={3}>
              <p id="normaltext">
                <strong>Instruments</strong>
              </p>
              <div class="card" id="adinfo-card">
                <input
                  list="instruments"
                  name="instruments"
                  onChange={(e) => {
                    handleArrChange(e, 0);
                  }}
                  value={newProfile.instruments[0]}
                />
                <datalist id="instruments">
                  {instruments.map((sport, i) => {
                    return <option key={i} value={sport} />;
                  })}
                </datalist>

                <input
                  list="instruments"
                  name="instruments"
                  onChange={(e) => {
                    handleArrChange(e, 1);
                  }}
                  value={newProfile.instruments[1]}
                />
                <datalist id="instruments">
                  {majors.map((sport, i) => {
                    return <option key={i} value={sport} />;
                  })}
                </datalist>
                <input
                  list="instruments"
                  name="instruments"
                  onChange={(e) => {
                    handleArrChange(e, 2);
                  }}
                  value={newProfile.instruments[2]}
                />
                <datalist id="instruments">
                  {instruments.map((sport, i) => {
                    return <option key={i} value={sport} />;
                  })}
                </datalist>
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
                <input
                  list="pets"
                  name="pets"
                  onChange={(e) => {
                    handleArrChange(e, 0);
                  }}
                  value={newProfile.pets[0]}
                />
                <datalist id="pets">
                  {pets.map((sport, i) => {
                    return <option key={i} value={sport} />;
                  })}
                </datalist>

                <input
                  list="pets"
                  name="pets"
                  onChange={(e) => {
                    handleArrChange(e, 1);
                  }}
                  value={newProfile.pets[1]}
                />
                <datalist id="pets">
                  {majors.map((sport, i) => {
                    return <option key={i} value={sport} />;
                  })}
                </datalist>
                <input
                  list="pets"
                  name="pets"
                  onChange={(e) => {
                    handleArrChange(e, 2);
                  }}
                  value={newProfile.pets[2]}
                />
                <datalist id="pets">
                  {pets.map((sport, i) => {
                    return <option key={i} value={sport} />;
                  })}
                </datalist>
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
    );
  };

  return (
    <Container className="px-0 py-3">
      {profile && <p>{!edit ? renderProfile() : renderEdit()}</p>}
    </Container>
  );
}

export default Profile;

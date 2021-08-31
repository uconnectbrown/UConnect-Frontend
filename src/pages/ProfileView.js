// Setup
import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";

// Components
import EditInterests from "../components/EditInterests";
import Crop from "../util/Crop";

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
import "./ProfileView.css";

// Body
function ProfileView(props) {
  const [emailId, setEmailId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [newProfile, setNewProfile] = useState(null);
  const [indexArray, setIndexArray] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editImage, setEditImage] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setEmailId(auth.currentUser.email.split("@")[0]);
    }
  }, []);

  useEffect(() => {
    if (emailId) getProfile();
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
    if (emailId) {
      let promises = [
        axios.get(`/update/${emailId}`),
        axios.get(`/updateV/${emailId}`),
      ];
      if (newProfile.courses !== profile.courses) {
        props.handleCourses(newProfile.courses);
        handleDeleteCourses();
      }
      if (newProfile.varsitySports !== profile.varsitySports) {
        handleDeleteVarsity();
      }
      axios
        .post(`/edit/${emailId}`, newProfile)
        .then(() => {
          setProfile(newProfile);
        })
        .then(() => {
          return Promise.all(promises);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteCourses = () => {
    if (emailId) {
      let promises = [];
      for (let i = 0; i < profile.courses.length; i++) {
        if (
          profile.courses[i].code !== newProfile.courses[i].code &&
          profile.courses[i].code
        ) {
          promises.push(
            axios.get(
              `/delete/${emailId}/${profile.courses[i].code.replace(/\s/g, "")}`
            )
          );
        }
      }
      Promise.all(promises)
        .then(() => {
          return;
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteVarsity = () => {
    if (emailId) {
      let promises = [];
      for (let i = 0; i < profile.varsitySports.length; i++) {
        if (
          profile.varsitySports[i] !== newProfile.varsitySports[i] &&
          profile.varsitySports[i]
        ) {
          promises.push(
            axios.get(
              `/deleteV/${emailId}/${profile.varsitySports[i].replace(
                /\s/g,
                ""
              )}`
            )
          );
        }
      }
      Promise.all(promises)
        .then(() => {
          return;
        })
        .catch((err) => console.log(err));
    }
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
    setNewProfile({
      ...newProfile,
      courses: newCourses,
    });
  };

  const handleFavoriteChange = (event, name) => {
    let newFavs = { ...newProfile.favorites };
    newFavs[name] = event.target.value;
    setNewProfile({
      ...newProfile,
      favorites: newFavs,
    });
  };

  const handleInterests = (i1, i2, i3) => {
    setNewProfile({
      ...newProfile,
      interests1: i1,
      interests2: i2,
      interests3: i3,
    });
  };

  const updateImage = (url) => {
    setEditImage(false);
    setProfile({ ...profile, imageUrl: url });
    setNewProfile({ ...newProfile, imageUrl: url });
    props.handleImage(url);
  };

  const renderProfile = () => {
    return (
      <Row className="profile-card">
        <Col sm={4} style={{ justifyContent: "center" }}>
          <img alt="Profile" src={profile.imageUrl} className="profile-img" />
          <p>
            {profile.firstName} {profile.lastName}
          </p>
          <h4> {profile.location}</h4>
          <h4> {profile.pronouns}</h4>
          <h4>Class of {profile.classYear}</h4>
          <h4>{profile.majors.map((major) => (major ? major + ", " : ""))}</h4>
          <br></br>
          <p id="normaltext">
            <strong>Bio: </strong>
            {profile.bio}
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
                  {profile.interests1.map((i) => i.interest + ", ")}
                </p>
              </div>
            </Col>
            <Col sm={4}>
              <p id="normaltext">
                <strong>Physical Activity and Wellness</strong>
              </p>
              <div class="card" id="interest-card">
                <p id="normaltext">
                  {profile.interests2.map((i) => i.interest + ", ")}
                </p>
              </div>
            </Col>
            <Col sm={4}>
              <p id="normaltext">
                <strong>General Hobbies</strong>
              </p>
              <div class="card" id="interest-card">
                <p id="normaltext">
                  {profile.interests3.map((i) => i.interest + ", ")}
                </p>
              </div>
            </Col>
          </Row>
          <Row className="section-container4">
            <p id="subheading">Extracurriculars</p>

            <Col sm={6}>
              <p id="normaltext">
                <strong>Groups</strong>
              </p>
              {profile.groups.map((group) => (group ? group + ", " : ""))}
            </Col>
            <Col sm={6}>
              <p id="normaltext">
                <strong>Varsity Sports</strong>
              </p>
              {profile.varsitySports.map((sport) =>
                sport ? sport + ", " : ""
              )}
            </Col>
          </Row>
          <Row className="section-container3">
            <Col sm={6}>
              <p id="normaltext">
                <strong>Pick Up Sports</strong>
              </p>
              <div class="card" id="adinfo-card">
                <p id="normaltext">
                  {profile.pickUpSports.map((sport) =>
                    sport ? sport + ", " : ""
                  )}
                </p>
              </div>
            </Col>
            <Col sm={6}>
              <p id="normaltext">
                <strong>Instruments</strong>
              </p>
              <div class="card" id="adinfo-card">
                <p id="normaltext">
                  {profile.instruments.map((instrument) =>
                    instrument ? instrument + ", " : ""
                  )}
                </p>
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
          <button
            type="button"
            class="btn btn-outline-primary btn-sm"
            style={{ width: "5rem" }}
            onClick={() => {
              setEditImage(true);
            }}
          >
            Edit Profile Picture
          </button>
          <dialog open={editImage}>
            Select Picture
            <Crop update={updateImage} />
            <menu>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                style={{ width: "5rem" }}
                onClick={() => {
                  setEditImage(false);
                }}
              >
                Cancel
              </button>
            </menu>
          </dialog>
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
            name="location"
            id="location"
            onChange={handleChange}
            value={newProfile.location}
          >
            <option value="China">China</option>
            <option value="United States">United States</option>
            <option value="France">France</option>
            <option value="Egypt">Egypt</option>
          </select>
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
            <EditInterests
              getInterests={handleInterests}
              index1={newProfile.interests1.map((i) => i.index)}
              index2={newProfile.interests2.map((i) => i.index)}
              index3={newProfile.interests3.map((i) => i.index)}
            />
          </Row>
          <Row className="section-container4">
            <p id="subheading">Extracurriculars</p>
            <Col sm={6}>
              <p id="normaltext">
                <strong>Groups</strong>
              </p>
              <p id="normaltext">
                <input
                  name="groups"
                  onChange={(e) => {
                    handleArrChange(e, 0);
                  }}
                  value={newProfile.groups[0]}
                />
                <input
                  name="groups"
                  onChange={(e) => {
                    handleArrChange(e, 1);
                  }}
                  value={newProfile.groups[1]}
                />

                <input
                  name="groups"
                  onChange={(e) => {
                    handleArrChange(e, 2);
                  }}
                  value={newProfile.groups[2]}
                />
              </p>
            </Col>
            <Col sm={6}>
              <p id="normaltext">
                <strong>Varsity Sports</strong>
              </p>
              <p id="normaltext">
                <input
                  list="varsitySports"
                  name="varsitySports"
                  onChange={(e) => {
                    handleArrChange(e, 0);
                  }}
                  value={newProfile.varsitySports[0]}
                />

                <datalist id="varsitySports">
                  {varsitySports.map((sport, i) => {
                    return <option key={i} value={sport} />;
                  })}
                </datalist>

                <input
                  list="varsitySports"
                  name="varsitySports"
                  onChange={(e) => {
                    handleArrChange(e, 1);
                  }}
                  value={newProfile.varsitySports[1]}
                />
                <datalist id="varsitySports">
                  {varsitySports.map((sport, i) => {
                    return <option key={i} value={sport} />;
                  })}
                </datalist>
              </p>
            </Col>
          </Row>
          <Row className="section-container3">
            <Col sm={6}>
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
            <Col sm={6}>
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

export default ProfileView;

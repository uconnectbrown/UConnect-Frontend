// Setup
import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";

// Components
import EditInterests from "../components/EditInterests";
import Crop from "../util/Crop";

import Tooltip from "@material-ui/core/Tooltip";

// Resources
import {
  majors,
  pronouns,
  countries,
  states,
  greekLife,
  instruments,
  pickUpSports,
  varsitySports,
  courseList,
} from "../resources/editFields";

import { Container, Row, Col } from "react-bootstrap";
import "./ProfileView.css";

const { validProfile } = require("../util/validators");

// Body
function ProfileView(props) {
  const [emailId, setEmailId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [newProfile, setNewProfile] = useState(null);
  const [indexArray, setIndexArray] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editImage, setEditImage] = useState(false);

  const student = profile;

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
      if (newProfile.courses !== profile.courses) {
        props.handleCourses(newProfile.courses);
        handleDeleteCourses();
      }
      if (newProfile.varsitySports !== profile.varsitySports) {
        handleDeleteVarsity();
      }
      if (newProfile.pickUpSports !== profile.pickUpSports) {
        handleDeletePickUp();
      }
      if (newProfile.instruments !== profile.instruments) {
        handleDeleteInstrument();
      }
      axios
        .post(`/edit/${emailId}`, newProfile)
        .then(() => {
          setProfile(newProfile);
        })
        .then(() => {
          updateInfo();
        })
        .catch((err) => console.log(err));
    }
  };

  const updateInfo = () => {
    axios
      .get(`/update/${emailId}`)
      .then(() => {
        axios.get(`/updateV/${emailId}`);
      })
      .then(() => {
        axios.get(`/updateI/${emailId}`);
      })
      .then(() => {
        return axios.get(`/updateP/${emailId}`);
      })
      .catch((err) => console.log(err));
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

  const handleDeletePickUp = () => {
    if (emailId) {
      let promises = [];
      for (let i = 0; i < profile.pickUpSports.length; i++) {
        if (
          profile.pickUpSports[i] !== newProfile.pickUpSports[i] &&
          profile.pickUpSports[i]
        ) {
          promises.push(
            axios.get(
              `/deleteP/${emailId}/${profile.pickUpSports[i].replace(
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

  const handleDeleteInstrument = () => {
    if (emailId) {
      let promises = [];
      for (let i = 0; i < profile.instruments.length; i++) {
        if (
          profile.instruments[i] !== newProfile.instruments[i] &&
          profile.instruments[i]
        ) {
          promises.push(
            axios.get(
              `/deleteI/${emailId}/${profile.instruments[i].replace(/\s/g, "")}`
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

  const handleLocationChange = (event, name) => {
    let newLocation = { ...newProfile.location };
    newLocation[name] = event.target.value;
    if (newProfile.location.country !== "United States of America") {
      newLocation["state"] = "";
    }
    setNewProfile({
      ...newProfile,
      location: newLocation,
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
            First name:
            <input
              value={newProfile.firstName}
              onChange={handleChange}
              name="firstName"
              placeholder={!newProfile.firstName && "Can't be empty"}
            />
          </p>
          <p>
            Last name:
            <input
              value={newProfile.lastName}
              onChange={handleChange}
              name="lastName"
              placeholder={!newProfile.lastName && "Can't be empty"}
            />
          </p>

          <p>
            <label>
              Country of Origin:
              <input
                list="countries"
                onChange={(e) => handleLocationChange(e, "country")}
                value={newProfile.location.country}
              />
            </label>

            <datalist id="countries">
              {countries.map((country, i) => {
                return <option key={i} value={country} />;
              })}
            </datalist>
          </p>

          {newProfile.location.country === "United States of America" && (
            <p>
              <label>
                State:
                <input
                  list="states"
                  name="state"
                  onChange={(e) => handleLocationChange(e, "state")}
                  value={newProfile.location.state}
                />
              </label>
              <datalist id="states">
                {states.map((state, i) => {
                  return <option key={i} value={state} />;
                })}
              </datalist>
            </p>
          )}
          <p>
            City:
            <input
              value={newProfile.location.city}
              onChange={(e) => handleLocationChange(e, "city")}
              name="city"
            />
          </p>
          <p>
            Pronouns:
            <input
              list="pronouns"
              name="pronouns"
              onChange={handleChange}
              value={newProfile.pronouns}
            />
            {pronouns}
          </p>
          <p>
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
          </p>

          <label>
            Major:
            <input
              list="majors"
              name="majors"
              onChange={(e) => {
                handleArrChange(e, 0);
              }}
              placeholder={
                newProfile.majors.filter(Boolean).length === 0 &&
                "Need at least one"
              }
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
                disabled={!validProfile(newProfile)}
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
            {(newProfile.interests1.length !== 3 ||
              newProfile.interests2.length !== 3 ||
              newProfile.interests3.length !== 3) &&
              "Please select 3 interests in each category"}
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
                <strong>Clubs/Student Groups</strong>
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

  const renderLeftInfo = () => {
    return (
      <>
        <img
          className="profile-view-img"
          alt="Profile Picture"
          src={student.imageUrl}
        />
        <div style={{ fontSize: "1.5em", fontStyle: "bold" }}>
          {student.firstName + " " + student.lastName}
        </div>
        <div>{student.pronouns && `(${student.pronouns})`}</div>
        <div>
          {student.location &&
            student.location.state !== "" &&
            student.location.city !== "" &&
            `${student.location.city}, ${student.location.state}`}
        </div>
        <div>
          {student.location &&
            student.location.state !== "" &&
            student.location.city === "" &&
            `${student.location.state}, ${student.location.country}`}
        </div>
        <div>
          {student.location &&
            student.location.country !== "United States of America" &&
            student.location.city !== "" &&
            `${student.location.city}, ${student.location.country}`}
        </div>
        <div>
          {student.location &&
            student.location.country !== "United States of America" &&
            student.location.city === "" &&
            `${student.location.country}`}
        </div>
        <div>Class of {student.classYear}</div>
        <div>{student.majors.map((major) => major)}</div>
        <div className="profile-view-bio">{student.bio}</div>
      </>
    );
  };

  const renderCourses = () => {
    return student.courses.map((c) => {
      if (!c.name) return null;
      return (
        <div
          className="profile-view-courses d-flex flex-column text-center align-items-center justify-content-center"
          // onClick={}
        >
          <div>{c.code}</div>
          <div style={{ fontSize: "10px" }}>{c.name}</div>
        </div>
      );
    });
  };

  const renderInterests = () => {
    const categories = [
      "Career and Academic",
      "Physical Activity and Wellness",
      "General Hobbies",
    ];
    const interests = [
      student.interests1,
      student.interests2,
      student.interests3,
    ];

    return categories.map((cat, i) => {
      const list = interests[i];
      return (
        <Col sm={4} className="">
          <div className="interest-box">
            <p style={{ fontSize: "14px", textAlign: "center" }}>{cat}</p>
            {list && (
              <ul>
                {list.map((l) => (
                  <li>{l.interest}</li>
                ))}
              </ul>
            )}
          </div>
        </Col>
      );
    });
  };

  const renderEcs = () => {
    const categories = [
      "Groups",
      "Varsity Sports",
      "Pick-up Sports",
      "Instruments",
    ];
    const groups = [profile.groups[0], profile.groups[1], profile.groups[2]];
    const varsitySports = [profile.varsitySports[0], profile.varsitySports[1]];
    const pickupSports = [
      profile.pickUpSports[0],
      profile.pickUpSports[1],
      profile.pickUpSports[2],
    ];
    const instruments = [
      profile.instruments[0],
      profile.instruments[1],
      profile.instruments[2],
    ];

    const allEcs = [groups, varsitySports, pickupSports, instruments];

    return categories.map((cat, i) => {
      const list = allEcs[i];

      return (
        <Col sm={6} className="mb-3">
          <div className="interest-box">
            {cat === "Groups" && (
              <Tooltip title="clubs, student groups, greek life, etc.">
                <p style={{ fontSize: "14px", textAlign: "center" }}>{cat}</p>
              </Tooltip>
            )}
            {cat !== "Groups" && (
              <p style={{ fontSize: "14px", textAlign: "center" }}>{cat}</p>
            )}
            {list.length > 0 && (
              <ul>
                {list.map((l) => {
                  return l ? <li>{l}</li> : null;
                })}
              </ul>
            )}
          </div>
        </Col>
      );
    });
  };

  const renderProfile = () => {
    return (
      <Container className="profile-view-wrap d-flex flex-column pb-3">
        <Row
          style={{
            justifyContent: "flex-end",
            margin: "1rem",
            marginBottom: 0,
          }}
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
        <Row>
          <Col sm={4} className="align-items-center text-center px-3">
            {renderLeftInfo()}
          </Col>
          <Col sm={8} className="px-3">
            <h5>Interests</h5>
            <Row>{renderInterests()}</Row>
            <h5>Extracurriculars</h5>
            <Row>{renderEcs()}</Row>
            <h5>Courses</h5>
            <Row>{renderCourses()}</Row>
          </Col>
        </Row>
      </Container>
    );
  };

  if (!profile) return null;

  return edit ? renderEdit() : renderProfile();
}

export default ProfileView;

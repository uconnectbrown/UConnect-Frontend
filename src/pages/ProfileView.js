// Setup
import React, { useState, useEffect } from "react";
import axios from "axios";
import { db, auth } from "../firebase";

// Components
import EditInterests from "../components/EditInterests";
import Crop from "../util/Crop";
import SignOut from "../components/SignOut";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
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

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import "./ProfileView.css";
import { FormControlLabel } from "@material-ui/core";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";

const { validProfile } = require("../util/validators");

// Body
function ProfileView(props) {
  const [emailId, setEmailId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [newProfile, setNewProfile] = useState(null);
  const [indexArray, setIndexArray] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingInterests, setEditingInterests] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [firstTime, setFirstTime] = useState(null);

  const student = profile;

  useEffect(() => {
    if (auth.currentUser) {
      setEmailId(auth.currentUser.email.split("@")[0]);
    }
  }, []);

  useEffect(() => {
    if (emailId) {
      checkFirstTime();
      getProfile();
    }
  }, [emailId]);

  const checkFirstTime = () => {
    db.doc(`profiles/${emailId}`)
      .get()
      .then((doc) => {
        return setFirstTime(doc.data().firstTime);
      })
      .catch((err) => console.log(err));
  };

  const handleCloseOnBoard = () => {
    setFirstTime(false);
    // backend function to turn firsttime to false in the profile
    {
      emailId &&
        axios.get(`/onboard/${emailId}`).catch((err) => console.log(err));
    }
  };

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
          <Dialog open={editImage}>
            <DialogTitle>Select Picture</DialogTitle>{" "}
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
          </Dialog>
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
                  setEditing(false);
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
                  setEditing(false);
                  setNewProfile(profile);
                }}
              >
                Cancel
              </button>
            </React.Fragment>
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
    const classYears = ["2022", "2023", "2024", "2025"];

    return (
      <>
        <div>
          <img
            className="profile-view-img"
            alt="Profile Picture"
            src={student.imageUrl}
          />
          {student.imageUrl ===
            "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media" && !editing && (
            <p style={{ width: "100%", fontSize: 14, marginTop: 0 }}>
              Please add an image to complete <br /> your profile.
            </p>
          )}
          {student.imageUrl ===
            "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media" && editing && (
            <p style={{ width: "100%", fontSize: 14, marginTop: 0, fontWeight: 500, color: "red" }}>
              Please add an image to complete <br /> your profile.
            </p>
          )}
          {editing && (
            <Button className="mb-3" onClick={() => setEditImage(true)}>
              Edit Image
            </Button>
          )}
          <Dialog open={editImage}>
            <DialogTitle>Select Picture</DialogTitle>{" "}
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
          </Dialog>
        </div>
        {!editing ? (
          <div>
            <div style={{ fontSize: "1.5em", fontStyle: "bold" }}>
              {student.firstName + " " + student.lastName}
            </div>
            <div>{student.pronouns && `(${student.pronouns})`}</div>
            <div>Class of {student.classYear}</div>
            <div>
              {student.majors
                .filter(Boolean)
                .map((major, i) =>
                  i !== student.majors.filter(Boolean).length - 1
                    ? major + ", "
                    : major
                )}
            </div>
            <div className="profile-view-bio">{student.bio}</div>
          </div>
        ) : (
          <div style={{ textAlign: "left" }}>
            <form class="form-floating">
              <FloatingLabel
                label={newProfile.firstName ? "First Name *" : "Can't be empty"}
                className="mb-3"
                controlId="first-name"
              >
                <input
                  type="text"
                  class={
                    !newProfile?.firstName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  onChange={handleChange}
                  id="firstName"
                  name="firstName"
                  value={newProfile?.firstName}
                />
              </FloatingLabel>
              <FloatingLabel
                label={newProfile.lastName ? "Last Name *" : "Can't be empty"}
                className="mb-3"
                controlId="last-name"
              >
                <input
                  type="text"
                  class={
                    !newProfile?.lastName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  onChange={handleChange}
                  id="lastName"
                  name="lastName"
                  value={newProfile?.lastName}
                />
              </FloatingLabel>
              <FloatingLabel label="Class Year" className="mb-3">
                <Form.Select
                  aria-label="Select class year"
                  className="mb-3"
                  value={newProfile?.classYear}
                  onChange={handleChange}
                  name="classYear"
                >
                  {classYears.map((year) => {
                    return <option value={year}>{year}</option>;
                  })}
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel label="Preferred Pronouns">
                <Form.Control
                  list="pronouns"
                  className="w-100 mb-3"
                  name="pronouns"
                  onChange={handleChange}
                  value={newProfile?.pronouns}
                />
              </FloatingLabel>
              <datalist id="pronouns" className="w-100">
                {pronouns.map((pronoun, i) => {
                  return <option key={i} value={pronoun} />;
                })}
              </datalist>
              <FloatingLabel
                label={
                  newProfile.majors.filter(Boolean).length > 0
                    ? "Concentration 1 *"
                    : "Need at least 1"
                }
              >
                <Form.Control
                  list="majors"
                  name="majors"
                  class={
                    newProfile?.majors.filter(Boolean).length < 1
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  onChange={(e) => {
                    handleArrChange(e, 0);
                  }}
                  value={newProfile.majors[0]}
                />
              </FloatingLabel>
              <datalist id="majors" className="w-100">
                {majors
                  .filter((major) => !newProfile.majors.includes(major))
                  .map((major, i) => {
                    return <option key={i} value={major} />;
                  })}
              </datalist>

              <FloatingLabel label="Concentration 2">
                <Form.Control
                  list="majors"
                  name="majors"
                  className="w-100 mb-3"
                  onChange={(e) => {
                    handleArrChange(e, 1);
                  }}
                  value={newProfile.majors[1]}
                />
              </FloatingLabel>

              <FloatingLabel label="Concentration 3">
                <Form.Control
                  list="majors"
                  name="majors"
                  className="w-100 mb-3"
                  onChange={(e) => {
                    handleArrChange(e, 2);
                  }}
                  value={newProfile.majors[2]}
                />
              </FloatingLabel>

              <FloatingLabel label="Bio" className="mb-3" controlId="bio">
                <Form.Control
                  as="textarea"
                  rows={5}
                  maxLength="140"
                  onChange={handleChange}
                  name="bio"
                  value={newProfile?.bio}
                />
              </FloatingLabel>
            </form>
          </div>
        )}
      </>
    );
  };

  const renderCourses = () => {
    if (!editing) {
      return student.courses.map((c, i) => {
        if (!c.name) return null;
        return <Col sm={3} className="mb-3">
          <div className="profile-view-courses">
            <div>{c.code}</div>
            <div style={{ fontSize: "10px" }}>{c.name}</div>
          </div>
        </Col>
      })
    }

    const range = [...Array(5).keys()];

    return range.map((i) => {
      let value = '';
      if (i < student.courses.length) {
        value = newProfile?.courses[i].code;
      }

      return <Col sm={6} className="mb-3">
        <FloatingLabel label={`Course ${i + 1}`}>
          <Form.Control
            list="courseCodes"
            name="courses"
            onChange={(e) => {
              handleCourseChange(e, i);
            }}
            value={value}
          />
          <datalist id="courseCodes">
            {courseList.map((course, i) => (
              <option key={i} value={course[0] + ": " + course[1]} />
            ))}
          </datalist>
        </FloatingLabel>
      </Col>
    })

    return student.courses.map((c, i) => {
      return <Col sm={6} className="mb-3">
        <FloatingLabel label={`Course ${i + 1}`}>
          <Form.Control
            list="courseCodes"
            name="courses"
            onChange={(e) => {
              handleCourseChange(e, i);
            }}
            value={newProfile?.courses[i].code}
          />
          <datalist id="courseCodes">
            {courseList.map((course, i) => (
              <option key={i} value={course[0] + ": " + course[1]} />
            ))}
          </datalist>
        </FloatingLabel>
      </Col>
    })
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

    const editInterestsButton = (
      <div className="mt-3">
        <Button onClick={() => setEditingInterests(!editingInterests)}>
          {!editingInterests ? "Edit Interests" : "Close Interests"}
        </Button>
      </div>
    );

    if (!editing || (editing && !editingInterests)) {
      return (
        <>
          {categories.map((cat, i) => {
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
          })}
          {editing && editInterestsButton}
        </>
      );
    }

    return (
      <>
        <Row>
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
        {editInterestsButton}
      </>
    );
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
    const pickUpSports = [
      profile.pickUpSports[0],
      profile.pickUpSports[1],
      profile.pickUpSports[2],
    ];
    const instruments = [
      profile.instruments[0],
      profile.instruments[1],
      profile.instruments[2],
    ];

    const allEcs = [groups, varsitySports, pickUpSports, instruments];
    const allEcsStr = [
      "groups",
      "varsitySports",
      "pickUpSports",
      "instruments",
    ];

    return categories.map((cat, i) => {
      const list = allEcs[i];

      if (!editing) {
        return (
          <Col sm={6} className="mb-3">
            <div className="interest-box">
              <p style={{ fontSize: "14px", textAlign: "center" }}>{cat}</p>
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
      }

      return (
        <Col sm={6}>
          {list.map((l, j) => (
            <FloatingLabel label={`${cat} ${j + 1}`} className="mb-3">
              <Form.Control
                value={newProfile[`${allEcsStr[i]}`][j]}
                type="text"
                onChange={(e) => {
                  handleArrChange(e, j);
                }}
                name={allEcsStr[i]}
              />
            </FloatingLabel>
          ))}
        </Col>
      );
    });
  };

  const renderProfile = () => {
    return (
      <Container
        className={`profile-view-wrap d-flex flex-column pb-3 ${
          editing ? "editing" : ""
        }`}
      >
        <Row
          style={{
            justifyContent: "flex-end",
            margin: "1rem",
            marginBottom: 0,
          }}
        >
          {!editing ? (
            <React.Fragment>
              {firstTime && (
                <h4>Before searching for and connecting with others, please customize your profile.</h4>
              )}
              <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              style={{ width: "5rem" }}
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                style={{ width: "8rem" }}
                onClick={() => {
                  setEditing(false);
                  setEditingInterests(false);
                  setNewProfile(profile);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                title={student.imageUrl ===
                  "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media" ? "Add an image before saving" : ""}
                class="btn btn-outline-primary btn-sm"
                style={{ width: "8rem" }}
                onClick={() => {
                  setEditing(false);
                  setEditingInterests(false);
                  editProfile();

                  // maybe move this inside of editProfile
                  // {firstTime && (
                  //   handleCloseOnBoard();
                  //   axios.get(`/newFeatured/${emailId}`).catch(err => console.log(err));
                  // )}
                }}
                disabled={!validProfile(newProfile)}
              >
                Save Changes
              </button>
            </React.Fragment>
          )}
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
            <SignOut
              style={{ position: "absolute", right: "10%" }}
              reset={props.reset}
            />
          </Col>
        </Row>
      </Container>
    );
  };

  if (!profile) return null;
  return renderProfile();

  // return editing ? renderEdit() : renderProfile();
}

export default ProfileView;

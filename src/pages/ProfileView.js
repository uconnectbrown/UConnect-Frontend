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
  instrumentsList,
  pickUpSportsList,
  varsitySportsList,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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
            "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media" &&
            !editing && (
              <p style={{ width: "100%", fontSize: 14, marginTop: 0 }}>
                Please add an image to complete <br /> your profile.
              </p>
            )}
          {student.imageUrl ===
            "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media" &&
            editing && (
              <p
                style={{
                  width: "100%",
                  fontSize: 14,
                  marginTop: 0,
                  fontWeight: 700,
                  color: "red",
                }}
              >
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
            <div className="card-text">
              {student.location &&
                student.location.state !== "" &&
                student.location.city !== "" &&
                `${student.location.city}, ${student.location.state}`}
              {student.location &&
                student.location.state !== "" &&
                student.location.city === "" &&
                `${student.location.state}, ${student.location.country}`}

              {student.location &&
                student.location.country !== "United States of America" &&
                student.location.city !== "" &&
                `${student.location.city}, ${student.location.country}`}
              {student.location &&
                student.location.country !== "United States of America" &&
                student.location.city === "" &&
                `${student.location.country}`}
            </div>
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
              <h5>Basic Info </h5>
              <FloatingLabel
                label={newProfile.firstName ? "First Name *" : "Can't be empty"}
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
              <FloatingLabel label="Preferred Pronouns">
                <Form.Control
                  list="pronouns"
                  name="pronouns"
                  onChange={handleChange}
                  value={newProfile?.pronouns}
                />
              </FloatingLabel>

              <FloatingLabel label="Country of Origin">
                <Form.Control
                  list="countries"
                  onChange={(e) => handleLocationChange(e, "country")}
                  value={newProfile.location.country}
                />
              </FloatingLabel>
              <datalist id="countries">
                {countries.map((country, i) => {
                  return <option key={i} value={country} />;
                })}
              </datalist>
              {newProfile.location.country === "United States of America" && (
                <FloatingLabel label="State">
                  <Form.Control
                    list="states"
                    name="state"
                    onChange={(e) => handleLocationChange(e, "state")}
                    value={newProfile.location.state}
                  />
                  <datalist id="states">
                    {states.map((state, i) => {
                      return <option key={i} value={state} />;
                    })}
                  </datalist>
                </FloatingLabel>
              )}
              <FloatingLabel label="City">
                <Form.Control
                  value={newProfile.location.city}
                  onChange={(e) => handleLocationChange(e, "city")}
                  name="city"
                />
              </FloatingLabel>
              <datalist id="pronouns" className="w-100">
                {pronouns.map((pronoun, i) => {
                  return <option key={i} value={pronoun} />;
                })}
              </datalist>
              <FloatingLabel label="Class Year">
                <Form.Select
                  aria-label="Select class year"
                  value={newProfile?.classYear}
                  onChange={handleChange}
                  name="classYear"
                >
                  {classYears.map((year) => {
                    return <option value={year}>{year}</option>;
                  })}
                </Form.Select>
              </FloatingLabel>
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
              <FloatingLabel label="Concentration 2">
                <Form.Control
                  list="majors"
                  name="majors"
                  onChange={(e) => {
                    handleArrChange(e, 1);
                  }}
                  value={newProfile.majors[1]}
                />
              </FloatingLabel>
              <FloatingLabel label="Bio" controlId="bio">
                <Form.Control
                  as="textarea"
                  rows={5}
                  maxLength="140"
                  onChange={handleChange}
                  name="bio"
                  value={newProfile?.bio}
                />
              </FloatingLabel>

              <datalist id="majors" className="w-100">
                {majors
                  .filter((major) => !newProfile.majors.includes(major))
                  .map((major, i) => {
                    return <option key={i} value={major} />;
                  })}
              </datalist>
            </form>
          </div>
        )}
      </>
    );
  };

  const renderCourses = () => {
    if (!editing) {
      if (
        student.courses.map((course) => course.code).filter(Boolean).length ===
        0
      ) {
        return (
          <Col sm={3} className="mb-3">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              style={{ width: "5rem" }}
              onClick={() => setEditing(true)}
            >
              Add
            </button>
          </Col>
        );
      } else
        return student.courses.map((c, i) => {
          if (!c.name) return null;
          return (
            <Col sm={3} className="mb-3">
              <div className="profile-view-courses">
                <div>{c.code}</div>
                <div style={{ fontSize: "10px" }}>{c.name}</div>
              </div>
            </Col>
          );
        });
    }

    const range = [...Array(5).keys()];

    return range.map((i) => {
      let value = "";
      if (i < student.courses.length) {
        value = newProfile?.courses[i].code;
      }

      return (
        <Col sm={6}>
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
      );
    });

    return student.courses.map((c, i) => {
      return (
        <Col sm={6} className="mb-3">
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
              {cat !== "Groups" && (
                <p style={{ fontSize: "14px", textAlign: "center" }}>{cat}</p>
              )}
              {cat === "Groups" && (
                <p align="center">
                  <p
                    style={{
                      fontSize: "14px",
                      textAlign: "center",
                      display: "inline",
                      marginRight: 6,
                    }}
                  >
                    {cat}
                  </p>
                  <Tooltip
                    title="clubs/student groups/greek life"
                    placement="right"
                  >
                    {/* <p style={{ fontSize: "14px", textAlign: "center", display: "inline" }}> */}
                    <span>
                      <FontAwesomeIcon
                        style={{ width: 15 }}
                        icon={faInfoCircle}
                      />
                    </span>
                    {/* </p> */}
                  </Tooltip>
                </p>
              )}

              {list.filter(Boolean).length > 0 && (
                <ul>
                  {list.map((l) => {
                    return l ? <li>{l}</li> : null;
                  })}
                </ul>
              )}
              <div align="center">
                {list.filter(Boolean).length === 0 && (
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    style={{ width: "5rem" }}
                    onClick={() => setEditing(true)}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </Col>
        );
      }

      return (
        <Col sm={6}>
          {list.map((l, j) => (
            <FloatingLabel label={`${cat} ${j + 1}`}>
              {cat === "Varsity Sports" && (
                <Form.Select
                  aria-label="Select varsity sport"
                  className={j === 1 ? "mb-3" : ""}
                  value={newProfile?.varsitySports[j]}
                  onChange={(e) => handleArrChange(e, j)}
                  name="varsitySports"
                >
                  {varsitySportsList.map((sport) => {
                    return <option value={sport}>{sport}</option>;
                  })}
                </Form.Select>
              )}
              {cat === "Pick-up Sports" && (
                <Form.Select
                  aria-label="Select pick-up sport"
                  className={j === 2 ? "mb-3" : ""}
                  value={newProfile?.pickUpSports[j]}
                  onChange={(e) => handleArrChange(e, j)}
                  name="pickUpSports"
                >
                  {pickUpSportsList.map((sport) => {
                    return <option value={sport}>{sport}</option>;
                  })}
                </Form.Select>
              )}
              {cat === "Instruments" && (
                <Form.Select
                  aria-label="Select instrument"
                  className={j === 2 ? "mb-3" : ""}
                  value={newProfile?.instruments[j]}
                  onChange={(e) => handleArrChange(e, j)}
                  name="instruments"
                >
                  {instrumentsList.map((instrument) => {
                    return <option value={instrument}>{instrument}</option>;
                  })}
                </Form.Select>
              )}
              {cat === "Groups" && (
                <Form.Control
                  className={j === 2 ? "mb-3" : ""}
                  value={newProfile[`${allEcsStr[i]}`][j]}
                  type="text"
                  onChange={(e) => {
                    handleArrChange(e, j);
                  }}
                  name={allEcsStr[i]}
                />
              )}
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
                <h4 style={{ fontWeight: 600, color:"#E35E96" }} align="center">
                  Please customize your profile to complete the onboarding process.
                </h4>
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
                title={
                  student.imageUrl ===
                  "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media"
                    ? "Add an image before saving"
                    : ""
                }
                class="btn btn-outline-primary btn-sm"
                style={{ width: "8rem" }}
                onClick={() => {
                  setEditing(false);
                  setEditingInterests(false);
                  editProfile();
                  if (firstTime) {
                    handleCloseOnBoard();
                    axios
                      .get(`/newFeatured/${emailId}`)
                      .catch((err) => console.log(err));
                  }
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

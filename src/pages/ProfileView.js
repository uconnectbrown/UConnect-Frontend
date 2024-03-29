// Setup
import React, { useState } from "react";
import axios from "axios";

// Components
import EditInterests from "../components/EditInterests";
import Crop from "../util/Crop";
import SignOut from "../components/SignOut";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const { validProfile } = require("../util/validators");

// Body
function ProfileView(props) {
  const { user } = props;
  const [newProfile, setNewProfile] = useState(user);
  const [editing, setEditing] = useState(false);
  const [editingInterests, setEditingInterests] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const noProfilePic = user?.imageUrl === "https://i.imgur.com/1m8kMyt.png";

  const editProfile = () => {
    delete newProfile.password;
    delete newProfile.id;
    axios
      .post("/v1/user/updateUser", newProfile)
      .then(async () => {
        setNewProfile(await props.fetchUser());
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setNewProfile({ ...newProfile, [event.target.name]: event.target.value });
  };

  const handleArrChange = (event, index) => {
    let newArr = newProfile[event.target.name]
      ? [...newProfile[event.target.name]]
      : ["", ""];
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
    setNewProfile({ ...newProfile, profilePicture: url });
    axios
      .post("/v1/user/updateUser", newProfile)
      .then(async () => {
        setNewProfile(await props.fetchUser());
      })
      .catch((err) => console.log(err));
  };

  const renderLeftInfo = () => {
    const classYears = [
      "2022",
      "2022.5",
      "2023",
      "2023.5",
      "2024",
      "2024.5",
      "2025",
      "2025.5",
    ];
    return (
      <>
        <div>
          <img className="profile-view-img" alt="Profile" src={user.imageUrl} />
          <br />
          {!editing && (
            <Button
              type="button"
              variant="outline-secondary"
              size="sm"
              style={{
                width: "8rem",
                backgroundColor: noProfilePic ? "#E35E96" : "#FFFFFF",
                color: noProfilePic ? "white" : "default",
              }}
              onClick={() => {
                setEditImage(true);
              }}
            >
              {noProfilePic ? "Add Image" : "Edit Image"}
            </Button>
          )}

          {noProfilePic && editing && (
            <p
              style={{
                width: "100%",
                fontSize: 14,
                marginTop: 0,
                fontWeight: 700,
                color: "#E35E96",
              }}
            >
              Please add a profile image
            </p>
          )}
          {editing && (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setEditImage(true)}
            >
              {noProfilePic ? "Add Image" : "Edit Image"}
            </Button>
          )}
          <Dialog open={editImage}>
            <DialogTitle>Select Profile Picture</DialogTitle>
            {noProfilePic && (
              <DialogContent>
                Note: You will be able to view other people's profile pictures
                once you've provided one yourself
              </DialogContent>
            )}
            <Crop update={updateImage} />
            <menu>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                style={{ width: "5rem" }}
                onClick={() => {
                  setEditImage(false);
                }}
              >
                {noProfilePic ? "Skip" : "Cancel"}
              </button>
            </menu>
          </Dialog>
        </div>
        {!editing ? (
          <div>
            <div style={{ fontSize: "1.5em", fontStyle: "bold" }}>
              {user.firstName + " " + user.lastName}
            </div>
            <div>{user.pronouns && `(${user.pronouns})`}</div>
            <div className="card-text">
              {user.location &&
                user.location.state &&
                user.location.city &&
                `${user.location.city}, ${user.location.state}`}
              {user.location &&
                user.location.state &&
                !user.location.city &&
                `${user.location.state}, ${user.location.country}`}
              {user.location &&
                user.location.country !== "United States of America" &&
                user.location.city &&
                `${user.location.city}, ${user.location.country}`}
              {user.location &&
                user.location.country !== "United States of America" &&
                !user.location.city &&
                user.location.country &&
                `${user.location.country}`}
            </div>
            <div>Class of {user.classYear}</div>
            <div>
              {user.majors
                .filter(Boolean)
                .map((major, i) =>
                  i !== user.majors.filter(Boolean).length - 1
                    ? major + ", "
                    : major
                )}
            </div>
            <div className="profile-view-bio">{user.bio}</div>
          </div>
        ) : (
          <div style={{ textAlign: "left" }}>
            <form className="form-floating mb-3" autoComplete="off">
              <h5>Basic Info </h5>
              <FloatingLabel
                label={newProfile.firstName ? "First Name *" : "Can't be empty"}
                controlId="first-name"
              >
                <input
                  type="text"
                  className={
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
                  className={
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
                  value={newProfile?.pronouns || ""}
                />
              </FloatingLabel>

              <FloatingLabel label="Country of Origin">
                <Form.Control
                  list="countries"
                  onChange={(e) => handleLocationChange(e, "country")}
                  value={newProfile.location.country || ""}
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
                    value={newProfile.location.state || ""}
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
                  value={newProfile.location.city || ""}
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
                  {classYears.map((year, i) => {
                    return (
                      <option key={i} value={year}>
                        {year}
                      </option>
                    );
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
                  className={
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
                  value={newProfile?.bio || ""}
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

  // const renderCourses = () => {
  //   if (!editing) {
  //     if (
  //       user.courses.map((course) => course.code).filter(Boolean).length === 0
  //     ) {
  //       return (
  //         <Col sm={3} className="mb-3">
  //           <button
  //             type="button"
  //             className={
  //               noProfilePic ? "btn btn-sm" : "btn btn-outline-primary btn-sm"
  //             }
  //             style={{
  //               width: "5rem",
  //               backgroundColor: noProfilePic ? "#E35E96" : "#FFFFFF",
  //               color: noProfilePic ? "white" : "default",
  //             }}
  //             onClick={() => setEditing(true)}
  //           >
  //             Add
  //           </button>
  //         </Col>
  //       );
  //     } else
  //       return !user.courses ? (
  //         <></>
  //       ) : (
  //         user.courses.map((c, i) => {
  //           if (!c.name) return null;
  //           return (
  //             <Col key={i} sm={3} className="mb-3">
  //               <div className="profile-view-courses">
  //                 <div>{c.code}</div>
  //                 <div style={{ fontSize: "10px" }}>{c.name}</div>
  //               </div>
  //             </Col>
  //           );
  //         })
  //       );
  //   }

  //   const range = [...Array(5).keys()];

  //   return range.map((i, idx) => {
  //     let value = "";
  //     if (i < user.courses.length) {
  //       value = newProfile?.courses[i].code;
  //     }

  //     return (
  //       <Col key={idx} sm={6}>
  //         <FloatingLabel label={`Course ${i + 1}`}>
  //           <Form.Control
  //             list="courseCodes"
  //             name="courses"
  //             autoComplete="off"
  //             onChange={(e) => {
  //               handleCourseChange(e, i);
  //             }}
  //             value={value}
  //           />
  //           <datalist id="courseCodes">
  //             {courseList.map((course, i) => (
  //               <option key={i} value={course[0] + ": " + course[1]} />
  //             ))}
  //           </datalist>
  //         </FloatingLabel>
  //       </Col>
  //     );
  //   });
  // };

  const renderInterests = () => {
    const categories = [
      "Career and Academic",
      "Physical Activity and Wellness",
      "General Hobbies",
    ];
    const interests = [user.interests1, user.interests2, user.interests3];

    const editInterestsButton = (
      <div className="mt-3">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => setEditingInterests(!editingInterests)}
        >
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
              <Col sm={4} className="" key={i}>
                <div className="interest-box">
                  <p style={{ fontSize: "14px", textAlign: "center" }}>{cat}</p>
                  {list && (
                    <ul>
                      {list.map((l, idx) => (
                        <li key={idx}>{l.interest}</li>
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
    const groups = user.groups
      ? [user.groups[0], user.groups[1], user.groups[2]]
      : ["", "", ""];
    const varsitySports = user.varsitySports
      ? [user.varsitySports[0], user.varsitySports[1]]
      : ["", ""];
    const pickUpSports = user.pickUpSports
      ? [user.pickUpSports[0], user.pickUpSports[1], user.pickUpSports[2]]
      : ["", "", ""];
    const instruments = user.instruments
      ? [user.instruments[0], user.instruments[1], user.instruments[2]]
      : ["", "", ""];

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
          <Col sm={6} className="mb-3" key={i}>
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
                    title="clubs, student groups, Greek life, etc."
                    placement="right"
                  >
                    <span>
                      <FontAwesomeIcon
                        style={{ width: 15 }}
                        icon={faInfoCircle}
                      />
                    </span>
                  </Tooltip>
                </p>
              )}

              {list.filter(Boolean).length > 0 && (
                <ul>
                  {list.map((l, idx) => {
                    return l ? <li key={idx}>{l}</li> : null;
                  })}
                </ul>
              )}
              <div align="center">
                {list.filter(Boolean).length === 0 && (
                  <button
                    type="button"
                    className={
                      noProfilePic
                        ? "btn btn-sm"
                        : "btn btn-outline-primary btn-sm"
                    }
                    style={{
                      width: "5rem",
                      backgroundColor: noProfilePic ? "#E35E96" : "#FFFFFF",
                      color: noProfilePic ? "white" : "default",
                    }}
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
            <FloatingLabel label={`${cat} ${j + 1}`} key={j}>
              {cat === "Varsity Sports" && (
                <Form.Select
                  aria-label="Select varsity sport"
                  className={j === 1 ? "mb-3" : ""}
                  value={
                    newProfile?.varsitySports
                      ? newProfile?.varsitySports[j]
                      : ""
                  }
                  onChange={(e) => handleArrChange(e, j)}
                  name="varsitySports"
                >
                  {varsitySportsList.map((sport, idx) => {
                    return (
                      <option key={idx} value={sport}>
                        {sport}
                      </option>
                    );
                  })}
                </Form.Select>
              )}
              {cat === "Pick-up Sports" && (
                <Form.Select
                  aria-label="Select pick-up sport"
                  className={j === 2 ? "mb-3" : ""}
                  value={
                    newProfile?.pickUpSports ? newProfile?.pickUpSports[j] : ""
                  }
                  onChange={(e) => handleArrChange(e, j)}
                  name="pickUpSports"
                >
                  {pickUpSportsList.map((sport, idx) => {
                    return (
                      <option key={idx} value={sport}>
                        {sport}
                      </option>
                    );
                  })}
                </Form.Select>
              )}
              {cat === "Instruments" && (
                <Form.Select
                  aria-label="Select instrument"
                  className={j === 2 ? "mb-3" : ""}
                  value={
                    newProfile?.instruments ? newProfile?.instruments[j] : ""
                  }
                  onChange={(e) => handleArrChange(e, j)}
                  name="instruments"
                >
                  {instrumentsList.map((instrument, idx) => {
                    return (
                      <option key={idx} value={instrument}>
                        {instrument}
                      </option>
                    );
                  })}
                </Form.Select>
              )}
              {cat === "Groups" && (
                <Form.Control
                  className={j === 2 ? "mb-3" : ""}
                  value={newProfile?.groups ? newProfile?.groups[j] : ""}
                  type="text"
                  autoComplete="off"
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
        fluid
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
              <button
                type="button"
                className={"btn btn-outline-primary btn-sm"}
                style={{
                  width: "5rem",
                  backgroundColor: "#FFFFFF",
                  color: "default",
                }}
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                variant="danger"
                style={{ width: "8rem" }}
                onClick={() => {
                  setEditing(false);
                  setEditingInterests(false);
                  setNewProfile(user);
                }}
              >
                Cancel
              </Button>
              <Button
                title={noProfilePic ? "Add an image before saving" : ""}
                variant="success"
                style={{ width: "8rem" }}
                onClick={() => {
                  setEditing(false);
                  setEditingInterests(false);
                  editProfile();
                }}
                disabled={!validProfile(newProfile)}
              >
                Save Changes
              </Button>
            </React.Fragment>
          )}
        </Row>
        <Row>
          <Col md={4} xl={3} className="align-items-center text-center px-3">
            {renderLeftInfo()}
          </Col>
          <Col md={8} xl={6} className="px-3">
            <h5>Interests</h5>
            <Row>{renderInterests()}</Row>
            <h5>Extracurriculars</h5>
            <Row>{renderEcs()}</Row>
            {/* <h5>Courses</h5> */}

            {/* <Row>{renderCourses()}</Row> */}
            <SignOut
              style={{ position: "absolute", right: "10%" }}
              reset={props.reset}
            />
          </Col>
        </Row>
      </Container>
    );
  };

  if (!user) return null;
  return renderProfile();
}

export default ProfileView;

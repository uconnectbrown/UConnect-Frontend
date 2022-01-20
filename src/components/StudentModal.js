// Setup
import React, { useEffect, useState } from "react";
import axios from "axios";
import { db, auth } from "../firebase";
import md5 from "md5";
import { useNavigate } from "react-router";

import ConnectButton from "./ConnectButton";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./StudentModal.css";
import Tooltip from "@material-ui/core/Tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

// Body
function StudentModal(props) {
  const navigate = useNavigate();
  const emailId = auth.currentUser.email.split("@")[0];
  const studentId = props.studentId;
  const [outgoing] = useState(props.outgoing);
  const [student, setStudent] = useState(null);
  const [status, setStatus] = useState(null);
  const [validUndo, setValidUndo] = useState(null);

  useEffect(() => {
    getStudent();
  }, []);

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (outgoing) checkUndo();
  }, [outgoing]);

  const getStudent = () => {
    let oCourses = [];
    let sCodes = [];
    let studentInfo = {};
    let promises = [
      db
        .doc(`/profiles/${emailId}`)
        .get()
        .then((doc) => {
          oCourses = doc.data().courses;
        }),
      axios.get(`/user/${studentId}`).then((res) => {
        studentInfo = res.data.user;
        sCodes = res.data.user.courses
          .map((course) => course.code)
          .filter(Boolean);
      }),
    ];

    Promise.all(promises).then(() => {
      let common = [];

      for (let i = 0; i < oCourses.length; i++) {
        if (sCodes.includes(oCourses[i].code)) {
          common.push(oCourses[i]);
        }
      }
      studentInfo.courses = common;
      setStudent(studentInfo);
    });
  };

  const checkStatus = () => {
    axios
      .get(`/status/${emailId}/${studentId}`)
      .then((res) => {
        setStatus(res.data);
      })

      .catch((err) => console.log(err));
  };

  const checkUndo = () => {
    if (outgoing.length > 0) {
      for (let i = 0; i < outgoing.length; i++) {
        if (outgoing[i].emailId === studentId) {
          let currentTime = new Date();
          let sentTime = new Date(outgoing[i].sent);
          if ((currentTime - sentTime) / 60000 > 2880) {
            setValidUndo(true);
          } else setValidUndo(false);
        }
      }
    }
  };

  const sendRequest = () => {
    let arr = [...outgoing];
    if (emailId && student) {
      let senderInfo = {};
      db.doc(`/profiles/${emailId}`)
        .get()
        .then((doc) => {
          senderInfo.name = doc.data().firstName + " " + doc.data().lastName;
          senderInfo.imageUrl = doc.data().imageUrl;
          senderInfo.classYear = doc.data().classYear;
          senderInfo.receiverImageUrl = student.imageUrl;
          senderInfo.receiverClassYear = student.classYear;
          senderInfo.receiverName = student.firstName + " " + student.lastName;
          return senderInfo;
        })
        .then((info) => {
          return axios.post(`/request/${emailId}/${studentId}`, info);
        })
        .then(() => {
          props.fetchUser();
          return setStatus("out");
        })
        .then(() => {
          return checkUndo();
        })
        .catch((err) => console.log(err));
    }
  };

  const sendMessage = () => {
    let info = {
      studentId,
      studentImage: student.imageUrl,
      studentName: student.firstName + " " + student.lastName,
    };
    axios
      .get(`/senderInfo/${auth.currentUser.email}`)
      .then((res) => {
        info.ownId = res.data.emailId;
        info.ownImage = res.data.imageUrl;
        info.ownName = res.data.firstName + " " + res.data.lastName;
        info.roomId = md5([res.data.emailId, studentId].sort().join(" "));
      })
      .then(() => {
        navigate({
          pathname: "/messages",
          state: {
            messageInfo: info,
          },
        });
      })
      .catch((err) => console.error(err));
  };

  const acceptRequest = () => {
    let info = {
      senderName: student.firstName + " " + student.lastName,
      senderImageUrl: student.imageUrl,
      senderClassYear: student.classYear,
    };
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        info.receiverName = doc.data().firstName + " " + doc.data().lastName;
        info.receiverImageUrl = doc.data().imageUrl;
        info.receiverClassYear = doc.data().classYear;
        return info;
      })
      .then((info) => {
        axios
          .post(`/accept/${studentId}/${emailId}`, info)
          .then(() => {
            setStatus("con");
          })
          .then(() => {
            props.fetchUser();
          })
          .catch((err) => console.log(err));
      });
  };

  const undoRequest = () => {
    axios
      .get(`/undoRequest/${emailId}/${studentId}`)
      .then(() => {
        setStatus("nil");
        props.fetchUser();
      })
      .catch((err) => console.log(err));
  };

  const renderCourses = () => {
    if (status === "con") {
      return student.courses.map((c) => {
        if (!c.name) return null;
        return (
          <div
            className="modal-profile-courses d-flex flex-column text-center align-items-center justify-content-center"
            // onClick={}
          >
            <div>{c.code}</div>
            <div style={{ fontSize: "10px" }}>{c.name}</div>
          </div>
        );
      });
    } else {
      return student.courses.map((c) => {
        if (!c.name) return null;
        return (
          <div
            className="modal-profile-courses d-flex flex-column text-center align-items-center justify-content-center"
            // onClick={}
          >
            <Tooltip title="Connect to unlock">
              <span>
                <FontAwesomeIcon style={{ width: 15 }} icon={faLock} />
              </span>
            </Tooltip>
          </div>
        );
      });
    }
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
    const groups = [student.groups[0], student.groups[1], student.groups[2]];
    const varsitySports = [student.varsitySports[0], student.varsitySports[1]];
    const pickupSports = [
      student.pickUpSports[0],
      student.pickUpSports[1],
      student.pickUpSports[2],
    ];
    const instruments = [
      student.instruments[0],
      student.instruments[1],
      student.instruments[2],
    ];

    const allEcs = [groups, varsitySports, pickupSports, instruments];

    return categories.map((cat, i) => {
      const list = allEcs[i];

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
                {list.map((l) => {
                  return l ? <li>{l}</li> : null;
                })}
              </ul>
            )}
            <div align="center">
              {list.filter(Boolean).length === 0 && (
                <p style={{ fontSize: "14px", textAlign: "center" }}>None</p>
              )}
            </div>
          </div>
        </Col>
      );
    });
  };

  if (!(student && status)) return null;

  return (
    <Container className="modal-profile-wrap d-flex flex-wrap py-3">
      {/* close button to close modal */}
      <Col sm={12} className="d-flex justify-content-end">
        <Button onClick={props.onHide}>&times;</Button>
      </Col>
      <Col xs={12} md={4} className="align-items-center text-center px-3">
        <div style={{ border: "5px solid #ffffff", borderRadius: "10rem" }}>
          <img
            className={
              props.imageUrl ===
              "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media"
                ? "modal-profile-img-blur"
                : "modal-profile-img"
            }
            alt="Profile"
            src={student.imageUrl}
          />
        </div>
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
        <div>
          {student.majors
            .filter(Boolean)
            .map((major, i) =>
              i !== student.majors.filter(Boolean).length - 1
                ? major + ", "
                : major
            )}
        </div>
        <p className="modal-bio">{student.bio}</p>
        <ConnectButton
          closeOnUndo={props.closeOnUndo}
          handleClose={props.handleClose}
          requests={props.requests}
          status={status}
          sendRequest={sendRequest}
          acceptRequest={acceptRequest}
          undoRequest={undoRequest}
          validUndo={validUndo}
          sendMessage={sendMessage}
        />
      </Col>
      <Col sm={8} className="px-3">
        <h5>Interests</h5>
        <Row>{renderInterests()}</Row>
        <h5>Extracurriculars</h5>
        <Row>{renderEcs()}</Row>
        <h5>Common Courses</h5>
        {student.courses.length === 0 && <p>You have no common courses.</p>}
        <Row>{renderCourses()}</Row>
      </Col>
    </Container>
  );
}

export default StudentModal;

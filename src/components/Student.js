// Setup
import React, { useEffect, useState } from "react";
import axios from "axios";
import { db, auth } from "../firebase";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import CheckIcon from "@material-ui/icons/Check";
import MessageIcon from "@material-ui/icons/Message";
import Book from "@material-ui/icons/MenuBook";
import Movie from "@material-ui/icons/Movie";
import Tv from "@material-ui/icons/Tv";
import Music from "@material-ui/icons/MusicNote";
import Pets from "@material-ui/icons/Pets";
import Sports from "@material-ui/icons/SportsBasketball";
import DialogContent from "@material-ui/core/DialogContent";

import ConnectButton from "./ConnectButton";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Student.css";

// Body
function Student(props) {
  const emailId = auth.currentUser.email.split("@")[0];
  const studentId = props.studentId;
  const [student, setStudent] = useState(null);
  const [indexArray, setIndexArray] = useState([]);
  const [status, setStatus] = useState(null);
  let requests = props.requests;

  useEffect(() => {
    getStudent();
  }, []);

  useEffect(() => {
    checkStatus();
  }, []);

  const getStudent = () => {
    axios
      .get(`/user/${studentId}`)
      .then((res) => {
        setStudent(res.data.user);
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

  const checkStatus = () => {
    axios
      .get(`/status/${emailId}/${studentId}`)
      .then((res) => {
        setStatus(res.data);
      })

      .catch((err) => console.log(err));
  };

  const sendRequest = () => {
    let senderInfo = {};
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        senderInfo.name = doc.data().firstName + " " + doc.data().lastName;
        senderInfo.imageUrl = doc.data().imageUrl;
        senderInfo.classYear = doc.data().classYear;
        return senderInfo;
      })
      .then((info) => {
        axios.post(`/request/${emailId}/${studentId}`, info);
      })
      .then(() => {
        return axios.get(`/reqfeatured/${emailId}/${studentId}`);
      })
      .then(() => {
        setStatus("out");
        props.handleRequest();
        props.handleFeatured();
      })
      .catch((err) => console.log(err));
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
            props.handleFeatured();
          })
          .then(() => {
            return axios.get(`/accfeatured/${studentId}/${emailId}`);
          })
          .catch((err) => console.log(err));
      });
  };

  const renderCourses = () => {
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
  };

  if (!(student && status)) return null;

  return (
    <Container className="modal-profile-wrap d-flex py-3">
      <Col sm={4} className="align-items-center text-center px-3">
        <img
          className="modal-profile-img"
          alt="Profile Picture"
          src={student.imageUrl}
        />
        <div style={{ fontSize: "1.5em", fontStyle: "bold" }}>
          {student.firstName + " " + student.lastName}
        </div>
        <div>
          {student.preferredPronouns && `(${student.preferredPronouns})`}
        </div>
        <div>Class of {student.classYear}</div>
        <div>{student.majors.map((major) => major)}</div>
        <div className="modal-bio">{student.bio}</div>
        <ConnectButton
          status={status}
          sendRequest={sendRequest}
          acceptRequest={acceptRequest}
        />
      </Col>
      <Col sm={8} className="px-3">
        <Row>{renderCourses()}</Row>
      </Col>
    </Container>
  );

  return (
    <DialogContent>
      {student && status && (
        <div>
          <Card raised>
            {/* <IconButton><CloseIcon /></IconButton> */}

            {status === "nil" && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="back"
                onClick={sendRequest}
              >
                <SendIcon />
                <span style={{ marginRight: "5px" }} />
              </IconButton>
            )}

            {status === "out" && <Typography>request sent</Typography>}

            {status === "in" && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="back"
                onClick={acceptRequest}
              >
                <CheckIcon />
                <span style={{ marginRight: "5px" }} />
              </IconButton>
            )}

            {status === "con" && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="back"
                onClick={() =>
                  props.handleOpenMessage(
                    studentId,
                    student.imageUrl,
                    student.firstName + " " + student.lastName
                  )
                }
              >
                <MessageIcon />
                <span style={{ marginRight: "5px" }} />
              </IconButton>
            )}

            <CardContent align="center">
              <Grid container spacing={2}>
                <Grid item sm>
                  <Card>
                    <CardContent>
                      <div>
                        <span>
                          <Typography variant="h5">Groups</Typography>
                        </span>
                        <br />
                        {student.group1 && (
                          <Typography>• {student.group1}</Typography>
                        )}
                        {student.group2 && (
                          <Typography>• {student.group2}</Typography>
                        )}
                        {student.group3 && (
                          <Typography>• {student.group3}</Typography>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: "red",
                      height: "100%",
                      marginBottom: "-5px",
                    }}
                  >
                    <CardContent>
                      <div>
                        <span>
                          <Typography variant="h5">Varsity Sports</Typography>
                        </span>
                        <br />
                        {student.varsitySport1 && (
                          <Typography>• {student.varsitySport1}</Typography>
                        )}
                        {student.varsitySport2 && (
                          <Typography>• {student.varsitySport2}</Typography>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: "red",
                      height: "100%",
                      marginBottom: "-5px",
                    }}
                  >
                    <CardContent>
                      <div>
                        <span>
                          <Typography variant="h5">
                            Greek Organization
                          </Typography>
                        </span>
                        <br />
                        {student.greekLife && (
                          <Typography>• {student.greekLife}</Typography>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <br />
          <Card raised>
            <CardContent align="center">
              <Typography variant="h3">Interests </Typography>
              <hr />
              <br />
              <Grid container spacing={2}>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",

                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5">Career and Academic</Typography>
                      <br />
                      {student.interests1.map((interest) => {
                        return <Typography>• {interest}</Typography>;
                      })}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",

                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5">
                        Physical Activity and Wellness
                      </Typography>
                      <br />
                      {student.interests2.map((interest) => {
                        return <Typography>• {interest}</Typography>;
                      })}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5">General Hobbies</Typography>
                      <br />
                      {student.interests3.map((interest) => {
                        return <Typography>• {interest}</Typography>;
                      })}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <br />
              <br />
              <Card raised style={{ marginBottom: "-5px" }}>
                <CardContent>
                  <Typography variant="h4">Additional Info</Typography>
                  <hr />
                  <br />
                  <Grid container>
                    <Grid item sm>
                      <div>
                        <Music />
                        <span>
                          <Typography variant="h6">Instruments</Typography>
                        </span>
                        <br />
                        {student.instrument1 && (
                          <Typography>• {student.instrument1}</Typography>
                        )}
                        {student.instrument2 && (
                          <Typography>• {student.instrument2}</Typography>
                        )}
                        {student.instrument3 && (
                          <Typography>• {student.instrument3}</Typography>
                        )}
                      </div>
                    </Grid>
                    <Grid item sm>
                      <div>
                        <Sports />
                        <span>
                          <Typography variant="h6">Pick-Up Sports</Typography>
                        </span>
                        <br />
                        {student.pickUpSport1 && (
                          <Typography>• {student.pickUpSport1}</Typography>
                        )}
                        {student.pickUpSport2 && (
                          <Typography>• {student.pickUpSport2}</Typography>
                        )}
                        {student.pickUpSport3 && (
                          <Typography>• {student.pickUpSport3}</Typography>
                        )}
                      </div>
                    </Grid>
                    <Grid item sm>
                      <div>
                        <Pets />
                        <span>
                          <Typography variant="h6">Pets</Typography>
                        </span>
                        <br />
                        {student.pet1 && (
                          <Typography>• {student.pet1}</Typography>
                        )}
                        {student.pet2 && (
                          <Typography>• {student.pet2}</Typography>
                        )}
                        {student.pet3 && (
                          <Typography>• {student.pet3}</Typography>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          <br />
          <Card raised>
            <CardContent align="center">
              <Typography variant="h3">Favorites </Typography>
              <hr />
              <br />
              <Grid container spacing={2}>
                <Grid item sm>
                  <div>
                    <Book />
                    <Typography variant="body1">
                      Book: {student.favoriteBook}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm>
                  <div>
                    <Movie />
                    <Typography variant="body1">
                      Movie: {student.favoriteMovie}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm>
                  <div>
                    <Tv />
                    <Typography variant="body1">
                      Show: {student.favoriteShow}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm>
                  <div>
                    <Music />
                    <Typography variant="body1">
                      Artist: {student.favoriteArtist}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <br />
          <Card raised>
            <CardContent align="center">
              <Typography variant="h3">Courses</Typography>
              <hr />
              <br />
              <Grid container spacing={2}>
                {indexArray.map((index) => (
                  <Grid item sm>
                    <Card
                      style={{
                        borderStyle: "solid",
                        borderWidth: "3px",
                        borderColor: `${student.courses[index].color}`,
                        height: "100%",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          style={{
                            color: `${student.courses[index].color}`,
                          }}
                        >
                          {student.courses[index].code}
                        </Typography>
                        <Typography variant="body1">
                          {student.courses[index].name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
          <br />
        </div>
      )}
    </DialogContent>
  );
}

export default Student;

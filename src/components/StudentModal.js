// Setup
import React, { useEffect, useState } from "react";
import axios from "axios";
import { db, auth } from "../firebase";

import ConnectButton from "./ConnectButton";
import { Container, Row, Col, Card, Modal } from "react-bootstrap"
import "./StudentModal.css";

// Body
function StudentModal(props) {
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
          })
          .then(() => {
            return axios.get(`/accfeatured/${studentId}/${emailId}`);
          })
          .then(() => {
            props.handleFeatured();
          })
          .catch((err) => console.log(err));
      });
  };
  
  const renderCourses = () => {
    return student.courses.map(c => {
      if (!c.name) return null;
      return <div 
        className="modal-profile-courses d-flex flex-column text-center align-items-center justify-content-center"
        // onClick={}
      >
        <div>{c.code}</div>
        <div style={{ fontSize: '10px' }}>{c.name}</div>
      </div>
    })
  }

  const renderInterests = () => {
    const categories = [
      "Career and Academic", 
      "Physical Activity and Wellness", 
      "General Hobbies"
    ]
    const interests = [student.interests1, student.interests2, student.interests3]

    return categories.map((cat, i) => {
      const list = interests[i]
      return <Col sm={4} className="">
        <div className="interest-box">
          <p style={{ fontSize: '14px', textAlign: 'center' }}>{cat}</p>
          {list &&
            <ul>
              {list.map(l => <li>{l}</li>)}
            </ul>
          }
        </div>
      </Col>
    })
  }

  const renderEcs = () => {
    const categories = ["Groups", "Varsity Sports", "Pick-up Sports", "Instruments"];
    const groups = [student.group1, student.group2, student.group3];
    const varsitySports = [student.varsitySport1, student.varsitySport2];
    const pickupSports = [student.pickupSport1, student.pickupSport2, student.pickupSport3];
    const instruments = [student.instrument1, student.instrument2, student.instrument3];

    const allEcs = [groups, varsitySports, pickupSports, instruments]

    return categories.map((cat, i) => {
      const list = allEcs[i];

      return <Col sm={6} className="mb-3">
        <div className="interest-box">
          <p style={{ fontSize: '14px', textAlign: 'center' }}>{cat}</p>
          {list.length > 0 &&
            <ul>
              {list.map(l => {
                return l ? <li>{l}</li> : null;
              })}
            </ul>
          }
        </div>
      </Col>
    })
  }

  if (!(student && status)) return null;

  return (
    <Modal.Body>
      <Container className="modal-profile-wrap d-flex py-3">
        <Col sm={4} className="align-items-center text-center px-3">
          <img className="modal-profile-img" alt="Profile Picture" src={student.imageUrl}/>
          <div style={{ fontSize: '1.5em', fontStyle: 'bold' }}>
            {student.firstName + " " + student.lastName}
          </div>
          <div>{student.preferredPronouns && `(${student.preferredPronouns})`}</div>
          <div>Class of {student.classYear}</div>
          <div>{student.majors.map((major) => major)}</div>
          <div className="modal-bio">{student.bio}</div>
          <ConnectButton status={status} sendRequest={sendRequest} acceptRequest={acceptRequest}/>
        </Col>
        <Col sm={8} className="px-3">
          <Row>
            {renderCourses()}
          </Row>
          <h5>Interests</h5>
          <Row>
            {renderInterests()}
          </Row>
          <h5>Extracurriculars</h5>
          <Row>
            {renderEcs()}
          </Row>
        </Col>
      </Container>
    </Modal.Body>
  )

    // <DialogContent>
    //   {student && status && (
    //     <div>
    //       <Card raised>

    //         <CardContent align="center">
    //           <Grid container spacing={2}>
    //             <Grid item sm>
    //               <Card>
    //                 <CardContent>
    //                   <div>
    //                     <span>
    //                       <Typography variant="h5">Groups</Typography>
    //                     </span>
    //                     <br />
    //                     {student.group1 && (
    //                       <Typography>• {student.group1}</Typography>
    //                     )}
    //                     {student.group2 && (
    //                       <Typography>• {student.group2}</Typography>
    //                     )}
    //                     {student.group3 && (
    //                       <Typography>• {student.group3}</Typography>
    //                     )}
    //                   </div>
    //                 </CardContent>
    //               </Card>
    //             </Grid>
    //             <Grid item sm>
    //               <Card
    //               >
    //                 <CardContent>
    //                   <div>
    //                     <span>
    //                       <Typography variant="h5">Varsity Sports</Typography>
    //                     </span>
    //                     <br />
    //                     {student.varsitySport1 && (
    //                       <Typography>• {student.varsitySport1}</Typography>
    //                     )}
    //                     {student.varsitySport2 && (
    //                       <Typography>• {student.varsitySport2}</Typography>
    //                     )}
    //                   </div>
    //                 </CardContent>
    //               </Card>
    //             </Grid>
    //             <Grid item sm>
    //               <Card
    //                 raised
    //                 style={{
    //                   borderStyle: "solid",
    //                   borderWidth: "2px",
    //                   borderColor: "red",
    //                   height: "100%",
    //                   marginBottom: "-5px",
    //                 }}
    //               >
    //                 <CardContent>
    //                   <div>
    //                     <span>
    //                       <Typography variant="h5">
    //                         Greek Organization
    //                       </Typography>
    //                     </span>
    //                     <br />
    //                     {student.greekLife && (
    //                       <Typography>• {student.greekLife}</Typography>
    //                     )}
    //                   </div>
    //                 </CardContent>
    //               </Card>
    //             </Grid>
    //           </Grid>
    //         </CardContent>
    //       </Card>
    //       <br />
    //       <Card raised>
    //         <CardContent align="center">
    //           <Typography variant="h3">Interests </Typography>
    //           <hr />
    //           <br />
    //           <Grid container spacing={2}>
    //             <Grid item sm>
    //               <Card
    //                 raised
    //                 style={{
    //                   borderStyle: "solid",
    //                   borderWidth: "2px",

    //                   height: "100%",
    //                 }}
    //               >
    //                 <CardContent>
    //                   <Typography variant="h5">Career and Academic</Typography>
    //                   <br />
    //                   {student.interests1.map((interest) => {
    //                     return <Typography>• {interest}</Typography>;
    //                   })}
    //                 </CardContent>
    //               </Card>
    //             </Grid>
    //             <Grid item sm>
    //               <Card
    //                 raised
    //                 style={{
    //                   borderStyle: "solid",
    //                   borderWidth: "2px",

    //                   height: "100%",
    //                 }}
    //               >
    //                 <CardContent>
    //                   <Typography variant="h5">
    //                     Physical Activity and Wellness
    //                   </Typography>
    //                   <br />
    //                   {student.interests2.map((interest) => {
    //                     return <Typography>• {interest}</Typography>;
    //                   })}
    //                 </CardContent>
    //               </Card>
    //             </Grid>
    //             <Grid item sm>
    //               <Card
    //                 raised
    //                 style={{
    //                   borderStyle: "solid",
    //                   borderWidth: "2px",
    //                   height: "100%",
    //                 }}
    //               >
    //                 <CardContent>
    //                   <Typography variant="h5">General Hobbies</Typography>
    //                   <br />
    //                   {student.interests3.map((interest) => {
    //                     return <Typography>• {interest}</Typography>;
    //                   })}
    //                 </CardContent>
    //               </Card>
    //             </Grid>
    //           </Grid>
    //           <br />
    //           <br />
    //           <Card raised style={{ marginBottom: "-5px" }}>
    //             <CardContent>
    //               <Typography variant="h4">Additional Info</Typography>
    //               <hr />
    //               <br />
    //               <Grid container>
    //                 <Grid item sm>
    //                   <div>
    //                     <Music />
    //                     <span>
    //                       <Typography variant="h6">Instruments</Typography>
    //                     </span>
    //                     <br />
    //                     {student.instrument1 && (
    //                       <Typography>• {student.instrument1}</Typography>
    //                     )}
    //                     {student.instrument2 && (
    //                       <Typography>• {student.instrument2}</Typography>
    //                     )}
    //                     {student.instrument3 && (
    //                       <Typography>• {student.instrument3}</Typography>
    //                     )}
    //                   </div>
    //                 </Grid>
    //                 <Grid item sm>
    //                   <div>
    //                     <Sports />
    //                     <span>
    //                       <Typography variant="h6">Pick-Up Sports</Typography>
    //                     </span>
    //                     <br />
    //                     {student.pickUpSport1 && (
    //                       <Typography>• {student.pickUpSport1}</Typography>
    //                     )}
    //                     {student.pickUpSport2 && (
    //                       <Typography>• {student.pickUpSport2}</Typography>
    //                     )}
    //                     {student.pickUpSport3 && (
    //                       <Typography>• {student.pickUpSport3}</Typography>
    //                     )}
    //                   </div>
    //                 </Grid>
    //                 <Grid item sm>
    //                   <div>
    //                     <Pets />
    //                     <span>
    //                       <Typography variant="h6">Pets</Typography>
    //                     </span>
    //                     <br />
    //                     {student.pet1 && (
    //                       <Typography>• {student.pet1}</Typography>
    //                     )}
    //                     {student.pet2 && (
    //                       <Typography>• {student.pet2}</Typography>
    //                     )}
    //                     {student.pet3 && (
    //                       <Typography>• {student.pet3}</Typography>
    //                     )}
    //                   </div>
    //                 </Grid>
    //               </Grid>
    //             </CardContent>
    //           </Card>
    //         </CardContent>
    //       </Card>
    //       <br />
    //       <Card raised>
    //         <CardContent align="center">
    //           <Typography variant="h3">Favorites </Typography>
    //           <hr />
    //           <br />
    //           <Grid container spacing={2}>
    //             <Grid item sm>
    //               <div>
    //                 <Book />
    //                 <Typography variant="body1">
    //                   Book: {student.favoriteBook}
    //                 </Typography>
    //               </div>
    //             </Grid>
    //             <Grid item sm>
    //               <div>
    //                 <Movie />
    //                 <Typography variant="body1">
    //                   Movie: {student.favoriteMovie}
    //                 </Typography>
    //               </div>
    //             </Grid>
    //             <Grid item sm>
    //               <div>
    //                 <Tv />
    //                 <Typography variant="body1">
    //                   Show: {student.favoriteShow}
    //                 </Typography>
    //               </div>
    //             </Grid>
    //             <Grid item sm>
    //               <div>
    //                 <Music />
    //                 <Typography variant="body1">
    //                   Artist: {student.favoriteArtist}
    //                 </Typography>
    //               </div>
    //             </Grid>
    //           </Grid>
    //         </CardContent>
    //       </Card>
    //       <br />
    //       <Card raised>
    //         <CardContent align="center">
    //           <Typography variant="h3">Courses</Typography>
    //           <hr />
    //           <br />
    //           <Grid container spacing={2}>
    //             {indexArray.map((index) => (
    //               <Grid item sm>
    //                 <Card
    //                   style={{
    //                     borderStyle: "solid",
    //                     borderWidth: "3px",
    //                     borderColor: `${student.courses[index].color}`,
    //                     height: "100%",
    //                   }}
    //                 >
    //                   <CardContent>
    //                     <Typography
    //                       variant="h5"
    //                       style={{
    //                         color: `${student.courses[index].color}`,
    //                       }}
    //                     >
    //                       {student.courses[index].code}
    //                     </Typography>
    //                     <Typography variant="body1">
    //                       {student.courses[index].name}
    //                     </Typography>
    //                   </CardContent>
    //                 </Card>
    //               </Grid>
    //             ))}
    //           </Grid>
    //         </CardContent>
    //       </Card>
    //       <br />
    //     </div>
    //   )}
    // </DialogContent>
}

export default StudentModal;

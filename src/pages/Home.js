// Setup
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";

// Components
import NavBar from "../components/NavBar";
import Landing from "../components/Landing";
import Connections from "../components/Connections";
import Messages from "../components/Messages";
import Course from "../components/Course";
import Notifications from "../components/Notifications";
import Profile from "../components/Profile";
import InterestFilter from "../components/InterestFilter";
import Events from "../components/Events";

import { Container, Row, Col, Nav, Button, DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCommentAlt, faUserFriends, faDesktop } from "@fortawesome/free-solid-svg-icons"
import './Home.css'

// Body
function Home() {
  const [page, setPage] = useState("Home");
  const [showDropdown, setshowDropdown] = useState(false);
  const [courses, setCourses] = useState([]);
  const [requests, setRequests] = useState(null);
  const emailId = auth.currentUser.email.split("@")[0];
  const [code, setCode] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getRequests();
  }, []);

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    getImageUrl();
  }, []);

  const getRequests = () => {
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        setRequests(doc.data().requests);
      })
      .catch((err) => console.log(err));
  };

  const decRequests = () => {
    setRequests(requests - 1);
  };

  const getCourses = () => {
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        setCourses(doc.data().courses);
      })
      .catch((err) => console.log(err));
  };

  const getImageUrl = () => {
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        setImageUrl(doc.data().imageUrl);
      })
      .catch((err) => console.log(err));
  };

  const handleProfile = () => {
    setPage("Profile");
  };

  return (
    <Container>
      <NavBar requests={requests} imageUrl={imageUrl} handleProfile={handleProfile}/>
      <Row className='px-3 py-4'>
        <Col xs={2}>  
          <Nav defaultActiveKey='/home' className='flex-column'>
            <Button variant="outline-light" className='nav-button' onClick={() => setPage("Home")}>
              <FontAwesomeIcon icon={faHome} style={{ width: '100%'}}/>
              Home
            </Button>
            <Button variant="outline-light" className='nav-button' onClick={() => setPage("Messages")}>
              <FontAwesomeIcon icon={faCommentAlt} style={{ width: '100%'}}/>
              Messages
            </Button>
            <Button variant="outline-light" className='nav-button' onClick={() => setPage("Connections")}>
              <FontAwesomeIcon icon={faUserFriends} style={{ width: '100%'}}/> 
              Connections
            </Button>
            <div 
              onMouseEnter={() => setshowDropdown(true)} 
              onMouseLeave={() => setshowDropdown(false)}
            >
              <Button variant="outline-light" className='nav-button dropdown' >
                <FontAwesomeIcon icon={faDesktop} style={{ width: '100%'}}/> 
                Courses
              {showDropdown &&
                <ButtonGroup vertical style={{ width: '100%'}}> 
                  {courses.map((course) => {
                    if (!course.code) return null
                    return <Button variant="outline-light" className='nav-button'
                      onClick={() => {
                        setCode(course.code);
                        setPage("Course");
                        // setDropDown(!dropDown);
                      }}>
                      {course.code}
                    </Button>
                  })}
                </ButtonGroup>
              }
              </Button>
            </div>
          </Nav>
          {/* <Notifications/> */}
        </Col>
        <Col xs={10}>
          {/* {page === "Home" && (
            <div>
              <Landing handleRequest={decRequests} requests={requests} />
              <Events />
            </div>
          )}
          {page === "Messages" && <Messages />}
          {page === "Interests" && <InterestFilter />}
          {page === "Connections" && <Connections />}
          {page === "Course" && code && (
            <Course code={code} handleRequest={decRequests} />
          )}
          {page === "Profile" && <Profile />} */}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;

    // <div align='center'>
    //       <Button
    //         fullWidth
    //         variant="contained"
    //         onClick={() => setDropDown(!dropDown)}
    //       >
    //         Courses
    //       </Button>

    //       {courses && dropDown && (
    //         <div>
    //           {courses.map((course) => {
    //             if (course.code) {
    //               return (
    //                 <Button
    //                   fullWidth
    //                   variant="contained"
    //                   onClick={() => {
                        // setCode(course.code);
                        // setPage("Course");
                        // setDropDown(!dropDown);
    //                   }}
    //                 >
    //                   {course.code}
    //                 </Button>
    //               );
    //             }
    //           })}
    //         </div>
    //       )}

    //       <Notifications />
    //     </Grid>
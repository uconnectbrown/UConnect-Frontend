// Setup
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

// Authentication
import { db, auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

// Pages
import profileBuild from "./pages/profileBuild";

import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Welcome from "./components/Welcome";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Messages from "./components/Messages";
import Home from "./components/Home";
import Connections from "./components/Connections";
import Profile from "./components/Profile";
import Course from "./components/Course";

// MUI Stuff
import Grid from "@material-ui/core/Grid";

axios.defaults.baseURL =
  "https://us-east4-uconnect-5eebd.cloudfunctions.net/api";

// Body
function App() {
  // Authentication
  const [user] = useAuthState(auth);
  const [emailId, setEmailId] = useState(null);
  const [deny, setDeny] = useState(null);

  const denyAccess = () => {
    setDeny(true);
  };

  const grantAccess = () => {
    setDeny(false);
  };

  useEffect(() => {
    if (auth.currentUser) {
      setEmailId(auth.currentUser.email.split("@")[0]);
      checkUser(auth.currentUser.email.split("@")[0]);
    }
  }, [user]);

  const checkUser = (e) => {
    db.doc(`/profiles/${e}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDeny(false);
        } else {
          setDeny(true);
        }
      });
  };

  // Courses
  const [courses, setCourses] = useState([]);
  const [code, setCode] = useState("");
  useEffect(() => {
    if (deny === false) getCourses();
  }, [deny]);
  const getCourses = () => {
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        setCourses(doc.data().courses);
      })
      .catch((err) => console.log(err));
  };
  const handleCode = (c) => {
    setCode(c);
  };

  // Requests
  const [requests, setRequests] = useState(null);
  useEffect(() => {
    if (deny === false) getRequests();
  }, [deny]);
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

  // Image URL
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (deny === false) getImageUrl();
  }, [deny]);
  const getImageUrl = () => {
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        setImageUrl(doc.data().imageUrl);
      })
      .catch((err) => console.log(err));
  };

  // Reset states
  const reset = () => {
    setImageUrl("");
    setRequests(null);
    setCourses([]);
    setCode("");
    setEmailId(null);
    setDeny(null);
  };

  return (
    <div className="App">
      {user && deny === false ? (
        <Router>
          <NavBar requests={requests} imageUrl={imageUrl} reset={reset} />
          <Container fluid>
            <Row className='px-3 py-4'>
              <Col xs={2}>
                <SideBar courses={courses} handleCode={handleCode} />
              </Col>
              <Col xs={10}>
                <Switch>
                  <Route exact path="/#/home">
                    <Home requests={requests} handleRequest={decRequests} />
                  </Route>
                  <Route exact path="/#/messages" component={Messages} />
                  <Route exact path="/#/connections" component={Connections} />
                  <Route exact path="/#/profile" component={Profile} />
                  <Route path="/#/courses/:codeParam">
                    <Course code={code} handleRequest={decRequests} />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </Container>
        </Router>
      ) : (
        <Router>
          <Container fluid>
            <Switch>
              <Route exact path="/">
                <Welcome denyAccess={denyAccess} grantAccess={grantAccess} />
              </Route>
              <Route exact path="/#/profileBuild">
                <ProfileBuild grantAccess={grantAccess} />
              </Route>
            </Switch>
          </Container>
        </Router>
      )}
    </div>
  );
}

export default App;

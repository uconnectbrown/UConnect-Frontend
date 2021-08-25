// Setup
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Authentication
import { db, auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

// Components
import Welcome from "./components/Welcome";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Messages from "./components/Messages";
import Home from "./components/Home";
import Connections from "./components/Connections";
import Profile from "./components/Profile";
import ProfileBuild from "./components/ProfileBuild";
import Course from "./components/Course";

// MUI Stuff
import Grid from "@material-ui/core/Grid";

// Body
function App() {
  // Authentication
  const [user] = useAuthState(auth);
  const [emailId, setEmailId] = useState(null);
  const [exists, setExists] = useState(null);
  const dne = () => {
    setExists(false);
  };
  const de = () => {
    setExists(true);
  };

  useEffect(() => {
    if (auth.currentUser && exists)
      setEmailId(auth.currentUser.email.split("@")[0]);
  }, [exists]);

  // Courses
  const [courses, setCourses] = useState([]);
  const [code, setCode] = useState("");
  useEffect(() => {
    if (emailId && exists) getCourses();
  }, [emailId]);
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
    if (emailId && exists) getRequests();
  }, [emailId]);
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
    if (emailId && exists) getImageUrl();
  }, [emailId]);
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
    setExists(null);
  };

  return (
    <div className="App">
      {user && exists ? (
        <Router>
          <NavBar requests={requests} imageUrl={imageUrl} reset={reset} />
          <div className="container">
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <SideBar courses={courses} handleCode={handleCode} />
              </Grid>
              <Grid item xs={9}>
                <Switch>
                  <Route exact path="/home">
                    <Home requests={requests} handleRequest={decRequests} />
                  </Route>
                  <Route exact path="/messages" component={Messages} />
                  <Route exact path="/connections" component={Connections} />
                  <Route exact path="/profile" component={Profile} />
                  <Route path="/courses/:codeParam">
                    <Course code={code} handleRequest={decRequests} />
                  </Route>
                </Switch>
              </Grid>
            </Grid>
          </div>
        </Router>
      ) : (
        <Router>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Welcome de={de} dne={dne} />
              </Route>
              <Route exact path="/profileBuild">
                <ProfileBuild de={de} />
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;

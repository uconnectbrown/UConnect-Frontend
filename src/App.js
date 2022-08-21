// Setup
import "./App.css";
import React, { useState, useEffect } from "react";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import axios from "axios";

// Authentication
import { db, auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

// Pages
import MessageView from "./pages/MessageView";
import Discover from "./pages/DiscoverView";
import Connections from "./pages/ConnectionsView";
import ProfileView from "./pages/ProfileView";
import ProfileBuild from "./pages/ProfileBuild";
import CourseView from "./pages/CourseView";
import Welcome from "./pages/WelcomeView";

// Components
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

// Styling
import { Container, Row, Col } from "react-bootstrap";

axios.defaults.baseURL =
  "https://us-east4-uconnect-5eebd.cloudfunctions.net/api";

// Body
function App() {
  // Authentication (set deny Boolean)
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
  const [courses, setCourses] = useState([]); // list of courses for SideBar
  const [code, setCode] = useState(""); // course code for CourseView
  const [name, setName] = useState(""); // course name for CourseView

  useEffect(() => {
    if (deny === false) getCourses();
  }, [deny]);
  const getCourses = (codeNS) => {
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        setCourses(doc.data().courses); // set list of courses for SideBar
        return doc.data().courses;
      })
      .then((courses) => {
        // set code and name in CourseView
        let c, n;
        for (let i = 0; i < courses.length; i++) {
          if (courses[i].code.replace(/\s/g, "") === codeNS) {
            c = courses[i].code;
            n = courses[i].name;
          }
        }
        setCode(c);
        setName(n);
      })
      .catch((err) => console.log(err));
  };
  const handleCode = (c) => {
    // for updating code upon clicking course on SideBar
    setCode(c);
  };
  const handleName = (n) => {
    // for updating name upon clicking course on SideBar
    setName(n);
  };

  const updateCourses = (courses) => {
    // for setting list of courses upon editing courses in ProfileView
    setCourses(courses);
  };

  // Requests
  const [requests, setRequests] = useState(null); // number of requests
  useEffect(() => {
    if (deny === false) getRequests();
  }, [deny]);
  const getRequests = () => {
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        setRequests(doc.data().requests); // set number of requests
      })
      .catch((err) => console.log(err));
  };
  const decRequests = () => {
    // decrement requests
    setRequests(requests - 1);
  };
  const incRequests = () => {
    // increment requests
    setRequests(requests + 1);
  };

  // Image URL
  const [imageUrl, setImageUrl] = useState(""); // url for profile picture
  useEffect(() => {
    if (deny === false) getImageUrl();
  }, [deny]);
  const getImageUrl = () => {
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        setImageUrl(doc.data().imageUrl); // set imageUrl
      })
      .catch((err) => console.log(err));
  };
  const updateImage = (url) => {
    // update imageUrl upon changing profile pic in ProfileView
    setImageUrl(url);
  };

  // Outgoing and pending
  const [outgoing, setOutgoing] = useState(null); // list of outgoing connections
  const [pending, setPending] = useState(null); // number of pending connections
  useEffect(() => {
    if (deny === false) {
      getOutgoing();
      getPending();
    }
  }, [deny]);
  const getOutgoing = () => {
    let students = [];
    db.collection("profiles")
      .doc(emailId)
      .collection("sent")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          students.push(doc.data());
        });
        setOutgoing(students); // set outgoing connections
      })
      .catch((err) => console.log(err));
  };
  const updateOutgoing = (s) => {
    // update outgoing connections
    setOutgoing(s);
  };
  const getPending = () => {
    let number = 0;
    db.collection("profiles")
      .doc(emailId)
      .collection("pending")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          number += 1;
        });
        setPending(number); // set number of pending connections
      })
      .catch((err) => console.log(err));
  };
  const decPending = () => {
    // decrement number of pending connections
    setPending(pending - 1);
  };

  // Messages
  const [messageCount, setMessageCount] = useState(null); // number of unread messages
  useEffect(() => {
    if (deny === false) getMessageCount();
  }, [deny]);
  const getMessageCount = () => {
    axios
      .get(`/messages/${emailId}`)
      .then((res) => {
        setMessageCount(res.data.filter((message) => !message.read).length); // set number of unread messages
      })
      .catch((err) => console.log(err));
  };
  const decMessageCount = () => {
    // decrement number of unread messages
    setMessageCount(messageCount - 1);
  };

  // First time users and onboarding
  const [firstTime, setFirstTime] = useState(null); // boolean for first time user
  useEffect(() => {
    if (deny === false) checkFirstTime();
  }, [deny]);
  const checkFirstTime = () => {
    db.doc(`profiles/${emailId}`)
      .get()
      .then((doc) => {
        return setFirstTime(doc.data().firstTime);
      })
      .catch((err) => console.log(err));
  };
  const finishOB = () => {
    // set firstTime to false upon completing onboarding
    setFirstTime(false);
  };

  // Reset states upon signing out
  const reset = () => {
    setImageUrl("");
    setRequests(null);
    setCourses([]);
    setCode("");
    setEmailId(null);
    setDeny(null);
  };

  // Invalid URL
  const NoMatch = () => {
    return (
      <h3>
        Page not found. Click <Link to="/discover">here</Link> to go back to
        UConnect
      </h3>
    );
  };

  return (
    <div className="App">
      {user && deny === false ? (
        <HashRouter>
          <NavBar
            requests={requests}
            imageUrl={imageUrl}
            incRequests={incRequests}
            updateOutgoing={updateOutgoing}
            outgoing={outgoing}
          />
          <Container fluid>
            <Row className="px-3 py-4 h-100">
              <Col sm={12} md={2}>
                {!firstTime && (
                  <SideBar
                    courses={courses}
                    handleCode={handleCode}
                    handleName={handleName}
                    pending={pending}
                    messageCount={messageCount}
                    firstTime={firstTime}
                  />
                )}
              </Col>
              <Col xs={11} md={10}>
                <Switch>
                  <Route exact path="/">
                    <Discover
                      requests={requests}
                      decRequests={decRequests}
                      decPending={decPending}
                      incRequests={incRequests}
                      updateOutgoing={updateOutgoing}
                      outgoing={outgoing}
                      firstTime={firstTime}
                      imageUrl={imageUrl}
                    />
                  </Route>
                  <Route exact path="/discover">
                    <Discover
                      requests={requests}
                      decRequests={decRequests}
                      decPending={decPending}
                      incRequests={incRequests}
                      updateOutgoing={updateOutgoing}
                      outgoing={outgoing}
                      firstTime={firstTime}
                      imageUrl={imageUrl}
                    />
                  </Route>
                  <Route
                    exact
                    path="/messages"
                    render={(props) => (
                      <MessageView
                        {...props}
                        decMessageCount={decMessageCount}
                        fetchMessageCount={getMessageCount}
                        imageUrl={imageUrl}
                      />
                    )}
                  />
                  <Route exact path="/connections">
                    <Connections
                      decPending={decPending}
                      fetchPending={getPending}
                      imageUrl={imageUrl}
                      incRequests={incRequests}
                    />
                  </Route>
                  <Route exact path="/profile">
                    <ProfileView
                      handleImage={updateImage}
                      handleCourses={updateCourses}
                      reset={reset}
                      finishOB={finishOB}
                    />
                  </Route>
                  <Route path="/courses/:codeParam">
                    <CourseView
                      code={code}
                      name={name}
                      getCourseInfo={getCourses}
                      decRequests={decRequests}
                      decPending={decPending}
                      incRequests={incRequests}
                      updateOutgoing={updateOutgoing}
                      outgoing={outgoing}
                      imageUrl={imageUrl}
                    />
                  </Route>
                  <Route path="*">
                    <NoMatch />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </Container>
        </HashRouter>
      ) : (
        <HashRouter>
          <Container fluid>
            <Switch>
              <Route exact path="/">
                <Welcome denyAccess={denyAccess} grantAccess={grantAccess} />
              </Route>
              <Route exact path="/profileBuild">
                <ProfileBuild grantAccess={grantAccess} />
              </Route>
              {/* <Route path="*">
                <NoMatch2 />
              </Route> */}
            </Switch>
          </Container>
        </HashRouter>
      )}
    </div>
  );
}

export default App;

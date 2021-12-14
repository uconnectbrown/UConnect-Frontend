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
import HomeView from "./pages/HomeView";
import PostView from "./pages/PostView";

// Components
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

// Styling
import { Container, Row, Col } from "react-bootstrap";

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
  const [name, setName] = useState("");
  useEffect(() => {
    if (deny === false) getCourses();
  }, [deny]);
  const getCourses = (codeNS) => {
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        setCourses(doc.data().courses);
        return doc.data().courses;
      })
      .then((courses) => {
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
    setCode(c);
  };
  const handleName = (n) => {
    setName(n);
  };

  const updateCourses = (courses) => {
    setCourses(courses);
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
  const incRequests = () => {
    setRequests(requests + 1);
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
  const updateImage = (url) => {
    setImageUrl(url);
  };

  // Outgoing and pending
  const [outgoing, setOutgoing] = useState(null);
  const [pending, setPending] = useState(null);
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
        setOutgoing(students);
      })
      .catch((err) => console.log(err));
  };
  const updateOutgoing = (s) => {
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
        setPending(number);
      })
      .catch((err) => console.log(err));
  };
  const decPending = () => {
    setPending(pending - 1);
  };

  // Messages
  const [messageCount, setMessageCount] = useState(null);
  useEffect(() => {
    if (deny === false) getMessageCount();
  }, [deny]);
  const getMessageCount = () => {
    axios
      .get(`/messages/${emailId}`)
      .then((res) => {
        setMessageCount(res.data.filter((message) => !message.read).length);
      })
      .catch((err) => console.log(err));
  };
  const decMessageCount = () => {
    setMessageCount(messageCount - 1);
  };

  // First Time
  const [firstTime, setFirstTime] = useState(null);
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
    setFirstTime(false);
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
          <Container fluid style={{ height: "85vh" }}>
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
                    <HomeView />
                  </Route>
                  <Route exact path="/home">
                    <HomeView />
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
                  <Route path="/post/:postId">
                    <PostView />
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

// Setup
import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import { Route, Link, Routes, BrowserRouter } from "react-router-dom";
import axios from "axios";

// Pages
import Discover from "./pages/DiscoverView";
import ProfileView from "./pages/ProfileView";
import ProfileBuild from "./pages/ProfileBuild";
import CourseView from "./pages/CourseView";
import Welcome from "./pages/WelcomeView";
import HomeView from "./pages/HomeView";
import EventView from "./pages/EventView";
import CreateEventView from "./pages/CreateEventView";
import ModView from "./pages/ModView";

// Components
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

// Styling
import { Container, Row, Col } from "react-bootstrap";
import { getMyUser, GoogleOAuthComponent } from "./util/authUtil";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

// Body
function App() {
  // Authentication
  const token = localStorage.getItem("JWTToken");
  const username = localStorage.getItem("Username");
  const [user, setUser] = useState(null);

  axios.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (username) {
      config.headers.Username = username;
    }
    return config;
  });

  const fetchUser = useCallback(async () => {
    if (!username) {
      setUser(null);
      return;
    }
    const userRes = await getMyUser();
    setUser(userRes);
    return userRes;
  }, [username]);

  useEffect(() => {
    fetchUser();
  }, [username, fetchUser]);

  // Courses
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    if (user?.courses) getCourses();
  }, [user]);
  const getCourses = (codeNS) => {
    let c, n;
    for (const course of user.courses) {
      if (course.code.replace(/\s/g, "") === codeNS) {
        c = course.code;
        n = course.name;
      }
    }
    setCode(c);
    setName(n);
  };
  const handleCode = (c) => {
    setCode(c);
  };
  const handleName = (n) => {
    setName(n);
  };

  // Reset states
  const reset = () => {
    setUser(null);
  };

  // 404 page
  const NoMatch = () => {
    return (
      <h3>
        Page not found. Click <Link to="/home">here</Link> to go back to
        UConnect
      </h3>
    );
  };

  // Google OAuth if at path /auth/google/callback
  if (window.location.pathname === "/auth/google/callback") {
    return <GoogleOAuthComponent />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar
          requests={user ? user.requests : 0}
          imageUrl={user ? user.imageUrl : ""}
        />
        <Container fluid>
          <Row className="px-3 py-4 h-100">
            <Col sm={12} md={2}>
              <SideBar
                courses={user && user.courses ? user.courses : []}
                handleCode={handleCode}
                handleName={handleName}
                pending={
                  user && user.receivedRequests
                    ? user.receivedRequests.length
                    : 0
                }
              />
            </Col>
            <Col xs={11} md={10}>
              <Routes>
                <Route exact path="/" element={<HomeView user={user} />} />
                <Route exact path="/home" element={<HomeView user={user} />} />
                <Route
                  path="/event/:eventId"
                  element={<EventView user={user} />}
                />
                {user && user.profileCompleted ? (
                  <>
                    <Route
                      path="/event/:eventId/comment"
                      element={<EventView user={user} />}
                    />
                    <Route exact path="/moderator" element={<ModView />} />
                    <Route
                      exact
                      path="/event-create"
                      element={<CreateEventView user={user} />}
                    />
                    <Route
                      exact
                      path="/discover"
                      element={
                        <Discover
                          user={user}
                          requests={user.requests}
                          outgoing={user.sentRequests}
                          imageUrl={user.profilePicture}
                          fetchUser={fetchUser}
                        />
                      }
                    />
                    {/* <Route
                      exact
                      path="/connections"
                      element={
                        <Connections
                          fetchPending={fetchUser}
                          imageUrl={user.profilePicture}
                        />
                      }
                    /> */}
                    <Route
                      exact
                      path="/profile"
                      element={
                        <ProfileView
                          reset={reset}
                          user={user}
                          fetchUser={fetchUser}
                        />
                      }
                    />
                    <Route
                      path="/courses/:codeParam"
                      element={
                        <CourseView
                          code={code}
                          name={name}
                          getCourseInfo={getCourses}
                          outgoing={user.sentRequests}
                          imageUrl={user.profilePicture}
                        />
                      }
                    />
                    <Route path="*" element={<NoMatch />} />
                  </>
                ) : (
                  <>
                    {user && (
                      <Route
                        path="*"
                        element={
                          <ProfileBuild fetchUser={fetchUser} user={user} />
                        }
                      />
                    )}
                    {!user && (
                      <Route
                        path="*"
                        element={<Welcome fetchUser={fetchUser} />}
                      />
                    )}
                  </>
                )}
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;

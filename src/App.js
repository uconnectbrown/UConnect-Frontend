// Setup
import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import { Route, Link, Routes, BrowserRouter } from "react-router-dom";
import axios from "axios";

// Pages
import Discover from "./pages/DiscoverView";
import Connections from "./pages/ConnectionsView";
import ProfileView from "./pages/ProfileView";
import ProfileBuild from "./pages/ProfileBuild";
import CourseView from "./pages/CourseView";
import Welcome from "./pages/WelcomeView";
import HomeView from "./pages/HomeView";
import PostView from "./pages/PostView";
import CreatePostView from "./pages/CreatePostView";
import ModView from "./pages/ModView";

// Components
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

// Styling
import { Container, Row, Col } from "react-bootstrap";
import { getUser, GoogleOAuthComponent } from "./util/authUtil";

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
    const userRes = await getUser(username);
    setUser(userRes);
  }, [username]);

  useEffect(() => {
    fetchUser();
  }, [username, fetchUser]);

  // Courses
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    if (user?.isProfileCompleted) getCourses();
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
        Page not found. Click <Link to="/discover">here</Link> to go back to
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
          imageUrl={user ? user.profilePicture : ""}
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
                <Route exact path="/" element={<HomeView />} />
                <Route exact path="/home" element={<HomeView />} />
                <Route path="/post/:postId" element={<PostView />} />
                {user && user.isProfileCompleted ? (
                  <>
                    <Route exact path="/moderator" element={<ModView />} />
                    <Route
                      exact
                      path="/post-create"
                      element={<CreatePostView />}
                    />
                    <Route
                      exact
                      path="/discover"
                      element={
                        <Discover
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
                      element={<ProfileView reset={reset} />}
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

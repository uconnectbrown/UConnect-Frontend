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

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Body
function Home() {
  const [page, setPage] = useState("Home");
  const [dropDown, setDropDown] = useState(false);
  const [courses, setCourses] = useState(null);
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
      });
  };

  const decRequests = () => {
    setRequests(requests - 1);
  };

  const getCourses = () => {
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        setCourses(doc.data().courses);
      });
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
    <div align="center">
      <NavBar
        requests={requests}
        imageUrl={imageUrl}
        handleProfile={handleProfile}
      />
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={() => setPage("Home")}>
            Home
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setPage("Messages")}
          >
            Messages
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setPage("Connections")}
          >
            Connections
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setDropDown(!dropDown)}
          >
            Courses
          </Button>

          {courses && dropDown && (
            <div>
              {courses.map((course) => {
                if (course.code) {
                  return (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        setCode(course.code);
                        setPage("Course");
                      }}
                    >
                      {course.code}
                    </Button>
                  );
                }
              })}
            </div>
          )}

          {page !== "Home" && <Notifications />}
        </Grid>
        <Grid item xs={9} align="left">
          {page === "Home" && (
            <div>
              <Landing handleRequest={decRequests} requests={requests} />
              <Notifications />
            </div>
          )}
          {page === "Messages" && <Typography>Messages</Typography>}
          {page === "Connections" && <Connections />}
          {page === "Course" && code && (
            <Course code={code} handleRequest={decRequests} />
          )}
          {page === "Profile" && <Profile />}
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;

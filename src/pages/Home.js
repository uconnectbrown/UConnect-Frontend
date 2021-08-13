// Setup
import React, { useState } from "react";

// Components
import NavBar from "../components/NavBar";
import Landing from "../components/Landing";
import Connections from "../components/Connections";
import Messages from "../components/Messages";
import Course from "../components/Course";
import Notifications from "../components/Notifications";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Body
function Home() {
  const [page, setPage] = useState("Home");
  const [courseOpen, setCourseOpen] = useState(false);
  return (
    <div align="center">
      <NavBar />
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={() => setPage("Home")}>
            Home
          </Button>
          <Button fullWidth variant="contained" onClick={() => setPage("Messages")}>
            Messages
          </Button>
          <Button fullWidth variant="contained" onClick={() => setPage("Connections")}>
            Connections
          </Button>
          <Button fullWidth variant="contained" onClick={() => setCourseOpen(true)}>
            Courses
          </Button>
          {courseOpen && (
            <div>
              <Button fullWidth variant="contained" onClick={() => (setPage("courseOne"), setCourseOpen(false))}>
            CODE 0001
          </Button>
          <Button fullWidth variant="contained" onClick={() => (setPage("courseTwo"), setCourseOpen(false))}>
            CODE 0002
          </Button>
          <Button fullWidth variant="contained" onClick={() => (setPage("courseThree"), setCourseOpen(false))}>
            CODE 0003
          </Button>
          <Button fullWidth variant="contained" onClick={() => (setPage("courseFour"), setCourseOpen(false))}>
            CODE 0004
          </Button>
            </div>
          )}

          {/* <FormControl fullWidth>
            <InputLabel>Courses</InputLabel>
            <Select>
              <MenuItem value="CODE0001">
                <Button onClick={() => setPage("courseOne")}>CODE 0001</Button>
              </MenuItem>
              <MenuItem value="CODE0002">
                <Button onClick={() => setPage("courseTwo")}>CODE 0002</Button>
              </MenuItem>
              <MenuItem value="CODE0003">
                <Button onClick={() => setPage("courseThree")}>CODE 0003</Button>
              </MenuItem>
              <MenuItem value="CODE0004">
                <Button onClick={() => setPage("courseFour")}>CODE 0004</Button>
              </MenuItem>
            </Select>
          </FormControl> */}

          {page !== "Home" && (
            <Notifications />
          )}
        </Grid>
        <Grid item xs={9} align="left">
          {page === "Home" && (
            <div>
            <Landing />
            <Notifications />
            </div>
          )}
          {page === "Messages" && (
            <Typography>Messages</Typography>
          )}
          {page === "Connections" && (
            <Connections />
          )}
          {(page === "courseOne" || page === "courseTwo" || page === "courseThree" || page === "courseFour") && (
            <Course />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;

// Setup
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase.js";

// Components
import Student from "./Student";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import SearchBar from "material-ui-search-bar";
import InputLabel from "@material-ui/core/InputLabel";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";

function Landing(props) {
  const [featured, setFeatured] = useState([]);
  const [students, setStudents] = useState(null);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const emailId = auth.currentUser.email.split("@")[0];
  const email = auth.currentUser.email;

  useEffect(() => {
    getFeatured();
  }, []);

  const getFeatured = () => {
    axios
      .get(`/featured/${emailId}`)
      .then((res) => {
        setFeatured(res.data.featured);
      })
      .catch((err) => console.log(err));
  };

  const makeSearch = (query) => {
    axios.get(`/all/${email}`).then((res) => {
      console.log(res.data.filter((student) => student.firstName === query));
      setStudents(res.data.filter((student) => student.firstName === query));
    });
  };

  const handleOpenStudent = (index) => {
    setStudentId(students[index].email.split("@")[0]);
  };

  const handleOpenFStudent = (index) => {
    setStudentId(featured[index].emailId);
  };

  const handleCloseStudent = () => {
    setStudentId(null);
  };

  return (
    <div>
      <Dialog open={studentId}>
        <Student
          studentId={studentId}
          handleClose={handleCloseStudent}
          handleRequest={props.handleRequest}
          requests={props.requests}
        />
      </Dialog>
      Connect
      <SearchBar
        value={query}
        onChange={(newValue) => setQuery(newValue)}
        onRequestSearch={() => {
          makeSearch(query);
          setSearching(true);
        }}
      />
      <Grid container spacing={10}>
        <Grid item>
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel>Class Year</InputLabel>
            <Select>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel>Interests</InputLabel>
            <Select>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel>Concentration</InputLabel>
            <Select>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {students && (
        <div>
          {students.map((student, index) => {
            return (
              <Card>
                <ButtonBase
                  size="large"
                  color="primary"
                  onClick={() => handleOpenStudent(index)}
                  style={{ width: "100%" }}
                >
                  <CardContent>
                    <img
                      width="45px"
                      alt="Profile Picture"
                      src={student.imageUrl}
                    />
                    <Typography variant="body2">
                      {student.firstName + " " + student.lastName}
                    </Typography>
                    <Typography variant="body2">{student.classYear}</Typography>
                    <Typography variant="body2">
                      {student.majors.map((major) => major)}
                    </Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            );
          })}
        </div>
      )}
      {!searching && !query && (
        <GridList cols={10} spacing={10} cellHeight="auto">
          {featured.map((student, index) => {
            return (
              <GridListTile item component="Card" sm>
                <Card align="center">
                  <ButtonBase
                    size="large"
                    color="primary"
                    onClick={() => handleOpenFStudent(index)}
                    style={{ width: "100%" }}
                  >
                    <CardContent>
                      <img
                        width="45px"
                        alt="Profile Picture"
                        src={student.imageUrl}
                      />
                      <Typography variant="body2">{student.name}</Typography>
                    </CardContent>
                  </ButtonBase>
                </Card>
              </GridListTile>
            );
          })}
        </GridList>
      )}
    </div>
  );
}

export default Landing;

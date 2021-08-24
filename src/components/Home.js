// Setup
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase.js";
import Select from "react-select";

// Components
import Student from "./Student";
import Message from "./Message";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import SearchBar from "material-ui-search-bar";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// Resources
import { classYears, majors } from "../resources/searchOptions";

function Home(props) {
  const emailId = auth.currentUser.email.split("@")[0];
  const email = auth.currentUser.email;
  const [featured, setFeatured] = useState([]);
  const [students, setStudents] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [query, setQuery] = useState("");
  const [studentId, setStudentId] = useState("");
  const [classYears_, setClassYears] = useState([]);
  const [majors_, setMajors] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [messageOpen, setMessageOpen] = useState(false);
  const [searching, setSearching] = useState(false);

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

  const searchField = (years, majors) => {
    axios
      .get(`/all/${email}`)
      .then((res) => {
        setStudents(
          res.data.filter((student) =>
            filterField(student.classYear, student.majors, years, majors)
          )
        );
      })
      .then(() => {
        setSearching(true);
      })
      .catch((err) => console.log(err));
  };

  const searchName = (query) => {
    axios
      .get(`/all/${email}`)
      .then((res) => {
        setStudents(
          res.data.filter((student) =>
            filterName(student.firstName, student.lastName, query)
          )
        );
      })
      .then(() => {
        setSearching(true);
      })
      .catch((err) => console.log(err));
  };

  const filterField = (classYear, majors, years, majors_) => {
    const compare = (a1, a2) => a1.filter((v) => a2.includes(v)).length;
    if (years.length > 0 && majors_.length > 0) {
      if (years.includes(classYear) && compare(majors, majors_) > 0)
        return true;
    } else if (years.length > 0 && majors_.length === 0) {
      if (years.includes(classYear)) return true;
    } else if (years.length === 0 && majors_.length > 0) {
      if (compare(majors, majors_) > 0) return true;
    }
  };

  const filterName = (fn, ln, query) => {
    fn = fn.toLowerCase().trim();
    ln = ln.toLowerCase().trim();
    query = query.toLowerCase().trim();
    if (fn.split(query)[0] === "") return true;
    if (ln === query) return true;
    if (query.split(" ").length === 2) {
      let query1 = query.split(" ")[0];
      let query2 = query.split(" ")[1];
      if (fn.split(query1)[0] === "" && ln.split(query2)[0] === "") return true;
    }
  };

  const canSearch = (classYears_, majors_) => {
    if (classYears_.length > 0 || majors_.length > 0) return true;
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

  const handleOpenMessage = (id, image, name) => {
    setStudentInfo([id, image, name]);
    setMessageOpen(true);
  };

  const handleCloseMessage = () => {
    setMessageOpen(false);
  };

  return (
    <div>
      <Dialog open={studentId}>
        <Student
          studentId={studentId}
          handleClose={handleCloseStudent}
          handleRequest={props.handleRequest}
          requests={props.requests}
          handleOpenMessage={handleOpenMessage}
        />
      </Dialog>
      <Dialog open={messageOpen && studentInfo}>
        <Message
          handleCloseMessage={handleCloseMessage}
          studentInfo={studentInfo}
        />
      </Dialog>
      <Typography variant="h3">Connect</Typography>

      <Grid container spacing={10}>
        {searchMode && (
          <Grid item>
            <SearchBar
              value={query}
              onChange={(newValue) => setQuery(newValue)}
              onRequestSearch={() => {
                searchName(query);
              }}
            />
          </Grid>
        )}
        {!searchMode && (
          <Grid item>
            Class Year(s)
            <Select
              closeMenuOnSelect={
                classYears_.length === classYears.length - 1 ? true : false
              }
              isMulti
              name="classYears"
              value={classYears_}
              options={classYears}
              onChange={(options) => setClassYears(options)}
            />
          </Grid>
        )}
        {!searchMode && (
          <Grid item>
            Concentration(s)
            <Select
              closeMenuOnSelect={
                majors_.length === majors.length - 1 ? true : false
              }
              isMulti
              name="concentration"
              value={majors_}
              options={majors}
              onChange={(options) => setMajors(options)}
            />
          </Grid>
        )}

        {!searchMode && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              disabled={!canSearch(classYears_, majors_)}
              onClick={() => {
                setSearching(false);
                searchField(
                  classYears_.map((option) => option.value),
                  majors_.map((option) => option.value)
                );
              }}
            >
              Search
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button
            variant="contained"
            disabled={!searching}
            color="primary"
            onClick={() => {
              setStudents([]);
              setClassYears([]);
              setMajors([]);
              setQuery("");
              setSearching(false);
            }}
          >
            Clear Search
          </Button>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={searchMode}
                onChange={() => {
                  setSearchMode(!searchMode);
                  setQuery("");
                  setClassYears([]);
                  setMajors([]);
                }}
                name="checkedB"
                color="primary"
              />
            }
            label="Search By Name"
          />
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
      {!searching && featured && (
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

export default Home;

// Setup
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase.js";
import Select from "react-select";

// Components
import Student from "./Student";

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

function Landing(props) {
  const [featured, setFeatured] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const emailId = auth.currentUser.email.split("@")[0];
  const email = auth.currentUser.email;
  const [classYears_, setClassYears] = useState([]);
  const [majors_, setMajors] = useState([]);

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
          res.data.filter(
            (student) =>
              (years.includes(student.classYear) || years !== []) &&
              (majors.includes(student.majors[0]) || majors !== [])
          )
        );
      })
      .catch((err) => console.log(err));
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
      .catch((err) => console.log(err));
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
      <Typography variant="h3">Connect</Typography>
      {searchMode && (
        <SearchBar
          value={query}
          onChange={(newValue) => setQuery(newValue)}
          onRequestSearch={() => {
            searchName(query);
            setSearching(true);
          }}
        />
      )}
      <Grid container spacing={10}>
        <Grid item>
          Class Year(s)
          <Select
            isMulti
            name="classYears"
            options={classYears}
            onChange={(option) => {
              setClassYears(option.map((option) => option.value));
            }}
          />
        </Grid>
        <Grid item>
          Concentration(s)
          <Select
            isMulti
            name="concentration"
            options={majors}
            onChange={(option) => {
              setMajors(option.map((option) => option.value));
            }}
          />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              if (searchMode) {
                searchName(query);
              } else {
                searchField(classYears_, majors_);
              }
              setSearching(true);
            }}
          >
            Search
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disabled={!searching}
            color="primary"
            onClick={() => {
              setStudents([]);
              setClassYears([]);
              setSearching(false);
              setQuery("");
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
                onChange={() => setSearchMode(!searchMode)}
                name="checkedB"
                color="primary"
              />
            }
            label="Search By Name"
          />
        </Grid>
      </Grid>
      {searching && (
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
      {!searching && !query && !classYears_ && (
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

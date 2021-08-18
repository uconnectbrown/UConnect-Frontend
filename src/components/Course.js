// Setup
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import axios from "axios";

import Select from "react-select";

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
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

// Resources
import { classYears, majors } from "../resources/searchOptions";

function Course(props) {
  const code = props.code;
  const codeNS = code.replace(/\s/g, "");
  const email = auth.currentUser.email;
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [classYears_, setClassYears] = useState([]);
  const [majors_, setMajors] = useState([]);
  const [clear, setClear] = useState(false)

  useEffect(() => {
    getStudents();
  }, [clear, code]);

  const getStudents = () => {
    axios
      .get(`/students/${email}/${codeNS}`)
      .then((res) => {
        console.log(res.data);
        setStudents(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleOpenStudent = (index) => {
    setStudentId(students[index].email.split("@")[0]);
  };

  const handleCloseStudent = () => {
    setStudentId("");
  };

  const canSearch = (query, classYears_, majors_) => {
    if (searchMode) {
      if (query !== "") return true;
    } else {
      if (classYears_.length > 0 || majors_.length > 0) return true;
    }
  }

  const searchField = (years, majors_) => {
    axios
      .get(`/students/${email}/${codeNS}`)
      .then((res) => {
        setStudents(
          res.data.filter(
            (student) =>
              filterField(student.classYear, student.majors, years, majors_)
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const filterField = (classYear, majors, years, majors_) => {
    const compare = (a1, a2) => a1.filter((v) => a2.includes(v)).length;
    console.log(years, majors_)
    if (years.length > 0 && majors_.length > 0) {
      if (years.includes(classYear) && compare(majors, majors_) > 0) return true;
    } else if (years.length > 0 && majors_.length === 0) {
      if (years.includes(classYear)) return true;
    } else if (years.length === 0 && majors_.length > 0) {
      if (compare(majors, majors_) > 0) return true;
    }
  }

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
      .get(`/students/${email}/${codeNS}`)
      .then((res) => {
        setStudents(
          res.data.filter((student) =>
            filterName(student.firstName, student.lastName, query)
          )
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Dialog open={studentId}>
        <Student
          studentId={studentId}
          handleClose={handleCloseStudent}
          handleRequest={props.handleRequest}
        />
      </Dialog>
      {code}
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
            disabled={!canSearch(query, classYears_, majors_)}
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
              setClear(!clear);
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
      <GridList cols={5} spacing={10} cellHeight="auto">
        {students.map((student, index) => {
          return (
            <GridListTile item component="Card" sm>
              <Card align="center">
                <ButtonBase
                  size="large"
                  color="primary"
                  onClick={() => handleOpenStudent(index)}
                  style={{ width: "100%" }}
                >
                  <CardContent>
                    <img
                      width="50px"
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
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}

export default Course;

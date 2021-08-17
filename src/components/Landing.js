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
import Button from "@material-ui/core/Button";

function Landing(props) {
  const [featured, setFeatured] = useState([]);
  const [students, setStudents] = useState([]);
  const [indexArray, setIndexArray] = useState([]);
  const [newIndexArray, setNewIndexArray] = useState([]);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [studentId, setStudentId] = useState(null);
  const emailId = auth.currentUser.email.split("@")[0];
  const email = auth.currentUser.email;

  useEffect(() => {
    getFeatured();
  }, []);

  useEffect(() => {
    getStudents();
  }, []);

  const getFeatured = () => {
    axios
      .get(`/featured/${emailId}`)
      .then((res) => {
        setFeatured(res.data.featured);
      })
      .catch((err) => console.log(err));
  };

  const getStudents = () => {
    axios.get(`/all/${email}`).then((res) => {
      setStudents(res.data);
    }).then(() => {
      const numStudents = students.length;
  let arr = [];
    for (let i = 0; i < numStudents; i++) {
      arr.push(i);
    }
    setIndexArray(arr);
    })
  }  

  // const makeSearch = (query) => {
  //   axios.get(`/all/${email}`).then((res) => {
  //     console.log(res.data.filter((student) => student.firstName.toString().toLowerCase().includes(query.target.value.toString().toLowerCase())));
  //     setStudents(res.data.filter((student) => student.firstName.toString().toLowerCase().includes(query.target.value.toString().toLowerCase())));
  //   });
  //   return;
  // };

  const handleOpenStudent = (index) => {
    setStudentId(students[index].email.split("@")[0]);
  };

  const handleOpenFStudent = (index) => {
    setStudentId(featured[index].emailId);
  };

  const handleCloseStudent = () => {
    setStudentId(null);
  };

  const handleFilter = (event) => {
    setSearching(true)
    setSearchCriteria(event.target.value)
  };

  const handleSearch = (students, query, indexArray) => {
    setNewIndexArray(indexArray.map((index) => {
        if (
            `${students[index]["firstName"]} ${students[index]["lastName"]}`
              .toString()
              .toLowerCase()
              .includes(
                query.toString().toLowerCase()
              )
          ) {
            return index;
          }
      }).filter((index) => {
        return index !== undefined;
      }))
    }

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
          // makeSearch(query);
          handleSearch(students, query, indexArray)
          setSearching(true)
        }}
      />
      <Grid container spacing={10}>
        <Grid item>
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel>Class Year</InputLabel>
            <Select value={searchCriteria} onChange={handleFilter}>
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
        <Grid item>
          <Button onClick={() => setSearching(false)}>Clear Search</Button>
        </Grid>
      </Grid>
      {searching && (
        <div>
          {newIndexArray.map((index) => {
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
                      src={students[index].imageUrl}
                    />
                    <Typography variant="body2">
                      {students[index].firstName + " " + students[index].lastName}
                    </Typography>
                    <Typography variant="body2">{students[index].classYear}</Typography>
                    <Typography variant="body2">
                      {students[index].majors.map((major) => major)}
                    </Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            );
          })}
        </div>
      )}
      {!searching && (
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

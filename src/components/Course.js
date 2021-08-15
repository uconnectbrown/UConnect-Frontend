// Setup
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import axios from "axios";

// MUI Stuff
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
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

function Course(props) {
  const code = props.code;
  const codeNS = code.replace(/\s/g, "");
  const email = auth.currentUser.email;
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    axios
      .get(`/students/${email}/${codeNS}`)
      .then((res) => {
        console.log(res.data);
        setStudents(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {code}
      <SearchBar />
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
      <GridList cols={5} spacing={10} cellHeight="auto">
        {students.map((student) => {
          return (
            <GridListTile item component="Card" sm>
              <Card align="center">
                <CardContent>
                  <img
                    width="50px"
                    alt="Profile Picture"
                    src={student.imageUrl}
                  />
                  <Typography variant="body2">
                    {student.firstName + " " + student.lastName}
                  </Typography>
                </CardContent>
              </Card>
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}

export default Course;

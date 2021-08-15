// Setup
import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";

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

function Connections() {
  const [pending, setPending] = useState([]);
  const [connections, setConnections] = useState(null);
  const [studentId, setStudentId] = useState("");
  const emailId = auth.currentUser.email.split("@")[0];

  useEffect(() => {
    getPending();
  }, []);

  useEffect(() => {
    getConnections();
  }, []);

  const getPending = () => {
    axios
      .get(`/pending/${emailId}`)
      .then((res) => {
        console.log(res.data.pending);
        setPending(res.data.pending);
      })
      .catch((err) => console.log(err));
  };

  const getConnections = () => {
    axios
      .get(`/connections/${emailId}`)
      .then((res) => {
        setConnections(res.data.connections);
      })
      .catch((err) => console.log(err));
  };

  const handleOpenPStudent = (index) => {
    setStudentId(pending[index].emailId);
  };

  const handleOpenCStudent = (index) => {
    setStudentId(connections[index].emailId);
  };

  const handleCloseStudent = () => {
    setStudentId("");
    getPending();
    getConnections();
  };

  return (
    <div>
      <Dialog fullScreen open={studentId}>
        <Student studentId={studentId} handleClose={handleCloseStudent} />
      </Dialog>
      Pending Connections
      <GridList cols={5} spacing={10} cellHeight="auto">
        {pending.map((student, index) => {
          return (
            <GridListTile item component="Card" sm>
              <Card align="center">
                <ButtonBase
                  size="large"
                  color="primary"
                  onClick={() => handleOpenPStudent(index)}
                  style={{ width: "100%" }}
                >
                  <CardContent>
                    <img
                      width="50px"
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
      {connections && (
        <div>
          All Connections
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
            {connections.map((connection, index) => {
              return (
                <GridListTile item component="Card" sm>
                  <Card align="center">
                    <ButtonBase
                      size="large"
                      color="primary"
                      onClick={() => handleOpenCStudent(index)}
                      style={{ width: "100%" }}
                    >
                      <CardContent>
                        <img
                          width="50px"
                          alt="Profile Picture"
                          src={connection.imageUrl}
                        />
                        <Typography variant="body2">
                          {connection.name}
                        </Typography>
                      </CardContent>
                    </ButtonBase>
                  </Card>
                </GridListTile>
              );
            })}
          </GridList>
        </div>
      )}
    </div>
  );
}

export default Connections;

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
  const [emailId, setEmailId] = useState("");

  useEffect(() => {
    getPending();
  }, []);

  const getPending = () => {
    axios
      .get(`/pending/${auth.currentUser.email}`)
      .then((res) => {
        console.log(res.data.pending);
        setPending(res.data.pending);
      })
      .catch((err) => console.log(err));
  };

  const handleOpenStudent = (index) => {
    setEmailId(pending[index].emailId);
  };

  const handleCloseStudent = () => {
    setEmailId("");
  };

  return (
    <div>
      <Dialog fullScreen open={emailId}>
        <Student emailId={emailId} handleClose={handleCloseStudent} />
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
                  onClick={() => handleOpenStudent(index)}
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
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
          return (
            <GridListTile item component="Card" sm>
              <Card align="center">
                <CardContent>
                  <img
                    width="50px"
                    alt="Profile Picture"
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media&token=6aa9ff82-c1a6-4e1f-a743-67a828790599"
                    }
                  />
                  <Typography variant="body2">Jane Smith '23</Typography>
                </CardContent>
              </Card>
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}

export default Connections;

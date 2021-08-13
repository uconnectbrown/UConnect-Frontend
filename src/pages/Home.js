// Setup
import React, { Component } from "react";

// Components
import NavBar from "../components/NavBar";
import Landing from "../components/Landing";

// MUI Stuff
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

// Body
function Home() {
  return (
    <div align="center">
      <NavBar />
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Button fullWidth variant="contained">
            Home
          </Button>
          <Button fullWidth variant="contained">
            Messages
          </Button>
          <Button fullWidth variant="contained">
            Connections
          </Button>
        </Grid>
        <Grid item xs={9} align="left">
          <Landing />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;

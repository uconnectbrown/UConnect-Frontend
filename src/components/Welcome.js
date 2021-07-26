// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// Components
import SignIn from "./SignIn";
import SignOut from "./SignOut";

// Body
function Welcome() {
  return (
    <div>
      <Grid
        container
        align="center"
        style={{
          marginTop: "0px",
        }}
      >
        <Grid item sm />
        <Grid item sm>
          <Card raised>
            <CardContent>
              <Typography variant="h3">Welcome to UConnect!</Typography>
              <br />
              <SignIn />
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm />
      </Grid>
    </div>
  );
}

export default Welcome;

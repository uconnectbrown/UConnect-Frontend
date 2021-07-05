// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";

class welcome extends Component {
  render() {
    return (
      <Grid container align="center">
        <Grid item sm/>
        <Grid item sm>
        <Card raised>
          <CardContent>
          <Typography variant="h2">Welcome to Uconnect!</Typography>
        <br />
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/login"
          size="large"
        >
          <Typography variant="h4">Login</Typography>
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/signup"
          size="large"
        >
          <Typography variant="h4">Signup</Typography>
        </Button>
          </CardContent>
        </Card>
        </Grid>
        <Grid item sm/>
      </Grid>
    );
  }
}

export default welcome;

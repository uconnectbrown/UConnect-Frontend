// TO-DO F:
// 1. Fix reloading issue (doesn't allow logout unless reload)

// TO-DO S:
// 1. Make a logo and spruce up the page a little
// 2. Space the welcome box properly without using line breaks

// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import backgroundImage from "../images/Gates.jpg";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class welcome extends Component {
  render() {
    return (
      <div 
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
        }}
      >
        <Grid container align="center"
          style={{
            marginTop: "0px",
          }}>
          <Grid item sm />
          <Grid item sm />
          <Grid item sm>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Card raised>
              <CardContent>
                <Typography variant="h3">Welcome to UConnect!</Typography>
                <br />
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/login"
                  size="large"
                >
                  <Typography variant="h5">Login</Typography>
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
                  <Typography variant="h5">Signup</Typography>
                </Button>
              </CardContent>
            </Card>
            <br />
            <br />
          </Grid>
          <Grid item sm />
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

export default welcome;

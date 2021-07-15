// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// Body
class welcome extends Component {
  componentDidMount() {
    localStorage.clear();
  }
  render() {
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
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

export default welcome;

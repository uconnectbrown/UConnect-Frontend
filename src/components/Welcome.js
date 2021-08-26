// Setup
import React from "react";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// Components
import SignIn from "./SignIn";
import SignOut from "./SignOut";

// Body
function Welcome(props) {
  return (
    <Grid container align="center" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Grid item xs={10} md={2}>
        <Card raised>
          <CardContent>
            <Typography variant="h2">UConnect</Typography>
            <br />
            <SignIn denyAccess={props.denyAccess} grantAccess={props.grantAccess}/>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Welcome;

import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  content: {
    padding: 25,
  },
};

class Profile extends Component {
  render() {
    const {
      classes,
      profile: { email },
    } = this.props;
    const classYear = this.props.profile.class;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="body1">{email}</Typography>
          <Typography variant="body1">{classYear}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Profile);

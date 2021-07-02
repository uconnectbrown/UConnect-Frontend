import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Components
import NavBar from "../components/NavBar";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

class profileView extends Component {
  state = {
    affinitySports: [],
    bio: "",
    class: "",
    courses: [],
    createdAt: "",
    email: "",
    favorites: {},
    firstName: "",
    greekLife: "",
    groups: [],
    imageUrl: "",
    interests: [],
    lastName: "",
    majors: [],
    preferredPronouns: "",
    userId: "",
    varsitySports: [],
  };

  componentDidMount() {
    const emailId = this.props.location.state.email.split("@")[0];
    axios
      .get(`/user/${emailId}`)
      .then((res) => {
        this.setState({
          affinitySports: res.data.user.affinitySports,
          bio: res.data.user.bio,
          class: res.data.user.class,
          courses: res.data.user.courses,
          createdAt: res.data.user.createdAt,
          email: res.data.user.email,
          favorites: res.data.user.favorites,
          firstName: res.data.user.firstName,
          greekLife: res.data.user.greekLife,
          groups: res.data.user.groups,
          imageUrl: res.data.user.imageUrl,
          interests: res.data.user.interests,
          lastName: res.data.user.lastName,
          majors: res.data.user.majors,
          preferredPronouns: res.data.user.preferredPronouns,
          userId: res.data.user.userId,
          varsitySports: res.data.user.varsitySports,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <NavBar />
        <Card>
          <CardContent align="center">
            <img src={this.state.imageUrl} width={450} />
            <Typography variant="h3">
              {this.state.firstName} {this.state.lastName}
            </Typography>
            <Typography variant="h5">
              ({this.state.preferredPronouns})
            </Typography>
            <Typography variant="body1">Class of {this.state.class}</Typography>
            <Typography variant="body1">
              Concentration(s): {this.state.majors[0]}
              {this.state.majors[1] && `, ${this.state.majors[1]}`}
              {this.state.majors[2] && `, ${this.state.majors[2]}`}
            </Typography>
            {this.state.varsitySports[0] && (
              <Typography variant="body1">
                Sport(s): {this.state.varsitySports[0]}
                {this.state.varsitySports[1] &&
                  `, ${this.state.varsitySports[1]}`}
              </Typography>
            )}
            {this.state.greekLife && (
              <Typography variant="body1">
                Greek Organization: {this.state.greekLife}
              </Typography>
            )}
            <Typography variant="body1">{this.state.bio}</Typography>
          </CardContent>
        </Card>
        <br />
        <Grid container spacing={2}>
          <Grid item sm>
          <Card>
          <CardContent align="center">
            <Typography variant="h3">Groups</Typography>
            <hr />
            <br />
            {this.state.groups.map((group) => (
              <Typography variant="body1">{group}</Typography>
            ))}
          </CardContent>
        </Card>
          </Grid>
          <Grid item sm>
          <Card>
          <CardContent align="center">
            <Typography variant="h3">Interests</Typography>
            <hr />
            <br />
            <Typography variant="h5">General</Typography>
            {this.state.interests.map((interest) => (
              <Typography variant="body1">{interest}</Typography>
            ))}
            {(this.state.affinitySports[0] ||
              this.state.affinitySports[1] ||
              this.state.affinitySports[2]) && (
              <Typography variant="h5">Athletic</Typography>
            )}
            {this.state.affinitySports.map((affinitySport) => (
              <Typography variant="body1">{affinitySport}</Typography>
            ))}
          </CardContent>
        </Card>
          </Grid>
          <Grid item sm>
          <Card>
          <CardContent align="center">
            <Typography variant="h3">Favorites</Typography>
            <hr />
            <br />
            <Typography variant="body1">
              Book: {this.state.favorites.book}
            </Typography>
            <Typography variant="body1">
              Movie: {this.state.favorites.movie}
            </Typography>
            <Typography variant="body1">
              Show: {this.state.favorites.tvShow}
            </Typography>
            <Typography variant="body1">
              Artist: {this.state.favorites.artist}
            </Typography>
          </CardContent>
        </Card>
          </Grid>
        </Grid>
        <br />
        <Card>
          <CardContent align="center">
            <Typography variant="h3">Courses</Typography>
            <hr />
            <br />
            <Grid container>
            {this.state.courses.map((course) => (
              <Grid item sm>
                <Typography variant="h5">{course.courseCode}</Typography>
                <Typography variant="body1">{course.courseName}</Typography>
              </Grid>
            ))}
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default profileView;

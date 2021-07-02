import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Components
import Profile from "../components/Profile";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
        <Grid container >
          <Grid item sm></Grid>

          <Grid item sm >
            <Card>
              <CardContent align='center'>
                <img src={this.state.imageUrl} width={450}/>
                <Typography variant="h3">{this.state.firstName} {this.state.lastName}</Typography>
                <Typography variant="h5">({this.state.preferredPronouns})</Typography>
                <Typography variant="body1">Class of {this.state.class}</Typography>
                <Typography variant="body1">Concentration(s): {this.state.majors[0]}
                {this.state.majors[1] && (`, ${this.state.majors[1]}`)}
                {this.state.majors[2] && (`, ${this.state.majors[2]}`)}</Typography>
                {this.state.varsitySports[0] && (<Typography variant="body1">Sport(s): {this.state.varsitySports[0]}
                {this.state.varsitySports[1] && (`, ${this.state.varsitySports[1]}`)}</Typography>)}
                {this.state.greekLife && (<Typography variant="body1">Greek Organization: {this.state.greekLife}</Typography>)}
                <Typography variant="body1">{this.state.bio}</Typography>
              </CardContent>
            </Card>
            <br />
            <Card>
              <CardContent align="center">
                <Typography variant="h3">
                  Interests
                </Typography>
                <Typography variant="h5">
                  General
                </Typography>
                {this.state.interests.map((interest) => 
                  <Typography variant="body1">
                    {interest}
                  </Typography>
                )}
                {(this.state.affinitySports[0] || this.state.affinitySports[1] || this.state.affinitySports[2]) && (<Typography variant="h5">Athletic</Typography>)}
                {this.state.affinitySports.map((affinitySport) => 
                  <Typography variant="body1">
                    {affinitySport}
                  </Typography>
                )}
              </CardContent>
            </Card>
            <br />
            <Card>
              <CardContent align="center">
                <Typography variant="h3">
                  Favorites
                </Typography>
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
            <br />
            <Card>
              <CardContent align="center">
                <Typography variant="h3">
                  Groups
                </Typography>
                {this.state.groups.map((group) => 
                  <Typography variant="body1">
                    {group}
                  </Typography>
                )}
              </CardContent>
            </Card>
            <br />
            <Card>
              <CardContent align="center">
                <Typography variant="h3">
                  Courses
                </Typography>
                {this.state.courses.map((course) => 
                  <div>
                    <Typography variant="h5">
                      {course.courseCode}
                    </Typography>
                    <Typography variant="body1">
                      {course.courseName}
                    </Typography>
                  </div>
                )}
              </CardContent>
            </Card>
            <h5>affinity sports: {this.state.affinitySports}</h5>
            <h5>bio: {this.state.bio}</h5>
            <h5>class: {this.state.class}</h5>
            <h5>
              course Codes: {this.state.courses.map((course) => course.courseCode)}
            </h5>
            <h5>
              course Names: {this.state.courses.map((course) => course.courseName)}
            </h5>
            <h5>createdAt: {this.state.createdAt}</h5>
            <h5>email: {this.state.email}</h5>
            <h5>favorite artist: {this.state.favorites.artist}</h5>
            <h5>favorite book: {this.state.favorites.book}</h5>
            <h5>favorite movie: {this.state.favorites.movie}</h5>
            <h5>favorite tvShow: {this.state.favorites.tvShow}</h5>
            <h5>first name: {this.state.firstName}</h5>
            <h5>greek life: {this.state.greekLife}</h5>
            <h5>groups: {this.state.groups}</h5>
            <h5>image url: {this.state.imageUrl}</h5>
            <h5>interests: {this.state.interests}</h5>
            <h5>last name: {this.state.lastName}</h5>
            <h5>majors: {this.state.majors}</h5>
            <h5>preferred pronouns: {this.state.preferredPronouns}</h5>
            <h5>user ID: {this.state.userId}</h5>
            <h5>varsity sports: {this.state.varsitySports}</h5>
          </Grid>
          
          <Grid item sm></Grid>
        </Grid>
    );
  }
}

export default profileView;

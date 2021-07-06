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

class profileView extends Component {
  state = {
    affinitySports: [],
    bio: "",
    class: "",
    courses: [{}, {}, {}, {}, {}],
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
    const emailId = localStorage.emailId;
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

  logoutUser = () => {
    localStorage.removeItem("emailId");
    localStorage.removeItem("FBIdToken");
    localStorage.removeItem("courseCode");
    delete axios.defaults.headers.common["Authorization"];
  };

  render() {
    return (
      <div>
        <NavBar />
        <Card raised>
          <CardContent align="center">
            <img src={this.state.imageUrl} width={450} />
            <br />
            <br />
            <Typography variant="h3">
              {this.state.firstName} {this.state.lastName}
            </Typography>
            <Typography variant="h5">
              ({this.state.preferredPronouns})
            </Typography>
            <br />
            <Card
              variant="outlined"
              style={{
                maxWidth: 450,
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "red",
              }}
            >
              <CardContent>
                <Typography variant="body1">
                  Class of {this.state.class}
                </Typography>
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
                <br />
                <Typography variant="body1">{this.state.bio}</Typography>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        <br />
        <Grid container spacing={2}>
          <Grid item sm>
            <Card raised>
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
            <Card raised>
              <CardContent align="center">
                <Typography variant="h3">Interests</Typography>
                <hr />
                <br />

                <Typography variant="h5">General</Typography>
                <Grid container>
                  <Grid item sm>
                    <Typography variant="body1">
                      • {this.state.interests[0]}
                    </Typography>
                    <Typography variant="body1">
                      • {this.state.interests[2]}
                    </Typography>
                    {this.state.interests[4] && (
                      <Typography variant="body1">
                        • {this.state.interests[4]}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item sm>
                    <Typography variant="body1">
                      • {this.state.interests[1]}
                    </Typography>
                    {this.state.interests[3] && (
                      <Typography variant="body1">
                        • {this.state.interests[3]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                <br />

                {(this.state.affinitySports[0] ||
                  this.state.affinitySports[1] ||
                  this.state.affinitySports[2]) && (
                  <Typography variant="h5">Athletic</Typography>
                )}
                <Grid container>
                  <Grid item sm>
                    {this.state.affinitySports[0] && (
                      <Typography variant="body1">
                        • {this.state.affinitySports[0]}
                      </Typography>
                    )}
                    {this.state.affinitySports[2] && (
                      <Typography variant="body1">
                        • {this.state.affinitySports[2]}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item sm>
                    {this.state.affinitySports[1] && (
                      <Typography variant="body1">
                        • {this.state.affinitySports[1]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm>
            <Card raised>
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
        <Card raised>
          <CardContent align="center">
            <Typography variant="h3">Courses</Typography>
            <hr />
            <br />
            <Grid container spacing={2}>
              <Grid item sm>
                <Card
                  style={{
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "red",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">
                      {this.state.courses[0].courseCode}
                    </Typography>
                    <Typography variant="body1">
                      {this.state.courses[0].courseName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm>
                <Card
                  style={{
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "red",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">
                      {this.state.courses[1].courseCode}
                    </Typography>
                    <Typography variant="body1">
                      {this.state.courses[1].courseName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm>
                <Card
                  style={{
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "red",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">
                      {this.state.courses[2].courseCode}
                    </Typography>
                    <Typography variant="body1">
                      {this.state.courses[2].courseName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {(this.state.courses[3].courseCode ||
                this.state.courses[3].courseName) && (
                <Grid item sm>
                  <Card
                    style={{
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "red",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5">
                        {this.state.courses[3].courseCode}
                      </Typography>
                      <Typography variant="body1">
                        {this.state.courses[3].courseName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
              {(this.state.courses[4].courseCode ||
                this.state.courses[4].courseName) && (
                <Grid item sm>
                  <Card
                    style={{
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "red",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5">
                        {this.state.courses[4].courseCode}
                      </Typography>
                      <Typography variant="body1">
                        {this.state.courses[4].courseName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
        <br />
        <Grid contained align="center">
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
            onClick={this.logoutUser}
          >
            <Typography variant="body1">Logout</Typography>
          </Button>
        </Grid>
        <br />
      </div>
    );
  }
}

export default profileView;

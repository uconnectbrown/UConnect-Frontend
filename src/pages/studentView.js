// Setup
import React, { Component } from "react";
import axios from "axios";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import BackIcon from "@material-ui/icons/ArrowBack";
import MessageIcon from "@material-ui/icons/Sms";
import Book from "@material-ui/icons/MenuBook";
import Movie from "@material-ui/icons/Movie";
import Tv from "@material-ui/icons/Tv";
import Music from "@material-ui/icons/MusicNote";
import Pets from "@material-ui/icons/Pets";
import Sports from "@material-ui/icons/SportsBasketball";

// Components
import NavBar from "../components/NavBar";

// Resources
import studentViewState from "../resources/studentViewState";
import { ThreeDRotation } from "@material-ui/icons";

// Body
class studentView extends Component {
  constructor() {
    // Needed props to send back to courseView: code, name, color
    // Needed props for studentView: recipientId
    super();
    this.state = studentViewState;
  }

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push("/coursesView");
    } else {
      this.loadUserData(this.props.location.state.recipientId);
    }
  }

  loadUserData = (id) => {
    axios
      .get(`/user/${id}`)
      .then((res) => {
        this.setState({
          // Required
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          classYear: res.data.user.classYear,
          major1: res.data.user.majors[0],
          major2: res.data.user.majors[1],
          major3: res.data.user.majors[2],
          preferredPronouns: res.data.user.preferredPronouns,
          interests1: res.data.user.interests1,
          interests2: res.data.user.interests2,
          interests3: res.data.user.interests3,
          courses: res.data.user.courses,
          imageUrl: res.data.user.imageUrl,
          // Optional
          bio: res.data.user.bio,
          group1: res.data.user.groups[0],
          group2: res.data.user.groups[1],
          group3: res.data.user.groups[2],
          varsitySport1: res.data.user.varsitySports[0],
          varsitySport2: res.data.user.varsitySports[1],
          greekLife: res.data.user.greekLife,
          instrument1: res.data.user.instruments[0],
          instrument2: res.data.user.instruments[1],
          instrument3: res.data.user.instruments[2],
          pickUpSport1: res.data.user.pickUpSports[0],
          pickUpSport2: res.data.user.pickUpSports[1],
          pickUpSport3: res.data.user.pickUpSports[2],
          pet1: res.data.user.pets[0],
          pet2: res.data.user.pets[1],
          pet3: res.data.user.pets[2],
          favoriteBook: res.data.user.favorites.book,
          favoriteMovie: res.data.user.favorites.movie,
          favoriteShow: res.data.user.favorites.tvShow,
          favoriteArtist: res.data.user.favorites.artist,
          // Other
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleBack = () => {
    this.props.history.push({
      pathname: "/courseView",
      state: {
        code: this.props.location.state.code,
        name: this.props.location.state.name,
        color: this.props.location.state.color,
      },
    });
  };

  handleMessage = () => {
    this.props.history.push({
      pathname: "/messageView",
      state: {
        // Props that messageView needs
        recipientName: this.state.firstName + " " + this.state.lastName,
        recipientImage: this.state.imageUrl,
        recipientId: this.props.location.state.recipientId,
        // Props that courseView needs
        code: this.props.location.state.code, // messageView also needs
        name: this.props.location.state.name,
        color: this.props.location.state.color,
      },
    });
  };

  render() {
    let palette = [
      "#16a085",
      "#27ae60",
      "#2980b9",
      "#8e44ad",
      "#2c3e50",
      "#f1c40f",
      "#e67e22",
      "#e74c3c",
      "#ecf0f1",
      "#95a5a6",
    ];
    let indexArray = [];
    for (let j = 0; j < 5; j++) {
      if (this.state.courses[j].code) {
        indexArray.push(j);
      }
    }
    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={this.handleBack}
            >
              <BackIcon />
              <span style={{ marginRight: "5px" }} />
              <Typography variant="h6">Back</Typography>
            </IconButton>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <IconButton
                edge="end"
                color="inherit"
                aria-label="message"
                onClick={this.handleMessage}
              >
                <Typography variant="h6">Message</Typography>
                <span style={{ marginRight: "5px" }} />
                <MessageIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Card raised>
          <CardContent align="center">
            <Grid container spacing={1}>
              <Grid item sm></Grid>
              <Grid item sm>
                <img
                  alt="Profile"
                  src={this.state.imageUrl}
                  style={{
                    width: 400,
                    height: 400,
                    objectFit: "cover",
                    borderRadius: "10%",
                    borderStyle: "solid",
                    borderColor: "red",
                    borderWidth: "2px",
                  }}
                />
                <br />
              </Grid>
              <Grid item sm></Grid>
            </Grid>

            <br />
            <Card raised style={{ display: "inline-block" }}>
              <CardContent>
                <span>
                  <Typography variant="h3" align="center">
                    {this.state.firstName} {this.state.lastName}{" "}
                  </Typography>
                </span>
                <Typography variant="h5">
                  {this.state.preferredPronouns &&
                    `(${this.state.preferredPronouns})`}
                </Typography>
                <br />
                <Typography variant="h5">
                  Class of {this.state.classYear}
                </Typography>
                <Typography variant="h5">
                  Concentration(s): {this.state.major1}
                  {this.state.major2 && `, ${this.state.major2}`}
                  {this.state.major3 && `, ${this.state.major3}`}
                </Typography>
              </CardContent>
            </Card>
            <br />
            <br />
            {this.state.bio && (
              <Card raised style={{ display: "inline-block" }}>
                <CardContent>
                  <span>
                    <Typography variant="h4" align="center">
                      Bio
                    </Typography>
                  </span>
                  {this.state.bio}{" "}
                </CardContent>
              </Card>
            )}
            <br />
            <Grid container spacing={2}>
              <Grid item sm>
                <Card
                  raised
                  style={{
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "red",
                    height: "100%",
                    marginBottom: "-5px",
                  }}
                >
                  <CardContent>
                    <div>
                      <span>
                        <Typography variant="h5">Groups</Typography>
                      </span>
                      <br />
                      {this.state.group1 && (
                        <Typography>• {this.state.group1}</Typography>
                      )}
                      {this.state.group2 && (
                        <Typography>• {this.state.group2}</Typography>
                      )}
                      {this.state.group3 && (
                        <Typography>• {this.state.group3}</Typography>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm>
                <Card
                  raised
                  style={{
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "red",
                    height: "100%",
                    marginBottom: "-5px",
                  }}
                >
                  <CardContent>
                    <div>
                      <span>
                        <Typography variant="h5">Varsity Sports</Typography>
                      </span>
                      <br />
                      {this.state.varsitySport1 && (
                        <Typography>• {this.state.varsitySport1}</Typography>
                      )}
                      {this.state.varsitySport2 && (
                        <Typography>• {this.state.varsitySport2}</Typography>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm>
                <Card
                  raised
                  style={{
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "red",
                    height: "100%",
                    marginBottom: "-5px",
                  }}
                >
                  <CardContent>
                    <div>
                      <span>
                        <Typography variant="h5">Greek Organization</Typography>
                      </span>
                      <br />
                      {this.state.greekLife && (
                        <Typography>• {this.state.greekLife}</Typography>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <br />
        <Card raised>
          <CardContent align="center">
            <Typography variant="h3">Interests </Typography>
            <hr />
            <br />
            <Grid container spacing={2}>
              <Grid item sm>
                <Card
                  raised
                  style={{
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: `${palette[7]}`,
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" style={{ color: `${palette[7]}` }}>
                      Career and Academic
                    </Typography>
                    <br />
                    {this.state.interests1.map((interest) => {
                      return <Typography>• {interest}</Typography>;
                    })}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm>
                <Card
                  raised
                  style={{
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: `${palette[0]}`,
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" style={{ color: `${palette[0]}` }}>
                      Physical Activity and Wellness
                    </Typography>
                    <br />
                    {this.state.interests2.map((interest) => {
                      return <Typography>• {interest}</Typography>;
                    })}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm>
                <Card
                  raised
                  style={{
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: `${palette[3]}`,
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" style={{ color: `${palette[3]}` }}>
                      General Hobbies
                    </Typography>
                    <br />
                    {this.state.interests3.map((interest) => {
                      return <Typography>• {interest}</Typography>;
                    })}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <br />
            <br />
            <Card raised style={{ marginBottom: "-5px" }}>
              <CardContent>
                <Typography variant="h4">Additional Info</Typography>
                <hr />
                <br />
                <Grid container>
                  <Grid item sm>
                    <div>
                      <Music />
                      <span>
                        <Typography variant="h6">Instruments</Typography>
                      </span>
                      <br />
                      {this.state.instrument1 && (
                        <Typography>• {this.state.instrument1}</Typography>
                      )}
                      {this.state.instrument2 && (
                        <Typography>• {this.state.instrument2}</Typography>
                      )}
                      {this.state.instrument3 && (
                        <Typography>• {this.state.instrument3}</Typography>
                      )}
                    </div>
                  </Grid>
                  <Grid item sm>
                    <div>
                      <Sports />
                      <span>
                        <Typography variant="h6">Pick-Up Sports</Typography>
                      </span>
                      <br />
                      {this.state.pickUpSport1 && (
                        <Typography>• {this.state.pickUpSport1}</Typography>
                      )}
                      {this.state.pickUpSport2 && (
                        <Typography>• {this.state.pickUpSport2}</Typography>
                      )}
                      {this.state.pickUpSport3 && (
                        <Typography>• {this.state.pickUpSport3}</Typography>
                      )}
                    </div>
                  </Grid>
                  <Grid item sm>
                    <div>
                      <Pets />
                      <span>
                        <Typography variant="h6">Pets</Typography>
                      </span>
                      <br />
                      {this.state.pet1 && (
                        <Typography>• {this.state.pet1}</Typography>
                      )}
                      {this.state.pet2 && (
                        <Typography>• {this.state.pet2}</Typography>
                      )}
                      {this.state.pet3 && (
                        <Typography>• {this.state.pet3}</Typography>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        <br />
        <Card raised>
          <CardContent align="center">
            <Typography variant="h3">Favorites </Typography>
            <hr />
            <br />
            <Grid container spacing={2}>
              <Grid item sm>
                <div>
                  <Book />
                  <Typography variant="body1">
                    Book: {this.state.favoriteBook}
                  </Typography>
                </div>
              </Grid>
              <Grid item sm>
                <div>
                  <Movie />
                  <Typography variant="body1">
                    Movie: {this.state.favoriteMovie}
                  </Typography>
                </div>
              </Grid>
              <Grid item sm>
                <div>
                  <Tv />
                  <Typography variant="body1">
                    Show: {this.state.favoriteShow}
                  </Typography>
                </div>
              </Grid>
              <Grid item sm>
                <div>
                  <Music />
                  <Typography variant="body1">
                    Artist: {this.state.favoriteArtist}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <br />
        <Card raised>
          <CardContent align="center">
            <Typography variant="h3">Courses</Typography>
            <hr />
            <br />
            <Grid container spacing={2}>
              {indexArray.map((index) => (
                <Grid item sm>
                  <Card
                    style={{
                      borderStyle: "solid",
                      borderWidth: "3px",
                      borderColor: `${this.state.courses[index].color}`,
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h5"
                        style={{
                          color: `${this.state.courses[index].color}`,
                        }}
                      >
                        {this.state.courses[index].code}
                      </Typography>
                      <Typography variant="body1">
                        {this.state.courses[index].name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
        <br />
      </div>
    );
  }
}

export default studentView;

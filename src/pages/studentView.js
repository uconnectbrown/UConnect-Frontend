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
import CircularProgress from "@material-ui/core/CircularProgress";
import Book from "@material-ui/icons/MenuBook";
import Movie from "@material-ui/icons/Movie";
import Tv from "@material-ui/icons/Tv";
import Music from "@material-ui/icons/MusicNote";
import Pets from "@material-ui/icons/Pets";
import Sports from "@material-ui/icons/SportsBasketball";

// Body
class studentView extends Component {
  state = {
    courseInfo: [],
    studentEmail: "",
    studentId: "",
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
    interests1: [],
    interests2: [],
    interests3: [],
    lastName: "",
    majors: [],
    preferredPronouns: "",
    userId: "",
    varsitySports: [],
    loading: true,
  };

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push("/coursesView");
    } else {
      const studentEmail = this.props.location.state.studentInfo[4];
      axios
        .get(`/user/${studentEmail}`)
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
            interests1: res.data.user.interests1,
            interests2: res.data.user.interests2,
            interests3: res.data.user.interests3,
            lastName: res.data.user.lastName,
            majors: res.data.user.majors,
            preferredPronouns: res.data.user.preferredPronouns,
            userId: res.data.user.userId,
            varsitySports: res.data.user.varsitySports,
            courseInfo: [
              this.props.location.state.studentInfo[0],
              this.props.location.state.studentInfo[1],
              this.props.location.state.studentInfo[2],
              this.props.location.state.studentInfo[3],
            ],
            studentEmail: this.props.location.state.studentInfo[4],
            studentId: this.props.location.state.studentInfo[4].split("@")[0],
          });
        })
        .then(() => {
          this.setState({ loading: false });
        })
        .catch((err) => console.log(err));
    }
  }

  handleBack = () => {
    this.props.history.push({
      pathname: "/courseView",
      state: { courseInfo: this.state.courseInfo },
    });
  };

  handleMessage = () => {
    this.props.history.push({
      pathname: "/messageView",
      state: {
        recipientInfo: [
          this.state.firstName + " " + this.state.lastName,
          this.state.imageUrl,
          this.state.studentId,
          this.state.courseInfo[0].replace(/\s/g, ""),
          this.state.courseInfo,
          this.state.studentEmail,
        ],
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
      if (this.state.courses[j].courseCode) {
        indexArray.push(j);
      }
    }
    return (
      <div>
        {this.state.loading && (
          <div align="center">
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
            <br />
            <CircularProgress size={100} />
            <br />
            <br />
            <Typography variant="h4">Fetching user data...</Typography>
          </div>
        )}
        {!this.state.loading && (
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
                    <span style={{ marginRight: "8px" }} />
                    <MessageIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            <Card raised>
              <CardContent align="center">
                <img
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
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
                <br />

                {/* <Button onClick={this.handleEditPicture}>
              <EditIcon color="primary" />
            </Button> */}
                <br />
                <br />
                <Card raised style={{ display: "inline-block" }}>
                  <CardContent>
                    <span>
                      <Typography variant="h3">
                        {this.state.firstName} {this.state.lastName}
                      </Typography>
                    </span>
                    <Typography variant="h5">
                      {this.state.preferredPronouns &&
                        `(${this.state.preferredPronouns})`}
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      Class of {this.state.class}
                    </Typography>
                    <Typography variant="h5">
                      Concentration(s): {this.state.majors[0]}
                      {this.state.majors[1] && `, ${this.state.majors[1]}`}
                      {this.state.majors[2] && `, ${this.state.majors[2]}`}
                    </Typography>
                    {this.state.bio && (
                      <div>
                        <br />
                        <Typography variant="h6">{this.state.bio}</Typography>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <br />
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
                        <Typography variant="h5">Varsity Sports</Typography>
                        <br />
                        {this.state.varsitySports[0] === "" &&
                          this.state.varsitySports[1] === "" && (
                            <Typography>N/A</Typography>
                          )}
                        {this.state.varsitySports[0] && (
                          <Typography>
                            • {this.state.varsitySports[0]}
                          </Typography>
                        )}
                        {this.state.varsitySports[1] && (
                          <Typography>
                            • {this.state.varsitySports[1]}
                          </Typography>
                        )}
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
                        <Typography variant="h5">Groups</Typography>
                        <br />
                        {this.state.groups[0] === "" &&
                          this.state.groups[1] === "" &&
                          this.state.groups[2] === "" && (
                            <Typography>N/A</Typography>
                          )}
                        {this.state.groups[0] && (
                          <Typography>• {this.state.groups[0]}</Typography>
                        )}
                        {this.state.groups[1] && (
                          <Typography variant="body">
                            • {this.state.groups[1]}
                          </Typography>
                        )}
                        {this.state.groups[2] && (
                          <Typography>• {this.state.groups[2]}</Typography>
                        )}
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
                        <Typography variant="h5">Greek Organization</Typography>
                        <br />
                        {this.state.greekLife === "" && (
                          <Typography>N/A</Typography>
                        )}
                        {this.state.greekLife && (
                          <Typography>• {this.state.greekLife}</Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <br />
            <Card raised>
              <CardContent align="center">
                <Typography variant="h3">Interests</Typography>
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
                        <Typography
                          variant="h5"
                          style={{ color: `${palette[7]}` }}
                        >
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
                        <Typography
                          variant="h5"
                          style={{ color: `${palette[0]}` }}
                        >
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
                        <Typography
                          variant="h5"
                          style={{ color: `${palette[3]}` }}
                        >
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
                    <Grid container spacing={2}>
                      <Grid item sm>
                        <div>
                          <Music />
                          <Typography variant="h6">Instruments</Typography>
                        </div>
                      </Grid>
                      <Grid item sm>
                        <div>
                          <Sports />
                          <Typography variant="h6">Pick-Up Sports</Typography>
                          <br />
                          {this.state.affinitySports[0] === "" &&
                            this.state.affinitySports[1] === "" &&
                            this.state.affinitySports[2] === "" && (
                              <Typography>N/A</Typography>
                            )}
                          {this.state.affinitySports[0] && (
                            <Typography>
                              • {this.state.affinitySports[0]}
                            </Typography>
                          )}
                          {this.state.affinitySports[1] && (
                            <Typography>
                              • {this.state.affinitySports[0]}
                            </Typography>
                          )}
                          {this.state.affinitySports[2] && (
                            <Typography>
                              • {this.state.affinitySports[0]}
                            </Typography>
                          )}
                        </div>
                      </Grid>
                      <Grid item sm>
                        <div>
                          <Pets />
                          <Typography variant="h6">Pets</Typography>
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
                <Typography variant="h3">Favorites</Typography>
                <hr />
                <br />
                <Grid container spacing={2}>
                  <Grid item sm>
                    <div>
                      <Book />
                      <Typography variant="body1">
                        Book: {this.state.favorites.book}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item sm>
                    <div>
                      <Movie />
                      <Typography variant="body1">
                        Movie: {this.state.favorites.movie}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item sm>
                    <div>
                      <Tv />
                      <Typography variant="body1">
                        Show: {this.state.favorites.tvShow}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item sm>
                    <div>
                      <Music />
                      <Typography variant="body1">
                        Artist: {this.state.favorites.artist}
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
                          borderColor: `${this.state.courses[index].courseColor}`,
                          height: "100%",
                          marginBottom: "-5px",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h5"
                            style={{
                              color: `${this.state.courses[index].courseColor}`,
                            }}
                          >
                            {this.state.courses[index].courseCode}
                          </Typography>
                          <Typography variant="body1">
                            {this.state.courses[index].courseName}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
            <br />
            <br />
          </div>
        )}
      </div>
    );
  }
}

export default studentView;

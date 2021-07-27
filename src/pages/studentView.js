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

// Body
class studentView extends Component {
  state = {
    courseInfo: [
      this.props.location.state.studentInfo[0],
      this.props.location.state.studentInfo[1],
      this.props.location.state.studentInfo[2],
      this.props.location.state.studentInfo[3],
    ],
    studentEmail: this.props.location.state.studentInfo[4],
    studentId: this.props.location.state.studentInfo[4].split("@")[0],
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
    loading: true,
  };

  componentDidMount() {
    const studentEmail = this.state.studentEmail;

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
          interests: res.data.user.interests,
          lastName: res.data.user.lastName,
          majors: res.data.user.majors,
          preferredPronouns: res.data.user.preferredPronouns,
          userId: res.data.user.userId,
          varsitySports: res.data.user.varsitySports,
        });
      })
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((err) => console.log(err));
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
        ],
      },
    });
  };

  render() {
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
                <Typography variant="h3">
                  {this.state.firstName} {this.state.lastName}
                </Typography>
                <Typography variant="h5">
                  {this.state.preferredPronouns &&
                    `(${this.state.preferredPronouns})`}
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
                <br />
              </CardContent>
            </Card>
            <br />
            <Grid container spacing={2}>
              <Grid item component="Card" sm>
                <Card raised style={{ height: "100%" }}>
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
              <Grid item component="Card" sm>
                <Card raised style={{ height: "100%" }}>
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
              <Grid item component="Card" sm>
                <Card raised style={{ height: "100%" }}>
                  <CardContent align="center">
                    <Typography variant="h3">Favorites</Typography>
                    <hr />
                    <br />
                    <Book />
                    <Typography variant="body1">
                      Book: {this.state.favorites.book}
                    </Typography>
                    <br />
                    <Movie />
                    <Typography variant="body1">
                      Movie: {this.state.favorites.movie}
                    </Typography>
                    <br />
                    <Tv />
                    <Typography variant="body1">
                      Show: {this.state.favorites.tvShow}
                    </Typography>
                    <br />
                    <Music />
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
                  {indexArray.map((index) => (
                    <Grid item sm>
                      <Card
                        style={{
                          borderStyle: "solid",
                          borderWidth: "3px",
                          borderColor: `${this.state.courses[index].undefined}`,
                          height: "100%",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h5"
                            style={{
                              color: `${this.state.courses[index].undefined}`,
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

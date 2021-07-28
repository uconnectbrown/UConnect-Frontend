// Setup
import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
import { auth } from "../firebase";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// Import Data
import majorList from "../resources/majors";
import varsitySports from "../resources/varsitySports";
import emptyProfile from "../resources/emptyProfile";
import greekLife from "../resources/greekLife";

// Styling
const styles = (theme) => ({
  ...theme.spreadThis,
});

// Validators
const { validProfile } = require("../util/validators");

// Body
class profileBuild extends Component {
  constructor() {
    super();
    this.state = emptyProfile;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const newUserData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      class: this.state.class,
      email: auth.currentUser.email,
      majors: [this.state.majorOne, this.state.majorTwo, this.state.majorThree],
      preferredPronouns: this.state.preferredPronouns,
      interests: [
        this.state.interestOne,
        this.state.interestTwo,
        this.state.interestThree,
        this.state.interestFour,
        this.state.interestFive,
      ],
      groups: [this.state.groupOne, this.state.groupTwo, this.state.groupThree],
      varsitySports: [this.state.varsitySportOne, this.state.varsitySportTwo],
      affinitySports: [
        this.state.affinitySportOne,
        this.state.affinitySportTwo,
        this.state.affinitySportThree,
      ],
      greekLife: this.state.greekLife,
      favorites: this.state.favorites,
      bio: this.state.bio,
      courses: [
        this.state.courseOne,
        this.state.courseTwo,
        this.state.courseThree,
        this.state.courseFour,
        this.state.courseFive,
      ],
    };

    for (let i = 0; i < 5; i++) {
      if (Object.keys(newUserData.courses[i]).length === 3) {
        newUserData.courses[i] = {
          courseCode: newUserData.courses[i].courseCode,
          courseName: newUserData.courses[i].courseName,
          courseColor: newUserData.courses[i].courseColor,
          assignments: [],
        };
      }
    }

    for (let i = 0; i < 5; i++) {
      if (Object.keys(newUserData.courses[i]).length === 0) {
        newUserData.courses[i] = {
          courseCode: "",
          courseName: "",
          courseColor: "",
          assignments: [],
        };
      }
    }

    if (!validProfile(newUserData)) {
      this.setState({
        loading: false,
        validProfile: false,
      });
      return;
    }

    axios
      .post("/signup", newUserData)
      .then(() => {
        this.setState({
          loading: false,
          validProfile: true,
        });
        this.props.history.push({
          pathname: "/",
        });
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFavorites = (event) => {
    let input = event.target.value;
    let subfield = event.target.id;
    this.setState((prevState) => {
      let favorites = Object.assign({}, prevState.favorites);
      favorites[subfield] = input;
      return { favorites };
    });
  };

  handleCourseOne = (event) => {
    let input = event.target.value;
    let subfield = event.target.name;
    this.setState((prevState) => {
      let courseOne = Object.assign({}, prevState.courseOne);
      courseOne[subfield] = input;
      return { courseOne };
    });
  };

  handleCourseTwo = (event) => {
    let input = event.target.value;
    let subfield = event.target.name;
    this.setState((prevState) => {
      let courseTwo = Object.assign({}, prevState.courseTwo);
      courseTwo[subfield] = input;
      return { courseTwo };
    });
  };

  handleCourseThree = (event) => {
    let input = event.target.value;
    let subfield = event.target.name;
    this.setState((prevState) => {
      let courseThree = Object.assign({}, prevState.courseThree);
      courseThree[subfield] = input;
      return { courseThree };
    });
  };

  handleCourseFour = (event) => {
    let input = event.target.value;
    let subfield = event.target.name;
    this.setState((prevState) => {
      let courseFour = Object.assign({}, prevState.courseFour);
      courseFour[subfield] = input;
      return { courseFour };
    });
  };

  handleCourseFive = (event) => {
    let input = event.target.value;
    let subfield = event.target.name;
    this.setState((prevState) => {
      let courseFive = Object.assign({}, prevState.courseFive);
      courseFive[subfield] = input;
      return { courseFive };
    });
  };

  handleSecondMajor = () => {
    this.setState({ secondMajor: true });
  };

  handleThirdMajor = () => {
    this.setState({ thirdMajor: true });
  };

  handleVarsity = () => {
    this.setState({ secondVarsitySport: true });
  };

  handleFifthCourse = () => {
    this.setState({ fifthCourse: true });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
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
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <Typography variant="h2" className={classes.pageTitle}>
              Build Profile
            </Typography>

            <h2>Basic Info</h2>
            <TextField
              id="firstName"
              autoComplete="off"
              name="firstName"
              type="text"
              label="First Name"
              className={classes.textField}
              value={this.state.firstName}
              onChange={this.handleChange}
              fullWidth
              required
              variant="outlined"
              size={"small"}
            />
            <br />
            <TextField
              id="lastName"
              autoComplete="off"
              name="lastName"
              type="text"
              label="Last Name"
              className={classes.textField}
              value={this.state.lastName}
              onChange={this.handleChange}
              fullWidth
              required
              variant="outlined"
              size={"small"}
            />
            <TextField
              id="class"
              name="class"
              select
              label="Class of ..."
              className={classes.textField}
              value={this.state.class}
              onChange={this.handleChange}
              variant="outlined"
              required
              helperText="Please select your graduating class"
              size={"small"}
            >
              <MenuItem key="2021.5" value="2021.5">
                2021.5
              </MenuItem>
              <MenuItem key="2022" value="2022">
                2022
              </MenuItem>
              <MenuItem key="2022.5" value="2022.5">
                2022.5
              </MenuItem>
              <MenuItem key="2023" value="2023">
                2023
              </MenuItem>
              <MenuItem key="2023.5" value="2023.5">
                2023.5
              </MenuItem>
              <MenuItem key="2024" value="2024">
                2024
              </MenuItem>
              <MenuItem key="2024.5" value="2024.5">
                2024.5
              </MenuItem>
              <MenuItem key="2025" value="2025">
                2025
              </MenuItem>
            </TextField>
            <br />
            <body1>
              What is your intended major? Feel free to type out an independent
              major or put "Undecided" if you don't know at this point.
            </body1>
            <br />
            <span>
              <TextField
                variant="outlined"
                name="majorOne"
                autoComplete="off"
                size={"small"}
                label="Concentration"
                className={classes.textField}
                required
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: majorList,
                  inputProps: {
                    list: "majors",
                  },
                }}
              />
              {!this.state.secondMajor && (
                <Tooltip
                  title="Add Second Concentration"
                  placement="top"
                  style={{ marginTop: "5px" }}
                >
                  <IconButton onClick={this.handleSecondMajor}>
                    <AddIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              )}
            </span>

            <span>
              {this.state.secondMajor && (
                <div>
                  <br />
                  <TextField
                    style={{ marginTop: "-10px" }}
                    variant="outlined"
                    name="majorTwo"
                    autoComplete="off"
                    size={"small"}
                    label="Second Concentration"
                    className={classes.textField}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: majorList,
                      inputProps: {
                        list: "majors",
                      },
                    }}
                  />
                </div>
              )}
              {this.state.secondMajor && !this.state.thirdMajor && (
                <Tooltip title="Add Third Concentration" placement="top">
                  <IconButton onClick={this.handleThirdMajor}>
                    <AddIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              )}
            </span>

            {this.state.thirdMajor && (
              <div>
                <br />
                <TextField
                  style={{ marginTop: "-10px", marginBottom: "-10px" }}
                  variant="outlined"
                  name="majorThree"
                  autoComplete="off"
                  size={"small"}
                  label="Third Concentration"
                  className={classes.textField}
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: majorList,
                    inputProps: {
                      list: "majors",
                    },
                  }}
                />
              </div>
            )}

            <br />

            <TextField
              id="preferredPronouns"
              name="preferredPronouns"
              select
              label="Preferred Pronouns"
              className={classes.textField}
              value={this.state.preferredPronouns}
              onChange={this.handleChange}
              variant="outlined"
              size={"small"}
              helperText="Please select your preferred pronouns"
            >
              <MenuItem key="he/him" value="he/him">
                he/him
              </MenuItem>
              <MenuItem key="she/her" value="she/her">
                she/her
              </MenuItem>
              <MenuItem key="they/them" value="they/them">
                they/them
              </MenuItem>
              <MenuItem key="ze/hir" value="ze/hir">
                ze/hir
              </MenuItem>
              <MenuItem key="other" value="other">
                other
              </MenuItem>
            </TextField>

            <h2>Interests</h2>
            <body1>
              Please list between 3 and 5 areas of interests you have.
            </body1>
            <br />
            <br />
            <body1>
              For each of the three categories provided, please select all of the subcategories listed below in which you are interested.
            </body1>
            </Grid>
            <Grid item sm/>
          </Grid>
          <br />
          <Grid container spacing={3} className={classes.form}>
            <Grid item sm>
              <Button variant="outlined" onClick={() => {this.setState({careerOpen: true})}} style={{color: `${palette[4]}`, borderStyle: "solid", borderWidth: "2px", borderColor: `${palette[4]}`}}>
                <Typography variant="body1">Career & Professional</Typography>
              </Button>
              <Dialog
                overlayStyle={{ backgroundColor: "transparent" }}
                open={this.state.careerOpen}
              >
                <DialogTitle
                  style={{ cursor: "move" }}
                  id="draggable-dialog-title"
                >
                  Career & Professional Interests
                </DialogTitle>
                <DialogContent>
                  <Typography variant="body1"><Checkbox style={{color: `${palette[4]}`}} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /> Option #1</Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {this.setState({careerOpen: false})}}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                  >
                    Save Preferences
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item sm>
              <Button variant="outlined" onClick={() => {this.setState({artsOpen: true})}} style={{color: `${palette[3]}`, borderStyle: "solid", borderWidth: "2px", borderColor: `${palette[3]}`}}>
                <Typography variant="body1">Arts & Entertainment</Typography>
              </Button>
              <Dialog
                overlayStyle={{ backgroundColor: "transparent" }}
                open={this.state.artsOpen}
              >
                <DialogTitle
                  style={{ cursor: "move" }}
                  id="draggable-dialog-title"
                >
                  Arts & Entertainment Interests
                </DialogTitle>
                <DialogContent>
                  <Typography variant="body1"><Checkbox style={{color: `${palette[3]}`}} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /> Option #1</Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {this.setState({artsOpen: false})}}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                  >
                    Save Preferences
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item sm>
              <Button variant="outlined" onClick={() => {this.setState({fitnessOpen: true})}} style={{color: `${palette[0]}`, borderStyle: "solid", borderWidth: "2px", borderColor: `${palette[0]}`}}>
                <Typography variant="body1">Fitness & Nutrition</Typography>
              </Button>
              <Dialog
                overlayStyle={{ backgroundColor: "transparent" }}
                open={this.state.fitnessOpen}
              >
                <DialogTitle
                  style={{ cursor: "move" }}
                  id="draggable-dialog-title"
                >
                  Fitness & Nutrition Interests
                </DialogTitle>
                <DialogContent>
                  <Typography variant="body1"><Checkbox style={{color: `${palette[0]}`}} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /> Option #1</Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {this.setState({fitnessOpen: false})}}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                  >
                    Save Preferences
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item sm>
              <Button variant="outlined" onClick={() => {this.setState({hobbiesOpen: true})}} style={{color: `${palette[5]}`, borderStyle: "solid", borderWidth: "2px", borderColor: `${palette[5]}`}}>
                <Typography variant="body1">Hobbies & Activities</Typography>
              </Button>
              <Dialog
                overlayStyle={{ backgroundColor: "transparent" }}
                open={this.state.hobbiesOpen}
              >
                <DialogTitle
                  style={{ cursor: "move" }}
                  id="draggable-dialog-title"
                >
                  Hobbies & Activities Interests
                </DialogTitle>
                <DialogContent>
                  <Typography variant="body1"><Checkbox style={{color: `${palette[5]}`}} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /> Option #1</Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {this.setState({hobbiesOpen: false})}}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                  >
                    Save Preferences
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item sm>
              <Button variant="outlined" onClick={() => {this.setState({politicsOpen: true})}} style={{color: `${palette[2]}`, borderStyle: "solid", borderWidth: "2px", borderColor: `${palette[2]}`}}>
                <Typography variant="body1">Politics & Social</Typography>
              </Button>
              <Dialog
                overlayStyle={{ backgroundColor: "transparent" }}
                open={this.state.politicsOpen}
              >
                <DialogTitle
                  style={{ cursor: "move" }}
                  id="draggable-dialog-title"
                >
                  Politics & Social Interests
                </DialogTitle>
                <DialogContent>
                  <Typography variant="body1"><Checkbox style={{color: `${palette[2]}`}} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /> Option #1</Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {this.setState({politicsOpen: false})}}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                  >
                    Save Preferences
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item sm>
              <Button variant="outlined" onClick={() => {this.setState({sportsOpen: true})}} style={{color: `${palette[7]}`, borderStyle: "solid", borderWidth: "2px", borderColor: `${palette[7]}`}}>
                <Typography variant="body1">Sports & Outdoors</Typography>
              </Button>
              <Dialog
                overlayStyle={{ backgroundColor: "transparent" }}
                open={this.state.sportsOpen}
              >
                <DialogTitle
                  style={{ cursor: "move" }}
                  id="draggable-dialog-title"
                >
                  Sports & Outdoors Interests
                </DialogTitle>
                <DialogContent>
                  <Typography variant="body1"><Checkbox style={{color: `${palette[7]}`}} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /> Option #1</Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {this.setState({sportsOpen: false})}}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                  >
                    Save Preferences
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item sm>
              <Button variant="outlined" onClick={() => {this.setState({scienceOpen: true})}} style={{color: `${palette[1]}`, borderStyle: "solid", borderWidth: "2px", borderColor: `${palette[1]}`}}>
                <Typography variant="body1">Science & Technology</Typography>
              </Button>
              <Dialog
                overlayStyle={{ backgroundColor: "transparent" }}
                open={this.state.scienceOpen}
              >
                <DialogTitle
                  style={{ cursor: "move" }}
                  id="draggable-dialog-title"
                >
                  Science & Technology Interests
                </DialogTitle>
                <DialogContent>
                  <Typography variant="body1"><Checkbox style={{color: `${palette[1]}`}} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /> Option #1</Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {this.setState({scienceOpen: false})}}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                  >
                    Save Preferences
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
          <br />
          <Grid container className={classes.form}>
            <Grid item sm align="left">
              <Typography variant="h5" style={{color: `${palette[0]}`}} align="center">Physical Activity and Wellness</Typography>
              <br />
              <FormControlLabel 
                control={<Checkbox name="baseball" style={{color: `${palette[0]}`}}/>}
                label="Baseball"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="basketball" style={{color: `${palette[0]}`}}/>}
                label="Basketball"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="fighting" style={{color: `${palette[0]}`}}/>}
                label="Boxing, MMA, and Wrestling"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="cycling" style={{color: `${palette[0]}`}}/>}
                label="Cycling"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="football" style={{color: `${palette[0]}`}}/>}
                label="Football"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="golf" style={{color: `${palette[0]}`}}/>}
                label="Golf"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="outdoors" style={{color: `${palette[0]}`}}/>}
                label="Hiking, Backpacking, and Camping"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="hunting" style={{color: `${palette[0]}`}}/>}
                label="Hunting and Fishing"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="meditation" style={{color: `${palette[0]}`}}/>}
                label="Meditation and Yoga"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="motorsports" style={{color: `${palette[0]}`}}/>}
                label="Motor Sports"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="food" style={{color: `${palette[0]}`}}/>}
                label="Food and Nutrition"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="workingout" style={{color: `${palette[0]}`}}/>}
                label="Physical Exercise and Working Out"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="recovery" style={{color: `${palette[0]}`}}/>}
                label="Sleep and Recovery"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="soccer" style={{color: `${palette[0]}`}}/>}
                label="Soccer"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="swimming" style={{color: `${palette[0]}`}}/>}
                label="Swimming and Diving"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="tennis" style={{color: `${palette[0]}`}}/>}
                label="Tennis"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="track" style={{color: `${palette[0]}`}}/>}
                label="Track and Field"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="watersports" style={{color: `${palette[0]}`}}/>}
                label="Water Sports"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="wintersports" style={{color: `${palette[0]}`}}/>}
                label="Winter Sports"/>
            </Grid>
            <Grid item sm align="left">
              <Typography variant="h5" style={{color: `${palette[7]}`}} align="center">Career and Academic</Typography>
              <br />
              <FormControlLabel 
                control={<Checkbox name="research" style={{color: `${palette[7]}`}}/>}
                label="Academic and Scientific Research"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="architecture" style={{color: `${palette[7]}`}}/>}
                label="Architecture"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="art" style={{color: `${palette[7]}`}}/>}
                label="Art and Design"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="space" style={{color: `${palette[7]}`}}/>}
                label="Astronomy and Space"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="finance" style={{color: `${palette[7]}`}}/>}
                label="Banking, Finance, and Economics"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="business" style={{color: `${palette[7]}`}}/>}
                label="Business and Marketing"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="compsci" style={{color: `${palette[7]}`}}/>}
                label="Computer Science and Web Design"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="cultural" style={{color: `${palette[7]}`}}/>}
                label="Cultural and Social Studies"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="data" style={{color: `${palette[7]}`}}/>}
                label="Data Science"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="education" style={{color: `${palette[7]}`}}/>}
                label="Education"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="engineering" style={{color: `${palette[7]}`}}/>}
                label="Engineering"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="english" style={{color: `${palette[7]}`}}/>}
                label="English"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="environment" style={{color: `${palette[7]}`}}/>}
                label="Environment and Sustainability"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="entrepreneurship" style={{color: `${palette[7]}`}}/>}
                label="Entrepreneurship"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="healthcare" style={{color: `${palette[7]}`}}/>}
                label="Healthcare and Medicine"/>
              <FormControlLabel 
                control={<Checkbox name="history" style={{color: `${palette[7]}`}}/>}
                label="History and Philosophy"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="innovation" style={{color: `${palette[7]}`}}/>}
                label="Innovation and Technology"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="international" style={{color: `${palette[7]}`}}/>}
                label="International Relations and Foreign Affairs"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="journalism" style={{color: `${palette[7]}`}}/>}
                label="Journalism and Media"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="government" style={{color: `${palette[7]}`}}/>}
                label="Government, Law, and Public Policy"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="linguistics" style={{color: `${palette[7]}`}}/>}
                label="Linguistics"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="math" style={{color: `${palette[7]}`}}/>}
                label="Math and Statistics"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="natural" style={{color: `${palette[7]}`}}/>}
                label="Natural anf Physical Sciences"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="performing" style={{color: `${palette[7]}`}}/>}
                label="Performing Arts"/>
            </Grid>
            <Grid item sm align="left">
              <Typography variant="h5" style={{color: `${palette[3]}`}} align="center">General Hobbies</Typography>
              <br />
              <FormControlLabel 
                control={<Checkbox name="animals" style={{color: `${palette[3]}`}}/>}
                label="Animals and Pets"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="artistic" style={{color: `${palette[3]}`}}/>}
                label="Artistic Creation"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="cooking" style={{color: `${palette[3]}`}}/>}
                label="Baking and Cooking"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="games" style={{color: `${palette[3]}`}}/>}
                label="Board and Card Games"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="concerts" style={{color: `${palette[3]}`}}/>}
                label="Concerts and Festivals"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="clubs" style={{color: `${palette[3]}`}}/>}
                label="Clubs and Nightlife"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="home" style={{color: `${palette[3]}`}}/>}
                label="Home and Garden"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="media" style={{color: `${palette[3]}`}}/>}
                label="Media and Podcasts"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="movies" style={{color: `${palette[3]}`}}/>}
                label="Movies"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="music" style={{color: `${palette[3]}`}}/>}
                label="Music"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="photography" style={{color: `${palette[3]}`}}/>}
                label="Photography"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="vehicles" style={{color: `${palette[3]}`}}/>}
                label="Planes, Trains, and Automobiles"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="playing" style={{color: `${palette[3]}`}}/>}
                label="Playing Music"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="reading" style={{color: `${palette[3]}`}}/>}
                label="Reading and Writing"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="shopping" style={{color: `${palette[3]}`}}/>}
                label="Shopping and Fashion"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="theatre" style={{color: `${palette[3]}`}}/>}
                label="Theatre and Performing Arts"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="traveling" style={{color: `${palette[3]}`}}/>}
                label="Traveling"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="shows" style={{color: `${palette[3]}`}}/>}
                label="TV/Shows"/>
              <br />
              <FormControlLabel 
                control={<Checkbox name="videogames" style={{color: `${palette[3]}`}}/>}
                label="Video Games"/>
            </Grid>
          </Grid>
          <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
            <TextField
              id="interestOne"
              name="interestOne"
              autoComplete="off"
              type="text"
              label="First Interest"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="interestTwo"
              name="interestTwo"
              autoComplete="off"
              type="text"
              label="Second Interest"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="interestThree"
              name="interestThree"
              autoComplete="off"
              type="text"
              label="Third Interest"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="interestFour"
              name="interestFour"
              autoComplete="off"
              type="text"
              label="Fourth Interest"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />
            <TextField
              id="interestFive"
              name="interestFive"
              autoComplete="off"
              type="text"
              label="Fifth Interest"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />

            <h2>Groups</h2>
            <body1>
              Please list up to 3 clubs, affinity groups, or student
              organizations you are involved with.
            </body1>
            <TextField
              id="groupOne"
              name="groupOne"
              autoComplete="off"
              type="text"
              label="First Group"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />
            <TextField
              id="groupTwo"
              name="groupTwo"
              autoComplete="off"
              type="text"
              label="Second Group"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />
            <TextField
              id="groupThree"
              name="groupThree"
              autoComplete="off"
              type="text"
              label="Third Group"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />

            <h2>Athletics</h2>
            <body1>
              If you are a member of any varsity sports teams, please indicate
              which ones below.
            </body1>
            <br />
            <span>
              <TextField
                variant="outlined"
                name="varsitySportOne"
                autoComplete="off"
                size={"small"}
                label="First Varsity Sport"
                className={classes.textField}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: varsitySports,
                  inputProps: {
                    list: "varsitySports",
                  },
                }}
              />

              {!this.state.secondVarsitySport && (
                <Tooltip
                  title="Add Second Varsity Sport"
                  placement="top"
                  style={{ marginTop: "5px" }}
                >
                  <IconButton onClick={this.handleVarsity}>
                    <AddIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              )}
            </span>

            {this.state.secondVarsitySport && (
              <div>
                <br />
                <TextField
                  style={{ marginTop: "-10px" }}
                  variant="outlined"
                  name="varsitySportTwo"
                  autoComplete="off"
                  size={"small"}
                  label="Second Varsity Sport"
                  className={classes.textField}
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: varsitySports,
                    inputProps: {
                      list: "varsitySports",
                    },
                  }}
                />
              </div>
            )}
            <br />
            <body1>
              If you are not on a varsity sports team but still enjoy playing
              and competing in sports, please indicate which ones below.
            </body1>
            <TextField
              id="affinitySportOne"
              name="affinitySportOne"
              autoComplete="off"
              type="text"
              label="First Sport"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />
            <TextField
              id="affinitySportTwo"
              name="affinitySportTwo"
              autoComplete="off"
              type="text"
              label="Second Sport"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />
            <TextField
              id="affinitySportThree"
              name="affinitySportThree"
              autoComplete="off"
              type="text"
              label="Third Sport"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              size={"small"}
            />

            <h2>Greek Life</h2>
            <body1>
              If you are a member of any Greek Organizations, please indicate
              which one below.
            </body1>
            <TextField
              variant="outlined"
              name="greekLife"
              autoComplete="off"
              size={"small"}
              label="Greek Organization"
              className={classes.textField}
              fullWidth
              onChange={this.handleChange}
              InputProps={{
                endAdornment: greekLife,
                inputProps: {
                  list: "greekLife",
                },
              }}
            />

            <h2>Favorites</h2>
            <body1>
              Feel free to share your favorite book, movie, tv show, and artist
              below.
            </body1>
            <br />
            <span>
              <TextField
                id="book"
                name="favorites"
                type="text"
                label="Book"
                autoComplete="off"
                style={{ width: 150 }}
                className={classes.textField}
                value={this.state.favorites.book}
                onChange={this.handleFavorites}
                required
                size={"small"}
              />
              {"   "}
              <TextField
                id="movie"
                name="favorites"
                type="text"
                label="Movie"
                autoComplete="off"
                style={{ width: 150 }}
                className={classes.textField}
                value={this.state.favorites.movie}
                onChange={this.handleFavorites}
                required
                size={"small"}
              />
            </span>
            <span>
              <TextField
                id="tvShow"
                name="favorites"
                type="text"
                label="Show"
                autoComplete="off"
                style={{ width: 150 }}
                className={classes.textField}
                value={this.state.favorites.tvShow}
                onChange={this.handleFavorites}
                required
                size={"small"}
              />
              {"   "}
              <TextField
                id="artist"
                name="favorites"
                type="text"
                label="Artist/Band"
                autoComplete="off"
                style={{ width: 150 }}
                className={classes.textField}
                value={this.state.favorites.artist}
                onChange={this.handleFavorites}
                required
                size={"small"}
              />
            </span>

            <h2>Bio</h2>
            <body1>
              If there is anything else you would like to share, we would love
              for you to include it here.
            </body1>
            <br />
            <br />
            <TextField
              id="bio"
              name="bio"
              autoComplete="off"
              multiline
              onChange={this.handleChange}
              rows={4}
              variant="outlined"
              fullWidth
            />

            <h2>Courses</h2>
          </Grid>
          <Grid item sm />
        </Grid>
        <div align="center">
          <body>
            In order to give you access to the profiles of all of your
            classmates, we will need you to provide us with your current courses
            in the fields below.
          </body>
          <br />
          <body>
            The course code refers to the unique string identifier listed on C@B
            for the course (e.g. ECON 0110). Note: please include the space
            between the capital letters and the numbers and the 0 at the start
            of the numbers if it less than 1000.
          </body>
          <br />

          <body>
            The course name refers to the name listed on either C@B or Canvas
            for the course (e.g. Principles of Economics). Note: this name is
            just meant to help you easily recognize the class, so don't worry
            about formatting it in a particular way.
          </body>
        </div>
        <Grid container className={classes.form} align="center" spacing={2}>
          <Grid item sm>
            <h3>Course #1</h3>
            <TextField
              id="courseCode"
              name="courseCode"
              autoComplete="off"
              type="text"
              label="Course Code"
              className={classes.textField}
              helperText={errors.courseCode}
              error={errors.courseCode ? true : false}
              value={this.state.courseCode}
              onChange={this.handleCourseOne}
              size={"small"}
              required
              variant="outlined"
            />
            <TextField
              id="courseName"
              name="courseName"
              autoComplete="off"
              type="text"
              label="Course Name"
              className={classes.textField}
              value={this.state.courseName}
              onChange={this.handleCourseOne}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="courseColor"
              name="courseColor"
              autoComplete="off"
              select
              label="Course Color"
              className={classes.textField}
              value={this.state.courseColor}
              onChange={this.handleCourseOne}
              variant="outlined"
              size={"small"}
              helperText="Please select a course color"
            >
              {palette.map((color) => (
                <MenuItem key={color} value={color}>
                  <Typography
                    variant="h6"
                    style={{ backgroundColor: color, color: color }}
                  >
                    Color
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm>
            <h3>Course #2</h3>
            <TextField
              id="courseCode"
              name="courseCode"
              autoComplete="off"
              type="text"
              label="Course Code"
              className={classes.textField}
              helperText={errors.courseCode}
              error={errors.courseCode ? true : false}
              value={this.state.courseCode}
              onChange={this.handleCourseTwo}
              size={"small"}
              required
              variant="outlined"
            />
            <TextField
              id="courseName"
              name="courseName"
              autoComplete="off"
              type="text"
              label="Course Name"
              className={classes.textField}
              value={this.state.courseName}
              onChange={this.handleCourseTwo}
              fullWidth
              required
              size={"small"}
            />
            <TextField
              id="courseColor"
              name="courseColor"
              autoComplete="off"
              select
              label="Course Color"
              className={classes.textField}
              value={this.state.courseColor}
              onChange={this.handleCourseTwo}
              variant="outlined"
              size={"small"}
              helperText="Please select a course color"
            >
              {palette.map((color) => (
                <MenuItem key={color} value={color}>
                  <Typography
                    variant="h6"
                    style={{ backgroundColor: color, color: color }}
                  >
                    Color
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm>
            <h3>Course #3</h3>
            <TextField
              id="courseCode"
              name="courseCode"
              autoComplete="off"
              type="text"
              label="Course Code"
              className={classes.textField}
              helperText={errors.courseCode}
              error={errors.courseCode ? true : false}
              value={this.state.courseCode}
              onChange={this.handleCourseThree}
              size={"small"}
              variant="outlined"
            />
            <TextField
              id="courseName"
              name="courseName"
              autoComplete="off"
              type="text"
              label="Course Name"
              className={classes.textField}
              value={this.state.courseName}
              onChange={this.handleCourseThree}
              fullWidth
              size={"small"}
            />
            <TextField
              id="courseColor"
              name="courseColor"
              autoComplete="off"
              select
              label="Course Color"
              className={classes.textField}
              value={this.state.courseColor}
              onChange={this.handleCourseThree}
              variant="outlined"
              size={"small"}
              helperText="Please select a course color"
            >
              {palette.map((color) => (
                <MenuItem key={color} value={color}>
                  <Typography
                    variant="h6"
                    style={{ backgroundColor: color, color: color }}
                  >
                    Color
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm>
            <h3>Course #4</h3>
            <TextField
              id="courseCode"
              name="courseCode"
              autoComplete="off"
              type="text"
              label="Course Code"
              className={classes.textField}
              helperText={errors.courseCode}
              error={errors.courseCode ? true : false}
              value={this.state.courseCode}
              onChange={this.handleCourseFour}
              size={"small"}
              variant="outlined"
            />
            <TextField
              id="courseName"
              name="courseName"
              autoComplete="off"
              type="text"
              label="Course Name"
              className={classes.textField}
              value={this.state.courseName}
              onChange={this.handleCourseFour}
              fullWidth
              size={"small"}
            />
            <TextField
              id="courseColor"
              name="courseColor"
              autoComplete="off"
              select
              label="Course Color"
              className={classes.textField}
              value={this.state.courseColor}
              onChange={this.handleCourseFour}
              variant="outlined"
              size={"small"}
              helperText="Please select a course color"
            >
              {palette.map((color) => (
                <MenuItem key={color} value={color}>
                  <Typography
                    variant="h6"
                    style={{ backgroundColor: color, color: color }}
                  >
                    Color
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {!this.state.fifthCourse && (
            <Tooltip title="Add Fifth Course" placement="top">
              <IconButton onClick={this.handleFifthCourse}>
                <AddIcon color="secondary" />
              </IconButton>
            </Tooltip>
          )}

          {this.state.fifthCourse && (
            <Grid item sm>
              <h3>Course #5</h3>
              <TextField
                id="courseCode"
                name="courseCode"
                autoComplete="off"
                type="text"
                label="Course Code"
                className={classes.textField}
                helperText={errors.courseCode}
                error={errors.courseCode ? true : false}
                value={this.state.courseCode}
                onChange={this.handleCourseFive}
                size={"small"}
                variant="outlined"
              />
              <TextField
                id="courseName"
                name="courseName"
                autoComplete="off"
                type="text"
                label="Course Name"
                className={classes.textField}
                value={this.state.courseName}
                onChange={this.handleCourseFive}
                fullWidth
                size={"small"}
              />
              <TextField
                id="courseColor"
                name="courseColor"
                autoComplete="off"
                select
                label="Course Color"
                className={classes.textField}
                value={this.state.courseColor}
                onChange={this.handleCourseFive}
                variant="outlined"
                size={"small"}
                helperText="Please select a course color"
              >
                {palette.map((color) => (
                  <MenuItem key={color} value={color}>
                    <Typography
                      variant="h6"
                      style={{ backgroundColor: color, color: color }}
                    >
                      Color
                    </Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
        </Grid>
        <Grid container align="center">
          <Grid item sm />
          <Grid item sm>
            <h3>
              Thank you for taking the time to build your profile and welcome to
              UConnect!
            </h3>

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.Button}
              disabled={loading}
            >
              Create Profile
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>

            {!this.state.validProfile && (
              <Typography variant="body2" className={classes.customError}>
                Please fill out all required fields
              </Typography>
            )}
            <br />
            <br />
          </Grid>
          <Grid item sm />
        </Grid>
      </form>
    );
  }
}

profileBuild.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(profileBuild);

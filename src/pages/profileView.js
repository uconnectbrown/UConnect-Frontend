// Setup
import React, { Component } from "react";
import axios from "axios";
import { db, auth } from "../firebase";

// Components
import NavBar from "../components/NavBar";
import Interests from "../components/Interests.js";

// Resources
import profileViewState from "../resources/profileViewState";
import majorList from "../resources/majors";
import varsitySports from "../resources/varsitySports";
import greekLife from "../resources/greekLife";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import AddCircle from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoIcon from "@material-ui/icons/PhotoCamera";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dots from "@material-ui/icons/MoreHoriz";
import Book from "@material-ui/icons/MenuBook";
import Movie from "@material-ui/icons/Movie";
import Tv from "@material-ui/icons/Tv";
import Music from "@material-ui/icons/MusicNote";
import Pets from "@material-ui/icons/Pets";
import Sports from "@material-ui/icons/SportsBasketball";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

// Tab Setup
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Body
class profileView extends Component {
  constructor() {
    super();
    this.state = profileViewState;
  }

  componentDidMount() {
    db.doc(`/profiles/${auth.currentUser.email.split("@")[0]}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return this.props.history.push({
            pathname: "/profileBuild",
            state: { validRoute: true },
          });
        } else if (doc.data().firstTime) {
          this.setState({ firstTime: true });
        }
      })
      .then(() => {
        this.loadUserData();
      })
      .catch((err) => console.log(err));
  }

  loadUserData = () => {
    let emailId = auth.currentUser.email.split("@")[0];
    axios
      .get(`/user/${emailId}`)
      .then((res) => {
        this.setState(
          {
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
            course1: res.data.user.courses[0],
            course2: res.data.user.courses[1],
            course3: res.data.user.courses[2],
            course4: res.data.user.courses[3],
            course5: res.data.user.courses[4],
            imageUrl: res.data.user.imageUrl,
            // Required edits
            firstName_: res.data.user.firstName,
            lastName_: res.data.user.lastName,
            classYear_: res.data.user.classYear,
            major1_: res.data.user.majors[0],
            major2_: res.data.user.majors[1],
            major3_: res.data.user.majors[2],
            preferredPronouns_: res.data.user.preferredPronouns,
            // Optional
            bio: res.data.user.bio,
            greekLife: res.data.user.greekLife,
            // Optional edits
            bio_: res.data.user.bio,
            greekLife_: res.data.user.greekLife,

            // affinitySportOne: res.data.user.affinitySports[0],
            // affinitySportTwo: res.data.user.affinitySports[1],
            // affinitySportThree: res.data.user.affinitySports[2],
            // affinitySport1: res.data.user.affinitySports[0],
            // affinitySport2: res.data.user.affinitySports[1],
            // affinitySport3: res.data.user.affinitySports[2],
            // createdAt: res.data.user.createdAt,
            // email: res.data.user.email,
            // favoriteBook: res.data.user.favorites.book,
            // favoriteMovie: res.data.user.favorites.movie,
            // favoriteShow: res.data.user.favorites.tvShow,
            // favoriteArtist: res.data.user.favorites.artist,
            // favBook: res.data.user.favorites.book,
            // favMovie: res.data.user.favorites.movie,
            // favShow: res.data.user.favorites.tvShow,
            // favArtist: res.data.user.favorites.artist,

            // firstName_: res.data.user.firstName,

            // imageUrl: res.data.user.imageUrl,

            // userId: res.data.user.userId,

            loading: false,
          }

          // () => {
          //   // return this.updateCourses();
          // }
        );
        if (res.data.user.varsitySports) {
          this.setState({
            varsitySport1: res.data.user.varsitySports[0],
            varsitySport2: res.data.user.varsitySports[1],
            varsitySport1_: res.data.user.varsitySports[0],
            varsitySport2_: res.data.user.varsitySports[1],
          });
        }
        if (res.data.user.groups) {
          this.setState({
            group1: res.data.user.groups[0],
            group2: res.data.user.groups[1],
            group3: res.data.user.groups[2],
            group1_: res.data.user.groups[0],
            group2_: res.data.user.groups[1],
            group3_: res.data.user.groups[2],
          });
        }

        if (res.data.user.pickUpSports) {
          this.setState({
            pickUpSport1: res.data.user.pickUpSports[0],
            pickUpSport2: res.data.user.pickUpSports[1],
            pickUpSport3: res.data.user.pickUpSports[2],
            pickUpSport1_: res.data.user.pickUpSports[0],
            pickUpSport2_: res.data.user.pickUpSports[1],
            pickUpSport3_: res.data.user.pickUpSports[2],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleTabChange = (event, value) => {
    this.setState({ tabIndex: value });
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleImageChange = (event) => {
    event.preventDefault();
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    axios
      .post(`/image/${auth.currentUser.email}`, formData)
      .then((data) => {
        this.setState({ imageUrl: data.data.imageUrl, imageOpen: true }, () => {
          this.updateCourses();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sameBasic = () => {
    if (
      this.state.firstName === this.state.firstName_ &&
      this.state.lastName === this.state.lastName_ &&
      this.state.classYear === this.state.classYear_ &&
      this.state.major1 === this.state.major1_ &&
      this.state.major2 === this.state.major2_ &&
      this.state.major3 === this.state.major3_ &&
      this.state.preferredPronouns === this.state.preferredPronouns_
    ) {
      return true;
    }
  };

  handleBasicOpen = () => {
    this.setState({ basicOpen: true });
  };

  handleBasicClose = () => {
    this.setState({
      firstName_: this.state.firstName,
      lastName_: this.state.lastName,
      classYear_: this.state.classYear,
      major1_: this.state.major1,
      major2_: this.state.major2,
      major3_: this.state.major3,
      preferredPronouns_: this.state.preferredPronouns,
      basicOpen: false,
    });
  };

  handleSubmitBasic = () => {
    let newBasicInfo = {
      firstName: this.state.firstName_,
      lastName: this.state.lastName_,
      preferredPronouns: this.state.preferredPronouns_,
      classYear: this.state.classYear_,
      majors: [this.state.major1_, this.state.major2_, this.state.major3_],
    };
    axios
      .post(`/edit/${auth.currentUser.email}`, newBasicInfo)
      .then(() => {
        this.setState(
          {
            firstName: newBasicInfo["firstName"],
            lastName: newBasicInfo["lastName"],
            preferredPronouns: newBasicInfo["preferredPronouns"],
            classYear: newBasicInfo["classYear"],
            major1: newBasicInfo["majors"][0],
            major2: newBasicInfo["majors"][1],
            major3: newBasicInfo["majors"][2],
          }
          // () => {
          //   this.updateCourses();
          // }
        );
      })
      .catch((err) => console.log(err));
    this.setState({ basicOpen: false });
  };

  handleSubmitBio = () => {
    let newBio = {
      bio: this.state.bio_,
    };
    axios.post(`/edit/${auth.currentUser.email}`, newBio).then(() => {
      this.setState(
        {
          bio: newBio["bio"],
        }
        // () => {
        //   this.updateCourses();
        // }
      );
    });
    this.setState({ bioOpen: false });
  };

  handleBioClose = () => {
    this.setState({
      bioOpen: false,
      bio_: this.state.bio,
    });
  };

  handleGroupsOpen = () => {
    this.setState({ groupsOpen: true });
  };

  handleSubmitGroups = () => {
    let groupList = [
      this.state.group1_,
      this.state.group2_,
      this.state.group3_,
    ];
    let newGroups = {
      groups: groupList,
    };
    axios.post(`/edit/${auth.currentUser.email}`, newGroups).then(() => {
      this.setState(
        {
          group1: groupList[0],
          group2: groupList[1],
          group3: groupList[2],
        }
        // () => {
        //   this.updateCourses();
        // }
      );
    });
    this.setState({ groupsOpen: false });
  };

  handleGroupsClose = () => {
    this.setState({
      groupsOpen: false,
      group1_: this.state.group1,
      group2_: this.state.group2,
      group3_: this.state.group3,
    });
  };

  handleVarsityOpen = () => {
    this.setState({ varsityOpen: true });
  };

  handleSubmitVarsity = () => {
    let varsityList = [this.state.varsitySport1_, this.state.varsitySport2_];
    let newVarsity = {
      varsitySports: varsityList,
    };
    axios.post(`/edit/${auth.currentUser.email}`, newVarsity).then(() => {
      this.setState(
        {
          varsitySport1: varsityList[0],
          varsitySport2: varsityList[1],
        }
        // () => {
        //   this.updateCourses();
        // }
      );
    });
    this.setState({ varsityOpen: false });
  };

  handleVarsityClose = () => {
    this.setState({
      varsityOpen: false,
      varsitySport1_: this.state.varsitySport1,
      varsitySport2_: this.state.varsitySport2,
    });
  };

  handleGreekOpen = () => {
    this.setState({ greekOpen: true });
  };

  handleSubmitGreek = () => {
    let newGreek = {
      greekLife: this.state.greekLife_,
    };
    axios.post(`/edit/${auth.currentUser.email}`, newGreek).then(() => {
      this.setState(
        {
          greekLife: newGreek["greekLife"],
        }
        // () => {
        //   this.updateCourses();
        // }
      );
    });
    this.setState({ greekOpen: false });
  };

  handleGreekClose = () => {
    this.setState({
      greekOpen: false,
      greekLife_: this.state.greekLife,
    });
  };

  handleInterestsOpen = () => {
    this.setState({ interestsOpen: true });
  };

  handleInterests = (i1, i2, i3) => {
    this.setState({ interests1_: i1, interests2_: i2, interests3_: i3 });
  };

  handleSubmitInterests = () => {
    let interestsList = {
      interests1: this.state.interests1_,
      interests2: this.state.interests2_,
      interests3: this.state.interests3_,
    };
    console.log(interestsList);
    axios
      .post(`/edit/${auth.currentUser.email}`, interestsList)
      .then(() => {
        this.setState(
          {
            interests1: interestsList.interests1,
            interests2: interestsList.interests2,
            interests3: interestsList.interests3,
          }
          // () => {
          //   this.updateCourses();
          // }
        );
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      interestsOpen: false,
      interests1_: [],
      interests2_: [],
      interests3_: [],
    });
  };

  handleInterestsClose = () => {
    this.setState({
      interestsOpen: false,
      interests1_: [],
      interests2_: [],
      interests3_: [],
    });
  };

  updateCourses = () => {
    axios
      .get(`/update/${auth.currentUser.email}`)
      .then(() => {
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleImageClose = () => {
    this.setState({ imageOpen: false });
  };
  // handleCropImage = (croppedImage) => {
  //   const image = croppedImage;
  //   const formData = new FormData();
  //   formData.append("image", image, image.name);
  //   axios
  //     .post("/image", formData)
  //     .then((data) => {
  //       this.setState({ imageUrl: data.data.imageUrl });

  //       // new test code
  //       this.setState({ imageOpen: true });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  handleAddOpen = () => {
    this.setState({ addOpen: true });
  };

  handleFavoritesOpen = () => {
    this.setState({ favoritesOpen: true });
  };

  handleBioOpen = () => {
    this.setState({ bioOpen: true });
  };

  handleColorOpen = (index) => {
    let newColorOpen = this.state.colorOpen.slice();
    newColorOpen[index] = true;
    this.setState({ colorOpen: newColorOpen });

    // this.setState(update(this.state, {
    //   courseColor: {
    //     [index]: {
    //       $set: true
    //     }
    //   }
    // }))
  };
  handleColorOpen0 = () => {
    this.setState({ colorOpen0: true });
  };
  handleColorOpen1 = () => {
    this.setState({ colorOpen1: true });
  };
  handleColorOpen2 = () => {
    this.setState({ colorOpen2: true });
  };
  handleColorOpen3 = () => {
    this.setState({ colorOpen3: true });
  };
  handleColorOpen4 = () => {
    this.setState({ colorOpen4: true });
  };

  handleRemoveOpen = (deleteIndex) => {
    this.setState({ removeOpen: true });
    let courseList = [];
    let deleteCourse = {};
    for (let i = 0; i < 5; i++) {
      if (i === deleteIndex) {
        courseList.push({ courseCode: "", courseName: "", courseColor: "" });
        deleteCourse = this.state.courses[i].courseCode.replace(/\s/g, "");
      } else courseList.push(this.state.courses[i]);
    }
    let newCourses = { courses: courseList };
    axios.post(`/edit/${auth.currentUser.email}`, newCourses).then(() => {
      this.setState({ courses: courseList }, () => {
        this.updateCourses();
      });
    });
    axios
      .get(`/delete/${auth.currentUser.email}/${deleteCourse}`)
      .then(() => {})
      .catch((err) => console.log(err));
    this.setState({ removeOpen: false });
  };

  handleAddClose = () => {
    this.setState({ addOpen: false });
  };
  handleRemoveClose = () => {
    this.setState({ removeOpen: false });
  };

  handleFavoritesClose = () => {
    this.setState({
      favoritesOpen: false,
      favoriteBook: this.state.favBook,
      favoriteMovie: this.state.favMovie,
      favoriteShow: this.state.favShow,
      favoriteArtist: this.state.favArtist,
    });
  };

  handleColorClose = () => {
    this.setState({
      colorOpen: [false, false, false, false, false],
    });
  };
  handleColorClose0 = () => {
    this.setState({
      colorOpen0: false,
    });
  };
  handleColorClose1 = () => {
    this.setState({
      colorOpen1: false,
    });
  };
  handleColorClose2 = () => {
    this.setState({
      colorOpen2: false,
    });
  };
  handleColorClose3 = () => {
    this.setState({
      colorOpen3: false,
    });
  };
  handleColorClose4 = () => {
    this.setState({
      colorOpen4: false,
    });
  };

  handleSubmitCourses = () => {
    let firstIndex;
    let courseList = [];
    for (let i = 0; i < 5; i++) {
      if (!this.state.courses[i].courseCode) {
        firstIndex = i;
        break;
      }
    }
    let newCourse = {
      courseCode: this.state.addCourseCode,
      courseName: this.state.addCourseName,
      courseColor: this.state.addCourseColor,
      assignments: [],
    };
    for (let j = 0; j < 5; j++) {
      if (j !== firstIndex) {
        courseList.push(this.state.courses[j]);
      } else courseList.push(newCourse);
    }
    let newCourses = { courses: courseList };
    axios.post(`/edit/${auth.currentUser.email}`, newCourses).then(() => {
      this.setState({ courses: courseList }, () => {
        this.updateCourses();
      });
    });
    this.setState({ addOpen: false });
  };

  handleColorSave = (index) => {
    let courseList = [];
    let newCourse = {
      courseCode: this.state.courses[index].courseCode,
      courseName: this.state.courses[index].courseName,
      courseColor: this.state.courseColor,
      assignments: this.state.courses[index].assignments,
    };
    for (let j = 0; j < 5; j++) {
      if (j !== index) {
        courseList.push(this.state.courses[j]);
      } else courseList.push(newCourse);
    }
    let newCourses = { courses: courseList };
    axios.post(`/edit/${auth.currentUser.email}`, newCourses).then(() => {
      this.setState({ courses: courseList }, () => {
        this.updateCourses();
      });
    });
    this.setState({ colorOpen: [false, false, false, false, false] });
  };

  handleSubmitFavorites = () => {
    this.setState({
      favBook: this.state.favoriteBook,
      favMovie: this.state.favoriteMovie,
      favShow: this.state.favoriteShow,
      favArtist: this.state.favoriteArtist,
    });
    let favorites = {
      book: this.state.favoriteBook,
      movie: this.state.favoriteMovie,
      tvShow: this.state.favoriteShow,
      artist: this.state.favoriteArtist,
    };
    let newFavorites = {
      favorites: favorites,
    };
    axios.post(`/edit/${auth.currentUser.email}`, newFavorites).then(() => {
      this.setState({
        favoriteBook: favorites["book"],
        favoriteMovie: favorites["movie"],
        favoriteShow: favorites["tvShow"],
        favoriteArtist: favorites["artist"],
      });
    });
    this.setState({ favoritesOpen: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // handleColorChange0 = (event) => {
  //   this.setState({ courseColor0: event.target.value })
  // }
  // handleColorChange1 = (event) => {
  //   this.setState({ courseColor1: event.target.value })
  // }
  // handleColorChange2 = (event) => {
  //   this.setState({ courseColor2: event.target.value })
  // }
  // handleColorChange3 = (event) => {
  //   this.setState({ courseColor3: event.target.value })
  // }
  // handleColorChange4 = (event) => {
  //   this.setState({ courseColor4: event.target.value })
  // }

  toggleDelete = () => {
    this.setState({ delete: !this.state.delete });
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
    let loading = this.state.loading;
    let code1 = this.state.course1.code;
    let code2 = this.state.course2.code;
    let code3 = this.state.course3.code;
    let code4 = this.state.course4.code;
    let code5 = this.state.course5.code;
    let numCourses = [code1, code2, code3, code4, code5].filter(Boolean).length;
    let indexArray = [];
    // for (let j = 0; j < 5; j++) {
    //   if (this.state.courses[j].courseCode) {
    //     indexArray.push(j);
    //   }
    // }

    return (
      <div>
        {loading && (
          <div align="center">
            <NavBar />
            <br />
            <CircularProgress size={100} />
            <br />
            <br />
            <Typography variant="h4">Fetching user data...</Typography>
          </div>
        )}
        {!loading && (
          <div align="center">
            <AppBar position="relative" color="default">
              <Tabs
                value={this.state.tabIndex}
                onChange={this.handleTabChange}
                aria-label="simple tabs example"
                indicatorColor="primary"
                variant="fullWidth"
              >
                <Tab icon={<EditIcon />} {...a11yProps(0)} />
                <Tab icon={<VisibilityIcon />} {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={this.state.tabIndex} index={0}>
              <Card raised>
                <CardContent align="center">
                  <Grid container spacing={1}>
                    <Grid item sm>
                      {/* <img
              alt="Profile"
              src={this.state.imageUrl}
              style={{
                width: 375,
                height: 375,
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
            <Tooltip title="Edit profile picture" placement="right">
              <IconButton onClick={this.handleEditPicture} className="button">
                <PhotoIcon color="secondary" />
              </IconButton>
            </Tooltip>
            {this.state.imageUrl === "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media" && (
              <div>
                <Typography variant="h5" align="center" color="primary">Please add an image to complete your profile.</Typography>
              </div>
            )} */}
                    </Grid>
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
                      <input
                        type="file"
                        id="imageInput"
                        hidden="hidden"
                        onChange={this.handleImageChange}
                      />
                      <br />
                      <Tooltip title="Edit profile picture" placement="right">
                        <IconButton
                          onClick={this.handleEditPicture}
                          className="button"
                        >
                          <PhotoIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                      {this.state.imageUrl ===
                        "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media" && (
                        <div>
                          <Typography
                            variant="h5"
                            align="center"
                            color="primary"
                          >
                            Please add an image to complete your profile.
                          </Typography>
                        </div>
                      )}
                    </Grid>
                    <Grid item sm>
                      {/* <img
              alt="Profile"
              src={this.state.imageUrl}
              style={{
                width: 375,
                height: 375,
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
            <Tooltip title="Edit profile picture" placement="right">
              <IconButton onClick={this.handleEditPicture} className="button">
                <PhotoIcon color="secondary" />
              </IconButton>
            </Tooltip>
            {this.state.imageUrl === "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media" && (
              <div>
                <Typography variant="h5" align="center" color="primary">Please add an image to complete your profile.</Typography>
              </div>
            )} */}
                    </Grid>
                  </Grid>

                  {/* new test code */}
                  {/* <Dialog
                  overlayStyle={{ backgroundColor: "transparent" }}
                  open={this.state.imageOpen}
                >
                  <DialogTitle
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                  >
                    Crop Image
                  </DialogTitle>
                  <DialogContent style={{ height: "600px", width: "600px" }}>
                    <Crop img={this.state.imageUrl} />
                    <MyEditor />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      // onClick={this.handleCropImage}
                      onClick={this.handleImageClose}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog> */}
                  <br />
                  <Card raised style={{ display: "inline-block" }}>
                    <CardContent>
                      <span>
                        <Typography variant="h3" align="center">
                          {this.state.firstName} {this.state.lastName}{" "}
                          <Tooltip title="Edit basic info" placement="right">
                            <IconButton
                              onClick={this.handleBasicOpen}
                              className="button"
                            >
                              <EditIcon color="secondary" />
                            </IconButton>
                          </Tooltip>
                          <Dialog
                            overlayStyle={{ backgroundColor: "transparent" }}
                            open={this.state.basicOpen}
                          >
                            <DialogTitle
                              style={{ cursor: "move" }}
                              id="draggable-dialog-title"
                            >
                              Edit Basic Info
                            </DialogTitle>
                            <DialogContent>
                              <TextField
                                autofocus
                                margin="dense"
                                id="firstName_"
                                autoComplete="off"
                                name="firstName_"
                                label="First Name"
                                defaultValue={this.state.firstName}
                                required
                                fullWidth
                                type="text"
                                onChange={this.handleChange}
                              />
                              <TextField
                                autofocus
                                margin="dense"
                                id="lastName_"
                                autoComplete="off"
                                name="lastName_"
                                label="Last Name"
                                defaultValue={this.state.lastName}
                                required
                                fullWidth
                                type="text"
                                onChange={this.handleChange}
                              />
                              <TextField
                                autofocus
                                margin="dense"
                                id="preferredPronouns_"
                                name="preferredPronouns_"
                                select
                                fullWidth
                                label="Preferred Pronouns"
                                defaultValue={this.state.preferredPronouns}
                                onChange={this.handleChange}
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
                              <TextField
                                autofocus
                                margin="dense"
                                id="classYear_"
                                name="classYear_"
                                select
                                label="Graduating Class"
                                defaultValue={this.state.classYear}
                                onChange={this.handleChange}
                                required
                                fullWidth
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
                              <TextField
                                autofocus
                                margin="dense"
                                id="major1_"
                                name="major1_"
                                autoComplete="off"
                                label="First Concentration"
                                defaultValue={this.state.major1}
                                fullWidth
                                required
                                onChange={this.handleChange}
                                InputProps={{
                                  endAdornment: majorList,
                                  inputProps: {
                                    list: "majors",
                                  },
                                }}
                              />
                              <TextField
                                autofocus
                                margin="dense"
                                name="major2_"
                                name="major2_"
                                autoComplete="off"
                                label="Second Concentration"
                                defaultValue={this.state.major2}
                                fullWidth
                                onChange={this.handleChange}
                                InputProps={{
                                  endAdornment: majorList,
                                  inputProps: {
                                    list: "majors",
                                  },
                                }}
                              />
                              <TextField
                                autofocus
                                margin="dense"
                                id="major3_"
                                name="major3_"
                                autoComplete="off"
                                label="Third Concentration"
                                defaultValue={this.state.major3}
                                fullWidth
                                onChange={this.handleChange}
                                InputProps={{
                                  endAdornment: majorList,
                                  inputProps: {
                                    list: "majors",
                                  },
                                }}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={this.handleBasicClose}
                                color="secondary"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={this.handleSubmitBasic}
                                color="secondary"
                                disabled={
                                  this.state.firstName_ === "" ||
                                  this.state.lastName_ === "" ||
                                  this.state.major1_ === "" ||
                                  this.state.classYear_ === "" ||
                                  this.sameBasic()
                                }
                              >
                                Save Changes
                              </Button>
                            </DialogActions>
                          </Dialog>
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
                  {!this.state.bio && (
                    <div>
                      <br />
                      <Button
                        color="secondary"
                        variant="outlined"
                        onClick={this.handleBioOpen}
                      >
                        Add Bio
                      </Button>
                    </div>
                  )}
                  {this.state.bio && (
                    <Card raised style={{ display: "inline-block" }}>
                      <CardContent>
                        <span>
                          <Typography variant="h4" align="center">
                            Bio
                            <Tooltip title="Edit bio" placement="right">
                              <IconButton
                                onClick={this.handleBioOpen}
                                className="button"
                              >
                                <EditIcon color="secondary" />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </span>
                        {this.state.bio}{" "}
                      </CardContent>
                    </Card>
                  )}

                  <Dialog
                    overlayStyle={{ backgroundColor: "transparent" }}
                    open={this.state.bioOpen}
                    fullWidth
                  >
                    <DialogTitle
                      style={{ cursor: "move" }}
                      id="draggable-dialog-title"
                    >
                      Edit Bio
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        autofocus
                        margin="dense"
                        id="bio_"
                        name="bio_"
                        label="Bio"
                        defaultValue={this.state.bio}
                        multiline
                        onChange={this.handleChange}
                        rows={2}
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleBioClose} color="secondary">
                        Cancel
                      </Button>
                      <Button
                        onClick={this.handleSubmitBio}
                        color="secondary"
                        disabled={this.state.bio_ === this.state.bio}
                      >
                        Save Changes
                      </Button>
                    </DialogActions>
                  </Dialog>
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
                          <div>
                            <span>
                              <Typography variant="h5">
                                Groups
                                {[
                                  this.state.group1,
                                  this.state.group2,
                                  this.state.group3,
                                ].filter(Boolean).length > 0 && (
                                  <Tooltip
                                    title="Edit groups"
                                    placement="right"
                                  >
                                    <IconButton
                                      onClick={this.handleGroupsOpen}
                                      className="button"
                                      style={{
                                        marginTop: "-10px",
                                        marginBottom: "-10px",
                                      }}
                                    >
                                      <EditIcon color="secondary" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Typography>
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
                            {!this.state.group1 &&
                              !this.state.group2 &&
                              !this.state.group3 && (
                                <Tooltip title="Add group" placement="right">
                                  <IconButton
                                    onClick={this.handleGroupsOpen}
                                    className="button"
                                    style={{
                                      marginTop: "-10px",
                                      marginBottom: "-10px",
                                    }}
                                  >
                                    <AddCircle color="secondary" />
                                  </IconButton>
                                </Tooltip>
                              )}
                          </div>
                          <Dialog
                            overlayStyle={{ backgroundColor: "transparent" }}
                            open={this.state.groupsOpen}
                          >
                            <DialogTitle
                              style={{ cursor: "move" }}
                              id="draggable-dialog-title"
                            >
                              Edit Groups
                            </DialogTitle>
                            <DialogContent>
                              <Typography>
                                Please list up to 3 clubs, affinity groups, or
                                student organizations you are involved with.
                              </Typography>
                              <TextField
                                autofocus
                                margin="dense"
                                id="group1_"
                                autoComplete="off"
                                name="group1_"
                                label="Group 1"
                                defaultValue={this.state.group1}
                                fullWidth
                                type="text"
                                onChange={this.handleChange}
                              />
                              <TextField
                                autofocus
                                margin="dense"
                                id="group2_"
                                autoComplete="off"
                                name="group2_"
                                label="Group 2"
                                defaultValue={this.state.group2}
                                fullWidth
                                type="text"
                                onChange={this.handleChange}
                              />
                              <TextField
                                autofocus
                                margin="dense"
                                id="group3_"
                                autoComplete="off"
                                name="group3_"
                                label="Group 3"
                                defaultValue={this.state.group3}
                                fullWidth
                                type="text"
                                onChange={this.handleChange}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={this.handleGroupsClose}
                                color="secondary"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={this.handleSubmitGroups}
                                color="secondary"
                              >
                                Save Changes
                              </Button>
                            </DialogActions>
                          </Dialog>
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
                              <Typography variant="h5">
                                Varsity Sports
                                {[
                                  this.state.varsitySport1,
                                  this.state.varsitySport2,
                                ].filter(Boolean).length > 0 && (
                                  <Tooltip
                                    title="Edit varsity sports"
                                    placement="right"
                                  >
                                    <IconButton
                                      onClick={this.handleVarsityOpen}
                                      className="button"
                                      style={{
                                        marginTop: "-10px",
                                        marginBottom: "-10px",
                                      }}
                                    >
                                      <EditIcon color="secondary" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Typography>
                            </span>
                            <br />
                            {this.state.varsitySport1 && (
                              <Typography>
                                • {this.state.varsitySport1}
                              </Typography>
                            )}
                            {this.state.varsitySport2 && (
                              <Typography>
                                • {this.state.varsitySport2}
                              </Typography>
                            )}

                            {!this.state.varsitySport1 &&
                              !this.state.varsitySport2 && (
                                <Tooltip
                                  title="Add varsity sport"
                                  placement="right"
                                >
                                  <IconButton
                                    onClick={this.handleVarsityOpen}
                                    className="button"
                                    style={{
                                      marginTop: "-10px",
                                      marginBottom: "-10px",
                                    }}
                                  >
                                    <AddCircle color="secondary" />
                                  </IconButton>
                                </Tooltip>
                              )}
                          </div>
                          <Dialog
                            overlayStyle={{ backgroundColor: "transparent" }}
                            open={this.state.varsityOpen}
                          >
                            <DialogTitle
                              style={{ cursor: "move" }}
                              id="draggable-dialog-title"
                            >
                              Edit Varsity Sports
                            </DialogTitle>
                            <DialogContent>
                              <Typography>
                                If you are a member of any varsity sports teams,
                                please indicate which ones below.
                              </Typography>
                              <TextField
                                autofocus
                                margin="dense"
                                name="varsitySport1_"
                                autoComplete="off"
                                label="First Varsity Sport"
                                defaultValue={this.state.varsitySport1}
                                fullWidth
                                onChange={this.handleChange}
                                InputProps={{
                                  endAdornment: varsitySports,
                                  inputProps: {
                                    list: "varsitySports",
                                  },
                                }}
                              />
                              <TextField
                                autofocus
                                margin="dense"
                                name="varsitySport2_"
                                autoComplete="off"
                                label="Second Varsity Sport"
                                defaultValue={this.state.varsitySport2}
                                fullWidth
                                onChange={this.handleChange}
                                InputProps={{
                                  endAdornment: varsitySports,
                                  inputProps: {
                                    list: "varsitySports",
                                  },
                                }}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={this.handleVarsityClose}
                                color="secondary"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={this.handleSubmitVarsity}
                                color="secondary"
                              >
                                Save Changes
                              </Button>
                            </DialogActions>
                          </Dialog>
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
                              <Typography variant="h5">
                                Greek Organization
                                {[this.state.greekLife].filter(Boolean).length >
                                  0 && (
                                  <Tooltip
                                    title="Edit Greek organization"
                                    placement="right"
                                  >
                                    <IconButton
                                      onClick={this.handleGreekOpen}
                                      className="button"
                                      style={{
                                        marginTop: "-10px",
                                        marginBottom: "-10px",
                                      }}
                                    >
                                      <EditIcon color="secondary" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Typography>
                            </span>
                            <br />
                            {this.state.greekLife && (
                              <Typography>• {this.state.greekLife}</Typography>
                            )}

                            {!this.state.greekLife && (
                              <Tooltip
                                title="Add Greek organization"
                                placement="right"
                              >
                                <IconButton
                                  onClick={this.handleGreekOpen}
                                  className="button"
                                  style={{
                                    marginTop: "-10px",
                                    marginBottom: "-10px",
                                  }}
                                >
                                  <AddCircle color="secondary" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </div>
                          <Dialog
                            overlayStyle={{ backgroundColor: "transparent" }}
                            open={this.state.greekOpen}
                          >
                            <DialogTitle
                              style={{ cursor: "move" }}
                              id="draggable-dialog-title"
                            >
                              Edit Greek Organization
                            </DialogTitle>
                            <DialogContent>
                              <Typography>
                                If you are a member of any Greek Organizations,
                                please indicate which one below.
                              </Typography>
                              <TextField
                                autofocus
                                margin="dense"
                                name="greekLife_"
                                autoComplete="off"
                                label="Greek Organization"
                                defaultValue={this.state.greekLife}
                                fullWidth
                                onChange={this.handleChange}
                                InputProps={{
                                  endAdornment: greekLife,
                                  inputProps: {
                                    list: "greekLife",
                                  },
                                }}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={this.handleGreekClose}
                                color="secondary"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={this.handleSubmitGreek}
                                color="secondary"
                              >
                                Save Changes
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <br />
              <Card raised>
                <CardContent align="center">
                  <Typography variant="h3">
                    Interests{" "}
                    <Tooltip title="Edit interests" placement="right">
                      <IconButton
                        className="button"
                        onClick={this.handleInterestsOpen}
                      >
                        <EditIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                    <Dialog
                      overlayStyle={{ backgroundColor: "transparent" }}
                      open={this.state.interestsOpen}
                    >
                      <DialogTitle
                        style={{ cursor: "move" }}
                        id="draggable-dialog-title"
                      >
                        Edit Interests
                      </DialogTitle>
                      <DialogContent>
                        <Interests getInterests={this.handleInterests} />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={this.handleInterestsClose}
                          color="secondary"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={this.handleSubmitInterests}
                          color="secondary"
                          disabled={
                            this.state.interests1_.length +
                              this.state.interests2_.length +
                              this.state.interests3_.length !==
                            10
                          }
                        >
                          Save Changes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Typography>
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
                      <Grid container>
                        <Grid item sm>
                          <div>
                            <Music />
                            <span>
                              <Typography variant="h6">
                                Instruments
                                {[
                                  this.state.instrument1,
                                  this.state.instrument2,
                                  this.state.instrument3,
                                ].filter(Boolean).length > 0 && (
                                  <Tooltip
                                    title="Edit instruments"
                                    placement="right"
                                  >
                                    <IconButton
                                      onClick={this.handleInstrumentsOpen}
                                      className="button"
                                      style={{
                                        marginTop: "-10px",
                                        marginBottom: "-10px",
                                      }}
                                    >
                                      <EditIcon color="secondary" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Typography>
                            </span>
                            <br />
                            {this.state.instrument1 && (
                              <Typography>
                                • {this.state.instrument1}
                              </Typography>
                            )}
                            {this.state.instrument2 && (
                              <Typography>
                                • {this.state.instrument2}
                              </Typography>
                            )}
                            {this.state.instrument3 && (
                              <Typography>
                                • {this.state.instrument3}
                              </Typography>
                            )}
                            {!this.state.instrument1 &&
                              !this.state.instrument2 &&
                              !this.state.instrument3 && (
                                <Tooltip
                                  title="Add instrument"
                                  placement="right"
                                >
                                  <IconButton
                                    onClick={this.handleInstrumentsOpen}
                                    className="button"
                                    style={{
                                      marginTop: "-10px",
                                      marginBottom: "-10px",
                                    }}
                                  >
                                    <AddCircle color="secondary" />
                                  </IconButton>
                                </Tooltip>
                              )}
                          </div>
                        </Grid>
                        <Grid item sm>
                          <div>
                            <Sports />
                            <span>
                              <Typography variant="h6">
                                Pick-Up Sports
                                {[
                                  this.state.pickUpSport1,
                                  this.state.pickUpSport2,
                                  this.state.pickUpSport3,
                                ].filter(Boolean).length > 0 && (
                                  <Tooltip
                                    title="Edit pick up sports"
                                    placement="right"
                                  >
                                    <IconButton
                                      onClick={this.handlePickUpOpen}
                                      className="button"
                                      style={{
                                        marginTop: "-10px",
                                        marginBottom: "-10px",
                                      }}
                                    >
                                      <EditIcon color="secondary" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Typography>
                            </span>
                            <br />
                            {this.state.pickUpSport1 && (
                              <Typography>
                                • {this.state.pickUpSport1}
                              </Typography>
                            )}
                            {this.state.pickUpSport2 && (
                              <Typography>
                                • {this.state.pickUpSport2}
                              </Typography>
                            )}
                            {this.state.pickUpSport3 && (
                              <Typography>
                                • {this.state.pickUpSport3}
                              </Typography>
                            )}
                            {!this.state.pickUpSport1 &&
                              !this.state.pickUpSport2 &&
                              !this.state.pickUpSport3 && (
                                <Tooltip
                                  title="Add pick up sport"
                                  placement="right"
                                >
                                  <IconButton
                                    onClick={this.handlePickUpOpen}
                                    className="button"
                                    style={{
                                      marginTop: "-10px",
                                      marginBottom: "-10px",
                                    }}
                                  >
                                    <AddCircle color="secondary" />
                                  </IconButton>
                                </Tooltip>
                              )}
                          </div>
                        </Grid>
                        <Grid item sm>
                          <div>
                            <Pets />
                            <span>
                              <Typography variant="h6">
                                Pets
                                {[
                                  this.state.pet1,
                                  this.state.pet2,
                                  this.state.pet3,
                                ].filter(Boolean).length > 0 && (
                                  <Tooltip title="Edit pets" placement="right">
                                    <IconButton
                                      onClick={this.handlePetsOpen}
                                      className="button"
                                      style={{
                                        marginTop: "-10px",
                                        marginBottom: "-10px",
                                      }}
                                    >
                                      <EditIcon color="secondary" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Typography>
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
                            {!this.state.pet1 &&
                              !this.state.pet2 &&
                              !this.state.pet3 && (
                                <Tooltip title="Add pet" placement="right">
                                  <IconButton
                                    onClick={this.handlePetsOpen}
                                    className="button"
                                    style={{
                                      marginTop: "-10px",
                                      marginBottom: "-10px",
                                    }}
                                  >
                                    <AddCircle color="secondary" />
                                  </IconButton>
                                </Tooltip>
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
                  <Typography variant="h3">
                    Favorites{" "}
                    <Tooltip title="Edit favorites" placement="right">
                      <IconButton
                        onClick={this.handleFavoritesOpen}
                        className="button"
                      >
                        <EditIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                    <Dialog
                      overlayStyle={{ backgroundColor: "transparent" }}
                      open={this.state.favoritesOpen}
                    >
                      <DialogTitle
                        style={{ cursor: "move" }}
                        id="draggable-dialog-title"
                      >
                        Edit Favorites
                      </DialogTitle>
                      <DialogContent>
                        <TextField
                          autofocus
                          margin="dense"
                          id="favoriteBook"
                          name="favoriteBook"
                          autoComplete="off"
                          label="Book"
                          defaultValue={this.state.favoriteBook}
                          fullWidth
                          required
                          type="text"
                          onChange={this.handleChange}
                        />
                        <TextField
                          autofocus
                          margin="dense"
                          id="favoriteMovie"
                          name="favoriteMovie"
                          autoComplete="off"
                          label="Movie"
                          defaultValue={this.state.favoriteMovie}
                          fullWidth
                          required
                          type="text"
                          onChange={this.handleChange}
                        />
                        <TextField
                          autofocus
                          margin="dense"
                          id="favoriteShow"
                          name="favoriteShow"
                          autoComplete="off"
                          label="Show"
                          defaultValue={this.state.favoriteShow}
                          fullWidth
                          required
                          type="text"
                          onChange={this.handleChange}
                        />
                        <TextField
                          autofocus
                          margin="dense"
                          id="favoriteArtist"
                          name="favoriteArtist"
                          autoComplete="off"
                          label="Artist"
                          defaultValue={this.state.favoriteArtist}
                          fullWidth
                          required
                          type="text"
                          onChange={this.handleChange}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={this.handleFavoritesClose}
                          color="secondary"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={this.handleSubmitFavorites}
                          color="secondary"
                          disabled={
                            this.state.favoriteBook === "" ||
                            this.state.favoriteMovie === "" ||
                            this.state.favoriteShow === "" ||
                            this.state.favoriteArtist === ""
                          }
                        >
                          Save Changes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Typography>
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
                            borderColor: `${this.state.courses[index].courseColor}`,
                            // borderColor: `${this.state.courses[index].undefined}`,
                            height: "100%",
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
                            <Tooltip title="Change color" placement="right">
                              <IconButton
                                onClick={() => this.handleColorOpen(index)}
                                style={{ marginBottom: "-20px" }}
                              >
                                <Dots color="secondary" />
                              </IconButton>
                            </Tooltip>
                            <Dialog
                              overlayStyle={{ backgroundColor: "transparent" }}
                              open={this.state.colorOpen[index]}
                            >
                              <DialogTitle
                                style={{ cursor: "move" }}
                                id="draggable-dialog-title"
                              >
                                Edit Course Color
                              </DialogTitle>
                              <DialogContent>
                                <TextField
                                  autofocus
                                  margin="dense"
                                  id="courseColor"
                                  name="courseColor"
                                  autoComplete="off"
                                  select
                                  label="Course Color"
                                  defaultValue={
                                    this.state.courses[index].courseColor
                                  }
                                  onChange={this.handleChange}
                                  helperText="Please select a course color"
                                >
                                  {palette.map((color) => (
                                    <MenuItem key={color} value={color}>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          backgroundColor: color,
                                          color: color,
                                        }}
                                      >
                                        Color
                                      </Typography>
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={this.handleColorClose}
                                  color="secondary"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => this.handleColorSave(index)}
                                  color="secondary"
                                >
                                  Save Changes
                                </Button>
                              </DialogActions>
                            </Dialog>
                            {this.state.delete && (
                              <div>
                                <br />
                                <IconButton
                                  size="large"
                                  color="primary"
                                  onClick={() => this.handleRemoveOpen(index)}
                                  style={{
                                    marginBottom: "-30px",
                                    marginTop: "-15px",
                                  }}
                                >
                                  <DeleteIcon fontSize="large" />
                                </IconButton>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                    <Grid item sm>
                      {numCourses < 5 && (
                        <div>
                          <Tooltip title="Add course" placement="right">
                            <IconButton
                              variant="contained"
                              color="secondary"
                              onClick={this.handleAddOpen}
                              style={{ marginTop: "10px" }}
                            >
                              Add <span style={{ marginRight: "5px" }} />{" "}
                              <AddIcon />
                            </IconButton>
                          </Tooltip>
                          <Dialog
                            overlayStyle={{ backgroundColor: "transparent" }}
                            open={this.state.addOpen}
                            onClose={this.handleAddClose}
                          >
                            <DialogTitle
                              style={{ cursor: "move" }}
                              id="draggable-dialog-title"
                            >
                              Add Course
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                Please enter the course code and course name
                                below:
                              </DialogContentText>
                              <TextField
                                autofocus
                                margin="dense"
                                id="courseCode"
                                name="addCourseCode"
                                label="Course Code (e.g. ECON 0110)"
                                fullWidth
                                type="text"
                                onChange={this.handleChange}
                              />
                              <TextField
                                autofocus
                                type="text"
                                margin="dense"
                                id="courseName"
                                name="addCourseName"
                                label="Course Name (e.g. Principles of Economics)"
                                fullWidth
                                onChange={this.handleChange}
                              />
                              <TextField
                                autofocus
                                margin="dense"
                                id="courseColor"
                                name="addCourseColor"
                                autoComplete="off"
                                select
                                label="Course Color"
                                onChange={this.handleChange}
                                helperText="Please select a course color"
                              >
                                {palette.map((color) => (
                                  <MenuItem key={color} value={color}>
                                    <Typography
                                      variant="h6"
                                      style={{
                                        backgroundColor: color,
                                        color: color,
                                      }}
                                    >
                                      Color
                                    </Typography>
                                  </MenuItem>
                                ))}
                              </TextField>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={this.handleSubmitCourses}
                                color="primary"
                              >
                                Add
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      )}
                      <br />

                      {numCourses > 2 && (
                        <div>
                          {numCourses === 5 && (
                            <div>
                              <br />
                              <br />
                            </div>
                          )}
                          {!this.state.delete && (
                            <div>
                              <Tooltip title="Remove course" placement="right">
                                <IconButton
                                  variant="contained"
                                  color="primary"
                                  onClick={this.toggleDelete}
                                  style={{ marginTop: "-25px" }}
                                >
                                  Remove <span style={{ marginRight: "5px" }} />{" "}
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </div>
                          )}
                          {this.state.delete && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.toggleDelete}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <br />
            </TabPanel>
            <TabPanel value={this.state.tabIndex} index={1}>
              <div>
                {this.state.loading && (
                  <div align="center">
                    <br />
                    <CircularProgress size={100} />
                    <br />
                    <br />
                    <Typography variant="h4">Fetching user data...</Typography>
                  </div>
                )}
                {!this.state.loading && (
                  <div>
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
                              Concentration(s): {this.state.major1}
                              {this.state.major2 && `, ${this.state.major2}`}
                              {this.state.major3 && `, ${this.state.major3}`}
                            </Typography>
                            {this.state.bio && (
                              <div>
                                <br />
                                <Typography variant="h6">
                                  {this.state.bio}
                                </Typography>
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
                                <Typography variant="h5">
                                  Varsity Sports
                                </Typography>
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
                                  <Typography>
                                    • {this.state.groups[0]}
                                  </Typography>
                                )}
                                {this.state.groups[1] && (
                                  <Typography variant="body">
                                    • {this.state.groups[1]}
                                  </Typography>
                                )}
                                {this.state.groups[2] && (
                                  <Typography>
                                    • {this.state.groups[2]}
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
                                <Typography variant="h5">
                                  Greek Organization
                                </Typography>
                                <br />
                                {this.state.greekLife === "" && (
                                  <Typography>N/A</Typography>
                                )}
                                {this.state.greekLife && (
                                  <Typography>
                                    • {this.state.greekLife}
                                  </Typography>
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
                            <Typography variant="h4">
                              Additional Info
                            </Typography>
                            <hr />
                            <br />
                            <Grid container spacing={2}>
                              <Grid item sm>
                                <div>
                                  <Music />
                                  <Typography variant="h6">
                                    Instruments
                                  </Typography>
                                </div>
                              </Grid>
                              <Grid item sm>
                                <div>
                                  <Sports />
                                  <Typography variant="h6">
                                    Pick-Up Sports
                                  </Typography>
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
            </TabPanel>
            <NavBar />
          </div>
        )}
      </div>
    );
  }
}

export default profileView;

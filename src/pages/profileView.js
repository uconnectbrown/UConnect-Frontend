// Setup
import React, { Component } from "react";
import axios from "axios";
import { db, auth } from "../firebase";

// Components
import NavBar from "../components/NavBar";
import Interests from "../components/Interests.js";
import Crop from "../cropUtil/Crop.js";

// Resources
import profileViewState from "../resources/profileViewState";
import majorList from "../resources/majors";
import varsitySports from "../resources/varsitySports";
import greekLife from "../resources/greekLife";
import {
  instrumentsList,
  pickUpSportsList,
  petsList,
} from "../resources/additionalInfo";

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

// Styles
import "./profileView.css";

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
          // Optional edits
          bio_: res.data.user.bio,
          group1_: res.data.user.groups[0],
          group2_: res.data.user.groups[1],
          group3_: res.data.user.groups[2],
          varsitySport1_: res.data.user.varsitySports[0],
          varsitySport2_: res.data.user.varsitySports[1],
          greekLife_: res.data.user.greekLife,
          instrument1_: res.data.user.instruments[0],
          instrument2_: res.data.user.instruments[1],
          instrument3_: res.data.user.instruments[2],
          pickUpSport1_: res.data.user.pickUpSports[0],
          pickUpSport2_: res.data.user.pickUpSports[1],
          pickUpSport3_: res.data.user.pickUpSports[2],
          pet1_: res.data.user.pets[0],
          pet2_: res.data.user.pets[1],
          pet3_: res.data.user.pets[2],
          // Other
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleTabChange = (event, value) => {
    this.setState({ tabIndex: value });
  };

  handleEditPicture = () => {
    // const fileInput = document.getElementById("imageInput");
    this.setState({ crop: true });
    // fileInput.click();
  };

  // handleImageChange = (event) => {
  //   event.preventDefault();
  //   const image = event.target.files[0];
  //   console.log(image.name);
  //   const formData = new FormData();
  //   formData.append("image", image, image.name);
  //   axios
  //     .post(`/image/${auth.currentUser.email}`, formData)
  //     .then((data) => {
  //       this.setState({ imageUrl: data.data.imageUrl, imageOpen: true }, () => {
  //         this.updateCourses();
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  updateImage = (url) => {
    this.setState({ imageUrl: url, crop: false });
  };

  handleCropClose = () => {
    this.setState({ crop: false });
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
          },
          () => {
            this.updateCourses();
          }
        );
      })
      .catch((err) => console.log(err));
    this.setState({ basicOpen: false });
  };

  handleBioOpen = () => {
    this.setState({ bioOpen: true });
  };

  handleSubmitBio = () => {
    let newBio = {
      bio: this.state.bio_,
    };
    axios.post(`/edit/${auth.currentUser.email}`, newBio).then(() => {
      this.setState(
        {
          bio: newBio["bio"],
        },
        () => {
          this.updateCourses();
        }
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
        },
        () => {
          this.updateCourses();
        }
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
        },
        () => {
          this.updateCourses();
        }
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
        },
        () => {
          this.updateCourses();
        }
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
    axios
      .post(`/edit/${auth.currentUser.email}`, interestsList)
      .then(() => {
        this.setState(
          {
            interests1: interestsList.interests1,
            interests2: interestsList.interests2,
            interests3: interestsList.interests3,
          },
          () => {
            this.updateCourses();
          }
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

  handleInstrumentsOpen = () => {
    this.setState({ instrumentsOpen: true });
  };

  handleSubmitInstruments = () => {
    let newInstruments = {
      instruments: [
        this.state.instrument1_,
        this.state.instrument2_,
        this.state.instrument3_,
      ],
    };
    axios
      .post(`/edit/${auth.currentUser.email}`, newInstruments)
      .then(() => {
        this.setState(
          {
            instrument1: newInstruments.instruments[0],
            instrument2: newInstruments.instruments[1],
            instrument3: newInstruments.instruments[2],
          },
          () => {
            this.updateCourses();
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      instrumentsOpen: false,
    });
  };

  handleInstrumentsClose = () => {
    this.setState({
      instrumentsOpen: false,
      instrument1_: this.state.instrument1,
      instrument2_: this.state.instrument2,
      instrument3_: this.state.instrument3,
    });
  };

  handlePickUpSportsOpen = () => {
    this.setState({ pickUpSportsOpen: true });
  };

  handleSubmitPickUpSports = () => {
    let newPickUpSports = {
      pickUpSports: [
        this.state.pickUpSport1_,
        this.state.pickUpSport2_,
        this.state.pickUpSport3_,
      ],
    };
    axios
      .post(`/edit/${auth.currentUser.email}`, newPickUpSports)
      .then(() => {
        this.setState(
          {
            pickUpSport1: newPickUpSports.pickUpSports[0],
            pickUpSport2: newPickUpSports.pickUpSports[1],
            pickUpSport3: newPickUpSports.pickUpSports[2],
          },
          () => {
            this.updateCourses();
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      pickUpSportsOpen: false,
    });
  };

  handlePickUpSportsClose = () => {
    this.setState({
      pickUpSportsOpen: false,
      pickUpSport1_: this.state.pickUpSport1,
      pickUpSport2_: this.state.pickUpSport2,
      pickUpSport3_: this.state.pickUpSport3,
    });
  };

  handlePetsOpen = () => {
    this.setState({ petsOpen: true });
  };

  handleSubmitPets = () => {
    let newPets = {
      pets: [this.state.pet1_, this.state.pet2_, this.state.pet3_],
    };
    axios
      .post(`/edit/${auth.currentUser.email}`, newPets)
      .then(() => {
        this.setState(
          {
            pet1: newPets.pets[0],
            pet2: newPets.pets[1],
            pet3: newPets.pets[2],
          },
          () => {
            this.updateCourses();
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      petsOpen: false,
    });
  };

  handlePetsClose = () => {
    this.setState({
      petssOpen: false,
      pets1_: this.state.pet1,
      pets2_: this.state.pet2,
      pets3_: this.state.pet3,
    });
  };

  handleFavoritesOpen = () => {
    this.setState({ favoritesOpen: true });
  };

  handleSubmitFavorites = () => {
    let favorites = {
      book: this.state.favoriteBook_,
      movie: this.state.favoriteMovie_,
      tvShow: this.state.favoriteShow_,
      artist: this.state.favoriteArtist_,
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

  handleFavoritesClose = () => {
    this.setState({
      favoritesOpen: false,
      favoriteBook_: this.state.favoriteBook,
      favoriteMovie_: this.state.favoriteMovie,
      favoriteShow_: this.state.favoriteShow,
      favoriteArtist_: this.state.favoriteArtist,
    });
  };

  handleColorOpen = (index) => {
    let newColorOpen = [...this.state.colorOpen];
    newColorOpen[index] = true;
    this.setState({ colorOpen: newColorOpen });
  };

  handleColorSave = (index) => {
    let courseList = [];
    let newCourse = {
      code: this.state.courses[index].code,
      name: this.state.courses[index].name,
      color: this.state.courseColor,
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
    this.setState({
      courseColor: "",
      colorOpen: [false, false, false, false, false],
    });
  };

  handleColorClose = () => {
    this.setState({
      courseColor: "",
      colorOpen: [false, false, false, false, false],
    });
  };

  handleAddOpen = () => {
    this.setState({ addOpen: true });
  };

  handleAddCourse = () => {
    let firstIndex;
    let courseList = [];
    for (let i = 0; i < 5; i++) {
      if (!this.state.courses[i].code) {
        firstIndex = i;
        break;
      }
    }
    let newCourse = {
      code: this.state.addCourseCode,
      name: this.state.addCourseName,
      color: this.state.addCourseColor,
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

  handleAddClose = () => {
    this.setState({ addOpen: false });
  };

  toggleRemoveOpen = () => {
    this.setState({ removeOpen: !this.state.removeOpen });
  };

  handleRemoveCourse = (deleteIndex) => {
    let courseList = [];
    let deleteCode;
    for (let i = 0; i < 5; i++) {
      if (i === deleteIndex) {
        courseList.push({ code: "", name: "", color: "" });
        deleteCode = this.state.courses[i].code.replace(/\s/g, "");
      } else courseList.push(this.state.courses[i]);
    }
    let newCourses = { courses: courseList };
    axios.post(`/edit/${auth.currentUser.email}`, newCourses).then(() => {
      this.setState({ courses: courseList }, () => {
        this.updateCourses();
      });
    });
    axios
      .get(`/delete/${auth.currentUser.email}/${deleteCode}`)
      .then(() => {})
      .catch((err) => console.log(err));
    this.setState({ removeOpen: false });
  };

  handleRemoveClose = () => {
    this.setState({ removeOpen: false });
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getClassYears = () => {
    const currYear = new Date().getFullYear();
    const years = [];

    for (let i = currYear; i <= currYear + 4; i += 0.5) {
      years.push(String(i));
    }
    return years;
  };

  renderEditBasicInfo = () => {
    const pronouns = ["he/him", "she/her", "they/them", "ze/hir", "other"];
    const classYears = this.getClassYears();

    return (
      <>
        <Tooltip title="Edit basic info" placement="right">
          <IconButton onClick={this.handleBasicOpen} className="button">
            <EditIcon color="secondary" />
          </IconButton>
        </Tooltip>
        <Dialog
          overlayStyle={{ backgroundColor: "transparent" }}
          open={this.state.basicOpen}
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
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
              {pronouns.map((p) => {
                return (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                );
              })}
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
              {classYears.map((year) => {
                return (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                );
              })}
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
            <Button onClick={this.handleBasicClose} color="secondary">
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
      </>
    );
  };

  renderOrganizations = () => {
    return (
      <>
        <Grid item xs={12} md={4}>
          <Card raised className="info-card">
            <CardContent>
              <div>
                <Typography variant="h5">
                  Groups
                  {[
                    this.state.group1,
                    this.state.group2,
                    this.state.group3,
                  ].filter(Boolean).length > 0 && (
                    <Tooltip title="Edit groups" placement="right">
                      <IconButton
                        onClick={this.handleGroupsOpen}
                        className="button"
                      >
                        <EditIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Typography>
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
                    Please list up to 3 clubs, affinity groups, or student
                    organizations you are involved with.
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
                  <Button onClick={this.handleGroupsClose} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleSubmitGroups} color="secondary">
                    Save Changes
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card raised className="info-card">
            <CardContent>
              <div>
                <Typography variant="h5">
                  Varsity Sports
                  {[this.state.varsitySport1, this.state.varsitySport2].filter(
                    Boolean
                  ).length > 0 && (
                    <Tooltip title="Edit varsity sports" placement="right">
                      <IconButton
                        onClick={this.handleVarsityOpen}
                        className="button"
                      >
                        <EditIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Typography>
                {this.state.varsitySport1 && (
                  <Typography>• {this.state.varsitySport1}</Typography>
                )}
                {this.state.varsitySport2 && (
                  <Typography>• {this.state.varsitySport2}</Typography>
                )}
                {!this.state.varsitySport1 && !this.state.varsitySport2 && (
                  <Tooltip title="Add varsity sport" placement="right">
                    <IconButton
                      onClick={this.handleVarsityOpen}
                      className="button"
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
                    If you are a member of any varsity sports teams, please
                    indicate which ones below.
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
                  <Button onClick={this.handleVarsityClose} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleSubmitVarsity} color="secondary">
                    Save Changes
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card raised className="info-card">
            <CardContent>
              <div>
                <Typography variant="h5">
                  Greek Organization
                  {[this.state.greekLife].filter(Boolean).length > 0 && (
                    <Tooltip title="Edit Greek organization" placement="right">
                      <IconButton
                        onClick={this.handleGreekOpen}
                        className="button"
                      >
                        <EditIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Typography>
                {this.state.greekLife && (
                  <Typography>• {this.state.greekLife}</Typography>
                )}
                {!this.state.greekLife && (
                  <Tooltip title="Add Greek organization" placement="right">
                    <IconButton
                      onClick={this.handleGreekOpen}
                      className="button"
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
                    If you are a member of any Greek Organizations, please
                    indicate which one below.
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
                  <Button onClick={this.handleGreekClose} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleSubmitGreek} color="secondary">
                    Save Changes
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  };

  renderInterestCard = (title, items, color) => {
    return (
      <Grid item xs={12} md={4}>
        <Card raised className="info-card">
          <CardContent>
            <Typography variant="h5" style={{ color: color }}>
              {title}
            </Typography>
            {items.map((item) => (
              <p>• {item}</p>
            ))}
          </CardContent>
        </Card>
      </Grid>
    );
  };

  renderInterests = () => {
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
      <>
        <Typography variant="h4">
          Interests
          <Tooltip title="Edit interests" placement="right">
            <IconButton className="button" onClick={this.handleInterestsOpen}>
              <EditIcon color="secondary" />
            </IconButton>
          </Tooltip>
          <Dialog
            overlayStyle={{ backgroundColor: "transparent" }}
            open={this.state.interestsOpen}
          >
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
              Edit Interests
            </DialogTitle>
            <DialogContent>
              <Interests getInterests={this.handleInterests} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleInterestsClose} color="secondary">
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
        <Grid container spacing={5}>
          {this.renderInterestCard(
            "Career and Academic",
            this.state.interests1,
            palette[7]
          )}
          {this.renderInterestCard(
            "Physical Activity and Wellness",
            this.state.interests2,
            palette[0]
          )}
          {this.renderInterestCard(
            "General Hobbies",
            this.state.interests3,
            palette[3]
          )}
        </Grid>
      </>
    );
  };

  renderAdditionalInfo = () => {
    return (
      <>
        <Typography variant="h4">Additional Info</Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Card raised className="info-card">
              <CardContent style={{ display: "flex", alignItems: "center" }}>
                <Music />
                <Typography variant="h6" style={{ marginLeft: 5 }}>
                  Instruments
                  {[
                    this.state.instrument1,
                    this.state.instrument2,
                    this.state.instrument3,
                  ].filter(Boolean).length > 0 && (
                    <Tooltip title="Edit instruments" placement="right">
                      <IconButton
                        onClick={this.handleInstrumentsOpen}
                        className="button"
                      >
                        <EditIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Typography>
                {this.state.instrument1 && (
                  <Typography>• {this.state.instrument1}</Typography>
                )}
                {this.state.instrument2 && (
                  <Typography>• {this.state.instrument2}</Typography>
                )}
                {this.state.instrument3 && (
                  <Typography>• {this.state.instrument3}</Typography>
                )}
                {!this.state.instrument1 &&
                  !this.state.instrument2 &&
                  !this.state.instrument3 && (
                    <Tooltip title="Add instrument" placement="right">
                      <IconButton
                        onClick={this.handleInstrumentsOpen}
                        className="button"
                      >
                        <AddCircle color="secondary" />
                      </IconButton>
                    </Tooltip>
                  )}
                <Dialog
                  overlayStyle={{ backgroundColor: "transparent" }}
                  open={this.state.instrumentsOpen}
                >
                  <DialogTitle
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                  >
                    Edit Instruments
                  </DialogTitle>
                  <DialogContent>
                    <Typography>Insert Later</Typography>
                    <TextField
                      autofocus
                      margin="dense"
                      id="instrument1_"
                      autoComplete="off"
                      name="instrument1_"
                      label="Instrument 1"
                      defaultValue={this.state.instrument1}
                      fullWidth
                      type="text"
                      onChange={this.handleChange}
                    />
                    <TextField
                      autofocus
                      margin="dense"
                      id="instrument2_"
                      autoComplete="off"
                      name="instrument2_"
                      label="Instrument 2"
                      defaultValue={this.state.instrument2}
                      fullWidth
                      type="text"
                      onChange={this.handleChange}
                    />
                    <TextField
                      autofocus
                      margin="dense"
                      id="instrument3_"
                      autoComplete="off"
                      name="instrument3_"
                      label="Instrument 3"
                      defaultValue={this.state.instrument3}
                      fullWidth
                      type="text"
                      onChange={this.handleChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={this.handleInstrumentsClose}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={this.handleSubmitInstruments}
                      color="secondary"
                      disabled={
                        this.state.instrument1 === this.state.instrument1_ &&
                        this.state.instrument2 === this.state.instrument2_ &&
                        this.state.instrument3 === this.state.instrument3_
                      }
                    >
                      Save Changes
                    </Button>
                  </DialogActions>
                </Dialog>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card raised className="info-card">
              <CardContent style={{ display: "flex", alignItems: "center" }}>
                <Sports />
                <Typography variant="h6" style={{ marginLeft: 5 }}>
                  Pick-Up Sports
                  {[
                    this.state.pickUpSport1,
                    this.state.pickUpSport2,
                    this.state.pickUpSport3,
                  ].filter(Boolean).length > 0 && (
                    <Tooltip title="Edit pickUpSports" placement="right">
                      <IconButton
                        onClick={this.handlePickUpSportsOpen}
                        className="button"
                      >
                        <EditIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Typography>
                {this.state.pickUpSport1 && (
                  <Typography>• {this.state.pickUpSport1}</Typography>
                )}
                {this.state.pickUpSport2 && (
                  <Typography>• {this.state.pickUpSport2}</Typography>
                )}
                {this.state.pickUpSport3 && (
                  <Typography>• {this.state.pickUpSport3}</Typography>
                )}

                {!this.state.pickUpSport1 &&
                  !this.state.pickUpSport2 &&
                  !this.state.pickUpSport3 && (
                    <Tooltip title="Add pick up sport" placement="right">
                      <IconButton
                        onClick={this.handlePickUpSportsOpen}
                        className="button"
                      >
                        <AddCircle color="secondary" />
                      </IconButton>
                    </Tooltip>
                  )}
                <Dialog
                  overlayStyle={{ backgroundColor: "transparent" }}
                  open={this.state.pickUpSportsOpen}
                >
                  <DialogTitle
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                  >
                    Edit Pick-Up Sports
                  </DialogTitle>
                  <DialogContent>
                    <Typography>Insert Later</Typography>
                    <TextField
                      autofocus
                      margin="dense"
                      id="pickUpSport1_"
                      autoComplete="off"
                      name="pickUpSport1_"
                      label="Pick-Up Sport 1"
                      defaultValue={this.state.pickUpSport1}
                      fullWidth
                      type="text"
                      onChange={this.handleChange}
                    />
                    <TextField
                      autofocus
                      margin="dense"
                      id="pickUpSport2_"
                      autoComplete="off"
                      name="pickUpSport2_"
                      label="Pick-Up Sport 2"
                      defaultValue={this.state.pickUpSport2}
                      fullWidth
                      type="text"
                      onChange={this.handleChange}
                    />
                    <TextField
                      autofocus
                      margin="dense"
                      id="pickUpSport3_"
                      autoComplete="off"
                      name="pickUpSport3_"
                      label="Pick-Up Sport 3"
                      defaultValue={this.state.pickUpSport3}
                      fullWidth
                      type="text"
                      onChange={this.handleChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={this.handlePickUpSportsClose}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={this.handleSubmitPickUpSports}
                      color="secondary"
                      disabled={
                        this.state.pickUpSport1 === this.state.pickUpSport1_ &&
                        this.state.pickUpSport2 === this.state.pickUpSport2_ &&
                        this.state.pickUpSport3 === this.state.pickUpSport3_
                      }
                    >
                      Save Changes
                    </Button>
                  </DialogActions>
                </Dialog>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card raised className="info-card">
              <CardContent style={{ display: "flex", alignItems: "center" }}>
                <Pets />
                <Typography variant="h6" style={{ marginLeft: 5 }}>
                  Pets
                  {[this.state.pet1, this.state.pet2, this.state.pet3].filter(
                    Boolean
                  ).length > 0 && (
                    <Tooltip title="Edit pets" placement="right">
                      <IconButton
                        onClick={this.handlePetsOpen}
                        className="button"
                      >
                        <EditIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Typography>
                {this.state.pet1 && (
                  <Typography>• {this.state.pet1}</Typography>
                )}
                {this.state.pet2 && (
                  <Typography>• {this.state.pet2}</Typography>
                )}
                {this.state.pet3 && (
                  <Typography>• {this.state.pet3}</Typography>
                )}

                {!this.state.pet1 && !this.state.pet2 && !this.state.pet3 && (
                  <Tooltip title="Add pet" placement="right">
                    <IconButton
                      onClick={this.handlePetsOpen}
                      className="button"
                    >
                      <AddCircle color="secondary" />
                    </IconButton>
                  </Tooltip>
                )}
                <Dialog
                  overlayStyle={{ backgroundColor: "transparent" }}
                  open={this.state.petsOpen}
                >
                  <DialogTitle
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                  >
                    Edit Pets
                  </DialogTitle>
                  <DialogContent>
                    <Typography>Insert Later</Typography>
                    <TextField
                      autofocus
                      margin="dense"
                      id="pet1_"
                      autoComplete="off"
                      name="pet1_"
                      label="Pet 1"
                      defaultValue={this.state.pet1}
                      fullWidth
                      type="text"
                      onChange={this.handleChange}
                    />
                    <TextField
                      autofocus
                      margin="dense"
                      id="pet2_"
                      autoComplete="off"
                      name="pet2_"
                      label="Pet 2"
                      defaultValue={this.state.pet2}
                      fullWidth
                      type="text"
                      onChange={this.handleChange}
                    />
                    <TextField
                      autofocus
                      margin="dense"
                      id="pet_"
                      autoComplete="off"
                      name="pet_"
                      label="Pet 3"
                      defaultValue={this.state.pet}
                      fullWidth
                      type="text"
                      onChange={this.handleChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handlePetsClose} color="secondary">
                      Cancel
                    </Button>
                    <Button
                      onClick={this.handleSubmitPets}
                      color="secondary"
                      disabled={
                        this.state.pet1 === this.state.pet1_ &&
                        this.state.pet2 === this.state.pet2_ &&
                        this.state.pet3 === this.state.pet3_
                      }
                    >
                      Save Changes
                    </Button>
                  </DialogActions>
                </Dialog>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  };

  renderFavorites = () => {
    return (
      <>
        <Typography variant="h4">
          Favorites
          {!this.state.favoriteBook &&
            !this.state.favoriteMovie &&
            !this.state.favoriteShow &&
            !this.state.favoriteArtist && (
              <Tooltip title="Add favorites" placement="right">
                <IconButton
                  onClick={this.handleFavoritesOpen}
                  className="button"
                >
                  <AddCircle color="secondary" />
                </IconButton>
              </Tooltip>
            )}
          {[
            this.state.favoriteBook,
            this.state.favoriteMovie,
            this.state.favoriteShow,
            this.state.favoriteArtist,
          ].filter(Boolean).length > 0 && (
            <Tooltip title="Edit favorites" placement="right">
              <IconButton onClick={this.handleFavoritesOpen} className="button">
                <EditIcon color="secondary" />
              </IconButton>
            </Tooltip>
          )}
          <Dialog
            overlayStyle={{ backgroundColor: "transparent" }}
            open={this.state.favoritesOpen}
          >
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
              Edit Favorites
            </DialogTitle>
            <DialogContent>
              <TextField
                autofocus
                margin="dense"
                id="favoriteBook_"
                name="favoriteBook_"
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
                id="favoriteMovie_"
                name="favoriteMovie_"
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
                id="favoriteShow_"
                name="favoriteShow_"
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
                id="favoriteArtist_"
                name="favoriteArtist_"
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
              <Button onClick={this.handleFavoritesClose} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={this.handleSubmitFavorites}
                color="secondary"
                disabled={
                  this.state.favoriteBook === this.state.favoriteBook_ &&
                  this.state.favoriteMovie === this.state.favoriteMovie_ &&
                  this.state.favoriteShow === this.state.favoriteShow_ &&
                  this.state.favoriteArtist === this.state.favoriteArtist_
                }
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        </Typography>
        <Card raised>
          <CardContent align="center">
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <div>
                  <Book />
                  <Typography variant="body1">
                    Book: {this.state.favoriteBook}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div>
                  <Movie />
                  <Typography variant="body1">
                    Movie: {this.state.favoriteMovie}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div>
                  <Tv />
                  <Typography variant="body1">
                    Show: {this.state.favoriteShow}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
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
      </>
    );
  };

  renderCourses = () => {
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

    let code1 = this.state.courses[0].code;
    let code2 = this.state.courses[1].code;
    let code3 = this.state.courses[2].code;
    let code4 = this.state.courses[3].code;
    let code5 = this.state.courses[4].code;
    let numCourses = [code1, code2, code3, code4, code5].filter(Boolean).length;
    let indexArray = [];
    for (let j = 0; j < 5; j++) {
      if (this.state.courses[j].code) {
        indexArray.push(j);
      }
    }

    return (
      <>
        <Typography variant="h4">Courses</Typography>
        <Card raised>
          <CardContent align="center">
            <Grid container spacing={2}>
              {indexArray.map((index) => (
                <Grid item sm>
                  <Card
                    style={{
                      borderStyle: "solid",
                      borderWidth: "3px",
                      borderColor: this.state.courses[index].color,
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h5"
                        style={{ color: this.state.courses[index].color }}
                      >
                        {this.state.courses[index].code}
                      </Typography>
                      <Typography variant="body1">
                        {this.state.courses[index].name}
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
                            defaultValue={this.state.courses[index].color}
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
                            disabled={
                              this.state.courses[index].color ===
                                this.state.courseColor ||
                              this.state.courseColor === ""
                            }
                          >
                            Save Changes
                          </Button>
                        </DialogActions>
                      </Dialog>
                      {this.state.removeOpen && (
                        <IconButton
                          size="large"
                          color="primary"
                          onClick={() => this.handleRemoveCourse(index)}
                        >
                          <DeleteIcon fontSize="large" />
                        </IconButton>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item sm>
                {numCourses < 5 && (
                  <div>
                    <IconButton
                      variant="contained"
                      color="secondary"
                      onClick={this.handleAddOpen}
                    >
                      Add
                      <AddIcon style={{ marginLeft: "5px" }} />
                    </IconButton>
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
                          {" "}
                          Please enter the course code and course name below:
                        </DialogContentText>
                        <TextField
                          autofocus
                          margin="dense"
                          id="courseCode"
                          name="addCourseCode"
                          label="Code (e.g. ECON 0110)"
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
                          label="Name (e.g. Principles of Economics)"
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
                                  width: "100%",
                                }}
                              >
                                Color
                              </Typography>
                            </MenuItem>
                          ))}
                        </TextField>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleAddClose} color="secondary">
                          Cancel
                        </Button>
                        <Button
                          onClick={this.handleAddCourse}
                          color="secondary"
                        >
                          Add
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                )}

                {numCourses > 0 && (
                  <div>
                    {!this.state.removeOpen && (
                      <IconButton
                        variant="contained"
                        color="primary"
                        onClick={this.toggleRemoveOpen}
                      >
                        Remove
                        <DeleteIcon style={{ marginLeft: "5px" }} />
                      </IconButton>
                    )}
                    {this.state.removeOpen && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.toggleRemoveOpen}
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
      </>
    );
  };

  render() {
    let loading = this.state.loading;

    return (
      <div>
        {loading && <NavBar />}
        {!loading && (
          <div>
            <NavBar />
            <AppBar
              position="relative"
              color="default"
              style={{ marginTop: "70px" }}
            >
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
              <Dialog
                overlayStyle={{ backgroundColor: "transparent" }}
                open={this.state.crop}
              >
                <DialogTitle
                  style={{ cursor: "move" }}
                  id="draggable-dialog-title"
                >
                  Select Picture
                </DialogTitle>
                <DialogContent>
                  <Crop update={this.updateImage} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCropClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              <div className="section-container">
                <Card raised>
                  <CardContent>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        md={4}
                        className="profile-container-left"
                      >
                        <div className="profile-img-wrap">
                          <img
                            className="profile-img"
                            alt="Profile Picture"
                            src={this.state.imageUrl}
                          />
                        </div>

                        <input
                          type="file"
                          id="imageInput"
                          hidden="hidden"
                          onChange={this.handleImageChange}
                        />
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
                          <p style={{ width: "100%", fontSize: 12, margin: 0 }}>
                            Please add an image to <br /> complete your profile.
                          </p>
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={8}
                        className="profile-container-right"
                      >
                        <Typography variant="h3">
                          {this.state.firstName} {this.state.lastName}
                          {this.renderEditBasicInfo()}
                        </Typography>
                        <p>
                          {this.state.preferredPronouns &&
                            `(${this.state.preferredPronouns})`}
                        </p>
                        <p>Class of {this.state.classYear}</p>
                        <p>
                          Concentration
                          {[
                            this.state.major1,
                            this.state.major2,
                            this.state.major3,
                          ].filter(Boolean).length > 1
                            ? "s"
                            : ""}
                          :{` ${this.state.major1}`}
                          {this.state.major2 && `, ${this.state.major2}`}
                          {this.state.major3 && `, ${this.state.major3}`}
                        </p>

                        {!this.state.bio && (
                          <Button
                            color="secondary"
                            variant="outlined"
                            onClick={this.handleBioOpen}
                            style={{ marginTop: "15px" }}
                          >
                            Add Bio
                          </Button>
                        )}
                        {this.state.bio && (
                          <Card raised style={{ display: "inline-block" }}>
                            <CardContent>
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
                              {this.state.bio}
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
                            <Button
                              onClick={this.handleBioClose}
                              color="secondary"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={this.handleSubmitBio}
                              color="secondary"
                              disabled={
                                this.state.bio_ === this.state.bio ||
                                this.state.bio_.length >= 140
                              }
                            >
                              Save Changes
                            </Button>
                          </DialogActions>
                        </Dialog>
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
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </div>
              <div class="section-container">
                <Grid container spacing={5}>
                  {this.renderOrganizations()}
                </Grid>
              </div>
              <div className="section-container">{this.renderInterests()}</div>
              <div className="section-container">
                {this.renderAdditionalInfo()}
              </div>
              <div className="section-container">{this.renderFavorites()}</div>
              <div className="section-container">{this.renderCourses()}</div>
            </TabPanel>
            <TabPanel value={this.state.tabIndex} index={1}></TabPanel>
          </div>
        )}
      </div>
    );
  }
}

export default profileView;

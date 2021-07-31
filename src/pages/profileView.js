// Setup
import React, { Component } from "react";
import axios from "axios";
import ImageCropper from "../components/ImageCropper";
import Avatar from "../components/Avatar";
import MyEditor from "../components/MyEditor";
// import Crop from "../components/Crop";
// import Cropper from "react-easy-crop";
// import AvatarEditor from 'react-avatar-editor'
import { useState, useCallback } from "react";
import getCroppedImg from "../components/cropImage";
// import update from "react-addons-update";
import { db, auth } from "../firebase";

// Components
import NavBar from "../components/NavBar";

// Resources
import profileViewState from "../resources/profileViewState";

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

// Import Data
import majorList from "../resources/majors";
import varsitySports from "../resources/varsitySports";
import greekLife from "../resources/greekLife";

class profileView extends Component {
  constructor() {
    super();
    this.state = profileViewState;
  }

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = () => {
    let emailId = auth.currentUser.email.split("@")[0];
    axios
      .get(`/user/${emailId}`)
      .then((res) => {
        this.setState(
          {
            affinitySportOne: res.data.user.affinitySports[0],
            affinitySportTwo: res.data.user.affinitySports[1],
            affinitySportThree: res.data.user.affinitySports[2],
            affinitySport1: res.data.user.affinitySports[0],
            affinitySport2: res.data.user.affinitySports[1],
            affinitySport3: res.data.user.affinitySports[2],
            bio: res.data.user.bio,
            bio_: res.data.user.bio,
            class: res.data.user.class,
            class_: res.data.user.class,
            courses: res.data.user.courses,
            createdAt: res.data.user.createdAt,
            email: res.data.user.email,
            favoriteBook: res.data.user.favorites.book,
            favoriteMovie: res.data.user.favorites.movie,
            favoriteShow: res.data.user.favorites.tvShow,
            favoriteArtist: res.data.user.favorites.artist,
            favBook: res.data.user.favorites.book,
            favMovie: res.data.user.favorites.movie,
            favShow: res.data.user.favorites.tvShow,
            favArtist: res.data.user.favorites.artist,
            firstName: res.data.user.firstName,
            greekLife: res.data.user.greekLife,
            firstName_: res.data.user.firstName,
            greekLife_: res.data.user.greekLife,
            groupOne: res.data.user.groups[0],
            groupTwo: res.data.user.groups[1],
            groupThree: res.data.user.groups[2],
            group1: res.data.user.groups[0],
            group2: res.data.user.groups[1],
            group3: res.data.user.groups[2],
            imageUrl: res.data.user.imageUrl,
            interests1: res.data.user.interests1,
            interests2: res.data.user.interests2,
            interests3: res.data.user.interests3,
            lastName: res.data.user.lastName,
            majorOne: res.data.user.majors[0],
            majorTwo: res.data.user.majors[1],
            majorThree: res.data.user.majors[2],
            preferredPronouns: res.data.user.preferredPronouns,
            lastName_: res.data.user.lastName,
            major1: res.data.user.majors[0],
            major2: res.data.user.majors[1],
            major3: res.data.user.majors[2],
            preferredPronouns_: res.data.user.preferredPronouns,
            userId: res.data.user.userId,
            varsitySportOne: res.data.user.varsitySports[0],
            varsitySportTwo: res.data.user.varsitySports[1],
            varsitySport1: res.data.user.varsitySports[0],
            varsitySport2: res.data.user.varsitySports[1],
            loading: false,
          },
          () => {
            return this.updateCourses();
          }
        );
      })
      .catch((err) => {
        console.log(err);
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
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
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
  handleBasicOpen = () => {
    this.setState({ basicOpen: true });
  };
  handleGroupsOpen = () => {
    this.setState({ groupOpen: true });
  };
  handleInterestsOpen = () => {
    this.setState({ interestsOpen: true });
  };
  handleFavoritesOpen = () => {
    this.setState({ favoritesOpen: true });
  };
  handleGreekOpen = () => {
    this.setState({ greekOpen: true});
  }

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

  handleGroupsClose = () => {
    this.setState({
      groupOpen: false,
      groupOne: this.state.group1,
      groupTwo: this.state.group2,
      groupThree: this.state.group3,
    });
  };
  handleGreekClose = () => {
    this.setState({
      greekOpen: false,
      greekLife: this.state.greekLife_,
    });
  };
  handleInterestsClose = () => {
    this.setState({
      interestsOpen: false,
      interestOne: this.state.interest1,
      interestTwo: this.state.interest2,
      interestThree: this.state.interest3,
      interestFour: this.state.interest4,
      interestFive: this.state.interest5,
      affinitySportOne: this.state.affinitySport1,
      affinitySportTwo: this.state.affinitySport2,
      affinitySportThree: this.state.affinitySport3,
    });
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
  handleBasicClose = () => {
    this.setState({
      basicOpen: false,
      firstName: this.state.firstName_,
      lastName: this.state.lastName_,
      preferredPronouns: this.state.preferredPronouns_,
      class: this.state.class_,
      majorOne: this.state.major1,
      majorTwo: this.state.major2,
      majorThree: this.state.major3,
      varsitySportOne: this.state.varsitySport1,
      varsitySportTwo: this.state.varsitySport2,
      groupOne: this.state.group1,
      groupTwo: this.state.group2,
      groupThree: this.state.group3,
      greekLife: this.state.greekLife_,
      bio: this.state.bio_,
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

  handleSubmitGreek = () => {
    this.setState({
      greekLife_: this.state.greekLife,
    });
    // let greekList = [
    //   this.state.greekLife,
    // ]
    let newGreek = {
      greekLife: this.state.greekLife,
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
  handleSubmitGroups = () => {
    this.setState({
      group1: this.state.groupOne,
      group2: this.state.groupTwo,
      group3: this.state.groupThree,
    });
    let groupList = [
      this.state.groupOne,
      this.state.groupTwo,
      this.state.groupThree,
    ];
    let newGroups = {
      groups: groupList,
    };
    axios.post(`/edit/${auth.currentUser.email}`, newGroups).then(() => {
      this.setState(
        {
          groupOne: groupList[0],
          groupTwo: groupList[1],
          groupThree: groupList[2],
        },
        () => {
          this.updateCourses();
        }
      );
    });
    this.setState({ groupOpen: false });
  };
  handleSubmitInterests = () => {
    this.setState({
      interest1: this.state.interestOne,
      interest2: this.state.interestTwo,
      interest3: this.state.interestThree,
      interest4: this.state.interestFour,
      interest5: this.state.interestFive,
      affinitySport1: this.state.affinitySportOne,
      affinitySport2: this.state.affinitySportTwo,
      affinitySport3: this.state.affinitySportThree,
    });
    let interestsList = [
      this.state.interestOne,
      this.state.interestTwo,
      this.state.interestThree,
      this.state.interestFour,
      this.state.interestFive,
    ];
    let affinitySportsList = [
      this.state.affinitySportOne,
      this.state.affinitySportTwo,
      this.state.affinitySportThree,
    ];
    let newInterests = {
      interests: interestsList,
      affinitySports: affinitySportsList,
    };
    axios.post(`/edit/${auth.currentUser.email}`, newInterests).then(() => {
      this.setState(
        {
          interestOne: interestsList[0],
          interestTwo: interestsList[1],
          interestThree: interestsList[2],
          interestFour: interestsList[3],
          interestFive: interestsList[4],
          affinitySportOne: affinitySportsList[0],
          affinitySportTwo: affinitySportsList[1],
          affinitySportThree: affinitySportsList[2],
        },
        () => {
          this.updateCourses();
        }
      );
    });
    this.setState({ interestsOpen: false });
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
  handleSubmitBasic = () => {
    this.setState({
      firstName_: this.state.firstName,
      lastName_: this.state.lastName,
      preferredPronouns_: this.state.preferredPronouns,
      class_: this.state.class,
      major1: this.state.majorOne,
      major2: this.state.majorTwo,
      major3: this.state.majorThree,
      varsitySport1: this.state.varsitySportOne,
      varsitySport2: this.state.varsitySportTwo,
      group1: this.state.groupOne,
      group2: this.state.groupTwo,
      group3: this.state.groupThree,
      greekLife_: this.state.greekLife,
      bio_: this.state.bio,
    });
    let newBasicInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      preferredPronouns: this.state.preferredPronouns,
      class: this.state.class,
      majors: [this.state.majorOne, this.state.majorTwo, this.state.majorThree],
      varsitySports: [this.state.varsitySportOne, this.state.varsitySportTwo],
      groups: [this.state.groupOne, this.state.groupTwo, this.state.groupThree],
      greekLife: this.state.greekLife,
      bio: this.state.bio,
    };
    axios
      .post(`/edit/${auth.currentUser.email}`, newBasicInfo)
      .then(() => {
        this.setState(
          {
            firstName: newBasicInfo["firstName"],
            lastName: newBasicInfo["lastName"],
            preferredPronouns: newBasicInfo["preferredPronouns"],
            class: newBasicInfo["class"],
            majors: newBasicInfo["majors"],
            varsitySports: newBasicInfo["varsitySports"],
            groups: newBasicInfo["groups"],
            greekLife: newBasicInfo["greekLife"],
            bio: newBasicInfo["bio"],
          },
          () => {
            this.updateCourses();
          }
        );
      })
      .catch((err) => console.log(err));
    this.setState({ basicOpen: false });
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
    let courseCode0 = this.state.courses[0].courseCode;
    let courseCode1 = this.state.courses[1].courseCode;
    let courseCode2 = this.state.courses[2].courseCode;
    let courseCode3 = this.state.courses[3].courseCode;
    let courseCode4 = this.state.courses[4].courseCode;
    let numCourses = [
      courseCode0,
      courseCode1,
      courseCode2,
      courseCode3,
      courseCode4,
    ].filter(Boolean).length;
    let indexArray = [];
    for (let j = 0; j < 5; j++) {
      if (this.state.courses[j].courseCode) {
        indexArray.push(j);
      }
    }

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
          <div>
            <NavBar />
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
                        <Typography variant="h5" align="center" color="primary">
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
                <Card raised style={{display: 'inline-block'}}>
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
                        id="firstName"
                        autoComplete="off"
                        name="firstName"
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
                        id="lastName"
                        autoComplete="off"
                        name="lastName"
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
                        id="preferredPronouns"
                        name="preferredPronouns"
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
                        id="class"
                        name="class"
                        select
                        label="Graduating Class"
                        defaultValue={this.state.class}
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
                        name="majorOne"
                        autoComplete="off"
                        label="First Concentration"
                        defaultValue={this.state.majorOne}
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
                        name="majorTwo"
                        autoComplete="off"
                        label="Second Concentration"
                        defaultValue={this.state.majorTwo}
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
                        name="majorThree"
                        autoComplete="off"
                        label="Third Concentration"
                        defaultValue={this.state.majorThree}
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
                        name="varsitySportOne"
                        autoComplete="off"
                        label="First Varsity Sport"
                        defaultValue={this.state.varsitySportOne}
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
                        name="varsitySportTwo"
                        autoComplete="off"
                        label="Second Varsity Sport"
                        defaultValue={this.state.varsitySportTwo}
                        fullWidth
                        onChange={this.handleChange}
                        InputProps={{
                          endAdornment: varsitySports,
                          inputProps: {
                            list: "varsitySports",
                          },
                        }}
                      />
                      {/* <TextField
                        autofocus
                        margin="dense"
                        id="groupOne"
                        autoComplete="off"
                        name="groupOne"
                        label="Group 1"
                        defaultValue={this.state.groupOne}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="groupTwo"
                        autoComplete="off"
                        name="groupTwo"
                        label="Group 2"
                        defaultValue={this.state.groupTwo}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      />
                      <TextField
                        autofocus
                        margin="dense"
                        id="groupThree"
                        autoComplete="off"
                        name="groupThree"
                        label="Group 3"
                        defaultValue={this.state.groupThree}
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                      /> */}
                      {/* <TextField
                        autofocus
                        margin="dense"
                        name="greekLife"
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
                      /> */}
                      <TextField
                        autofocus
                        margin="dense"
                        id="bio"
                        name="bio"
                        label="Bio"
                        defaultValue={this.state.bio}
                        multiline
                        onChange={this.handleChange}
                        rows={2}
                        fullWidth
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
                          this.state.firstName === "" ||
                          this.state.lastName === "" ||
                          this.state.majorOne === "" ||
                          this.state.class === ""
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
                <Typography variant="h5">Class of {this.state.class}</Typography>
                <Typography variant="h5">
                  Concentration(s): {this.state.majorOne}
                  {this.state.majorTwo && `, ${this.state.majorTwo}`}
                  {this.state.majorThree && `, ${this.state.majorThree}`}
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
                <Card raised
                style={{
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderColor: "red",
                  height: "100%",
                  marginBottom: "-5px",
                }}>
                  <CardContent>
                  {(this.state.varsitySportOne !== "" && this.state.varsitySportTwo !== "") && (
                    <div>
                      <Typography variant="h5">Varsity Sports{" "}
                      <Tooltip title="Edit varsity sports" placement="right">
                        <IconButton 
                          className="button"
                          style={{
                            marginTop: "-10px",
                            marginBottom: "-10px"
                          }}>
                          <EditIcon color="secondary" />
                        </IconButton>
                        </Tooltip>
                      </Typography>
                      <br />
                      <Typography>• {this.state.varsitySportOne}</Typography>
                        {this.state.varsitySportTwo &&
                          (<Typography>• {this.state.varsitySportTwo}</Typography>)}
                    </div>
                  )}
                  {(this.state.varsitySportOne === "" || this.state.varsitySportTwo === "") && (
                        <div>
                        <Typography variant="h5">Varsity Sports</Typography>
                        <br />
                      <Typography>• {this.state.varsitySportOne}</Typography>
                        {this.state.varsitySportTwo &&
                          (<Typography>• {this.state.varsitySportTwo}</Typography>)}
                        <br />
                        <Tooltip title="Add varsity sport" placement="right">
                        <IconButton 
                          className="button"
                          style={{
                            marginTop: "-10px",
                            marginBottom: "-10px"
                          }}>
                          <AddCircle color="secondary" />
                        </IconButton>
                        </Tooltip>
                        </div>
                      )}
                  </CardContent>
                </Card>
                </Grid>
                <Grid item sm>
                <Card raised
                style={{
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderColor: "red",
                  height: "100%",
                  marginBottom: "-5px",
                }}>
                  <CardContent>
                    {(this.state.groupOne === "" || this.state.groupTwo === "" || this.state.groupThree === "") && (
                      <Typography variant="h5">Groups</Typography>
                    )}
                    {(this.state.groupOne !== "" && this.state.groupTwo !== "" && this.state.groupThree !== "") && (
                      <div>
                      <Typography variant="h5">Groups{" "}
                      <Tooltip title="Edit groups" placement="right">
                      <IconButton 
                        className="button"
                        onClick={this.handleGroupsOpen}
                        style={{
                          marginTop: "-10px",
                          marginBottom: "-10px"
                        }}>
                        <EditIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                    <Dialog
                  overlayStyle={{ backgroundColor: "transparent" }}
                  open={this.state.groupOpen}
                >
                  <DialogTitle
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                  >
                    Edit Groups
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      autofocus
                      margin="dense"
                      id="groupOne"
                      autoComplete="off"
                      name="groupOne"
                      label="Group 1"
                      defaultValue={this.state.groupOne}
                      fullWidth
                      type="text"
                      onChange={this.handleChange}
                    />
                    <TextField
                      autofocus
                      margin="dense"
                      id="groupTwo"
                      autoComplete="off"
                      name="groupTwo"
                      label="Group 2"
                      defaultValue={this.state.groupTwo}
                      fullWidth
                      type="text"
                      onChange={this.handleChange}
                    />
                    <TextField
                      autofocus
                      margin="dense"
                      id="groupThree"
                      autoComplete="off"
                      name="groupThree"
                      label="Group 3"
                      defaultValue={this.state.groupThree}
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
                </Typography>
                </div>
                )}
                  {this.state.groupOne && (
                    <div>
                          <br />
                          <Typography>• {this.state.groupOne}</Typography>
                          {this.state.groupTwo && (
                            <Typography variant="body">• {this.state.groupTwo}</Typography>
                          )}
                          {this.state.groupThree && (
                            <Typography>• {this.state.groupThree}</Typography>
                          )}
                    </div>
                    )}
                    {(this.state.groupOne === "" || this.state.groupTwo === "" || this.state.groupThree === "") && (
                            <div>
                              <br />
                            <Tooltip title="Add group" placement="right">
                            <IconButton 
                              className="button"
                              onClick={this.handleGroupsOpen}
                              style={{
                                marginTop: "-10px",
                                marginBottom: "-10px"
                              }}>
                              <AddCircle color="secondary" />
                            </IconButton>
                          </Tooltip>
                          </div>
                          )}
                          <Dialog
                        overlayStyle={{ backgroundColor: "transparent" }}
                        open={this.state.groupOpen}
                      >
                        <DialogTitle
                          style={{ cursor: "move" }}
                          id="draggable-dialog-title"
                        >
                          Edit Groups
                        </DialogTitle>
                        <DialogContent>
                          <TextField
                            autofocus
                            margin="dense"
                            id="groupOne"
                            autoComplete="off"
                            name="groupOne"
                            label="Group 1"
                            defaultValue={this.state.groupOne}
                            fullWidth
                            type="text"
                            onChange={this.handleChange}
                          />
                          <TextField
                            autofocus
                            margin="dense"
                            id="groupTwo"
                            autoComplete="off"
                            name="groupTwo"
                            label="Group 2"
                            defaultValue={this.state.groupTwo}
                            fullWidth
                            type="text"
                            onChange={this.handleChange}
                          />
                          <TextField
                            autofocus
                            margin="dense"
                            id="groupThree"
                            autoComplete="off"
                            name="groupThree"
                            label="Group 3"
                            defaultValue={this.state.groupThree}
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
                  <Card raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: "red",
                      height: "100%",
                      marginBottom: "-5px",
                    }}>
                    <CardContent>
                  {this.state.greekLife && (
                    <div>
                      <Typography variant="h5">Greek Organization{" "}
                      <Tooltip title="Edit greek organization" placement="right">
                      <IconButton 
                        className="button"
                        onClick={this.handleGreekOpen}
                        style={{
                          marginTop: "-10px",
                          marginBottom: "-10px"
                        }}>
                        <EditIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
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
                  <TextField
                        autofocus
                        margin="dense"
                        name="greekLife"
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
                      </Typography>
                        <br />
                        <Typography>
                          • {this.state.greekLife}
                        </Typography>
                    </div>
                    )}
                    {this.state.greekLife === "" && (
                          <div>
                            <Typography variant="h5">Greek Organization</Typography>
                            <br />
                            <Tooltip title="Add greek organization" placement="right">
                      <IconButton 
                        className="button"
                        onClick={this.handleGreekOpen}
                        style={{
                          marginTop: "-10px",
                          marginBottom: "-10px"
                        }}>
                        <AddCircle color="secondary" />
                      </IconButton>
                    </Tooltip>
                        </div>
                        )}
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
                  <TextField
                        autofocus
                        margin="dense"
                        name="greekLife"
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
                <Grid container>
                  <Grid item sm />
                  <Grid>
                {/* <Card
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
                      Concentration(s): {this.state.majorOne}
                      {this.state.majorTwo && `, ${this.state.majorTwo}`}
                      {this.state.majorThree && `, ${this.state.majorThree}`}
                    </Typography>
                    {this.state.varsitySportOne && (
                      <Typography variant="body1">
                        Sport(s): {this.state.varsitySportOne}
                        {this.state.varsitySportTwo &&
                          `, ${this.state.varsitySportTwo}`}
                      </Typography>
                    )}
                    {this.state.groupOne && (
                      <Typography variant="body1">
                        Group(s): {this.state.groupOne}
                        {this.state.groupTwo &&
                          `, ${this.state.groupTwo}`}
                        {this.state.groupThree &&
                          `, ${this.state.groupThree}`}
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
                <br /> */}
                </Grid>
            <Grid item sm />
            </Grid>
              </CardContent>
            </Card>
            
            <br />
            {/* <Grid container spacing={2}>
              <Grid item component="Card" sm>
                <Card raised style={{ height: "100%" }}>
                  <CardContent align="center">
                    <Typography variant="h3">
                      Groups{" "}
                      <Tooltip title="Edit groups" placement="right">
                        <IconButton
                          onClick={this.handleGroupsOpen}
                          className="button"
                        >
                          <EditIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                      <Dialog
                        overlayStyle={{ backgroundColor: "transparent" }}
                        open={this.state.groupOpen}
                      >
                        <DialogTitle
                          style={{ cursor: "move" }}
                          id="draggable-dialog-title"
                        >
                          Edit Groups
                        </DialogTitle>
                        <DialogContent>
                          <TextField
                            autofocus
                            margin="dense"
                            id="groupOne"
                            autoComplete="off"
                            name="groupOne"
                            label="Group 1"
                            defaultValue={this.state.groupOne}
                            fullWidth
                            type="text"
                            onChange={this.handleChange}
                          />
                          <TextField
                            autofocus
                            margin="dense"
                            id="groupTwo"
                            autoComplete="off"
                            name="groupTwo"
                            label="Group 2"
                            defaultValue={this.state.groupTwo}
                            fullWidth
                            type="text"
                            onChange={this.handleChange}
                          />
                          <TextField
                            autofocus
                            margin="dense"
                            id="groupThree"
                            autoComplete="off"
                            name="groupThree"
                            label="Group 3"
                            defaultValue={this.state.groupThree}
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
                    </Typography>
                    <hr />
                    <br />
                    {[
                      this.state.groupOne,
                      this.state.groupTwo,
                      this.state.groupThree,
                    ].map((group) => (
                      <Typography variant="body1">{group}</Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item component="Card" sm>
                <Card raised style={{ height: "100%" }}>
                  <CardContent align="center">
                    <Typography variant="h3">
                      Interests{" "}
                      <Tooltip title="Edit interests" placement="right">
                        <IconButton
                          onClick={this.handleInterestsOpen}
                          className="button"
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
                          <Typography variant="h5">General</Typography>
                          <TextField
                            autofocus
                            margin="dense"
                            id="interestOne"
                            name="interestOne"
                            autoComplete="off"
                            label="1st Interest"
                            defaultValue={this.state.interestOne}
                            fullWidth
                            required
                            type="text"
                            onChange={this.handleChange}
                          />
                          <TextField
                            autofocus
                            margin="dense"
                            id="interestTwo"
                            name="interestTwo"
                            autoComplete="off"
                            label="2nd Interest"
                            defaultValue={this.state.interestTwo}
                            fullWidth
                            required
                            type="text"
                            onChange={this.handleChange}
                          />
                          <TextField
                            autofocus
                            margin="dense"
                            id="interestThree"
                            name="interestThree"
                            autoComplete="off"
                            label="3rd Interest"
                            defaultValue={this.state.interestThree}
                            fullWidth
                            required
                            type="text"
                            onChange={this.handleChange}
                          />
                          <TextField
                            autofocus
                            margin="dense"
                            id="interestFour"
                            name="interestFour"
                            autoComplete="off"
                            label="4th Interest"
                            defaultValue={this.state.interestFour}
                            fullWidth
                            type="text"
                            onChange={this.handleChange}
                          />
                          <TextField
                            autofocus
                            margin="dense"
                            id="interestFive"
                            name="interestFive"
                            autoComplete="off"
                            label="5th Interest"
                            defaultValue={this.state.interestFive}
                            fullWidth
                            type="text"
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <Typography variant="h5">Athletic</Typography>
                          <TextField
                            autofocus
                            margin="dense"
                            id="affinitySportOne"
                            name="affinitySportOne"
                            autoComplete="off"
                            label="1st Interest"
                            defaultValue={this.state.affinitySportOne}
                            fullWidth
                            type="text"
                            onChange={this.handleChange}
                          />
                          <TextField
                            autofocus
                            margin="dense"
                            id="affinitySportTwo"
                            name="affinitySportTwo"
                            autoComplete="off"
                            label="2nd Interest"
                            defaultValue={this.state.affinitySportTwo}
                            fullWidth
                            type="text"
                            onChange={this.handleChange}
                          />
                          <TextField
                            autofocus
                            margin="dense"
                            id="affinitySportThree"
                            name="affinitySportThree"
                            autoComplete="off"
                            label="3rd Interest"
                            defaultValue={this.state.affinitySportThree}
                            fullWidth
                            type="text"
                            onChange={this.handleChange}
                          />
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
                              this.state.interestOne === "" ||
                              this.state.interestTwo === "" ||
                              this.state.interestThree === ""
                            }
                          >
                            Save Changes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Typography>
                    <hr />
                    <br />

                    <Typography variant="h5">General</Typography>
                    <Grid container>
                      <Grid item sm>
                        <Typography variant="body1">
                          • {this.state.interests1}
                        </Typography>
                        <Typography variant="body1">
                          • {this.state.interests2}
                        </Typography>

                        <Typography variant="body1">
                          • {this.state.interests3}
                        </Typography>
                      </Grid>
                      <Grid item sm>
                        <Typography variant="body1">
                          • {this.state.interestTwo}
                        </Typography>
                        {this.state.interestFour && (
                          <Typography variant="body1">
                            • {this.state.interestFour}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>

                    <br />

                    {(this.state.affinitySportOne ||
                      this.state.affinitySportTwo ||
                      this.state.affinitySportThree) && (
                      <Typography variant="h5">Athletic</Typography>
                    )}
                    <Grid container>
                      <Grid item sm>
                        {this.state.affinitySportOne && (
                          <Typography variant="body1">
                            • {this.state.affinitySportOne}
                          </Typography>
                        )}
                        {this.state.affinitySportThree && (
                          <Typography variant="body1">
                            • {this.state.affinitySportThree}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item sm>
                        {this.state.affinitySportTwo && (
                          <Typography variant="body1">
                            • {this.state.affinitySportTwo}
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
                    <Book />
                    <Typography variant="body1">
                      Book: {this.state.favoriteBook}
                    </Typography>
                    <br />
                    <Movie />
                    <Typography variant="body1">
                      Movie: {this.state.favoriteMovie}
                    </Typography>
                    <br />
                    <Tv />
                    <Typography variant="body1">
                      Show: {this.state.favoriteShow}
                    </Typography>
                    <br />
                    <Music />
                    <Typography variant="body1">
                      Artist: {this.state.favoriteArtist}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <br />
             */}
            <Card raised>
              <CardContent align="center">
                <Typography variant="h3">Interests</Typography>
                <hr />
                <br />
                <Grid container spacing={2}>
                  <Grid item sm>
                    <Card raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: `${palette[7]}`,
                      height: "100%"
                    }}>
                      <CardContent>
                      <Typography variant="h5" style={{ color: `${palette[7]}` }}>
                        Career and Academic
                      </Typography>
                      <br />
                      {this.state.interests1.map((interest) => {
                        return <Typography>• {interest}</Typography>
                      })}
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item sm>
                    <Card raised 
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: `${palette[0]}`,
                      height: "100%"
                    }}>
                      <CardContent>
                      <Typography variant="h5" style={{ color: `${palette[0]}` }}>
                        Physical Activity and Wellness
                      </Typography>
                      <br />
                      {this.state.interests2.map((interest) => {
                        return <Typography>• {interest}</Typography>
                      })}
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item sm>
                    <Card raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: `${palette[3]}`,
                      height: "100%"
                    }}>
                      <CardContent>
                      <Typography variant="h5" style={{ color: `${palette[3]}` }}>
                        General Hobbies
                      </Typography>
                      <br />
                      {this.state.interests3.map((interest) => {
                        return <Typography>• {interest}</Typography>
                      })}
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
          </div>
        )}
      </div>
    );
  }
}

export default profileView;

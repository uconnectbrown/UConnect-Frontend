// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";

// Components
import NavBar from "../components/NavBar";

// MUI Stuff
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/ArrowBack";
import ButtonBase from "@material-ui/core/ButtonBase";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";
import FilledChatIcon from "@material-ui/icons/ChatBubble";
import Tooltip from "@material-ui/core/Tooltip";
import StarIcon from "@material-ui/icons/StarOutline";

// Import Data
import majorList from "../resources/majors";
import varsitySports from "../resources/varsitySports";
import greekLife from "../resources/greekLife";

class courseView extends Component {
  // Needed props: code, name, color
  state = {
    // Axios
    students: [],
    featured: [],
    // Other
    selected: [],
    searchTerm: "",
    searchCriteria: "",
    sortBy: "courseOverlap",
    loading: true,
    messageNames: [],
    messageImages: [],
    messageIds: [],
    allIds: [],
    messaging: false,
  };

  componentDidMount() {
    console.log(majorList);
    if (!this.props.location.state) {
      this.props.history.push("/coursesView");
    } else {
      const code = this.props.location.state.code;
      const codeNS = code.replace(/\s/g, "");
      axios
        .get(`/students/${auth.currentUser.email}/${codeNS}`)
        .then((res) => {
          this.setState({
            students: res.data,
            selected: res.data.map((student) => false),
          });
        })
        .then(() => {
          let compScores = this.state.students.map((student) => {
            return student.compScores[0];
          });
          let compScores_ = this.state.students.map((student) => {
            return student.compScores[0];
          });
          compScores.sort((a, b) => (a < b ? 1 : b < a ? -1 : 0));
          // console.log(compScores)
          let featuredProfiles = [];
          let indices = [];
          for (let i = 0; i < 3; i++) {
            let index = compScores_.indexOf(compScores[i]);
            indices.push(index);
            featuredProfiles.push(this.state.students[index]);
          }
          const numStudents = this.state.students.length;
          let indexArray = [];
          for (let i = 0; i < numStudents; i++) {
            indexArray.push(i);
          }
          let newProfiles = [];
          indexArray.map((index) => {
            if (indices.includes(index)) {
              let newProfile = this.state.students[index];
              newProfile["featured"] = true;
              newProfiles.push(newProfile);
            } else {
              let newProfile = this.state.students[index];
              newProfile["featured"] = false;
              newProfiles.push(newProfile);
            }
          });
          this.setState(
            { featured: featuredProfiles, students: newProfiles },
            () => {
              console.log(this.state.students);
              this.setState({ loading: false });
            }
          );
        })
        .catch((err) => console.log(err));
    }
  }

  handleClickOpen = (index) => {
    this.setState({ open: true });
    this.props.history.push({
      pathname: "/studentView",
      state: {
        // Props upon return
        code: this.props.location.state.code,
        name: this.props.location.state.name,
        color: this.props.location.state.color,
        // Prop for studentView
        recipientId: this.state.students[index].email.split("@")[0],
      },
    });
  };

  handleFeaturedClickOpen = (index) => {
    this.setState({ open: true });
    this.props.history.push({
      pathname: "/studentView",
      state: {
        // Props upon return
        code: this.props.location.state.code,
        name: this.props.location.state.name,
        color: this.props.location.state.color,
        numCourses: this.props.location.state.numCourses,
        // Prop for studentView
        recipientId: this.state.featured[index].email.split("@")[0],
      },
    });
  };

  handleCreateMessage = () => {
    if (this.state.selected.filter(Boolean).length == 1) {
      this.props.history.push({
        pathname: "/messageView",
        state: {
          // Props that messageView needs
          recipientName: this.state.messageNames[0],
          recipientImage: this.state.messageImages[0],
          recipientId: this.state.messageIds[0],
          previousPage: "courseView",
          // Props that courseView needs upon return
          code: this.props.location.state.code,
          name: this.props.location.state.name,
          color: this.props.location.state.color,
          numCourses: this.props.location.state.numCourses,
        },
      });
    } else if (this.state.selected.filter(Boolean).length > 1) {
      this.props.history.push({
        pathname: "/groupMessageView",
        state: {
          // Props that groupMessageView needs
          recipientNames: this.state.messageNames,
          recipientImages: this.state.messageImages,
          recipientIds: this.state.messageIds,
          previousPage: "courseView",
          // Props that courseView needs upon return
          code: this.props.location.state.code,
          name: this.props.location.state.name,
          color: this.props.location.state.color,
          numCourses: this.props.location.state.numCourses,
          allIds: this.state.allIds,
        },
      });
    }
  };

  handleRadio = (index) => {
    this.onUpdateItem(index);
  };

  onUpdateItem = (i) => {
    this.setState(
      (state) => {
        const selected = state.selected.map((item, j) => {
          if (j === i) {
            return !item;
          } else {
            return item;
          }
        });

        return {
          selected,
        };
      },
      () => {
        this.handleParticipants();
      }
    );
  };

  handleParticipants = () => {
    let participantNames = [];
    let participantImages = [];
    let participantIds = [];
    let allParticipantIds = [];
    for (let i = 0; i < this.state.students.length; i++) {
      if (this.state.selected[i]) {
        participantNames.push(
          this.state.students[i].firstName +
            " " +
            this.state.students[i].lastName
        );
        participantIds.push(this.state.students[i].email.split("@")[0]);
        allParticipantIds.push(this.state.students[i].email.split("@")[0]);
        participantImages.push(this.state.students[i].imageUrl);
      }
    }

    allParticipantIds.push(auth.currentUser.email.split("@")[0]);

    this.setState({
      messageNames: participantNames,
      messageImages: participantImages,
      messageIds: participantIds,
      allIds: allParticipantIds,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCriteria = (event) => {
    this.setState({ searchCriteria: event.target.value, searchTerm: "" });
  };

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSort = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  compare = (a1, a2) => a1.filter((v) => a2.includes(v)).length;

  render() {
    const code = this.props.location.state.code;
    const name = this.props.location.state.name;
    const color = this.props.location.state.color;
    const numStudents = this.state.students.length;
    let indexArray = [];
    for (let i = 0; i < numStudents; i++) {
      indexArray.push(i);
    }
    let newIndexArray = [];
    let students = this.state.students;
    let featured = this.state.featured;
    // console.log(varsitySports.props.children[0].props.value)
    let sports = [];
    {
      students.map((student) => {
        sports.push(student.varsitySports[0]);
        sports.push(student.varsitySports[1]);
      });
    }
    sports = sports.filter(Boolean);
    // let sports = varsitySports.props.children.map((child) => {
    //   child.props.value
    // })
    // console.log(sports)

    // need to update backend to include the courses if we want to do the overlap here...
    // let theirCourseCodes = this.state.students.map((student) => (
    //   student.courses.map((course) => (
    //     course.courseCode
    //   ))
    // ))
    // let courseOverlap = theirCourseCodes.map((code) => this.compare(myCourseCodes, code))
    // console.log(courseOverlap)

    if (this.state.sortBy === "firstName" || this.state.sortBy === "lastName") {
      students.sort((a, b) =>
        a[`${this.state.sortBy}`] > b[`${this.state.sortBy}`]
          ? 1
          : b[`${this.state.sortBy}`] > a[`${this.state.sortBy}`]
          ? -1
          : 0
      );
    } else if (
      this.state.sortBy === "classYear" ||
      this.state.sortBy === "courseOverlap"
    ) {
      students.sort((a, b) =>
        a[`${this.state.sortBy}`] < b[`${this.state.sortBy}`]
          ? 1
          : b[`${this.state.sortBy}`] < a[`${this.state.sortBy}`]
          ? -1
          : 0
      );
    } else if (this.state.sortBy === "classYearD") {
      students.sort((a, b) =>
        a["classYear"] < b["classYear"]
          ? 1
          : b["classYear"] < a["classYear"]
          ? -1
          : 0
      );
    } else if (this.state.sortBy === "classYearA") {
      students.sort((a, b) =>
        a["classYear"] > b["classYear"]
          ? 1
          : b["classYear"] > a["classYear"]
          ? -1
          : 0
      );
    }
    // else if (this.state.sortBy === "courseOverlap") {
    //   students.sort((a, b) =>
    //     courseOverlap[students.indexOf(a)] < courseOverlap[students.indexOf(b)]
    //       ? 1
    //       : courseOverlap[students.indexOf(b)] < courseOverlap[students.indexOf(a)]
    //       ? -1
    //       : 0
    //   );
    //   courseOverlap.sort((a, b) =>
    //     a < b
    //     ? 1
    //     : b < a
    //     ? -1
    //     : 0
    //   );
    // }

    return (
      <div>
        <NavBar />
        <IconButton
          variant="contained"
          style={{ color: `${color}` }}
          component={Link}
          to="/coursesView"
        >
          <BackIcon style={{ marginRight: "3px" }} />
          Back
        </IconButton>
        <Typography
          variant="h3"
          align="center"
          style={{
            marginTop: "-40px",
            marginBottom: "30px",
            color: `${color}`,
          }}
        >
          {code}: {name}
        </Typography>
        <Typography align="center">
          <TextField
            id="searchCriteria"
            name="searchCriteria"
            select
            label="Filter by..."
            value={this.state.searchCriteria}
            onChange={this.handleCriteria}
            variant="outlined"
            helperText="Please select a search criteria"
            size={"small"}
          >
            <MenuItem key="name" value="name">
              Name
            </MenuItem>
            <MenuItem key="classYear" value="classYear">
              Graduating Class
            </MenuItem>
            <MenuItem key="majors" value="majors">
              Concentration
            </MenuItem>
            {/* <MenuItem key="interests" value="interests">
              General Interests
            </MenuItem> */}
            {/* <MenuItem key="groups" value="groups">
              Groups
            </MenuItem> */}
            <MenuItem key="varsitySports" value="varsitySports">
              Varsity Sport
            </MenuItem>
            {/* <MenuItem key="pickUpSports" value="pickUpSports">
              Pick-Up Sport
            </MenuItem> */}
            {/* <MenuItem key="greekLife" value="greekLife">
              Greek Organization
            </MenuItem> */}
          </TextField>

          {this.state.searchCriteria === "name" && (
            <TextField
              id="name"
              name="name"
              autoComplete="off"
              type="text"
              label="Search..."
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              variant="outlined"
              helperText="Please search a name"
              size={"small"}
            />
          )}
          {this.state.searchCriteria === "classYear" && (
            <TextField
              id="classYear"
              name="classYear"
              select
              label="Search..."
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              variant="outlined"
              helperText="Please select a graduating class"
              size={"small"}
            >
              <MenuItem key="2021.5" value="2021.5">
                2021.5 (
                {
                  students
                    .map((student) => {
                      if (student.classYear === "2021.5") {
                        return student;
                      }
                    })
                    .filter(Boolean).length
                }
                )
              </MenuItem>
              <MenuItem key="2022" value="2022">
                2022 (
                {
                  students
                    .map((student) => {
                      if (student.classYear === "2022") {
                        return student;
                      }
                    })
                    .filter(Boolean).length
                }
                )
              </MenuItem>
              <MenuItem key="2022.5" value="2022.5">
                2022.5 (
                {
                  students
                    .map((student) => {
                      if (student.classYear === "2022.5") {
                        return student;
                      }
                    })
                    .filter(Boolean).length
                }
                )
              </MenuItem>
              <MenuItem key="2023" value="2023">
                2023 (
                {
                  students
                    .map((student) => {
                      if (student.classYear === "2023") {
                        return student;
                      }
                    })
                    .filter(Boolean).length
                }
                )
              </MenuItem>
              <MenuItem key="2023.5" value="2023.5">
                2023.5 (
                {
                  students
                    .map((student) => {
                      if (student.classYear === "2023.5") {
                        return student;
                      }
                    })
                    .filter(Boolean).length
                }
                )
              </MenuItem>
              <MenuItem key="2024" value="2024">
                2024 (
                {
                  students
                    .map((student) => {
                      if (student.classYear === "2024") {
                        return student;
                      }
                    })
                    .filter(Boolean).length
                }
                )
              </MenuItem>
              <MenuItem key="2024.5" value="2024.5">
                2024.5 (
                {
                  students
                    .map((student) => {
                      if (student.classYear === "2024.5") {
                        return student;
                      }
                    })
                    .filter(Boolean).length
                }
                )
              </MenuItem>
              <MenuItem key="2025" value="2025">
                2025 (
                {
                  students
                    .map((student) => {
                      if (student.classYear === "2025") {
                        return student;
                      }
                    })
                    .filter(Boolean).length
                }
                )
              </MenuItem>
            </TextField>
          )}
          {this.state.searchCriteria === "majors" && (
            <TextField
              variant="outlined"
              name="majors"
              autoComplete="off"
              size={"small"}
              label="Search..."
              helperText="Please search a concentration"
              onChange={this.handleSearch}
              InputProps={{
                endAdornment: majorList,
                inputProps: {
                  list: "majors",
                },
              }}
            />
          )}
          {this.state.searchCriteria === "interests" && (
            <TextField
              id="interests"
              name="interests"
              autoComplete="off"
              type="text"
              label="Search..."
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              helperText="Please search a general interest"
              variant="outlined"
              size={"small"}
            />
          )}
          {this.state.searchCriteria === "groups" && (
            <TextField
              id="groups"
              name="groups"
              autoComplete="off"
              type="text"
              label="Search..."
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              helperText="Please search a group"
              variant="outlined"
              size={"small"}
            />
          )}
          {this.state.searchCriteria === "varsitySports" && (
            <TextField
              variant="outlined"
              name="varsitySports"
              autoComplete="off"
              size={"small"}
              label="Search..."
              helperText="Please search a varsity sport"
              onChange={this.handleSearch}
              InputProps={{
                endAdornment: varsitySports,
                inputProps: {
                  list: "varsitySports",
                },
              }}
            />
          )}
          {this.state.searchCriteria === "pickUpSports" && (
            <TextField
              id="pickUpSports"
              name="pickUpSports"
              autoComplete="off"
              type="text"
              label="Search..."
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              helperText="Please search a pick-up sport"
              variant="outlined"
              size={"small"}
            />
          )}
          {this.state.searchCriteria === "greekLife" && (
            <TextField
              variant="outlined"
              name="greekLife"
              autoComplete="off"
              size={"small"}
              label="Search..."
              helperText="Please search a greek organization"
              onChange={this.handleSearch}
              InputProps={{
                endAdornment: greekLife,
                inputProps: {
                  list: "greekLife",
                },
              }}
            />
          )}

          {this.state.searchCriteria === "" &&
            (this.state.sortBy === "firstName" ||
              this.state.sortBy === "lastName") && (
              <span
                style={{
                  marginRight: "400px",
                }}
              />
            )}
          {this.state.searchCriteria === "name" &&
            (this.state.sortBy === "firstName" ||
              this.state.sortBy === "lastName") && (
              <span
                style={{
                  marginRight: "206px",
                }}
              />
            )}
          {this.state.searchCriteria === "classYear" &&
            (this.state.sortBy === "firstName" ||
              this.state.sortBy === "lastName") && (
              <span
                style={{
                  marginRight: "187px",
                }}
              />
            )}
          {this.state.searchCriteria === "majors" &&
            (this.state.sortBy === "firstName" ||
              this.state.sortBy === "lastName") && (
              <span
                style={{
                  marginRight: "199px",
                }}
              />
            )}
          {this.state.searchCriteria === "interests" &&
            (this.state.sortBy === "firstName" ||
              this.state.sortBy === "lastName") && (
              <span
                style={{
                  marginRight: "187px",
                }}
              />
            )}

          {this.state.searchCriteria === "groups" &&
            (this.state.sortBy === "firstName" ||
              this.state.sortBy === "lastName") && (
              <span
                style={{
                  marginRight: "206px",
                }}
              />
            )}
          {this.state.searchCriteria === "varsitySports" &&
            (this.state.sortBy === "firstName" ||
              this.state.sortBy === "lastName") && (
              <span
                style={{
                  marginRight: "206px",
                }}
              />
            )}
          {this.state.searchCriteria === "affinitySports" &&
            (this.state.sortBy === "firstName" ||
              this.state.sortBy === "lastName") && (
              <span
                style={{
                  marginRight: "182px",
                }}
              />
            )}
          {this.state.searchCriteria === "pickUpSports" &&
            (this.state.sortBy === "firstName" ||
              this.state.sortBy === "lastName") && (
              <span
                style={{
                  marginRight: "203px",
                }}
              />
            )}
          {this.state.searchCriteria === "greekLife" &&
            (this.state.sortBy === "firstName" ||
              this.state.sortBy === "lastName") && (
              <span
                style={{
                  marginRight: "170px",
                }}
              />
            )}

          {this.state.searchCriteria === "" &&
            this.state.sortBy === "classYearD" && (
              <span
                style={{
                  marginRight: "291px",
                }}
              />
            )}
          {this.state.searchCriteria === "name" &&
            this.state.sortBy === "classYearD" && (
              <span
                style={{
                  marginRight: "97px",
                }}
              />
            )}
          {this.state.searchCriteria === "classYear" &&
            this.state.sortBy === "classYearD" && (
              <span
                style={{
                  marginRight: "78px",
                }}
              />
            )}
          {this.state.searchCriteria === "majors" &&
            this.state.sortBy === "classYearD" && (
              <span
                style={{
                  marginRight: "90px",
                }}
              />
            )}
          {this.state.searchCriteria === "interests" &&
            this.state.sortBy === "classYearD" && (
              <span
                style={{
                  marginRight: "78px",
                }}
              />
            )}
          {this.state.searchCriteria === "groups" &&
            this.state.sortBy === "classYearD" && (
              <span
                style={{
                  marginRight: "97px",
                }}
              />
            )}
          {this.state.searchCriteria === "varsitySports" &&
            this.state.sortBy === "classYearD" && (
              <span
                style={{
                  marginRight: "97px",
                }}
              />
            )}
          {this.state.searchCriteria === "affinitySports" &&
            this.state.sortBy === "classYearD" && (
              <span
                style={{
                  marginRight: "73px",
                }}
              />
            )}
          {this.state.searchCriteria === "pickUpSports" &&
            this.state.sortBy === "classYearD" && (
              <span
                style={{
                  marginRight: "94px",
                }}
              />
            )}
          {this.state.searchCriteria === "greekLife" &&
            this.state.sortBy === "classYearD" && (
              <span
                style={{
                  marginRight: "61px",
                }}
              />
            )}

          {this.state.searchCriteria === "" &&
            this.state.sortBy === "classYearA" && (
              <span
                style={{
                  marginRight: "301px",
                }}
              />
            )}
          {this.state.searchCriteria === "name" &&
            this.state.sortBy === "classYearA" && (
              <span
                style={{
                  marginRight: "107px",
                }}
              />
            )}
          {this.state.searchCriteria === "classYear" &&
            this.state.sortBy === "classYearA" && (
              <span
                style={{
                  marginRight: "88px",
                }}
              />
            )}
          {this.state.searchCriteria === "majors" &&
            this.state.sortBy === "classYearA" && (
              <span
                style={{
                  marginRight: "100px",
                }}
              />
            )}
          {this.state.searchCriteria === "interests" &&
            this.state.sortBy === "classYearA" && (
              <span
                style={{
                  marginRight: "88px",
                }}
              />
            )}
          {this.state.searchCriteria === "groups" &&
            this.state.sortBy === "classYearA" && (
              <span
                style={{
                  marginRight: "107px",
                }}
              />
            )}
          {this.state.searchCriteria === "varsitySports" &&
            this.state.sortBy === "classYearA" && (
              <span
                style={{
                  marginRight: "107px",
                }}
              />
            )}
          {this.state.searchCriteria === "affinitySports" &&
            this.state.sortBy === "classYearA" && (
              <span
                style={{
                  marginRight: "83px",
                }}
              />
            )}
          {this.state.searchCriteria === "pickUpSports" &&
            this.state.sortBy === "classYearA" && (
              <span
                style={{
                  marginRight: "104px",
                }}
              />
            )}
          {this.state.searchCriteria === "greekLife" &&
            this.state.sortBy === "classYearA" && (
              <span
                style={{
                  marginRight: "71px",
                }}
              />
            )}

          {this.state.searchCriteria === "" &&
            this.state.sortBy === "courseOverlap" && (
              <span
                style={{
                  marginRight: "282px",
                }}
              />
            )}
          {this.state.searchCriteria === "name" &&
            this.state.sortBy === "courseOverlap" && (
              <span
                style={{
                  marginRight: "88px",
                }}
              />
            )}
          {this.state.searchCriteria === "classYear" &&
            this.state.sortBy === "courseOverlap" && (
              <span
                style={{
                  marginRight: "69px",
                }}
              />
            )}
          {this.state.searchCriteria === "majors" &&
            this.state.sortBy === "courseOverlap" && (
              <span
                style={{
                  marginRight: "81px",
                }}
              />
            )}
          {this.state.searchCriteria === "interests" &&
            this.state.sortBy === "courseOverlap" && (
              <span
                style={{
                  marginRight: "69px",
                }}
              />
            )}
          {this.state.searchCriteria === "groups" &&
            this.state.sortBy === "courseOverlap" && (
              <span
                style={{
                  marginRight: "88px",
                }}
              />
            )}
          {this.state.searchCriteria === "varsitySports" &&
            this.state.sortBy === "courseOverlap" && (
              <span
                style={{
                  marginRight: "88px",
                }}
              />
            )}
          {this.state.searchCriteria === "affinitySports" &&
            this.state.sortBy === "courseOverlap" && (
              <span
                style={{
                  marginRight: "64px",
                }}
              />
            )}
          {this.state.searchCriteria === "pickUpSports" &&
            this.state.sortBy === "courseOverlap" && (
              <span
                style={{
                  marginRight: "85px",
                }}
              />
            )}
          {this.state.searchCriteria === "greekLife" &&
            this.state.sortBy === "courseOverlap" && (
              <span
                style={{
                  marginRight: "52px",
                }}
              />
            )}

          <TextField
            id="sortBy"
            name="sortBy"
            select
            label="Sort by..."
            value={this.state.sortBy}
            onChange={this.handleSort}
            variant="outlined"
            helperText="Please select a sorting criteria"
            size={"small"}
          >
            <MenuItem key="courseOverlap" value="courseOverlap">
              Course Overlap: Descending (Highest-Lowest)
            </MenuItem>
            <MenuItem key="firstName" value="firstName">
              First Name: Alphabetical (A-Z)
            </MenuItem>
            <MenuItem key="lastName" value="lastName">
              Last Name: Alphabetical (A-Z)
            </MenuItem>
            <MenuItem key="classYearA" value="classYearA">
              Graduating Class: Ascending (2021.5-2025)
            </MenuItem>
            <MenuItem key="classYearD" value="classYearD">
              Graduating Class: Descending (2025-2021.5)
            </MenuItem>
          </TextField>
        </Typography>
        <br />
        <br />
        {/* {this.state.loading && (
          <div align="center">
            <CircularProgress size={100} />
            <br />
            <br />
            <Typography variant="h4">Fetching students' data...</Typography>
          </div>
        )} */}
        {!this.state.loading && (
          <div>
            {!this.state.messaging && (
              <Button
                onClick={() => {
                  this.setState({ messaging: true });
                }}
                variant="contained"
                color="secondary"
              >
                New Message
              </Button>
            )}

            <br />

            {this.state.messaging && (
              <div>
                <Button
                  onClick={() => {
                    this.handleCreateMessage();
                  }}
                  variant="contained"
                  color="secondary"
                  disabled={
                    this.state.messageNames.length > 3 ||
                    this.state.messageNames < 1
                  }
                >
                  {this.state.messageNames.length < 4
                    ? `Start Chat (${this.state.messageNames.length})`
                    : `Max size of 4 exceeded`}
                </Button>
                <Button
                  onClick={() => {
                    this.setState({
                      messaging: false,
                      messageNames: [],
                      messageImages: [],
                      messageIds: [],
                      selected: this.state.students.map((student) => false),
                    });
                  }}
                  variant="contained"
                  color="primary"
                >
                  Cancel
                </Button>
                {this.state.messageNames.length === 1 && (
                  <Typography>{this.state.messageNames[0]}</Typography>
                )}
                {this.state.messageNames.length === 2 && (
                  <Typography>
                    {this.state.messageNames[0]} and{" "}
                    {this.state.messageNames[1]}
                  </Typography>
                )}
                {this.state.messageNames.length === 3 && (
                  <Typography>
                    {this.state.messageNames[0]} , {this.state.messageNames[1]}{" "}
                    , and
                    {this.state.messageNames[2]}
                  </Typography>
                )}
              </div>
            )}

            {this.state.searchCriteria === "" && (
              <div>
                <br />
                <Typography variant="h4">Featured Profiles</Typography>
                <br />
                <GridList cols={5} spacing={20} cellHeight="auto">
                  {[0, 1, 2].map((index) => {
                    return (
                      <GridListTile item component="Card" sm>
                        <Card
                          style={{
                            borderStyle: "solid",
                            borderWidth: "4px",
                            borderColor: `${color}`,
                            borderRadius: "5%",
                            height: "95%",
                          }}
                          align="center"
                        >
                          {/* {this.state.messaging && (
                    <Tooltip title="Add to Chat" placement="right">
                      <IconButton
                        onClick={() => {
                          this.handleRadio(index);
                        }}
                        style={{ marginBottom: "-15px" }}
                      >
                        {!this.state.selected[index] && (
                          <ChatIcon color="secondary" />
                        )}
                        {this.state.selected[index] && (
                          <FilledChatIcon color="secondary" />
                        )}
                      </IconButton>
                    </Tooltip>
                  )} */}

                          <ButtonBase
                            size="large"
                            color="primary"
                            onClick={() => this.handleFeaturedClickOpen(index)}
                            style={{ width: "100%" }}
                          >
                            <CardContent>
                              <div>
                                {/* <Typography>
                          Compatibility: {featured[index].compScores[0]}
                        </Typography>
                        <Typography variant="h6">
                          Course Overlap: {featured[index].compScores[1]}/
                          {numCourses}
                        </Typography>
  
                        <br /> */}
                                <div>
                                  <Tooltip
                                    title="Featured profile"
                                    placement="right"
                                  >
                                    <StarIcon
                                      color="primary"
                                      style={{
                                        marginTop: "-8px",
                                        marginBottom: "5px",
                                      }}
                                    />
                                  </Tooltip>
                                  <br />
                                </div>
                                <img
                                  alt="student"
                                  src={featured[index].imageUrl}
                                  style={{
                                    marginBottom: "10px",
                                    width: 120,
                                    height: 120,
                                    objectFit: "cover",
                                    borderRadius: "10%",
                                    borderStyle: "solid",
                                    borderColor: `${color}`,
                                    borderWidth: "3px",
                                  }}
                                />
                                <Typography
                                  variant="h5"
                                  style={{
                                    marginBottom: "5px",
                                    lineHeight: "120%",
                                  }}
                                >
                                  {featured[index].firstName}{" "}
                                  {featured[index].lastName}
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  style={{
                                    marginBottom: "5px",
                                    lineHeight: "120%",
                                  }}
                                >
                                  Class of {featured[index].classYear}
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  style={{ lineHeight: "120%" }}
                                >
                                  {featured[index].majors[0]}
                                  {featured[index].majors[1] &&
                                    `, ${featured[index].majors[1]}`}
                                  {featured[index].majors[2] &&
                                    `, ${featured[index].majors[2]}`}
                                </Typography>
                              </div>
                            </CardContent>
                          </ButtonBase>
                        </Card>
                      </GridListTile>
                    );
                  })}
                </GridList>
              </div>
            )}

            <br />
            <Typography variant="h4">
              Class Roster (
              {
                indexArray
                  .map((index) => {
                    if (this.state.searchCriteria === "") {
                      return index;
                    } else if (this.state.searchCriteria === "name") {
                      if (
                        `${students[index]["firstName"]} ${students[index]["lastName"]}`
                          .toString()
                          .toLowerCase()
                          .includes(
                            this.state.searchTerm.toString().toLowerCase()
                          )
                      ) {
                        return index;
                      }
                    } else if (
                      students[index][`${this.state.searchCriteria}`]
                        .toString()
                        .toLowerCase()
                        .includes(
                          this.state.searchTerm.toString().toLowerCase()
                        )
                    ) {
                      return index;
                    }
                  })
                  .filter((index) => {
                    return index !== undefined;
                  }).length
              }
              )
            </Typography>
            <br />
            <GridList cols={5} spacing={20} cellHeight="auto">
              {
                (newIndexArray = indexArray
                  .map((index) => {
                    if (this.state.searchCriteria === "") {
                      return index;
                    } else if (this.state.searchCriteria === "name") {
                      if (
                        `${students[index]["firstName"]} ${students[index]["lastName"]}`
                          .toString()
                          .toLowerCase()
                          .includes(
                            this.state.searchTerm.toString().toLowerCase()
                          )
                      ) {
                        return index;
                      }
                    } else if (
                      students[index][`${this.state.searchCriteria}`]
                        .toString()
                        .toLowerCase()
                        .includes(
                          this.state.searchTerm.toString().toLowerCase()
                        )
                    ) {
                      return index;
                    }
                  })
                  .filter((index) => {
                    return index !== undefined;
                  }))
              }
              {newIndexArray.map((index) => (
                <GridListTile item component="Card" sm>
                  <Card
                    style={{
                      borderStyle: "solid",
                      borderWidth: "4px",
                      borderColor: `${color}`,
                      borderRadius: "5%",
                      height: "97%",
                    }}
                    align="center"
                  >
                    {this.state.messaging && (
                      <Tooltip title="Add to Chat" placement="right">
                        <IconButton
                          onClick={() => {
                            this.handleRadio(index);
                          }}
                          style={{ marginBottom: "-15px" }}
                        >
                          {!this.state.selected[index] && (
                            <ChatIcon color="secondary" />
                          )}
                          {this.state.selected[index] && (
                            <FilledChatIcon color="secondary" />
                          )}
                        </IconButton>
                      </Tooltip>
                    )}

                    <ButtonBase
                      size="large"
                      color="primary"
                      onClick={() => this.handleClickOpen(index)}
                      style={{ width: "100%" }}
                    >
                      <CardContent>
                        <div>
                          {/* <Typography>
                            Compatibility: {students[index].compScores[0]}
                          </Typography>
                          <Typography variant="h6">
                            Course Overlap: {students[index].compScores[1]}/
                            {numCourses}
                          </Typography>

                          <br /> */}
                          {students[index].featured && (
                            <div>
                              <Tooltip
                                title="Featured profile"
                                placement="right"
                              >
                                <StarIcon
                                  color="primary"
                                  style={{
                                    marginTop: "-8px",
                                    marginBottom: "5px",
                                  }}
                                />
                              </Tooltip>
                              <br />
                            </div>
                          )}
                          <img
                            alt="student"
                            src={students[index].imageUrl}
                            style={{
                              marginBottom: "10px",
                              width: 120,
                              height: 120,
                              objectFit: "cover",
                              borderRadius: "10%",
                              borderStyle: "solid",
                              borderColor: `${color}`,
                              borderWidth: "3px",
                            }}
                          />

                          {/* <br />
                          <br /> */}
                          <Typography
                            variant="h5"
                            style={{ marginBottom: "5px", lineHeight: "120%" }}
                          >
                            {students[index].firstName}{" "}
                            {students[index].lastName}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            style={{ marginBottom: "5px", lineHeight: "120%" }}
                          >
                            Class of {students[index].classYear}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            style={{ lineHeight: "120%" }}
                          >
                            {students[index].majors[0]}
                            {students[index].majors[1] &&
                              `, ${students[index].majors[1]}`}
                            {students[index].majors[2] &&
                              `, ${students[index].majors[2]}`}
                          </Typography>
                        </div>
                      </CardContent>
                    </ButtonBase>
                  </Card>
                </GridListTile>
              ))}
            </GridList>
          </div>
        )}
      </div>
    );
  }
}

export default courseView;

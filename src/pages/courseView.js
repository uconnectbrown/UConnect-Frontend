// think about place for the back button
// color code cards based on chosen theme
// make cards a little more sleek in design
// add filter bar and consider how to work search

// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Components
import NavBar from "../components/NavBar";

// MUI Stuff
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import Slide from "@material-ui/core/Slide";

// Import Data
import majorList from "../resources/majors";
import varsitySports from "../resources/varsitySports";
import emptyProfile from "../resources/emptyProfile";
import greekLife from "../resources/greekLife";

class courseView extends Component {
  state = {
    students: [],
    open: false,
    email: "",
    searchTerm: "",
    searchCriteria: "",
    sortBy: "firstName",
  };

  componentDidMount() {
    const courseCode = localStorage.courseCode;
    axios
      .get(`/course/${courseCode}`)
      .then((res) => {
        this.setState({ students: [...this.state.students, ...res.data] });
        console.log(this.state.students);
      })
      .catch((err) => console.log(err));
  }

  handleBack = () => {
    localStorage.removeItem("courseCode");
    localStorage.removeItem("code");
    localStorage.removeItem("name");
  };

  handleClickOpen = (index) => {
    this.setState({ open: true });
    localStorage.setItem("studentId", this.state.students[index].email);
    this.props.history.push("/studentView");
  };

  handleClose = () => {
    this.setState({ open: false });
    localStorage.removeItem("studentId");
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCriteria = (event) => {
    this.setState({ searchCriteria: event.target.value });
  }

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  handleSort = (event) => {
    this.setState({ sortBy: event.target.value });
  }

  render() {
    const code = localStorage.code;
    const name = localStorage.name;
    const numStudents = this.state.students.length;
    let indexArray = [];
    for (let i = 0; i < numStudents; i++) {
      indexArray.push(i);
    }
    let students = this.state.students;
    if (this.state.sortBy == "firstName" || this.state.sortBy == "lastName") {
      students.sort((a,b) => (a[`${this.state.sortBy}`] > b[`${this.state.sortBy}`]) ? 1 : ((b[`${this.state.sortBy}`] > a[`${this.state.sortBy}`]) ? -1 : 0))
    } else if (this.state.sortBy == "classYear") {
      students.sort((a,b) => (a[`${this.state.sortBy}`] < b[`${this.state.sortBy}`]) ? 1 : ((b[`${this.state.sortBy}`] < a[`${this.state.sortBy}`]) ? -1 : 0))
    }

    return (
      <div>
        <NavBar />
        <Typography variant="h3" align="center">
          {code}: {name}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/coursesView"
          onClick={this.handleBack}
        >
          Back
        </Button>
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
              <MenuItem key="interests" value="interests">
                General Interests
              </MenuItem>
              {/* Will need to edit updateCourses function call in the backend to include more fields 
              in the userDataCard element to get these other tabs to work. */}
              {/* <MenuItem key="groups" value="groups">
                Groups
              </MenuItem>
              <MenuItem key="varsitySports" value="varsitySports">
                Varsity Sport
              </MenuItem>
              <MenuItem key="affinitySports" value="affinitySports">
                Athletic Interests
              </MenuItem>
              <MenuItem key="greekLife" value="greekLife">
                Greek Organization
              </MenuItem> */}
            </TextField>

            {this.state.searchCriteria == "name" && (
              <TextField
                id="name"
                name="name"
                type="text"
                label="Name"
                value={this.state.searchTerm}
                onChange={this.handleSearch}
                variant="outlined"
                helperText="Please search a name"
                size={"small"}
              />
            )}
            {this.state.searchCriteria == "classYear" && (
              <TextField
              id="classYear"
              name="classYear"
              select
              label="Graduating Class"
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              variant="outlined"
              helperText="Please select a graduating class"
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
            )}
            {this.state.searchCriteria == "majors" && (
              <TextField
                variant="outlined"
                name="majors"
                size={"small"}
                label="Concentration"
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
            {this.state.searchCriteria == "interests" && (
              <TextField
                id="interests"
                name="interests"
                type="text"
                label="General Interest"
                value={this.state.searchTerm}
                onChange={this.handleSearch}
                helperText="Please search an interest"
                variant="outlined"
                size={"small"}
              />
            )}

            {this.state.searchCriteria == "" && (
              <span style={{
                marginRight: "400px",
              }}/>
            )}
            {this.state.searchCriteria == "name" && (
              <span style={{
                marginRight: "206px",
              }}/>
            )}
            {this.state.searchCriteria == "classYear" && (
              <span style={{
                marginRight: "187px",
              }}/>
            )}
            {this.state.searchCriteria == "majors" && (
              <span style={{
                marginRight: "199px",
              }}/>
            )}
            {this.state.searchCriteria == "interests" && (
              <span style={{
                marginRight: "206px",
              }}/>
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
              <MenuItem key="firstName" value="firstName">
                First Name: Alphabetical (A-Z)
              </MenuItem>
              <MenuItem key="lastName" value="lastName">
                Last Name: Alphabetical (A-Z)
              </MenuItem>
              <MenuItem key="classYear" value="classYear">
                Graduating Class: (2025-2021.5)
              </MenuItem>
            </TextField>
        </Typography> 
        {this.state.searchCriteria !== "" && console.log(students[0][`${this.state.searchCriteria}`])}
        <br />
        <br />
        <GridList cols={3} spacing={20} cellHeight="auto">
          {indexArray.filter((index) => {
            if (this.state.searchCriteria == "") {
               return index
            } else if (this.state.searchCriteria == "name") {
              if (((`${students[index]['firstName']} ${students[index]['lastName']}`).toString().toLowerCase()).includes(this.state.searchTerm.toString().toLowerCase())) {
                return index
            }
            } else if (((students[index][`${this.state.searchCriteria}`]).toString().toLowerCase()).includes(this.state.searchTerm.toString().toLowerCase())) {
              return index
            }}).map((index) => (
            <GridListTile item component="Card" sm>
              <Card
                raised
                style={{
                  borderStyle: "solid",
                  borderWidth: "3px",
                  borderColor: "red",
                  borderRadius: "5%",
                  height: "97%",
                }}
                align="center"
              >
                <CardContent>
                  <ButtonBase
                    size="large"
                    color="primary"
                    onClick={() => this.handleClickOpen(index)}
                  >
                    <div>
                      <img
                        src={students[index].imageUrl}
                        style={{
                          width: 150,
                          height: 150,
                          objectFit: "cover",
                          borderRadius: "10%",
                          borderStyle: "solid",
                          borderColor: "red",
                          borderWidth: "2px",
                        }}
                      />

                      <br />
                      <br />
                      <Typography variant="h4">
                        {students[index].firstName} {students[index].lastName}
                      </Typography>
                      <Typography variant="h6">
                        Class of {students[index].classYear}
                      </Typography>
                      <Typography variant="h6">
                        {students[index].majors[0]}
                        {students[index].majors[1] &&
                          `, ${students[index].majors[1]}`}
                        {students[index].majors[2] &&
                          `, ${students[index].majors[2]}`}
                      </Typography>
                      <Typography variant="body1">Interests:</Typography>
                      <Typography variant="body1">
                        • {students[index].interests[0]}
                      </Typography>
                      <Typography variant="body1">
                        • {students[index].interests[1]}
                      </Typography>
                      <Typography variant="body1">
                        • {students[index].interests[2]}
                      </Typography>
                    </div>
                  </ButtonBase>
                </CardContent>
              </Card>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default courseView;

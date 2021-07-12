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

class courseView extends Component {
  state = {
    students: [],
    open: false,
    email: "",
    searchTerm: "",
    searchCriteria: "",
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

  render() {
    const code = localStorage.code;
    const name = localStorage.name;
    const numStudents = this.state.students.length;
    let indexArray = [];
    for (let i = 0; i < numStudents; i++) {
      indexArray.push(i);
    }
    let students = this.state.students;

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
              <MenuItem key="firstName" value="firstName">
                first name
              </MenuItem>
              <MenuItem key="classYear" value="classYear">
                class
              </MenuItem>
              <MenuItem key="majors" value="majors">
                major
              </MenuItem>
              <MenuItem key="interests" value="interests">
                interests
              </MenuItem>
            </TextField>
      
          <input type="text" 
            placeholder="Search..."
            align="center" 
            style={{ 
              width: "240px", 
              height: "40px", 
              textAlign: "center", 
              fontSize: "18px" }}
            onChange={this.handleSearch}
          />
        </Typography> 
        {this.state.searchCriteria !== "" && (console.log(this.state.searchCriteria))}
        <br />
        <br />
        <GridList cols={3} spacing={20} cellHeight="auto">
          {indexArray.filter((index) => {
            if (this.state.searchTerm == "" || this.state.searchCriteria == "") {
               return index
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
